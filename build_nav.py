"""Sync the nav and mobile-menu blocks across every HTML page from a single
source of truth in _partials/.

Run this whenever you change _partials/nav.html or _partials/mobile-menu.html:

    python build_nav.py

The script finds the first <nav class="nav" id="nav">...</nav> block and the
first <div class="mobile-menu" id="mobileMenu">...</div> block in each HTML
page and replaces them with the partial contents. Per-page state (like which
nav link is "active") is added at runtime by JS that reads data-nav-key
attributes — see active-nav.js.
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).parent

PAGES = [
    "about.html",
    "blog.html",
    "compassion-course.html",
    "compassion-course-english.html",
    "contact.html",
    "index.html",
    "register.html",
    "resources.html",
    "sangam.html",
]

# Match the entire <nav class="nav" id="nav">...</nav> block.
NAV_RE = re.compile(
    r'(?m)^[ \t]*<nav class="nav" id="nav">[\s\S]*?</nav>\s*$'
)
# Mobile-menu can't be matched with a non-greedy regex because the inner
# .mobile-explore-group <div> closes before the outer mobile-menu <div>.
# We use balanced-div counting instead — see find_mobile_menu_block().
MOBILE_OPEN_RE = re.compile(r'<div class="mobile-menu" id="mobileMenu">')
DIV_OPEN_RE = re.compile(r'<div\b[^>]*>', re.IGNORECASE)
DIV_CLOSE_RE = re.compile(r'</div\s*>', re.IGNORECASE)


def find_mobile_menu_block(src: str) -> tuple[int, int] | None:
    """Return (start, end) indices of the outer mobile-menu block, found via
    balanced div counting starting at the opening <div class="mobile-menu">.
    """
    m = MOBILE_OPEN_RE.search(src)
    if not m:
        return None
    depth = 1
    i = m.end()
    while i < len(src) and depth > 0:
        nxt_open = DIV_OPEN_RE.search(src, i)
        nxt_close = DIV_CLOSE_RE.search(src, i)
        if not nxt_close:
            return None
        if nxt_open and nxt_open.start() < nxt_close.start():
            depth += 1
            i = nxt_open.end()
        else:
            depth -= 1
            i = nxt_close.end()
    return (m.start(), i)

NAV_PARTIAL = (ROOT / "_partials" / "nav.html").read_text(encoding="utf-8").rstrip("\n")
MOBILE_PARTIAL = (ROOT / "_partials" / "mobile-menu.html").read_text(encoding="utf-8").rstrip("\n")

# Add four-space indent to every line of the partial so the result fits the
# existing indentation level of the body.
NAV_BLOCK = "\n".join(("    " + line) if line else line for line in NAV_PARTIAL.splitlines()).lstrip()
MOBILE_BLOCK = "\n".join(("    " + line) if line else line for line in MOBILE_PARTIAL.splitlines()).lstrip()


def sync(path: pathlib.Path) -> None:
    src = path.read_text(encoding="utf-8")
    original = src

    nav_count = len(NAV_RE.findall(src))
    if nav_count != 1:
        print(f"  ! {path.name}: found {nav_count} <nav id='nav'> blocks (expected 1)")
    if nav_count == 1:
        src = NAV_RE.sub(lambda _m: "    " + NAV_BLOCK, src, count=1)

    mm = find_mobile_menu_block(src)
    if not mm:
        print(f"  ! {path.name}: could not locate mobile-menu block")
    else:
        start, end = mm
        src = src[:start] + "    " + MOBILE_BLOCK + src[end:]

    if src != original:
        path.write_text(src, encoding="utf-8")
        print(f"  [updated]    {path.name}")
    else:
        print(f"  [no change]  {path.name}")


def main() -> None:
    print(f"Syncing nav & mobile-menu from _partials/ to {len(PAGES)} pages...")
    for fname in PAGES:
        path = ROOT / fname
        if not path.exists():
            print(f"  ? skipped (missing) {fname}")
            continue
        sync(path)
    print("Done.")


if __name__ == "__main__":
    main()
