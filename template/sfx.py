"""Efek suara sintesis (bebas hak cipta). Daftar momen dibaca dari animatic (window.SFX).
python3 sfx.py [narasi.mp3] -> sfx.wav (+ mix.wav bila ada narasi)"""
import sys, subprocess, pathlib
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt
from playwright.sync_api import sync_playwright

here = pathlib.Path(__file__).parent.resolve()
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page()
    pg.goto((here / "animatic.html").as_uri())
    EVENTS = pg.evaluate("window.SFX"); DUR = pg.evaluate("window.DURATION"); b.close()

SR = 48000
rng = np.random.default_rng(7)
bus = np.zeros(int(SR * DUR))
def env(n, a=0.005, r=None):
    t = np.arange(n) / SR; e = np.minimum(1, t / max(a, 1e-4))
    if r: e *= np.exp(-t / r)
    return e
def bp(x, lo, hi): return sosfilt(butter(2, [lo, hi], btype="band", fs=SR, output="sos"), x)
def lp(x, f): return sosfilt(butter(2, f, btype="low", fs=SR, output="sos"), x)
def whoosh(d=0.55, lo=300, hi=3000):
    n = int(SR * d); x = rng.standard_normal(n); out = np.zeros(n); seg = 12
    for k in range(seg):
        a, c = k * n // seg, (k + 1) * n // seg
        f = lo + (hi - lo) * np.sin(np.pi * (k + .5) / seg)
        out[a:c] = bp(x[a:c], max(80, f * .6), min(SR / 2 - 100, f * 1.6))
    return out * np.sin(np.pi * np.linspace(0, 1, n)) ** 2 * 0.9
def impact(d=0.45, f0=70):
    n = int(SR * d); t = np.arange(n) / SR
    body = np.sin(2 * np.pi * np.cumsum(f0 * (1 + 1.5 * np.exp(-t / .03))) / SR) * np.exp(-t / .12)
    return (body + lp(rng.standard_normal(n), 2500) * np.exp(-t / .015) * .8) * .9
def stamp():
    n = int(SR * .5); t = np.arange(n) / SR
    return impact(.5, 55) + bp(rng.standard_normal(n), 400, 2500) * np.exp(-t / .04) * 1.2
def pop(f0=520, d=0.09):
    n = int(SR * d); t = np.arange(n) / SR
    return np.sin(2 * np.pi * np.cumsum(f0 * (1 + 1.2 * t / d)) / SR) * env(n, .002, .03) * .7
def click(d=0.03, lo=1500, hi=6000):
    n = int(SR * d); t = np.arange(n) / SR
    return bp(rng.standard_normal(n), lo, hi) * np.exp(-t / .006) * 1.4
def ding(fs=(988, 1480), d=0.7, g=.45):
    n = int(SR * d); t = np.arange(n) / SR
    return sum(np.sin(2 * np.pi * f * t) * (1 / (i + 1)) for i, f in enumerate(fs)) * env(n, .003, .22) * g
def swish(d=0.35):
    n = int(SR * d); return bp(rng.standard_normal(n), 2500, 7000) * np.sin(np.pi * np.linspace(0, 1, n)) ** 2 * .45
def boom(d=1.0):
    n = int(SR * d); t = np.arange(n) / SR; return np.sin(2 * np.pi * 45 * t) * env(n, .02, .35) * .9
def scratch(d=.4):
    n = int(SR * d); t = np.arange(n) / SR
    return bp(rng.standard_normal(n), 1200, 5000) * (0.6 + 0.4 * np.sin(2 * np.pi * 22 * t)) * env(n, .01) * np.exp(-t / .3) * .5
def rise(d=.7):
    n = int(SR * d); t = np.arange(n) / SR; f = 200 + 700 * (t / d) ** 1.5
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) * .35
KIND = {"whoosh": lambda: whoosh(.72, 300, 3000), "blurwhoosh": lambda: whoosh(1.0, 150, 1200), "zoom": lambda: whoosh(.8, 200, 2500),
        "boom": lambda: whoosh(.72, 200, 2000) + np.pad(boom(), (0, 0))[:int(SR*.72)], "slices": lambda: sum(np.pad(whoosh(.25, 800, 5000), (int(k*.12*SR), int((3-k)*.12*SR))) for k in range(4)) * .6,
        "impact": impact, "stamp": stamp, "pop": lambda: pop(rng.integers(420, 640)), "tick": lambda: click(.025, 1500, 5000),
        "ding": ding, "chime": lambda: ding((784, 1175, 1568), 1.4, .5), "scratch": scratch, "rise": rise, "swish": swish}
def put(t, s, g=1.0):
    i = int(t * SR); j = min(len(bus), i + len(s))
    if 0 <= i < len(bus): bus[i:j] += s[: j - i] * g
for t, k, g in EVENTS: put(t, KIND[k](), g)
bus = bus / (np.max(np.abs(bus)) + 1e-9) * 10 ** (-8 / 20)
wavfile.write(str(here / "sfx.wav"), SR, (bus * 32767).astype(np.int16))
if len(sys.argv) > 1:
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", sys.argv[1], "-i", str(here / "sfx.wav"), "-filter_complex",
                    f"[0:a]aresample=48000,loudnorm=I=-16:TP=-1.5:LRA=11,apad[v];[1:a]volume=1.0[s];[v][s]amix=inputs=2:duration=longest:normalize=0,alimiter=limit=0.95,atrim=0:{DUR}[m]",
                    "-map", "[m]", "-ac", "2", str(here / "mix.wav")], check=True)
    print("ok mix.wav")
else:
    print("ok sfx.wav", len(EVENTS), "efek")
