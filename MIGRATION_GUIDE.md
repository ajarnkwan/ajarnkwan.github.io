# AjarnKwan Self-Learning Centre — Redesign v16

## ✅ การเปลี่ยนแปลงรอบนี้ (v15 → v16)

### Freebies ที่หน้าแรก — ลิงก์ไฟล์จริงแล้ว

| Card | สถานะ | ลิงก์ |
|---|---|---|
| 1. Econometrics Cheat Sheet | ✓ จริง | `econometrics/cheatsheet.html` |
| 2. สมุดศัพท์ จุลภาค (A6 booklet) | ✓ จริง | `vocab/booklet-micro.html` |
| 3. สมุดศัพท์ มหภาค (A6 booklet) | ✓ จริง | `vocab/booklet-macro.html` |
| 4. Microeconomics Summary | 🔒 SOON | (เร็วๆ นี้, opacity 55%, click ไม่ได้) |

ทั้ง 3 cards แรก:
- คลิกเปิดในแท็บใหม่ (`target="_blank"`)
- มี `rel="noopener"` (security)
- Card ที่ 4 มี class `freebie-soon` → opacity ลด, pointer-events: none

### ใน Hub view ก็ลิงก์ไฟล์จริงด้วย
(แก้ไว้ตั้งแต่ v9 แล้ว — Cheatsheet, สมุดศัพท์ x2, ช่อง 4 ว่างไว้)

## ✅ Login fix ของ v13 ยังอยู่ครบ

ตรวจสอบใน v16:
- ✓ Split member/admin reads
- ✓ Try-catch แยก
- ✓ Safety net 8s timeout
- ✓ "Read member failed" error message

## วิธี Deploy

```bash
unzip ajarnkwan-redesign-v16.zip
cp -r site/* /path/to/ajarnkwan.github.io/
git add -A && git commit -m "v16 · Freebies link real files"
git push
```
