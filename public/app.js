/**
 * The Wroogle Company — Walktober 2026 Global Trail Expedition
 * Frontend Application Logic
 */

const WROCLAW_HQ = {
  name: 'Wrocław HQ (The Wroogle Co.)',
  coords: '51.1079° N, 17.0385° E',
  mapX: 515,
  mapY: 112
};

const MILESTONES = [
  {
    id: 1,
    name: 'Aravalli Biodiversity Park',
    location: 'Gurgeon (Gurgaon, India)',
    shortCity: 'Gurgaon',
    steps: 20000,
    prevSteps: 0,
    image: '/images/aravalli.jpg',
    coords: '28.48° N, 77.11° E',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Aravalli+Biodiversity+Park+Gurgaon+India',
    realLength: '14 km Sanctuary Loop · 260m elev',
    mapX: 688,
    mapY: 192,
    labelOffset: { dx: 12, dy: -8 },
    lore: 'Once a scarred quartzite mining site, this 380-acre sanctuary on the ancient Aravalli range was ecological-restored into a thriving urban forest of native acacias, peacocks, and red-wattled lapwings.'
  },
  {
    id: 2,
    name: 'Gerringong to Kiama Coastal Walk',
    location: 'Sydney, Australia',
    shortCity: 'Sydney',
    steps: 46000,
    prevSteps: 20000,
    image: '/images/kiama.jpg',
    coords: '34.70° S, 150.85° E',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kiama+Coast+Walk+Gerringong+to+Kiama+NSW+Australia',
    realLength: '20 km Sea Cliff Path · Tasman Coast',
    mapX: 892,
    mapY: 392,
    labelOffset: { dx: -62, dy: -12 },
    lore: 'Hugging the dramatic volcanic basalt sea cliffs south of Sydney, this coastal track winds across emerald headlands, secluded coves, and the thundering ocean plumes of the Kiama Blowhole.'
  },
  {
    id: 3,
    name: 'The Viking Coastal Trail',
    location: 'London (Isle of Thanet, UK)',
    shortCity: 'London',
    steps: 96000,
    prevSteps: 46000,
    image: '/images/viking.jpg',
    coords: '51.38° N, 1.43° E',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Viking+Coastal+Trail+Kent+UK',
    realLength: '51 km Chalk Coast Loop · Kent',
    mapX: 465,
    mapY: 116,
    labelOffset: { dx: -58, dy: 20 },
    lore: 'Tracing the dazzling white chalk cliffs and historic lighthouses of the Kent coast near London, where Nordic longships first landed at Pegwell Bay over a millennium ago.'
  },
  {
    id: 4,
    name: 'Inca Trail',
    location: 'Peru',
    shortCity: 'Peru',
    steps: 148000,
    prevSteps: 96000,
    image: '/images/inca.jpg',
    coords: '13.16° S, 72.54° W',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Inca+Trail+to+Machu+Picchu+Peru',
    realLength: '43 km Andean Royal Road · 4,215m pass',
    mapX: 258,
    mapY: 306,
    labelOffset: { dx: -48, dy: -10 },
    lore: 'Hand-fitted Incan stone staircases climb through orchid-draped cloud forests and over Dead Woman’s Pass before descending through Inti Punku (the Sun Gate) to Machu Picchu.'
  },
  {
    id: 5,
    name: 'Dublin Mountains Way',
    location: 'Dublin, Ireland',
    shortCity: 'Dublin',
    steps: 203000,
    prevSteps: 148000,
    image: '/images/dublin.jpg',
    coords: '53.23° N, 6.27° W',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dublin+Mountains+Way+Trail+Dublin+Ireland',
    realLength: '42.6 km Upland Ridge · Wicklow Border',
    mapX: 444,
    mapY: 102,
    labelOffset: { dx: -56, dy: -10 },
    lore: 'Sweeping from Shankill by the Irish Sea across heather-clad granite ridges, megalithic cairns, and pine forests with panoramic vistas across Dublin Bay.'
  },
  {
    id: 6,
    name: 'Mount Kilimanjaro',
    location: 'Tanzania',
    shortCity: 'Tanzania',
    steps: 293000,
    prevSteps: 203000,
    image: '/images/kilimanjaro.jpg',
    coords: '3.07° S, 37.35° E',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mount+Kilimanjaro+National+Park+Tanzania',
    realLength: '70 km Machame Ascent · 5,895m Summit',
    mapX: 576,
    mapY: 276,
    labelOffset: { dx: 12, dy: 4 },
    lore: 'The Roof of Africa rises from equatorial rainforest through surreal giant senecio valleys and alpine desert to the snow-crowned volcanic rim of Uhuru Peak above a sea of clouds.'
  },
  {
    id: 7,
    name: 'Torres del Paine "W" Trek',
    location: 'Chile (Patagonia)',
    shortCity: 'Chile',
    steps: 393000,
    prevSteps: 293000,
    image: '/images/torres.jpg',
    coords: '50.94° S, 72.99° W',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Torres+del+Paine+W+Trek+Patagonia+Chile',
    realLength: '80 km Patagonian Circuit · Granite Horns',
    mapX: 278,
    mapY: 438,
    labelOffset: { dx: 12, dy: 4 },
    lore: 'Jagged golden granite towers and the horn-shaped Cuernos del Paine soar above electric-turquoise glacial lakes, Hanging Glaciers, and crimson autumn lenga forests.'
  },
  {
    id: 8,
    name: 'Tour du Mont Blanc',
    location: 'France / Italy / Switzerland',
    shortCity: 'Mont Blanc',
    steps: 603000,
    prevSteps: 393000,
    image: '/images/montblanc.jpg',
    coords: '45.83° N, 6.86° E',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tour+du+Mont+Blanc+Chamonix',
    realLength: '170 km Tri-Country Alpine Loop',
    mapX: 486,
    mapY: 136,
    labelOffset: { dx: 12, dy: 14 },
    lore: 'Circling the snow-domed Mont Blanc massif across three alpine nations, linking high mountain passes, glacial tarns, and cozy wooden refuges in Chamonix, Courmayeur, and Val Ferret.'
  },
  {
    id: 9,
    name: 'John Muir Trail',
    location: 'USA (Sierra Nevada, California)',
    shortCity: 'John Muir',
    steps: 1023000,
    prevSteps: 603000,
    image: '/images/johnmuir.jpg',
    coords: '37.23° N, 118.85° W',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=John+Muir+Trail+Sierra+Nevada+California+USA',
    realLength: '340 km High Sierra Wilderness · 4,421m',
    mapX: 132,
    mapY: 155,
    labelOffset: { dx: -72, dy: 4 },
    lore: 'From Yosemite Valley’s granite cathedrals through the Ansel Adams Wilderness and Kings Canyon to the summit of Mount Whitney in the sun-drenched Range of Light.'
  },
  {
    id: 10,
    name: 'Appalachian Trail',
    location: 'USA (Georgia to Maine)',
    shortCity: 'Appalachian',
    steps: 5403000,
    prevSteps: 1023000,
    image: '/images/appalachian.jpg',
    coords: '40.50° N, 76.50° W',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Appalachian+National+Scenic+Trail+USA',
    realLength: '3,525 km Iconic White-Blaze Thru-Hike',
    mapX: 238,
    mapY: 146,
    labelOffset: { dx: 12, dy: -6 },
    lore: 'The ultimate Walktober boss trek: 14 states of mist-shrouded Blue Ridge peaks, smoky autumn hardwood forests ablaze in October scarlet and gold, culminating atop Mount Katahdin.'
  }
];

