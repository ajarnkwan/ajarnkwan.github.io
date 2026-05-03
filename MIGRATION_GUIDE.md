# AjarnKwan Self-Learning Centre — Redesign v19

## ✨ Admin Dashboard Redesign (v18 → v19)

### Before → After

**Before (เก่า):** Purple gradient hero · stat cards ม่วงทั้งหมด · ปุ่มแบบเก่า · table แบบ default
**After (ใหม่):** Editorial cream · ตัวเลขใหญ่ Archivo Black · pill buttons · table มีลำดับชัด

### โครงสร้างหน้าใหม่
```
TOPBAR · AJARN.KWAN · ออกจากระบบ
HERO   "ADMIN PANEL · ผู้ดูแลระบบ"
        Dashboard (ตัวใหญ่)
        เข้าระบบในฐานะ admin@email
STATS  [Total: 11] [Month: 1] [Today: 0]
ACTIONS [Preview as: หน้าแรก / Hub / Register]  [↻ Refresh]
─── MEMBERS · รายชื่อสมาชิก ───
TABLE  # | หมายเลข | ชื่อ + การศึกษา | อาชีพ | ความสนใจ | ที่มา | วันสมัคร
       (hover row, monospace numbers, accent on This Month)
[⌄ โหลดเพิ่มเติม]
```

### เปลี่ยนแปลงสำคัญ

1. **Editorial header** เหมือน landing — mono label "ADMIN PANEL" + display title
2. **Stats เป็นตัวเลขใหญ่** (Archivo Black 56-80px) บน white card
   - This Month เป็น accent gold เพื่อให้สังเกต
   - มี subtitle อธิบายแต่ละตัวเลข
3. **Actions pill buttons** — ลบไอคอน emoji, เพิ่ม pill round
4. **Members table** — รวมชื่อ+การศึกษาเป็น cell เดียว (มี subtitle)
   - Header สีครีม + monospace label
   - Row hover effect
   - Date เป็น monospace align ขวา
   - ลบ column "การศึกษา" แยก (ไปอยู่ใต้ชื่อ)
5. **Logout button** ย้ายไป topbar (เหมือน Member Hub)
6. **Sticky topbar** มี shadow ตอน scroll

### Firebase IDs preserved
ทุก ID ที่ Firebase ใช้ยังครบ:
- ✓ admin-email, admin-stat-total, admin-stat-month, admin-stat-today
- ✓ admin-preview-hub-btn, admin-preview-register-btn
- ✓ admin-err, admin-status, admin-tbody, admin-load-more

### Functions preserved
- ✓ previewLanding(), previewMemberHub(), previewRegisterFlow()
- ✓ loadMembers(), loadMoreMembers()
- ✓ doLogout()

## ระบบที่ยังทำงานครบจาก version ก่อนหน้า

- ✓ **Login fix v13** — split member/admin reads + 8s timeout
- ✓ **Member Hub v17** — Stats strip + Pathfinder cards + Daily section
- ✓ **Daily rotation v18** — 52 words + 30 quotes auto-rotate

## วิธี Deploy

```bash
unzip ajarnkwan-redesign-v19.zip
cp -r site/* /path/to/ajarnkwan.github.io/
git add -A && git commit -m "v19 · Admin Dashboard editorial redesign"
git push
```

## ทดสอบหลัง deploy

- [ ] Login ด้วย admin email → เห็น Dashboard ใหม่
- [ ] Stats: 3 cards ตัวเลขใหญ่
- [ ] Preview buttons → ทำงาน (ไป hub/landing/register)
- [ ] Refresh → reload members
- [ ] Members table แสดง row hover + date monospace
- [ ] Logout → กลับ landing
