#!/usr/bin/env python3
"""gen_redirects.py — 旧 AllusionistLLMWiki2 サイトを AllusionistWiki2 への
meta refresh リダイレクト専用サイトへ転換する（外部被リンク保全）。

content/ 直下の全 .md を、同一スラッグ構造のままリダイレクトスタブへ置換する。
"""
import re
from pathlib import Path

CONTENT = Path("content")
BASE = "https://allusionistwiki.github.io/AllusionistWiki2/"

def slugify(s: str) -> str:
    s = s.replace("&", "and")
    s = re.sub(r"\s+", "-", s)
    return s

def main():
    n = 0
    for p in sorted(CONTENT.rglob("*.md")):
        rel = str(p.relative_to(CONTENT)).replace("\\", "/")[:-3]
        if rel.endswith("/index"):
            target = BASE + slugify(rel[:-6]) + "/"
        elif rel == "index":
            target = BASE
        else:
            target = BASE + slugify(rel)
        p.write_text(
            "---\ntitle: 移設済み（アリュージョニスト Wiki 2 へ）\n---\n\n"
            f'<meta http-equiv="refresh" content="0; url={target}">\n\n'
            f"このページは **アリュージョニスト Wiki 2** へ移設しました。"
            f"移動しない場合は [こちら]({target}) を開いてください。\n",
            encoding="utf-8",
        )
        n += 1
    print(f"redirect stubs: {n}")

if __name__ == "__main__":
    main()
