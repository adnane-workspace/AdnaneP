from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "images"
WHITE = (250, 248, 245)
CONVERT_TO_JPG = {"uni.png", "project1.png", "project3.png", "sign.png"}
SKIP = {"logo.png", "logo-dark.png", "logo-light.png"}


def flatten(im):
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        rgba = im.convert("RGBA")
        bg = Image.new("RGB", rgba.size, WHITE)
        bg.paste(rgba, mask=rgba.split()[-1])
        return bg
    return im.convert("RGB")


def max_side(name):
    if name.startswith(("adnane", "avatar")):
        return 800
    if name.startswith(("project", "uni", "sign", "stokly", "projet")):
        return 1400
    return 1000


def main():
    unused = ROOT / "projet2.jpg"
    if unused.exists():
        print(f"DELETE {unused.name} {unused.stat().st_size / 1024:.1f} KB")
        unused.unlink()

    results = []
    for f in sorted(ROOT.iterdir()):
        if f.suffix.lower() not in {".png", ".jpg", ".jpeg"} or f.name in SKIP:
            continue

        rgb = flatten(Image.open(f))
        cap = max_side(f.name)
        w, h = rgb.size
        if max(w, h) > cap:
            scale = cap / max(w, h)
            rgb = rgb.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)

        before = f.stat().st_size
        if f.name in CONVERT_TO_JPG:
            dest = f.with_suffix(".jpg")
            rgb.save(dest, "JPEG", quality=80, optimize=True, progressive=True)
            if dest.resolve() != f.resolve():
                f.unlink()
            after = dest.stat().st_size
            results.append((f.name, dest.name, before, after, rgb.size))
        else:
            tmp = f.with_name(f.stem + ".tmp.jpg")
            rgb.save(tmp, "JPEG", quality=80, optimize=True, progressive=True)
            tmp.replace(f)
            after = f.stat().st_size
            results.append((f.name, f.name, before, after, rgb.size))

    total_b = total_a = 0
    print(f"{'from':20} {'to':20} {'before':>8} {'after':>8} {'saved':>8} size")
    for src, dest, before, after, size in results:
        total_b += before
        total_a += after
        print(
            f"{src:20} {dest:20} {before / 1024:7.1f}K {after / 1024:7.1f}K "
            f"{(before - after) / 1024:7.1f}K {size[0]}x{size[1]}"
        )
    print(
        f"TOTAL before {total_b / 1024 / 1024:.2f} MB  "
        f"after {total_a / 1024 / 1024:.2f} MB  "
        f"saved {(total_b - total_a) / 1024 / 1024:.2f} MB"
    )


if __name__ == "__main__":
    main()
