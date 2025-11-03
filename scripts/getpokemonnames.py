import json, time, sys, pathlib, requests

OUT = "pokemon_name_mapping_full.json"
MAX_ID = 1025  # National Dex through Gen 9 (adjust if you want forms beyond this)

# Helper to extract a localized name by language code from a PokeAPI "names" array
def name_for(names, lang_code):
    for n in names:
        if n["language"]["name"] == lang_code:
            return n["name"]
    return None

# Build mapping
result = {}
session = requests.Session()
session.headers["User-Agent"] = "pokemon-zhcn-mapper/1.0"

for dex in range(1, MAX_ID + 1):
    # PokeAPI: species has official localized names (ja/ja-Hrkt, en, zh-Hans, etc.)
    url = f"https://pokeapi.co/api/v2/pokemon-species/{dex}/"
    r = session.get(url, timeout=30)
    if r.status_code != 200:
        print(f"[warn] #{dex} not found (HTTP {r.status_code}), skipping...", file=sys.stderr)
        continue
    sp = r.json()

    names = sp.get("names", [])
    en = name_for(names, "en")
    ja = name_for(names, "ja-Hrkt") or name_for(names, "ja")  # ja-Hrkt is the katakana set used by TPC
    zh_cn = name_for(names, "zh-Hans")  # Simplified Chinese (official)

    # Some species have hyphenated/variant names. The official localized name array is authoritative.
    if not (en and ja and zh_cn):
        print(f"[warn] missing lang for #{dex}: en={bool(en)} ja={bool(ja)} zh-cn={bool(zh_cn)}", file=sys.stderr)

    result[str(dex)] = {"ja": ja, "en": en, "zh-cn": zh_cn}

    # Be nice to the API
    time.sleep(0.05)

# Save
pathlib.Path(OUT).write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Done. Wrote {OUT} with {len(result)} entries.")
