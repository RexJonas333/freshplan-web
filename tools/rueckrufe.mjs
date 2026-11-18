// Holt aktuelle Lebensmittelwarnungen (lebensmittelwarnung.de, Schnittstelle von bund.dev) und schreibt rueckrufe.json.
// Läuft per GitHub Actions; die App liest die Datei über GitHub Pages.
import { writeFileSync, readFileSync, existsSync } from "node:fs";
const URL_API = "https://megov.bayern.de/verbraucherschutz/baystmuv-verbraucherinfo/rest/api/warnings/merged";
const AUTH = "baystmuv-vi-1.0 os=ios, key=9d9e8972-ff15-4943-8fea-117b5a973c61"; // öffentlicher Schlüssel der offiziellen App
const since = Date.now() - 150 * 864e5;
const body = { food: { rows: 400, sort: "publishedDate desc", start: 0, fq: [`publishedDate > ${since}`] } };
const res = await fetch(URL_API, { method: "POST", headers: { Authorization: AUTH, "Content-Type": "application/json", accept: "application/json" }, body: JSON.stringify(body) });
if (!res.ok) { console.error("HTTP", res.status, await res.text()); process.exit(1); }
const raw = await res.json();
if (process.argv.includes("--raw")) { writeFileSync("rueckrufe-raw.json", JSON.stringify(raw, null, 1)); console.log("raw gespeichert"); }
console.log("Warnungen:", raw?.response?.numFound ?? raw?.numFound, Object.keys(raw || {}));
