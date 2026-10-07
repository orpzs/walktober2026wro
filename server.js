const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const PORT = parseInt(process.env.PORT || '8080', 10);
const ADMIN_LDAP = (process.env.ADMIN_LDAP || 'mokshazna').trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'wroclaw2026';
const SESSION_SECRET = process.env.SESSION_SECRET || 'wroogle-walktober-2026-secret-key-wroclaw';
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, 'data', 'walktober.json');
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    const seedPath = path.join(__dirname, 'data', 'walktober.json');
    if (seedPath !== DATA_FILE && fs.existsSync(seedPath)) {
      fs.copyFileSync(seedPath, DATA_FILE);
      return;
    }
    const initialData = {
      totalSteps: 0,
      updatedAt: new Date().toISOString(),
      updatedBy: ADMIN_LDAP,
      teamMessage:
        "Welcome to Walktober 2026, Wrooglers! Lace up in Wrocław and let's conquer all 10 world trails together!",
      members: [],
      history: []
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf8');
  }
}

function normalizeMembers(rawMembers) {
  if (!Array.isArray(rawMembers)) return [];
  const seen = new Set();
  const clean = [];
  for (const item of rawMembers) {
    const name = String(item || '').trim().slice(0, 80);
    if (!name) continue;
    const key = name.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      clean.push(name);
    }
  }
  return clean.slice(0, 300);
}

const SEED_VISITORS = [
  { ldap: 'mokshazna', lastSeen: '2026-10-03T18:21:51.574Z', visits: 3 },
  { ldap: 'ptokarski', lastSeen: '2026-10-02T13:57:24.208Z', visits: 1 }
];

function normalizeVisitors(rawVisitors) {
  const source = Array.isArray(rawVisitors) ? rawVisitors : SEED_VISITORS;
  const byLdap = new Map();
  for (const item of source) {
    if (!item || typeof item !== 'object') continue;
    const ldap = String(item.ldap || '')
      .trim()
      .toLowerCase()
      .slice(0, 60);
    if (!ldap || ldap === 'anonymous') continue;
    const lastSeen = item.lastSeen || new Date().toISOString();
    const visits = Math.max(1, Math.round(Number(item.visits) || 1));
    if (!byLdap.has(ldap)) {
      byLdap.set(ldap, { ldap, lastSeen, visits });
    }
  }
  return Array.from(byLdap.values())
    .sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime())
    .slice(0, 200);
}

function readState() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      totalSteps: Math.max(0, Number(parsed.totalSteps) || 0),
      updatedAt: parsed.updatedAt || new Date().toISOString(),
      updatedBy: parsed.updatedBy || ADMIN_LDAP,
      teamMessage:
        typeof parsed.teamMessage === 'string'
          ? parsed.teamMessage
          : 'Onward from Wrocław to the Appalachian Trail!',
      members: normalizeMembers(parsed.members),
      visitors: normalizeVisitors(parsed.visitors),
      history: Array.isArray(parsed.history) ? parsed.history : []
    };
  } catch (err) {
    console.error('Error reading state file:', err);
    return {
      totalSteps: 0,
      updatedAt: new Date().toISOString(),
      updatedBy: ADMIN_LDAP,
      teamMessage: 'Onward from Wrocław to the Appalachian Trail!',
      members: [],
      visitors: normalizeVisitors(SEED_VISITORS),
      history: []
    };
  }
}

function writeState(newState) {
  ensureDataFile();
  const safeState = {
    totalSteps: Math.max(0, Math.round(Number(newState.totalSteps) || 0)),
    updatedAt: newState.updatedAt || new Date().toISOString(),
    updatedBy: newState.updatedBy || ADMIN_LDAP,
    teamMessage:
      typeof newState.teamMessage === 'string'
        ? newState.teamMessage.slice(0, 400)
        : '',
    members: normalizeMembers(newState.members),
    visitors: normalizeVisitors(newState.visitors),
    history: Array.isArray(newState.history) ? newState.history.slice(0, 150) : []
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(safeState, null, 2), 'utf8');
  console.log(
    `[STATE_SAVED] file=${DATA_FILE} totalSteps=${safeState.totalSteps} members=${safeState.members.length} visitors=${safeState.visitors.length} history=${safeState.history.length}`
  );
  return safeState;
}

function createSessionToken(ldap) {
  const payload = Buffer.from(
    JSON.stringify({
      ldap: ldap.toLowerCase(),
      exp: Date.now() + 1000 * 60 * 60 * 24 * 30 // 30 days
    })
  ).toString('base64url');
  const sig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('base64url');
  return `${payload}.${sig}`;
}

function verifySessionToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [payload, sig] = token.split('.');
  const expectedSig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('base64url');
  if (sig !== expectedSig) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!data.exp || Date.now() > data.exp) return null;
    if (data.ldap !== ADMIN_LDAP) return null;
    return data.ldap;
  } catch {
    return null;
  }
}

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach((pair) => {
    const idx = pair.indexOf('=');
    if (idx > -1) {
      const key = pair.slice(0, idx).trim();
      const val = pair.slice(idx + 1).trim();
      cookies[key] = decodeURIComponent(val);
    }
  });
  return cookies;
}

/**
 * Extracts LDAP username from Google Cloud IAP header if present:
 * e.g. X-Goog-Authenticated-User-Email: accounts.google.com:mokshazna@google.com
 */
function extractIapLdap(req) {
  const rawHeader =
    req.headers['x-goog-authenticated-user-email'] ||
    req.headers['x-forwarded-user'] ||
    '';
  if (!rawHeader || typeof rawHeader !== 'string') return null;
  // Strip prefix like "accounts.google.com:"
  const afterColon = rawHeader.includes(':')
    ? rawHeader.split(':').pop()
    : rawHeader;
  const email = afterColon.trim().toLowerCase();
  if (!email) return null;
  const ldap = email.includes('@') ? email.split('@')[0] : email;
  return ldap || null;
}

function getAuthContext(req) {
  // 1. Check Authorization Bearer token or cookie session (from passcode login)
  const authHeader = req.headers['authorization'] || '';
  let token = null;
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7).trim();
  } else {
    const cookies = parseCookies(req.headers.cookie);
    token = cookies.wroogle_session || null;
  }

  const sessionLdap = verifySessionToken(token);
  if (sessionLdap) {
    return {
      isAdmin: true,
      ldap: sessionLdap,
      authMethod: 'session',
      targetAdminLdap: ADMIN_LDAP
    };
  }

  // 2. Check Google Cloud IAP header if present
  const iapLdap = extractIapLdap(req);
  if (iapLdap) {
    return {
      isAdmin: false,
      ldap: iapLdap,
      authMethod: 'iap_viewer',
      targetAdminLdap: ADMIN_LDAP
    };
  }

  return {
    isAdmin: false,
    ldap: null,
    authMethod: null,
    targetAdminLdap: ADMIN_LDAP
  };
}

