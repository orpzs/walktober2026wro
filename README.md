# The Wroogle Company — Walktober 2026 Expedition Tracker 🥾🧙‍♂️

Interactive global trail milestone tracker for **The Wroogle Company** (Google Wrocław Office) during Walktober 2026.

## Milestone Trails Included
| # | Milestone Trail | Location | Cumulative Steps |
|---|---|---|---|
| 1 | Aravalli Biodiversity Park | Gurgeon (Gurgaon) | 20,000 |
| 2 | Gerringong to Kiama Coastal Walk | Sydney | 46,000 |
| 3 | The Viking Coastal Trail | London | 96,000 |
| 4 | Inca Trail | Peru | 148,000 |
| 5 | Dublin Mountains Way | Dublin | 203,000 |
| 6 | Mount Kilimanjaro | Tanzania | 293,000 |
| 7 | Torres del Paine "W" Trek | Chile | 393,000 |
| 8 | Tour du Mont Blanc | France/Italy/Switzerland | 603,000 |
| 9 | John Muir Trail | USA | 1,023,000 |
| 10 | Appalachian Trail | USA | 5,403,000 |

## Running Locally

```bash
npm start
```

Open [http://localhost:8080](http://localhost:8080).

## Admin Access (`mokshazna`)

1. **Automatic Cloud Run IAP Authentication**:
   - When deployed behind Google Cloud Identity-Aware Proxy (IAP), the server automatically inspects the `X-Goog-Authenticated-User-Email` header (e.g., `accounts.google.com:mokshazna@google.com`).
   - If the LDAP matches `ADMIN_LDAP` (defaults to `mokshazna`), admin write access is unlocked automatically with zero extra login prompts.
2. **Direct / Fallback Passcode Login**:
   - Click **Admin · mokshazna** in the top-right header (or **+ Log Steps (mokshazna)**).
   - Enter LDAP `mokshazna` and your admin passcode (default: `wroogle2026`, configurable via the `ADMIN_PASSWORD` environment variable).

## Deploying to Google Cloud Run

```bash
gcloud run deploy wroogle-walktober \
  --source . \
  --region europe-central2 \
  --set-env-vars="ADMIN_LDAP=mokshazna,ADMIN_PASSWORD=your-secret-passcode"
```

> **Tip for Cloud Run Persistence**: You can export/import the JSON backup anytime from the Admin Console, or mount a Cloud Storage bucket to `/app/data` on Cloud Run (`--add-volume` / `--add-volume-mount`) so `data/walktober.json` persists across container scaling events.
