# AjarnKwan Self-Learning Centre — Redesign v8

## ✅ การเปลี่ยนแปลงรอบนี้ (v8)

### Width Standardization — ใช้ 2-tier System

อิงตามหลัก **web typography**: line length ที่ดีคือ 45-75 chars/บรรทัด

| Tier | Width | จำนวนหน้า | ใช้กับ |
|---|---|---|---|
| **Wide** | **1100px** | 11 หน้า | Hub/landing/grid pages |
| **Reading** | **760px** | 43 หน้า | Chapter/lesson pages |
| **Print** | (ลบขอบ) | 3 หน้า | Cheatsheet, booklets |

### หน้า Wide (1100px) — 11 หน้า:
- `/index.html` — หน้าแรก
- `/economics/index.html` — Economics hub
- `/econometrics/index.html` — Econometrics hub
- `/econ-math-readiness/index.html` — Math Readiness hub
- `/microeconomics/index.html` — Micro hub (รวม chapter cards)
- `/vibe-coding/index.html`, `/vibe-coding/general/`, `/vibe-coding/econ/`
- `/vocab/index.html`, `/vocab/macro.html`, `/vocab/micro.html`

### หน้า Reading (760px) — 43 หน้า:
- `/microeconomics/chapter*.html` ทั้งหมด (เพื่อ optimal reading)

### หน้า Print (no topbar/footer) — 3 หน้า:
- `/econometrics/cheatsheet.html`
- `/vocab/booklet-macro.html`
- `/vocab/booklet-micro.html`

## ✅ ทำให้ครบทั้งขอบและเนื้อหา

ตอนนี้ทุกหน้า:
1. **Topbar/Footer width** = ใช้ `var(--ak-content-width)` ตามที่กำหนด
2. **Content container ภายใน** (`.container`, `.page`, `.topbar`, etc.) = บังคับใช้ `var(--ak-content-width)` เช่นกัน
3. ผ่าน CSS rule `body[style*="--ak-content-width"]` ใน theme.css

→ เนื้อหา + ขอบ aligned สมบูรณ์ทุกหน้า

## ทำไมเลือก 1100 / 760?

- **1100px** = Bootstrap container max-width มาตรฐาน · เหมาะกับ grid 3-4 columns
- **760px** = Optimal line length สำหรับการอ่านในไทย/Eng mix (~65 chars/บรรทัด) · ตรงกับที่อาจารย์ออกแบบ vibe-coding ไว้แล้ว

## วิธี Deploy

```bash
unzip ajarnkwan-redesign-v8.zip
cp -r site/* /path/to/ajarnkwan.github.io/
git add -A && git commit -m "Redesign v8 · standardized widths (1100/760)"
git push
```
