# AjarnKwan Self-Learning Centre — Redesign v21

## 🔧 Admin Pill Behavior Fix (v20 → v21)

### ปัญหาที่อาจารย์ถาม
Admin login → ออกจาก Dashboard → ไปดู course pages → topbar เห็น pill แต่...
- Pill บอกชื่อ admin (เหมือน member ปกติ) → ดูแล้วเหมือน member
- คลิก pill → ไปที่ `#hub` (Member Hub preview) → admin งง — ทำไมไม่กลับ Dashboard?

### แก้ใน v21

**Pill behavior แตกต่างตาม role:**

| User type | Avatar | Label | Click → ไปที่ |
|---|---|---|---|
| **Member** (regular) | อักษรแรกของชื่อ (สีทอง) | ชื่อ user | `#hub` → Member Hub |
| **Admin** | "A" (สีดำ) | "Admin · Dashboard" | `#admin` → Admin Dashboard |

ใช้ฟิลด์ `m.isAdmin` ที่บันทึกไว้ใน localStorage หลัง login

### โค้ด pill script ใหม่
```js
if (m.isAdmin) {
  pill.href = '../#admin';
  pill.classList.add('is-admin');
  avatarEl.textContent = 'A';
  labelEl.textContent = 'Admin · Dashboard';
} else {
  pill.href = '../#hub';
  avatarEl.textContent = (m.name[0] || '?').toUpperCase();
  labelEl.textContent = m.name;
}
```

### ปรับใน 53 course pages
- `economics/index.html`
- `econometrics/index.html` + cheatsheet
- `econ-math-readiness/index.html`
- `microeconomics/index.html` + 43 chapters
- `vibe-coding/index.html` + general/ + econ/
- `vocab/index.html` + macro + micro

### CSS class `.is-admin` (อยู่แล้วใน theme.css จาก v20)
```css
.ak-member-pill.is-admin .ak-pill-avatar {
  background: var(--ak-ink);  /* ดำแทนทอง */
}
```

## ระบบที่ยังทำงานครบ (รวม v13–v20)

- ✅ Login fix v13 (split member/admin reads)
- ✅ Member Hub v17 (Stats + Pathfinder + Daily)
- ✅ Daily rotation v18 (52 words + 30 quotes auto)
- ✅ Admin Dashboard v19 (editorial style)
- ✅ Navigation continuity v20 (localStorage + pill + smart hash)

## วิธี Deploy

```bash
unzip ajarnkwan-redesign-v21.zip
cp -r site/* /path/to/ajarnkwan.github.io/
git add -A && git commit -m "v21 · Admin pill behavior · isAdmin → #admin Dashboard"
git push
```

## Test scenarios

### Admin flow
1. Login admin → Admin Dashboard
2. คลิก preview "หน้าแรก" → landing → topbar เห็น pill
3. ดู pill: avatar **"A"** สีดำ + label **"Admin · Dashboard"**
4. คลิก pill → กลับ Admin Dashboard ✓
5. ลองคลิก track → /microeconomics/ → topbar เห็น pill เดิม "A · Admin · Dashboard"
6. คลิก pill อีกครั้ง → กลับ Admin Dashboard

### Member flow (ไม่กระทบ)
1. Login member → Member Hub
2. คลิก track → /microeconomics/ → topbar pill: avatar ตัวแรกของชื่อ + ชื่อจริง
3. คลิก pill → กลับ Member Hub ✓

### Mixed flow
- Admin user สามารถ preview Member Hub ผ่าน pill ของหน้า Hub (ปุ่ม "← กลับ Admin")
- ปุ่ม preview ใน Admin Dashboard ทำงานปกติ
