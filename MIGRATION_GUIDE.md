# AjarnKwan Self-Learning Centre — Redesign v11 (Hub render fix)

## ✅ Hot fix รอบที่ 2 (v10 → v11)

### 1. สี 4 หลักสูตรอ่านไม่ออก — แก้แล้ว
**สาเหตุ:** Selector `#view-hub :root { --c1: #4759AA; ... }` เป็น **invalid** เพราะ `:root` คือ `<html>` (ไม่ใช่ child ของ #view-hub) → CSS variables ไม่ active → tracks ไม่มี bg → text ขาวบนพื้นโปร่ง = อ่านไม่ออก

**แก้:** เปลี่ยน `#view-hub :root` → `#view-hub` → variables active

ตอนนี้ 4 tracks มีสีถูกต้อง:
- Track 1 Economics → **#4759AA** (น้ำเงินเข้ม) text ขาว ✓
- Track 2 Econ English → **#D9CAA8** (sand) text ดำ ✓
- Track 3 Personal Finance → **#5E8A66** (sage) text ขาว ✓
- Track 4 AI Literacy → **#E8C75A** (gold) text ดำ ✓

### 2. การ์ดเลขสมาชิกตัวเล็ก — แก้แล้ว
ขยายทั้ง card + ตัวอักษร:
- Card width: 280px → **340px**
- Avatar: 56px → **68px**
- Emoji: 26px → **32px**
- ชื่อสมาชิก: 16px → **19px** ✓
- Member ID label: 11px → **13px** ✓
- Member number: 11px → **13.5px** ✓

## วิธี Deploy

```bash
unzip ajarnkwan-redesign-v11.zip
cp -r site/* /path/to/ajarnkwan.github.io/
git add -A && git commit -m "v11 · Fix CSS scope + ID card size"
git push
```