// Application State
const appState = {
  liveTotalSteps: 0,
  simulatedSteps: null, // number when simulator is active
  updatedAt: null,
  updatedBy: 'mokshazna',
  teamMessage: '',
  members: [],
  history: [],
  auth: {
    isAdmin: false,
    ldap: null,
    authMethod: null,
    targetAdminLdap: 'mokshazna'
  },
  selectedInspectorId: 1,
  activeFilter: 'all',
  adminMode: 'add' // 'add' | 'set'
};

function getEffectiveSteps() {
  return appState.simulatedSteps !== null ? appState.simulatedSteps : appState.liveTotalSteps;
}

function formatNum(n) {
  return Math.round(Number(n) || 0).toLocaleString('en-US');
}

function formatCompactSteps(n) {
  if (n >= 1000000) {
    return (n / 1000000).toFixed(2).replace(/\.00$/, '') + 'M';
  }
  if (n >= 1000) {
    return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return String(n);
}

/**
 * Maps step count (0 .. 5,403,000) to a piecewise 0..1000 slider scale
 * so each of the 10 milestones gets 100 units (10% of the visual ribbon).
 */
function stepsToPiecewisePermille(steps) {
  if (steps <= 0) return 0;
  const maxSteps = MILESTONES[MILESTONES.length - 1].steps;
  if (steps >= maxSteps) return 1000;

  for (let i = 0; i < MILESTONES.length; i++) {
    const m = MILESTONES[i];
    if (steps <= m.steps) {
      const segLen = m.steps - m.prevSteps;
      const intoSeg = steps - m.prevSteps;
      const frac = segLen > 0 ? intoSeg / segLen : 1;
      return Math.round((i + frac) * 100);
    }
  }
  return 1000;
}

function piecewisePermilleToSteps(permille) {
  const clamped = Math.max(0, Math.min(1000, Number(permille) || 0));
  if (clamped === 0) return 0;
  if (clamped >= 1000) return MILESTONES[MILESTONES.length - 1].steps;

  const bucket = Math.min(9, Math.floor(clamped / 100));
  const frac = (clamped - bucket * 100) / 100;
  const m = MILESTONES[bucket];
  const steps = m.prevSteps + frac * (m.steps - m.prevSteps);
  // Round to nearest 500 for clean numbers
  return Math.round(steps / 500) * 500;
}

function getTrailStatus(milestone, currentSteps) {
  if (currentSteps >= milestone.steps) {
    return {
      state: 'unlocked',
      legPercent: 100,
      remainingToUnlock: 0
    };
  }
  if (currentSteps >= milestone.prevSteps && currentSteps < milestone.steps) {
    const segTotal = milestone.steps - milestone.prevSteps;
    const segDone = currentSteps - milestone.prevSteps;
    const pct = Math.min(99.9, Math.max(0, (segDone / segTotal) * 100));
    return {
      state: 'active',
      legPercent: pct,
      remainingToUnlock: milestone.steps - currentSteps
    };
  }
  return {
    state: 'locked',
    legPercent: 0,
    remainingToUnlock: milestone.steps - currentSteps
  };
}

function getActiveOrLastMilestone(currentSteps) {
  for (const m of MILESTONES) {
    if (currentSteps < m.steps) {
      return m;
    }
  }
  return MILESTONES[MILESTONES.length - 1];
}

// ==================== RENDER FUNCTIONS ====================

function renderHeaderAndAuth() {
  const authBanner = document.getElementById('auth-status-banner');
  const loginForm = document.getElementById('admin-login-form');
  const controlsPanel = document.getElementById('admin-controls-panel');
  const logoutBtn = document.getElementById('btn-admin-logout');

  if (appState.auth && appState.auth.isAdmin) {
    authBanner.className = 'auth-status-banner authenticated';
    authBanner.innerHTML = `<strong>✓ Signed in (${appState.auth.ldap})</strong> — Ready to enter or update team steps.`;

    loginForm.classList.add('hidden');
    controlsPanel.classList.remove('hidden');
    logoutBtn.classList.toggle('hidden', appState.auth.authMethod === 'iap');
  } else {
    authBanner.className = 'auth-status-banner';
    authBanner.innerHTML = `🔒 Sign in to update The Wroogle Company's step count.`;

    loginForm.classList.remove('hidden');
    controlsPanel.classList.add('hidden');
  }
}

function renderHeroSection() {
  const steps = getEffectiveSteps();
  const isSim = appState.simulatedSteps !== null;

  // Simulator Banner
  const simBanner = document.getElementById('simulator-banner');
  const simInlineReset = document.getElementById('btn-sim-inline-reset');
  const simReadout = document.getElementById('sim-slider-readout');
  if (isSim) {
    simBanner.classList.remove('hidden');
    simInlineReset.classList.remove('hidden');
    document.getElementById('sim-banner-steps').textContent = formatNum(steps);
    simReadout.textContent = `${formatNum(steps)} (Preview)`;
  } else {
    simBanner.classList.add('hidden');
    simInlineReset.classList.add('hidden');
    simReadout.textContent = 'Live';
    const slider = document.getElementById('trail-simulator-slider');
    if (slider) {
      slider.value = String(stepsToPiecewisePermille(steps));
    }
  }

  // Dispatch Bar
  document.getElementById('team-dispatch-text').textContent =
    appState.teamMessage || 'Welcome to Walktober 2026! Onward from Wrocław across all 10 world trails!';

  if (appState.updatedAt) {
    const dt = new Date(appState.updatedAt);
    const formatted = dt.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
    document.getElementById('last-updated-meta').textContent = `Updated ${formatted}`;
  }

  // October Day Badge
  const now = new Date();
  const dayOfOct = now.getMonth() === 9 ? now.getDate() : 1;
  document.getElementById('october-day-badge').textContent = `OCTOBER DAY ${dayOfOct} OF 31`;

  // Big Step Counter
  document.getElementById('hero-total-steps').textContent = formatNum(steps);

  // Active Milestone Leg Calculation
  const currentMilestone = getActiveOrLastMilestone(steps);
  const status = getTrailStatus(currentMilestone, steps);
  const allCompleted = steps >= MILESTONES[MILESTONES.length - 1].steps;

  const legTitleEl = document.getElementById('hero-leg-title');
  const legFractionEl = document.getElementById('hero-leg-fraction');
  const legFillEl = document.getElementById('hero-leg-fill');
  const legPercentEl = document.getElementById('hero-leg-percent');
  const legRemainingEl = document.getElementById('hero-leg-remaining');
  const progressBarEl = document.getElementById('hero-leg-progressbar');

  if (allCompleted) {
    legTitleEl.textContent = `🏆 All 10 Trails Conquered! Appalachian Trail Completed!`;
    legFractionEl.textContent = `${formatNum(steps)} / ${formatNum(currentMilestone.steps)}`;
    legFillEl.style.width = '100%';
    progressBarEl.setAttribute('aria-valuenow', '100');
    legPercentEl.textContent = '100% of Walktober 2026 Expedition Complete!';
    legRemainingEl.innerHTML = `<strong>+${formatNum(steps - currentMilestone.steps)} bonus steps</strong> beyond final goal!`;
  } else {
    legTitleEl.textContent = `Active Leg #${currentMilestone.id}: ${currentMilestone.name} (${currentMilestone.shortCity})`;
    legFractionEl.textContent = `${formatNum(steps)} / ${formatNum(currentMilestone.steps)}`;
    legFillEl.style.width = `${status.legPercent.toFixed(1)}%`;
    progressBarEl.setAttribute('aria-valuenow', String(Math.round(status.legPercent)));
    legPercentEl.textContent = `${status.legPercent.toFixed(1)}% of leg from ${formatCompactSteps(currentMilestone.prevSteps)} to ${formatCompactSteps(currentMilestone.steps)}`;
    legRemainingEl.innerHTML = `<strong>${formatNum(status.remainingToUnlock)} steps</strong> to unlock ${currentMilestone.shortCity}`;
  }

  // Fun Wrocław & Global Conversion Metrics
  const unlockedCount = MILESTONES.filter((m) => steps >= m.steps).length;
  const kmWalked = (steps * 0.000762).toFixed(1);
  // Wrocław Market Square (Rynek) perimeter is approx 680 meters (0.68 km)
  const rynekLaps = ((steps * 0.000762) / 0.68).toFixed(1);
  // Roughly 1 Wrocław Krasnal spotted every 640 steps along the city trail
  const krasnaleSpotted = Math.floor(steps / 640);

  document.getElementById('metric-unlocked-count').textContent = `${unlockedCount} / 10`;
  document.getElementById('metric-km-walked').textContent = `${Number(kmWalked).toLocaleString('en-US')} km`;
  document.getElementById('metric-rynek-laps').textContent = `${Number(rynekLaps).toLocaleString('en-US')} laps`;
  document.getElementById('metric-krasnale-spotted').textContent = formatNum(krasnaleSpotted);

  // Right Column Spotlight Card
  document.getElementById('spotlight-status-label').textContent = allCompleted
    ? `EXPEDITION COMPLETE · TRAIL #10 OF 10`
    : `CURRENTLY TREKKING · TRAIL #${currentMilestone.id} OF 10`;
  document.getElementById('spotlight-trail-name').textContent = currentMilestone.name;
  document.getElementById('spotlight-trail-location').innerHTML = `📍 ${currentMilestone.location} · <a href="${currentMilestone.mapsUrl}" target="_blank" rel="noopener noreferrer" class="inline-maps-link">View on Google Maps ↗</a>`;
  const spotImg = document.getElementById('spotlight-trail-img');
  spotImg.src = currentMilestone.image;
  spotImg.alt = `${currentMilestone.name} illustration`;
  document.getElementById('spotlight-trail-desc').textContent = currentMilestone.lore;
  document.getElementById('spotlight-stamp-badge').innerHTML = `<span>${
    allCompleted ? '✓ STAMPED & COMPLETED' : `ACTIVE TRAIL · ${Math.round(status.legPercent)}%`
  }</span>`;

  // Circular SVG Gauge
  const circumference = 2 * Math.PI * 37; // ~232.48
  const offset = circumference - (status.legPercent / 100) * circumference;
  document.getElementById('spotlight-gauge-circle').style.strokeDashoffset = offset.toFixed(2);
  document.getElementById('spotlight-gauge-pct').textContent = `${Math.round(status.legPercent)}%`;

  // Spotlight Footer Stats
  document.getElementById('spotlight-target-steps').textContent = `${formatNum(currentMilestone.steps)} steps`;
  document.getElementById('spotlight-segment-steps').textContent = `+${formatNum(
    currentMilestone.steps - currentMilestone.prevSteps
  )} steps`;
  document.getElementById('spotlight-needed-steps').textContent = allCompleted
    ? 'Completed! 🎉'
    : `${formatNum(status.remainingToUnlock)} steps`;
}

function renderCheckpointRibbon() {
  const steps = getEffectiveSteps();
  const permille = stepsToPiecewisePermille(steps);
  // Ribbon line goes from left 3% to right 3% (94% total span)
  // Milestone i (0..9) center is at (i + 0.5) / 10
  const fillPct = Math.max(0, Math.min(94, (permille / 1000) * 94));
  const avatarLeftPct = 3 + fillPct;

  document.getElementById('ribbon-line-fill').style.width = `${fillPct}%`;
  document.getElementById('ribbon-hiker-avatar').style.left = `${avatarLeftPct}%`;
  document.getElementById('ribbon-hiker-tooltip').textContent = formatCompactSteps(steps);

  const row = document.getElementById('checkpoint-nodes-row');
  row.innerHTML = MILESTONES.map((m) => {
    const st = getTrailStatus(m, steps);
    const iconOrNum = st.state === 'unlocked' ? '✓' : String(m.id).padStart(2, '0');
    return `
      <button type="button" class="checkpoint-node ${st.state}" data-milestone-id="${m.id}" id="ribbon-node-${m.id}" title="${m.name} (${formatNum(m.steps)} steps)">
        <div class="node-circle">${iconOrNum}</div>
        <span class="node-city">${m.shortCity}</span>
        <span class="node-steps">${formatCompactSteps(m.steps)}</span>
      </button>
    `;
  }).join('');

  row.querySelectorAll('.checkpoint-node').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.getAttribute('data-milestone-id'));
      appState.selectedInspectorId = id;
      renderWorldMapAndInspector();
      const cardEl = document.getElementById(`milestone-card-${id}`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
}

function renderWorldMapAndInspector() {
  const steps = getEffectiveSteps();
  const routesLayer = document.getElementById('map-routes-layer');
  const pinsLayer = document.getElementById('map-pins-layer');

  // Build route segments from Wrocław HQ -> Milestone 1 -> Milestone 2 -> ... -> Milestone 10
  const points = [
    { x: WROCLAW_HQ.mapX, y: WROCLAW_HQ.mapY, name: 'Wrocław HQ' },
    ...MILESTONES.map((m) => ({ x: m.mapX, y: m.mapY, milestone: m }))
  ];

  let routesSvg = '';
  for (let i = 0; i < MILESTONES.length; i++) {
    const from = points[i];
    const to = points[i + 1];
    const m = MILESTONES[i];
    const st = getTrailStatus(m, steps);

    // Curved quadratic Bezier control point
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2 - 28;
    const pathD = `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;

    routesSvg += `<path d="${pathD}" class="map-route-segment ${st.state}" />`;
  }
  routesLayer.innerHTML = routesSvg;

  // Build Pins: Wrocław HQ + 10 Milestones
  let pinsSvg = `
    <g class="map-pin-group" transform="translate(${WROCLAW_HQ.mapX}, ${WROCLAW_HQ.mapY})">
      <circle r="9" fill="hsl(37, 84%, 42%)" stroke="#fff" stroke-width="2" filter="url(#pin-shadow)" />
      <text y="3" text-anchor="middle" fill="#fff" font-size="9" font-weight="700" font-family="JetBrains Mono">HQ</text>
      <rect x="-42" y="-28" width="84" height="16" class="map-pin-label-bg" />
      <text x="0" y="-17" text-anchor="middle" class="map-pin-label">Wrocław HQ</text>
    </g>
  `;

  MILESTONES.forEach((m) => {
    const st = getTrailStatus(m, steps);
    const isSelected = appState.selectedInspectorId === m.id;
    let fill = 'hsl(154, 12%, 66%)';
    if (st.state === 'unlocked') fill = 'hsl(152, 46%, 26%)';
    if (st.state === 'active') fill = 'hsl(16, 74%, 46%)';

    const r = isSelected ? 11.5 : 8.5;
    const labelText = `${m.id}. ${m.shortCity}`;
    const boxWidth = labelText.length * 6.4 + 12;
    const lx = m.labelOffset.dx;
    const ly = m.labelOffset.dy;

    pinsSvg += `
      <g class="map-pin-group" data-pin-id="${m.id}" transform="translate(${m.mapX}, ${m.mapY})">
        ${
          isSelected
            ? `<circle r="16" fill="none" stroke="${fill}" stroke-width="2" stroke-dasharray="3 2" />`
            : ''
        }
        <circle r="${r}" fill="${fill}" stroke="#fff" stroke-width="2" filter="url(#pin-shadow)" />
        <text y="3" text-anchor="middle" fill="#fff" font-size="8.5" font-weight="700" font-family="JetBrains Mono">${
          st.state === 'unlocked' ? '✓' : m.id
        }</text>
        <rect x="${lx}" y="${ly - 11}" width="${boxWidth}" height="16" class="map-pin-label-bg" />
        <text x="${lx + boxWidth / 2}" y="${ly}" text-anchor="middle" class="map-pin-label">${labelText}</text>
      </g>
    `;
  });

  pinsLayer.innerHTML = pinsSvg;

  pinsLayer.querySelectorAll('[data-pin-id]').forEach((pinEl) => {
    pinEl.addEventListener('click', () => {
      appState.selectedInspectorId = Number(pinEl.getAttribute('data-pin-id'));
      renderWorldMapAndInspector();
    });
  });

  // Update Inspector Card
  const selected =
    MILESTONES.find((m) => m.id === appState.selectedInspectorId) || getActiveOrLastMilestone(steps);
  const selStatus = getTrailStatus(selected, steps);

  document.getElementById('inspector-number').textContent = `TRAIL #${String(selected.id).padStart(2, '0')} OF 10`;
  const statusPill = document.getElementById('inspector-status');
  statusPill.className = `inspector-status-pill ${selStatus.state}`;
  statusPill.textContent =
    selStatus.state === 'unlocked'
      ? '✓ STAMPED'
      : selStatus.state === 'active'
        ? '🥾 CURRENTLY TREKKING'
        : '🔒 UPCOMING';

  const inspImg = document.getElementById('inspector-img');
  inspImg.src = selected.image;
  inspImg.alt = selected.name;
  document.getElementById('inspector-pct').textContent = `${Math.round(selStatus.legPercent)}%`;
  document.getElementById('inspector-title').textContent = selected.name;
  document.getElementById('inspector-loc').innerHTML = `${selected.location} · <a href="${selected.mapsUrl}" target="_blank" rel="noopener noreferrer" class="inline-maps-link">Open in Google Maps ↗</a>`;
  document.getElementById('inspector-lore').textContent = selected.lore;
  document.getElementById('inspector-target').textContent = `${formatNum(selected.steps)} steps`;
  document.getElementById('inspector-leg').textContent = `+${formatNum(selected.steps - selected.prevSteps)} steps`;
  document.getElementById('inspector-remaining').textContent =
    selStatus.state === 'unlocked'
      ? 'Unlocked & Stamped! 🎉'
      : `${formatNum(selStatus.remainingToUnlock)} steps to unlock`;
}

function renderMilestoneCards() {
  const steps = getEffectiveSteps();
  const grid = document.getElementById('milestones-trail-grid');

  const filtered = MILESTONES.filter((m) => {
    const st = getTrailStatus(m, steps);
    if (appState.activeFilter === 'unlocked') return st.state === 'unlocked';
    if (appState.activeFilter === 'upcoming') return st.state !== 'unlocked';
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="pace-card" style="grid-column: 1 / -1; text-align: center;">
        <h3 class="subsection-title">No trails match this filter yet</h3>
        <p class="pace-desc">Switch back to "All 10 Trails" to view the entire Walktober route.</p>
      </div>
    `;
    return;
  }

  const now = new Date();
  const currentDay = now.getMonth() === 9 ? Math.max(1, now.getDate()) : 1;
  const remainingDays = Math.max(1, 31 - currentDay + 1);
  const orbCircumference = 2 * Math.PI * 21; // r=21 -> ~131.95

  grid.innerHTML = filtered
    .map((m) => {
      const st = getTrailStatus(m, steps);
      const offset = orbCircumference - (st.legPercent / 100) * orbCircumference;
      const perDayForTrail = Math.ceil(st.remainingToUnlock / remainingDays);

      let stampLabel = 'UPCOMING TRAIL';
      if (st.state === 'unlocked') stampLabel = '✓ STAMPED · UNLOCKED';
      if (st.state === 'active') stampLabel = `🥾 TREKKING · ${Math.round(st.legPercent)}%`;

      return `
        <article class="trail-postcard ${st.state}-leg" id="milestone-card-${m.id}">
          <div class="postcard-media">
            <img src="${m.image}" alt="${m.name} in ${m.location}" class="postcard-img" loading="lazy" />
            <div class="postcard-progress-orb" title="${Math.round(st.legPercent)}% of this trail leg completed">
              <svg viewBox="0 0 52 52" class="orb-svg">
                <circle class="orb-bg" cx="26" cy="26" r="21" />
                <circle class="orb-fill" cx="26" cy="26" r="21" stroke-dasharray="${orbCircumference.toFixed(
                  2
                )}" stroke-dashoffset="${offset.toFixed(2)}" />
              </svg>
              <span class="orb-label">${st.state === 'unlocked' ? '✓' : `${Math.round(st.legPercent)}%`}</span>
            </div>
            <div class="postcard-stamp ${st.state}">${stampLabel}</div>
          </div>

          <div class="postcard-body">
            <div>
              <div class="postcard-meta-top">
                <span class="postcard-location">#${String(m.id).padStart(2, '0')} · ${m.location}</span>
                <a href="${m.mapsUrl}" target="_blank" rel="noopener noreferrer" class="postcard-maps-btn" title="Explore ${m.name} on Google Maps">
                  📍 Google Maps ↗
                </a>
              </div>
              <h3 class="postcard-title">${m.name}</h3>
              <p class="postcard-real-sub">${m.realLength} · ${m.coords}</p>
              <p class="postcard-desc">${m.lore}</p>
            </div>

            <div class="postcard-progress-block">
              <div class="postcard-prog-header">
                <span>Goal: <strong class="mono-num">${formatNum(m.steps)} total steps</strong></span>
                <span class="mono-num">This trail leg: +${formatNum(m.steps - m.prevSteps)}</span>
              </div>
              <div class="postcard-prog-bar">
                <div class="postcard-prog-fill" style="width: ${st.legPercent.toFixed(1)}%"></div>
              </div>
              <div class="postcard-prog-footer">
                <span>${
                  st.state === 'unlocked'
                    ? '✅ Already unlocked by The Wroogle Company!'
                    : `⏱️ Need <strong>${formatNum(perDayForTrail)} steps/day</strong> as a team (${remainingDays} days left)`
                }</span>
                <strong class="mono-num">${
                  st.state === 'unlocked' ? 'DONE' : `${formatNum(st.remainingToUnlock)} left`
                }</strong>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

function renderLogbookAndPace() {
  const steps = getEffectiveSteps();
  const now = new Date();
  const currentDay = now.getMonth() === 9 ? Math.max(1, now.getDate()) : 1;
  const remainingDays = Math.max(1, 31 - currentDay + 1);
  const currentDailyAvg = Math.round(steps / currentDay);
  const projectedOct31Total = Math.round(steps + currentDailyAvg * (31 - currentDay));

  // Find which trail we're projected to reach by Oct 31 at current speed
  const projectedUnlocked = MILESTONES.filter((m) => projectedOct31Total >= m.steps);
  const highestProjected =
    projectedUnlocked.length > 0 ? projectedUnlocked[projectedUnlocked.length - 1] : null;

  const storyEl = document.getElementById('pace-plain-story');
  if (storyEl) {
    if (steps === 0) {
      storyEl.innerHTML = `Today is <strong>October ${currentDay}</strong>, giving our team <strong>${remainingDays} days left</strong> in October. Once we log our first steps, this section will show our daily walking speed and which trail we are on track to reach by October 31!`;
    } else {
      const projectionSentence = highestProjected
        ? `At this speed, we are on track to finish October with around <strong>${formatNum(
            projectedOct31Total
          )} steps</strong> — enough to unlock up to <strong>Trail #${highestProjected.id}: ${
            highestProjected.name
          } (${highestProjected.shortCity})</strong>!`
        : `At this speed, we are on track for <strong>${formatNum(
            projectedOct31Total
          )} steps</strong> by October 31 — a little faster and we'll unlock our first trail in Gurgaon (20,000 steps)!`;

      storyEl.innerHTML = `In the first <strong>${currentDay} ${
        currentDay === 1 ? 'day' : 'days'
      } of October</strong>, The Wroogle Company has walked <strong>${formatNum(
        steps
      )} steps</strong> — an average team speed of <strong>${formatNum(
        currentDailyAvg
      )} steps per day</strong>. ${projectionSentence} With <strong>${remainingDays} days left</strong> in October, here is what our team needs per day to hit key milestones:`;
    }
  }

  const nextMilestone = getActiveOrLastMilestone(steps);
  const dublinMilestone = MILESTONES[4]; // 203,000
  const johnMuirMilestone = MILESTONES[8]; // 1,023,000
  const appalachianMilestone = MILESTONES[9]; // 5,403,000

  const targets = [
    {
      badge: 'NEXT TRAIL GOAL',
      label: `${nextMilestone.name} (${nextMilestone.shortCity})`,
      targetSteps: nextMilestone.steps
    },
    {
      badge: 'HALFWAY GOAL (TRAIL #5)',
      label: `${dublinMilestone.name} (${dublinMilestone.shortCity})`,
      targetSteps: dublinMilestone.steps
    },
    {
      badge: '1 MILLION CLUB (TRAIL #9)',
      label: `${johnMuirMilestone.name} (USA)`,
      targetSteps: johnMuirMilestone.steps
    },
    {
      badge: 'ALL 10 TRAILS (FINAL GOAL)',
      label: `${appalachianMilestone.name} (USA)`,
      targetSteps: appalachianMilestone.steps
    }
  ];

  const memberCount = Array.isArray(appState.members) ? appState.members.length : 0;
  const paceList = document.getElementById('pace-targets-list');
  paceList.innerHTML = targets
    .map((t) => {
      const needed = Math.max(0, t.targetSteps - steps);
      const perDay = Math.ceil(needed / remainingDays);
      const perPersonLine =
        memberCount > 0 && needed > 0
          ? `<div class="rate-unit">~${formatNum(Math.ceil(perDay / memberCount))} / person (${memberCount} walkers)</div>`
          : '';
      return `
        <div class="pace-target-item">
          <div class="pace-target-info">
            <span class="pace-target-eyebrow">${t.badge}</span>
            <strong>${t.label}</strong>
            <span>${
              needed === 0
                ? `We already passed ${formatNum(t.targetSteps)} steps!`
                : `Need <strong>${formatNum(needed)} more steps</strong> over the next ${remainingDays} days to hit ${formatNum(t.targetSteps)}`
            }</span>
          </div>
          <div class="pace-target-rate">
            ${
              needed === 0
                ? '✓ UNLOCKED'
                : `<div class="rate-big">${formatNum(perDay)}</div><div class="rate-unit">team steps / day</div>${perPersonLine}`
            }
          </div>
        </div>
      `;
    })
    .join('');

  // Render History Logbook
  const historyList = document.getElementById('history-list');
  if (!appState.history || appState.history.length === 0) {
    historyList.innerHTML = `<p class="pace-desc">No step updates logged yet. Click <strong>+ Enter Steps</strong> above to log the first team walk!</p>`;
  } else {
    historyList.innerHTML = appState.history
      .map((entry) => {
        const dt = new Date(entry.timestamp);
        const dateStr = dt.toLocaleString('en-GB', {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        });
        const sign = entry.delta >= 0 ? '+' : '';
        return `
          <div class="history-item">
            <div class="history-item-main">
              <div>
                <span class="history-delta-badge">${sign}${formatNum(entry.delta)} steps</span>
                <span class="mono-num" style="font-size: 0.78rem; color: var(--text-muted);">➔ Total: ${formatNum(
                  entry.newSteps
                )}</span>
              </div>
              <p class="history-note">${escapeHtml(entry.note || 'Step update')}</p>
              <p class="history-meta">${dateStr}</p>
            </div>
            ${
              appState.auth && appState.auth.isAdmin
                ? `<button type="button" class="btn-delete-log" data-delete-id="${entry.id}" title="Undo / delete this entry">Undo</button>`
                : ''
            }
          </div>
        `;
      })
      .join('');

    historyList.querySelectorAll('[data-delete-id]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-delete-id');
        await handleDeleteHistoryEntry(id);
      });
    });
  }

  // Also populate Official Reference Table Modal
  const tbody = document.getElementById('official-table-body');
  if (tbody) {
    tbody.innerHTML = MILESTONES.map((m) => {
      const st = getTrailStatus(m, steps);
      return `
        <tr>
          <td class="mono-num">${m.id}</td>
          <td><strong><a href="${m.mapsUrl}" target="_blank" rel="noopener noreferrer" class="inline-maps-link">${m.name} ↗</a></strong></td>
          <td>${m.location}</td>
          <td class="mono-num">${formatNum(m.steps)}</td>
          <td class="mono-num">${
            st.state === 'unlocked'
              ? '✅ Unlocked'
              : st.state === 'active'
                ? `🥾 ${Math.round(st.legPercent)}%`
                : '⏳ Ahead'
          }</td>
        </tr>
      `;
    }).join('');
  }
}

