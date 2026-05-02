# AjarnKwan Self-Learning Centre — Redesign v9

## ✅ การเปลี่ยนแปลงรอบนี้ (v9)

### Member Hub (view-hub) Redesign
หน้าหลัง login เปลี่ยนจาก purple gradient → editorial style เดียวกับหน้าแรก

#### ใหม่ทั้งหมด:
- **Hero** — "สวัสดีค่ะ, [name]!" Bai Jamjuree ตัวใหญ่ + ID Card lanyard เอียง (เหมือน About หน้าแรก)
- **Top bar** — AJARN.KWAN logo ซ้าย + ปุ่มออกจากระบบขวา
- **Pathfinder** — กล่อง white minimal + 5 options
- **4 Course Tracks** — สี c1-c4 เหมือน Courses หน้าแรก:
  - Track 1 น้ำเงิน · Economics (3 courses)
  - Track 2 เบจ · Econ English (2 courses)
  - Track 3 เขียว · Personal Finance (เร็วๆ นี้)
  - Track 4 ทอง · AI Literacy / Vibe Coding (2 versions)
- **Freebies** — 4 cards เรียงเป็น grid
- **Contact** — 3 cards แนวนอน Line/TikTok/Facebook
- **Footer** — AJARN.KWAN big mark + credit

### Firebase Integration คงเดิม
- `id="hub-greeting"` — Firebase update ชื่อทักทาย
- `id="hub-member-name"` — สมาชิก ID card name
- `id="hub-member-num"` — member number
- `id="hub-avatar"` — รูปโปรไฟล์ (Google login)
- `id="hub-preview-banner"` — admin preview mode
- `onclick="doLogout()"` × 2 (topbar + redundant)
- `onclick="backToAdmin()"` — admin preview button
- ลิงก์คอร์สทั้งหมดยังชี้ไป folder จริง

## โครงสร้างไฟล์ครบ (สรุป)

ในที่นี้รวมทุกการเปลี่ยนแปลงตั้งแต่ v1-v9:

```
site/
├── index.html                     ← landing v4 + member hub v2
├── profile.jpg                    ← รูปอาจารย์ optimize
├── assets/theme.css               ← shared design system
├── economics/                     ← migrated (1100px wide)
├── econometrics/                  ← migrated (1100px wide)
├── econ-math-readiness/           ← migrated (1100px wide)
├── microeconomics/                ← migrated (44 ไฟล์ · 760px reading)
├── vibe-coding/                   ← migrated (3 ไฟล์ · 1100px wide)
├── vocab/                         ← migrated (3 หน้า + 2 booklets ปรินท์)
└── econometrics/cheatsheet.html   ← printable (no topbar/footer)
```

## วิธี Deploy

```bash
unzip ajarnkwan-redesign-v9.zip
cp -r site/* /path/to/ajarnkwan.github.io/
git add -A && git commit -m "Redesign v9 · Member Hub editorial style"
git push
```

## Testing checklist หลัง deploy

- [ ] เปิด `/` → หน้าแรก design ใหม่
- [ ] กด "สมัครฟรี" → ไป view-signup
- [ ] Login สำเร็จ → ไป view-hub design ใหม่
  - [ ] ทักทายชื่อถูก
  - [ ] Member ID card แสดงชื่อ + เลขถูก
  - [ ] รูป Google profile (ถ้ามี) แสดงในกล่อง avatar
  - [ ] กดปุ่ม "ออกจากระบบ" บน topbar → กลับ landing
- [ ] เปิด course pages — ขอบ + content aligned (760 หรือ 1100)
- [ ] เปิด /econometrics/cheatsheet.html → printable, no topbar/footer