function sendJson(res, statusCode, data, extraHeaders = {}) {
  const body = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...extraHeaders
  });
  res.end(body);
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString('utf8');
      if (body.length > 1e6) {
        reject(new Error('Payload too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // Health check for Cloud Run
  if (pathname === '/healthz' && req.method === 'GET') {
    return sendJson(res, 200, { status: 'ok', service: 'wroogle-walktober-2026' });
  }

  // GET /api/state
  if (pathname === '/api/state' && req.method === 'GET') {
    let state = readState();
    const auth = getAuthContext(req);
    const iapUser = extractIapLdap(req) || auth.ldap || 'anonymous';
    console.log(`[PAGE_VIEW] ldap=${iapUser} steps=${state.totalSteps} members=${state.members.length}`);

    if (iapUser && iapUser !== 'anonymous') {
      const nowIso = new Date().toISOString();
      const existingIdx = state.visitors.findIndex((v) => v.ldap === iapUser);
      let shouldPersist = false;
      const nextVisitors = [...state.visitors];

      if (existingIdx === -1) {
        nextVisitors.unshift({ ldap: iapUser, lastSeen: nowIso, visits: 1 });
        shouldPersist = true;
      } else {
        const prev = nextVisitors[existingIdx];
        const elapsedMs = Date.now() - new Date(prev.lastSeen).getTime();
        if (elapsedMs > 60 * 1000) {
          nextVisitors[existingIdx] = {
            ldap: iapUser,
            lastSeen: nowIso,
            visits: (prev.visits || 1) + 1
          };
          shouldPersist = true;
        }
      }

      if (shouldPersist) {
        state = writeState({
          ...state,
          visitors: nextVisitors
        });
      }
    }

    return sendJson(res, 200, { ...state, auth });
  }

  // POST /api/auth/login
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const rawLdap = String(body.ldap || '').trim().toLowerCase();
      const ldap = rawLdap.includes('@') ? rawLdap.split('@')[0] : rawLdap;
      const password = String(body.password || '');

      if (ldap !== ADMIN_LDAP) {
        return sendJson(res, 403, {
          error: `Access denied. Only LDAP "${ADMIN_LDAP}" is authorized as The Wroogle Company admin.`
        });
      }

      if (password !== ADMIN_PASSWORD) {
        return sendJson(res, 401, {
          error: 'Invalid admin passcode for LDAP ' + ADMIN_LDAP + '.'
        });
      }

      const token = createSessionToken(ldap);
      const cookie = `wroogle_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`;
      return sendJson(
        res,
        200,
        {
          ok: true,
          token,
          auth: {
            isAdmin: true,
            ldap,
            authMethod: 'session',
            targetAdminLdap: ADMIN_LDAP
          }
        },
        { 'Set-Cookie': cookie }
      );
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // POST /api/auth/logout
  if (pathname === '/api/auth/logout' && req.method === 'POST') {
    const cookie = 'wroogle_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0';
    return sendJson(
      res,
      200,
      {
        ok: true,
        auth: {
          isAdmin: false,
          ldap: null,
          authMethod: null,
          targetAdminLdap: ADMIN_LDAP
        }
      },
      { 'Set-Cookie': cookie }
    );
  }

  // POST /api/steps
  if (pathname === '/api/steps' && req.method === 'POST') {
    const auth = getAuthContext(req);
    if (!auth.isAdmin) {
      return sendJson(res, 403, {
        error: `Admin access required (restricted to LDAP: ${ADMIN_LDAP}).`
      });
    }

    try {
      const body = await parseJsonBody(req);
      const state = readState();
      const mode = body.mode === 'set' ? 'set' : 'add';
      const rawSteps = Number(body.steps);

      if (!Number.isFinite(rawSteps) || rawSteps < 0) {
        return sendJson(res, 400, { error: 'Please enter a valid non-negative step count.' });
      }

      const stepsInput = Math.round(rawSteps);
      const previousSteps = state.totalSteps;
      const newSteps = mode === 'set' ? stepsInput : previousSteps + stepsInput;
      const delta = newSteps - previousSteps;
      let nowIso = new Date().toISOString();
      if (typeof body.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(body.date.trim())) {
        const timePart = nowIso.split('T')[1] || '12:00:00.000Z';
        nowIso = `${body.date.trim()}T${timePart}`;
      }
      const note =
        typeof body.note === 'string' && body.note.trim()
          ? body.note.trim().slice(0, 240)
          : mode === 'add'
            ? `Added +${stepsInput.toLocaleString('en-US')} team steps`
            : `Updated total team steps to ${newSteps.toLocaleString('en-US')}`;

      const entry = {
        id: 'evt-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
        timestamp: nowIso,
        mode,
        delta,
        previousSteps,
        newSteps,
        note,
        actor: auth.ldap || ADMIN_LDAP
      };

      const nextTeamMessage =
        typeof body.teamMessage === 'string'
          ? body.teamMessage.trim().slice(0, 400)
          : state.teamMessage;

      const combinedHistory = [entry, ...state.history].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      const updatedState = writeState({
        totalSteps: newSteps,
        updatedAt: nowIso,
        updatedBy: auth.ldap || ADMIN_LDAP,
        teamMessage: nextTeamMessage,
        members: state.members,
        visitors: state.visitors,
        history: combinedHistory
      });

      return sendJson(res, 200, { ...updatedState, auth });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // POST /api/members (Add or remove team members on The Wroogle Company roster)
  if (pathname === '/api/members' && req.method === 'POST') {
    const auth = getAuthContext(req);
    if (!auth.isAdmin) {
      return sendJson(res, 403, {
        error: `Admin access required (restricted to LDAP: ${ADMIN_LDAP}).`
      });
    }
    try {
      const body = await parseJsonBody(req);
      const state = readState();
      const action = body.action || 'add';
      let nextMembers = [...state.members];

      if (action === 'add') {
        const rawInput = String(body.names || body.name || '');
        const splitNames = rawInput
          .split(/[,;\n]+/)
          .map((s) => s.trim())
          .filter(Boolean);
        if (splitNames.length === 0) {
          return sendJson(res, 400, { error: 'Please enter at least one team member name.' });
        }
        nextMembers = normalizeMembers([...nextMembers, ...splitNames]);
      } else if (action === 'remove') {
        const target = String(body.name || '').trim().toLowerCase();
        nextMembers = nextMembers.filter((m) => m.toLowerCase() !== target);
      } else if (action === 'set' && Array.isArray(body.members)) {
        nextMembers = normalizeMembers(body.members);
      }

      const updatedState = writeState({
        ...state,
        updatedAt: new Date().toISOString(),
        updatedBy: auth.ldap || ADMIN_LDAP,
        members: nextMembers
      });
      return sendJson(res, 200, { ...updatedState, auth });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // POST /api/message (Update team dispatch message only)
  if (pathname === '/api/message' && req.method === 'POST') {
    const auth = getAuthContext(req);
    if (!auth.isAdmin) {
      return sendJson(res, 403, {
        error: `Admin access required (restricted to LDAP: ${ADMIN_LDAP}).`
      });
    }
    try {
      const body = await parseJsonBody(req);
      const state = readState();
      const updatedState = writeState({
        ...state,
        updatedAt: new Date().toISOString(),
        updatedBy: auth.ldap || ADMIN_LDAP,
        teamMessage: String(body.teamMessage || '').trim().slice(0, 400)
      });
      return sendJson(res, 200, { ...updatedState, auth });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // DELETE /api/steps/:id (Revert/remove a history entry)
  if (pathname.startsWith('/api/steps/') && req.method === 'DELETE') {
    const auth = getAuthContext(req);
    if (!auth.isAdmin) {
      return sendJson(res, 403, {
        error: `Admin access required (restricted to LDAP: ${ADMIN_LDAP}).`
      });
    }
    const entryId = decodeURIComponent(pathname.replace('/api/steps/', ''));
    const state = readState();
    const targetIdx = state.history.findIndex((h) => h.id === entryId);
    if (targetIdx === -1) {
      return sendJson(res, 404, { error: 'Log entry not found.' });
    }
    const removed = state.history[targetIdx];
    const nextHistory = state.history.filter((h) => h.id !== entryId);
    // If deleting the latest entry, revert totalSteps to previousSteps or subtract delta
    let nextTotal = state.totalSteps;
    if (targetIdx === 0) {
      nextTotal = Math.max(0, removed.previousSteps);
    } else if (removed.mode === 'add' && typeof removed.delta === 'number') {
      nextTotal = Math.max(0, state.totalSteps - removed.delta);
    }
    const updatedState = writeState({
      ...state,
      totalSteps: nextTotal,
      updatedAt: new Date().toISOString(),
      updatedBy: auth.ldap || ADMIN_LDAP,
      history: nextHistory
    });
    return sendJson(res, 200, { ...updatedState, auth });
  }

  // GET /api/export
  if (pathname === '/api/export' && req.method === 'GET') {
    const state = readState();
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': 'attachment; filename="wroogle-walktober-backup.json"'
    });
    return res.end(JSON.stringify(state, null, 2));
  }

  // POST /api/import
  if (pathname === '/api/import' && req.method === 'POST') {
    const auth = getAuthContext(req);
    if (!auth.isAdmin) {
      return sendJson(res, 403, {
        error: `Admin access required (restricted to LDAP: ${ADMIN_LDAP}).`
      });
    }
    try {
      const body = await parseJsonBody(req);
      if (typeof body.totalSteps !== 'number' || body.totalSteps < 0) {
        return sendJson(res, 400, { error: 'Invalid backup file format.' });
      }
      const state = readState();
      const updatedState = writeState({
        totalSteps: body.totalSteps,
        updatedAt: new Date().toISOString(),
        updatedBy: auth.ldap || ADMIN_LDAP,
        teamMessage: body.teamMessage || 'Restored expedition state.',
        members: Array.isArray(body.members) ? body.members : state.members,
        visitors: Array.isArray(body.visitors) ? body.visitors : state.visitors,
        history: Array.isArray(body.history) ? body.history : []
      });
      return sendJson(res, 200, { ...updatedState, auth });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // Serve static files from /public
  let safePath = path.normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }
  const filePath = path.join(PUBLIC_DIR, safePath);

  if (filePath.startsWith(PUBLIC_DIR) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // Fallback to index.html for SPA navigation
  const indexFile = path.join(PUBLIC_DIR, 'index.html');
  if (fs.existsSync(indexFile)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(indexFile).pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not Found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`========================================================`);
  console.log(`🥾 The Wroogle Company — Walktober 2026 Server Running!`);
  console.log(`🌍 URL: http://localhost:${PORT}`);
  console.log(`🔐 Authorized Admin LDAP: ${ADMIN_LDAP}`);
  console.log(`========================================================`);
});