function renderTeamRoster() {
  const members = Array.isArray(appState.members) ? appState.members : [];
  const countPill = document.getElementById('roster-count-pill');
  const rosterList = document.getElementById('team-roster-list');
  const adminChips = document.getElementById('admin-members-chips');

  if (countPill) {
    countPill.textContent = `${members.length} ${members.length === 1 ? 'walker' : 'walkers'} joined`;
  }

  if (rosterList) {
    if (members.length === 0) {
      rosterList.innerHTML = `<p class="roster-empty-msg">No team members listed yet — join <strong>"The Wroogle Company"</strong> using the button above to get your name on our Wrocław expedition roster!</p>`;
    } else {
      rosterList.innerHTML = members
        .map((name) => {
          const initial = String(name).trim().charAt(0).toUpperCase() || 'W';
          return `
            <span class="roster-member-badge">
              <span class="roster-member-initial" aria-hidden="true">${escapeHtml(initial)}</span>
              <span class="roster-member-name">${escapeHtml(name)}</span>
            </span>
          `;
        })
        .join('');
    }
  }

  if (adminChips) {
    if (members.length === 0) {
      adminChips.innerHTML = `<span class="roster-empty-msg">No members added yet.</span>`;
    } else {
      adminChips.innerHTML = members
        .map(
          (name) => `
          <span class="admin-member-chip">
            <span>${escapeHtml(name)}</span>
            <button type="button" class="btn-remove-member" data-remove-member="${escapeHtml(name)}" title="Remove ${escapeHtml(name)}">✕</button>
          </span>
        `
        )
        .join('');

      adminChips.querySelectorAll('[data-remove-member]').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const targetName = btn.getAttribute('data-remove-member');
          await handleRemoveMember(targetName);
        });
      });
    }
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderAll() {
  renderHeaderAndAuth();
  renderHeroSection();
  renderCheckpointRibbon();
  renderTeamRoster();
  renderWorldMapAndInspector();
  renderMilestoneCards();
  renderLogbookAndPace();
  updateAdminPreviewTotal();
}

