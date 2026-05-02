# AjarnKwan Self-Learning Centre — Redesign v12 (Critical fix)

## 🚨 Critical Bug Fix — Login ไม่ทำงาน

### สาเหตุ
ตอน v10 ผมรันสคริปต์ลบ CSS เก่าโดยใช้ regex:
```python
re.sub(r'\.preview-banner[^{]*\{[^}]+\}', '', content)
```

regex นี้**ตั้งใจลบ CSS** `.preview-banner { ... }` แต่บังเอิญไป **กิน JavaScript code** ของ function `setPreviewBanner()` เพราะ:
- `.preview-banner` ก็ปรากฏใน JS: `wrap.querySelector('.preview-banner-text')`
- regex `[^{]*\{[^}]+\}` กิน text ตั้งแต่นั้นยาวไปจนเจอ `{...}` ตัวแรก
- ผลลัพธ์: function setPreviewBanner เหลือเป็น
  ```js
  const msg = wrap.querySelector(' else {
    ...
  ```
  
→ **JavaScript syntax error** → Firebase module ทั้งหมดไม่ load → `window.loginEmail`, `window.loginGoogle` ไม่ได้ register → **ปุ่มกดไม่ได้**

### แก้
Restore function `setPreviewBanner` จากต้นฉบับ ตอนนี้ทุก script syntax-valid:
- Script 1 (stub): ✓
- Script 2 (Firebase module): ✓
- Script 3 (interactive): ✓

## วิธี Deploy

```bash
unzip ajarnkwan-redesign-v12.zip
cp -r site/* /path/to/ajarnkwan.github.io/
git add -A && git commit -m "v12 · CRITICAL fix · restore setPreviewBanner function"
git push
```

ขอโทษอย่างจริงจังที่บั๊กนี้หลุดผ่านมาค่ะ — ผมไม่ได้ตรวจ JS syntax หลัง regex run
