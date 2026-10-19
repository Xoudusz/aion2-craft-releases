// Hourly price archive for Aion2 Craft. Run by .github/workflows/archive.yml.
//
// Fetches aion2.market's current quotes per server and appends new observations to
// history/<server>/<YYYY-MM-DD>.csv (UTC day of the observation):
//   item,t,price,listings      (t = observedAt in ms)
// It also backfills aion2.market's 7-day history for up to BACKFILL_PER_RUN items per run,
// so the archive covers every item within about a day, without hammering the source.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const SERVERS = [12301]; // Israphel (EU). Add more server ids here.
const UA = "aion2-craft-archive (hourly; https://github.com/Xoudusz/aion2-craft-releases)";
const BACKFILL_PER_RUN = 40;
const BACKFILL_GAP_MS = 3000;
const BACKFILL_AGAIN_MS = 7 * 86_400_000;
const HEADER = "item,t,price,listings\n";

const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = async url => {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
};

/** Appends rows [item, t, price, listings] that aren't in the day files yet. Returns rows added. */
function addRows(dir, rows) {
  const byDay = new Map();
  for (const r of rows) {
    if (!(r[2] > 0) || !Number.isFinite(r[1])) continue;
    const day = new Date(r[1]).toISOString().slice(0, 10);
    if (!byDay.has(day)) byDay.set(day, []);
    byDay.get(day).push(r);
  }
  let added = 0;
  for (const [day, list] of byDay) {
    const file = `${dir}/${day}.csv`;
    const text = existsSync(file) ? readFileSync(file, "utf8") : HEADER;
    const seen = new Set(text.split("\n").slice(1).map(l => l.split(",", 2).join(",")));
    const fresh = list.filter(r => !seen.has(`${r[0]},${r[1]}`)).sort((a, b) => a[1] - b[1] || a[0] - b[0]);
    if (!fresh.length) continue;
    writeFileSync(file, text + fresh.map(r => r.join(",")).join("\n") + "\n");
    added += fresh.length;
  }
  return added;
}

for (const server of SERVERS) {
  const dir = `history/${server}`;
  mkdirSync(dir, { recursive: true });

  // Quotes from the shared price hub (Cloudflare Worker, one aion2.market fetch for all users);
  // aion2.market directly if the hub is down.
  const quotes = await get(`https://aion2-craft-prices.neweth.workers.dev/quotes?server=${server}`)
    .catch(() => get(`https://aion2.market/market-api.php?action=quotes&server=${server}`));
  const rows = quotes.rows.map(r => [r.itemId, Date.parse(r.observedAt), r.lowestPrice, r.listingCount ?? ""]);
  console.log(`server ${server}: ${addRows(dir, rows)} new quote rows`);

  // Backfill: items never (or not recently) backfilled, a few per run.
  const stateFile = `${dir}/backfill.json`;
  const state = existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, "utf8")) : {};
  const now = Date.now();
  // Materials and consumables (ids 6xxxxxxxx) first: they drive the app's "cheap now" signals.
  const todo = quotes.rows.map(r => r.itemId)
    .filter(id => !(now - (state[id] ?? 0) < BACKFILL_AGAIN_MS))
    .sort((a, b) => (b >= 6e8) - (a >= 6e8) || a - b)
    .slice(0, BACKFILL_PER_RUN);
  for (const id of todo) {
    await sleep(BACKFILL_GAP_MS);
    try {
      const h = await get(`https://aion2.market/market-api.php?action=history&item=${id}&range=7d&server=${server}`);
      const pts = (h.points ?? []).map(p => [id, Date.parse(p.observedAt), p.lowestPrice, p.listingCount ?? ""]);
      const n = addRows(dir, pts);
      state[id] = now;
      console.log(`  backfill ${id}: ${pts.length} points, ${n} new`);
    } catch (e) {
      console.log(`  backfill ${id} failed: ${e.message}`);
    }
  }
  writeFileSync(stateFile, JSON.stringify(state));
}