// ==================== API & INTERACTION HANDLERS ====================

async function fetchInitialState() {
  try {
    const res = await fetch('/api/state');
    if (!res.ok) throw new Error('Failed to load state');
    const data = await res.json();
    applyServerState(data);
  } catch (err) {
    console.error('Error fetching state:', err);
    renderAll();
  }
}

function applyServerState(data) {
  const prevUnlocked = MILESTONES.filter((m) => appState.liveTotalSteps >= m.steps).length;
  appState.liveTotalSteps = Number(data.totalSteps) || 0;
  appState.updatedAt = data.updatedAt;
  appState.updatedBy = data.updatedBy || 'mokshazna';
  appState.teamMessage = data.teamMessage || '';
  appState.members = Array.isArray(data.members) ? data.members : [];
  appState.history = Array.isArray(data.history) ? data.history : [];
  if (data.auth) {
    appState.auth = data.auth;
  }

  const activeM = getActiveOrLastMilestone(appState.liveTotalSteps);
  appState.selectedInspectorId = activeM.id;

  const dispatchInput = document.getElementById('admin-dispatch-input');
  if (dispatchInput && !dispatchInput.value) {
    dispatchInput.value = appState.teamMessage;
  }

  const newUnlocked = MILESTONES.filter((m) => appState.liveTotalSteps >= m.steps).length;
  if (newUnlocked > prevUnlocked && prevUnlocked > 0) {
    const unlockedTrail = MILESTONES[newUnlocked - 1];
    showToast(`🎉 New Trail Unlocked! The Wroogle Company stamped ${unlockedTrail.name}!`);
  }

  renderAll();
}

