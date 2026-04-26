# Testing Checklist · Ajarn.Kwan

ใช้ก่อน deploy หรือ commit ใหญ่ ทุกครั้ง

---

## 🔓 Public access (homepage)

- [ ] เปิดหน้าแรก `/` แบบยังไม่ login → ดู landing page ปกติ ไม่มี gate
- [ ] กด "ลองเรียน 60 วินาที" → demand-curve demo ทำงานได้ + ตอบ quiz
- [ ] กด track card "เข้าใจเศรษฐกิจ" → เด้งไป signup (เพราะยังไม่ login)
- [ ] กด FAQ "ฟรีจริงไหม" → expand ได้ ข้อความตรงนโยบาย

## 🔐 Auth flows

### Signup flow
- [ ] กด "สมัครฟรี" บน top nav → เปิด signup view
- [ ] กรอก email + password ครบ → กด "สมัคร" → เข้า register flow
- [ ] **Step 1** (ชื่อ): พิมพ์ชื่อ → ปุ่ม "ถัดไป" enable
- [ ] **Step 2** (การศึกษา): เลือก 1 ตัว → ถัดไป enable
- [ ] **Step 3** (อาชีพ): 
  - [ ] เลือกตัวเลือกปกติ → ถัดไป enable
  - [ ] เลือก "อื่น ๆ" แต่ไม่กรอก → ถัดไป **disable** (ต้องกรอกก่อน)
  - [ ] เลือก "อื่น ๆ" + กรอก → ถัดไป enable
- [ ] **Step 4** (ความสนใจ):
  - [ ] ไม่เลือกอะไร → ถัดไป **disable**
  - [ ] เลือก ≥1 ข้อ → ถัดไป enable
- [ ] **Step 5** (รู้จักคอมมูนิตี้): เลือกได้/ข้ามได้ → ส่ง register
- [ ] หลัง register สำเร็จ → เด้งไป Member Hub
- [ ] หมายเลขสมาชิก format `YYMM###` แสดงถูกต้อง

### Login flow
- [ ] กด "เข้าสู่ระบบ" บน top nav → เปิด login view
- [ ] กรอก email + password → เข้าสู่ Hub
- [ ] login ด้วย Google → ถ้าไม่มี profile → เข้า register; ถ้ามี → เข้า Hub
- [ ] login ผิดรหัส → error message ภาษาไทย ไม่ใช่ "auth/wrong-password"
- [ ] error message **ไม่หายเอง** จนกว่าจะแก้ input

### Logout
- [ ] ใน Hub กด "ออกจากระบบ" → กลับ landing
- [ ] ใน Admin กด "ออกจากระบบ" → กลับ landing

## 🛡 Member-guard (course pages)

### Hard mode (ทุกหน้ายกเว้น econometrics)
- [ ] เปิด `/microeconomics/` ตรงโดยยังไม่ login → ขึ้น overlay
- [ ] เปิด `/economics/` → ขึ้น overlay
- [ ] เปิด `/vocab/micro.html` → ขึ้น overlay
- [ ] กด "สมัครสมาชิกฟรี" บน overlay → เด้งไป `index.html#signup`
- [ ] หลังสมัครเสร็จ → กลับมาหน้าเดิม (ไม่ใช่แค่ Hub)
- [ ] login ด้วยบัญชีเดิม จาก overlay → กลับมาหน้าเดิม (ไม่ใช่แค่ Hub)
- [ ] หลัง login + verify member → refresh course page → ไม่ขึ้น overlay
- [ ] logout → refresh course page → ขึ้น overlay อีกครั้ง

### Soft mode (econometrics เท่านั้น)
- [ ] เปิด `/econometrics/` ตรงโดยยังไม่ login → ดูบทที่ 1-2 ได้ (preview)
- [ ] บทที่ 3-6 ขึ้นว่า "locked" + signup-gate
- [ ] login + verify member → refresh → บทที่ 3-6 unlock อัตโนมัติ
- [ ] memberCheck event ทำงาน (ดู console)

## 📊 Admin panel

- [ ] login ด้วยบัญชี admin → เห็น Admin Dashboard
- [ ] Stat cards: TOTAL / THIS MONTH / TODAY แสดงตัวเลขถูก
- [ ] ตารางสมาชิก: คอลัมน์ครบ #, หมายเลข, ชื่อ, การศึกษา, อาชีพ, ความสนใจ, ที่มา, วันสมัคร
- [ ] กด "หน้าแรก" / "Member Hub" / "Register Flow" → preview ทำงาน
- [ ] กด Refresh → reload data
- [ ] กด "โหลดเพิ่ม" → pagination ทำงาน

## 💾 Progress persistence

- [ ] Math & Stats: tick module → refresh → ยังถูก tick อยู่ (localStorage)
- [ ] Vocab Micro: ทำเครื่องหมายคำ → ไม่กระทบ Vocab Macro
- [ ] Vocab Macro: ทำเครื่องหมายคำ → ไม่กระทบ Vocab Micro

## 🔗 Cross-page navigation

- [ ] ทุก track landing (economics, vibe-coding, vocab) มีปุ่ม "← หน้าหลัก"
- [ ] ทุก course landing มีกล่อง "เรียนต่ออะไรดี?"
- [ ] Footer ทุกหน้ามี Line OA, TikTok, Facebook
- [ ] Footer ไม่มีปุ่ม "คลังศัพท์" (เอาออกแล้ว)

## 🌐 Browser compatibility

- [ ] Chrome desktop
- [ ] Safari iOS
- [ ] Firefox
- [ ] Mobile responsive (ทดสอบที่ 375px width)

## 📝 Content accuracy

- [ ] ทุก track card บนหน้าแรก นับจำนวน module ตรงกับ landing/course
- [ ] Vibe Coding ทุกที่บอกว่า "กำลังเตรียมเนื้อหา" (ไม่อ้าง Certificate)
- [ ] Microeconomics: บทที่ 1-7 ใช้งานได้, บทที่ 8 placeholder
- [ ] FAQ ตรงกับนโยบาย (ฟรี + ต้องสมัครสำหรับเนื้อหาเต็ม)

---

## ⚠️ Known limitations (post-launch backlog)

- vocab/ ใช้ Babel-in-browser (ควร build ใน production)
- Progress เก็บใน localStorage (ยังไม่ sync เข้า Firestore per user)
- Firebase Security Rules ต้องตรวจ — สมาชิกอ่านข้อมูลคนอื่นไม่ได้
- Code monolithic ใน index.html — refactor แยก css/js เป็นภายหลัง
- Babel-in-browser ใน vocab — เปลี่ยนเป็น vanilla JS หรือ pre-build

---

© 2026 Ajarn.Kwan