function updateAdminPreviewTotal() {
  const input = document.getElementById('admin-steps-input');
  const preview = document.getElementById('resulting-total-preview');
  if (!input || !preview) return;
  const val = Math.max(0, Math.round(Number(input.value) || 0));
  const nextTotal = appState.adminMode === 'set' ? val : appState.liveTotalSteps + val;
  preview.textContent = `${formatNum(nextTotal)} steps`;
}

async function handleDeleteHistoryEntry(id) {
  try {
    const res = await fetch(`/api/steps/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(`⚠️ ${data.error || 'Could not undo entry'}`);
      return;
    }
    appState.simulatedSteps = null;
    applyServerState(data);
    showToast('↩️ Step entry reverted.');
  } catch (err) {
    showToast('⚠️ Network error while reverting entry.');
  }
}

async function handleRemoveMember(name) {
  try {
    const res = await fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'remove', name })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(`⚠️ ${data.error || 'Could not remove member'}`);
      return;
    }
    applyServerState(data);
    showToast(`Removed ${name} from roster.`);
  } catch (err) {
    showToast('⚠️ Network error removing member.');
  }
}

function showToast(message) {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 4200);
}

function openAdminModal() {
  const modal = document.getElementById('admin-modal-backdrop');
  modal.classList.remove('hidden');
  const dispatchInput = document.getElementById('admin-dispatch-input');
  if (dispatchInput) {
    dispatchInput.value = appState.teamMessage;
  }
  updateAdminPreviewTotal();
}

function closeAdminModal() {
  document.getElementById('admin-modal-backdrop').classList.add('hidden');
}

function bindEvents() {
  // Simulator Slider
  const simSlider = document.getElementById('trail-simulator-slider');
  simSlider.addEventListener('input', (e) => {
    const permille = Number(e.target.value);
    const simSteps = piecewisePermilleToSteps(permille);
    appState.simulatedSteps = simSteps;
    const activeM = getActiveOrLastMilestone(simSteps);
    appState.selectedInspectorId = activeM.id;
    renderAll();
  });

  const resetSim = () => {
    appState.simulatedSteps = null;
    const activeM = getActiveOrLastMilestone(appState.liveTotalSteps);
    appState.selectedInspectorId = activeM.id;
    renderAll();
  };

  document.getElementById('btn-sim-banner-reset').addEventListener('click', resetSim);
  document.getElementById('btn-sim-inline-reset').addEventListener('click', resetSim);

  // Inspector Prev / Next buttons
  document.getElementById('btn-inspector-prev').addEventListener('click', () => {
    appState.selectedInspectorId = appState.selectedInspectorId > 1 ? appState.selectedInspectorId - 1 : 10;
    renderWorldMapAndInspector();
  });
  document.getElementById('btn-inspector-next').addEventListener('click', () => {
    appState.selectedInspectorId = appState.selectedInspectorId < 10 ? appState.selectedInspectorId + 1 : 1;
    renderWorldMapAndInspector();
  });

  // Milestone Filter Pills
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      appState.activeFilter = btn.getAttribute('data-filter');
      renderMilestoneCards();
    });
  });

  // Official Reference Sheet Modal
  const refModal = document.getElementById('ref-modal-backdrop');
  document.getElementById('btn-open-ref-modal').addEventListener('click', () => {
    refModal.classList.remove('hidden');
  });
  document.getElementById('btn-close-ref-modal').addEventListener('click', () => {
    refModal.classList.add('hidden');
  });
  refModal.addEventListener('click', (e) => {
    if (e.target === refModal) refModal.classList.add('hidden');
  });

  // Step Entry Modal Trigger (only via the small "+ Enter Steps" button in Recent Step Updates)
  document.getElementById('btn-logbook-add').addEventListener('click', openAdminModal);
  document.getElementById('btn-close-admin-modal').addEventListener('click', closeAdminModal);
  document.getElementById('admin-modal-backdrop').addEventListener('click', (e) => {
    if (e.target.id === 'admin-modal-backdrop') closeAdminModal();
  });

  // Admin Login Form
  document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const ldap = document.getElementById('login-ldap-input').value.trim();
    const password = document.getElementById('login-password-input').value;
    const errEl = document.getElementById('login-error-msg');
    errEl.classList.add('hidden');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ldap, password })
      });
      const data = await res.json();
      if (!res.ok) {
        errEl.textContent = data.error || 'Authentication failed';
        errEl.classList.remove('hidden');
        return;
      }
      appState.auth = data.auth;
      document.getElementById('login-password-input').value = '';
      renderAll();
      showToast(`🔓 Welcome, ${data.auth.ldap}! Admin controls unlocked.`);
    } catch (err) {
      errEl.textContent = 'Network error verifying credentials.';
      errEl.classList.remove('hidden');
    }
  });

  // Admin Logout
  document.getElementById('btn-admin-logout').addEventListener('click', async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    appState.auth = { isAdmin: false, ldap: null, authMethod: null, targetAdminLdap: 'mokshazna' };
    renderAll();
    showToast('🔒 Admin session locked.');
  });

  // Admin Mode Toggle (Add vs Set)
  const tabAdd = document.getElementById('tab-mode-add');
  const tabSet = document.getElementById('tab-mode-set');
  const stepsLabel = document.getElementById('admin-steps-label');
  const chipsRow = document.getElementById('quick-chips-row');
  const stepsInput = document.getElementById('admin-steps-input');

  tabAdd.addEventListener('click', () => {
    appState.adminMode = 'add';
    tabAdd.classList.add('active');
    tabSet.classList.remove('active');
    stepsLabel.textContent = 'Steps to Add (+)';
    stepsInput.placeholder = 'e.g. 15400';
    chipsRow.classList.remove('hidden');
    updateAdminPreviewTotal();
  });

  tabSet.addEventListener('click', () => {
    appState.adminMode = 'set';
    tabSet.classList.add('active');
    tabAdd.classList.remove('active');
    stepsLabel.textContent = 'Exact Cumulative Team Total (=)';
    stepsInput.placeholder = String(appState.liveTotalSteps);
    stepsInput.value = String(appState.liveTotalSteps);
    chipsRow.classList.add('hidden');
    updateAdminPreviewTotal();
  });

  stepsInput.addEventListener('input', updateAdminPreviewTotal);

  // Quick Add Chips
  document.querySelectorAll('.chip-btn').forEach((chip) => {
    chip.addEventListener('click', () => {
      const addVal = Number(chip.getAttribute('data-add')) || 0;
      const current = Number(stepsInput.value) || 0;
      stepsInput.value = String(current + addVal);
      updateAdminPreviewTotal();
    });
  });

  // Submit Step Update
  document.getElementById('step-update-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const rawSteps = Number(stepsInput.value);
    const note = document.getElementById('admin-note-input').value.trim();
    const teamMessage = document.getElementById('admin-dispatch-input').value.trim();
    const feedback = document.getElementById('admin-form-feedback');
    feedback.classList.add('hidden');

    try {
      const res = await fetch('/api/steps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: appState.adminMode,
          steps: rawSteps,
          note,
          teamMessage
        })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(`⚠️ ${data.error || 'Error saving steps'}`);
        return;
      }

      appState.simulatedSteps = null;
      applyServerState(data);
      stepsInput.value = '';
      document.getElementById('admin-note-input').value = '';
      updateAdminPreviewTotal();

      feedback.textContent = `✓ Team total updated to ${formatNum(data.totalSteps)} steps!`;
      feedback.classList.remove('hidden');
      showToast(`🥾 Wroogle Co. steps updated to ${formatNum(data.totalSteps)}!`);
    } catch (err) {
      showToast('⚠️ Failed to reach server.');
    }
  });

  // Add Team Members Form
  const memberAddForm = document.getElementById('member-add-form');
  if (memberAddForm) {
    memberAddForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const memberInput = document.getElementById('admin-member-input');
      const names = memberInput.value.trim();
      if (!names) return;

      try {
        const res = await fetch('/api/members', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'add', names })
        });
        const data = await res.json();
        if (!res.ok) {
          showToast(`⚠️ ${data.error || 'Error adding member'}`);
          return;
        }
        memberInput.value = '';
        applyServerState(data);
        showToast(`🥾 Added to The Wroogle Company roster!`);
      } catch (err) {
        showToast('⚠️ Network error adding team member.');
      }
    });
  }

  // Import JSON Backup
  document.getElementById('admin-import-file').addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const res = await fetch('/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed)
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(`⚠️ ${data.error || 'Import failed'}`);
        return;
      }
      appState.simulatedSteps = null;
      applyServerState(data);
      showToast('📦 Expedition backup restored successfully!');
    } catch (err) {
      showToast('⚠️ Invalid JSON backup file.');
    } finally {
      e.target.value = '';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bindEvents();
  renderAll();
  fetchInitialState();
});
