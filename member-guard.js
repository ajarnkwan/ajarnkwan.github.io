// ═══════════════════════════════════════════════════════════════
// Ajarn.Kwan · Member Guard
// ───────────────────────────────────────────────────────────────
// Loaded on every course page. Checks Firebase auth + profile.
//
// Modes (set via data-guard attribute on the <script> tag):
//   - "hard" (default): Block entire page with overlay if not member
//   - "soft":           Don't block; just dispatch memberCheck event
//                       (page can choose what to lock)
//
// Usage:
//   <script type="module" src="../member-guard.js"></script>          // hard
//   <script type="module" src="../member-guard.js" data-guard="soft"></script>
// ═══════════════════════════════════════════════════════════════

import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyAaETnNaEuZjc6qZxQCSajFs5eXDHIsnbg",
  authDomain: "ajarnkwan-hub.firebaseapp.com",
  projectId: "ajarnkwan-hub",
  storageBucket: "ajarnkwan-hub.firebasestorage.app",
  messagingSenderId: "467164442711",
  appId: "1:467164442711:web:ecd054c48b508f2f8bb312",
  measurementId: "G-7VTM5TZVY1"
};

// ───────────────────────────────────────────────────────────────
// Read guard mode from the <script> tag's data-guard attribute
// ───────────────────────────────────────────────────────────────
const guardScript = [...document.querySelectorAll('script[src*="member-guard.js"]')].pop();
const GUARD_MODE = guardScript?.dataset?.guard || 'hard';

// ───────────────────────────────────────────────────────────────
// Robust home URL — derived from this script's own location
// (Works even if site is hosted under a sub-path)
// ───────────────────────────────────────────────────────────────
const HOME_URL = new URL('index.html', import.meta.url).href;

// ═══════════════════════════════════════════════════════════════
// Inject the gate overlay (only used in hard mode)
// ═══════════════════════════════════════════════════════════════
function injectGateUI() {
  const css = `
    .ajk-mg-overlay {
      position: fixed; inset: 0;
      background: rgba(253, 248, 242, 0.96);
      backdrop-filter: blur(6px);
      z-index: 99999;
      display: none; align-items: center; justify-content: center;
      padding: 24px;
      font-family: 'Noto Sans Thai', system-ui, sans-serif;
    }
    .ajk-mg-overlay.show { display: flex; }
    .ajk-mg-card {
      background: #FFFFFF;
      border: 1px solid #E8DDD0;
      border-radius: 18px;
      padding: 32px 28px;
      max-width: 460px; width: 100%;
      text-align: center;
      box-shadow: 0 20px 50px rgba(107, 74, 138, 0.15);
      animation: ajk-mg-in .3s ease-out;
    }
    @keyframes ajk-mg-in {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .ajk-mg-emoji { font-size: 56px; margin-bottom: 12px; line-height: 1; }
    .ajk-mg-title {
      font-size: 22px; font-weight: 800; color: #2A1F1A;
      margin-bottom: 8px;
      font-family: 'Plus Jakarta Sans', 'Noto Sans Thai', sans-serif;
    }
    .ajk-mg-sub {
      font-size: 14px; color: #5C4A40; line-height: 1.7;
      margin-bottom: 24px;
    }
    .ajk-mg-sub strong { color: #6B4A8A; }
    .ajk-mg-btns { display: flex; flex-direction: column; gap: 10px; }
    .ajk-mg-btn {
      display: block; width: 100%;
      padding: 13px 20px; border-radius: 12px;
      font-size: 15px; font-weight: 700;
      text-decoration: none; transition: all .2s;
      border: none; cursor: pointer; font-family: inherit;
    }
    .ajk-mg-btn-primary {
      background: linear-gradient(135deg, #6B4A8A 0%, #553873 100%);
      color: #FFFFFF;
    }
    .ajk-mg-btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 18px rgba(107, 74, 138, 0.25);
    }
    .ajk-mg-btn-secondary {
      background: #F7EDDC; color: #5C4A40; border: 1px solid #E8DDD0;
    }
    .ajk-mg-btn-secondary:hover { background: #EFE6F5; color: #6B4A8A; }
    .ajk-mg-foot { margin-top: 18px; font-size: 12px; color: #8A7A70; }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.className = 'ajk-mg-overlay';
  overlay.id = 'ajk-mg-overlay';
  overlay.innerHTML = `
    <div class="ajk-mg-card">
      <div class="ajk-mg-emoji">👋</div>
      <div class="ajk-mg-title">สวัสดีค่ะ!</div>
      <div class="ajk-mg-sub">
        เนื้อหานี้สำหรับ<strong>สมาชิกของคอมมูนิตี้</strong>ค่ะ<br>
        สมัครฟรี ใช้เวลาแค่ 30 วินาที<br>
        เพื่อบันทึก progress · เข้าเนื้อหาเต็ม · อยู่ในคอมมูนิตี้
      </div>
      <div class="ajk-mg-btns">
        <a href="${HOME_URL}#signup" class="ajk-mg-btn ajk-mg-btn-primary" id="ajk-mg-go-signup">สมัครสมาชิกฟรี →</a>
        <a href="${HOME_URL}#login" class="ajk-mg-btn ajk-mg-btn-secondary" id="ajk-mg-go-login">มีบัญชีอยู่แล้ว · เข้าสู่ระบบ</a>
        <a href="${HOME_URL}" class="ajk-mg-btn ajk-mg-btn-secondary" id="ajk-mg-go-home" style="background:transparent;border:none;color:#8A7A70;font-weight:500;font-size:13px;">← กลับหน้าหลัก</a>
      </div>
      <div class="ajk-mg-foot">
        💜 สมัครฟรี · ไม่มีค่าใช้จ่าย · ไม่มีการเก็บข้อมูลที่ไม่จำเป็น
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Save current URL so we can return after signup/login
  ['ajk-mg-go-signup', 'ajk-mg-go-login'].forEach(id => {
    const a = document.getElementById(id);
    if (a) {
      a.addEventListener('click', () => {
        try {
          sessionStorage.setItem('_postRegisterUrl',
            location.pathname + location.search + location.hash);
        } catch (e) {}
      });
    }
  });
}

function showGate() {
  const ov = document.getElementById('ajk-mg-overlay');
  if (ov) ov.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function hideGate() {
  const ov = document.getElementById('ajk-mg-overlay');
  if (ov) ov.classList.remove('show');
  document.body.style.overflow = '';
}

// ═══════════════════════════════════════════════════════════════
// Auth check
// ═══════════════════════════════════════════════════════════════
let app;
if (getApps().length === 0) app = initializeApp(firebaseConfig);
else app = getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Inject UI only in hard mode (soft mode lets the page handle its own UI)
if (GUARD_MODE === 'hard') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectGateUI);
  } else {
    injectGateUI();
  }
}

function ensureUI(cb) {
  if (GUARD_MODE !== 'hard') { cb(); return; }
  if (document.body && document.getElementById('ajk-mg-overlay')) {
    cb();
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!document.getElementById('ajk-mg-overlay')) injectGateUI();
      cb();
    });
  } else {
    if (!document.getElementById('ajk-mg-overlay')) injectGateUI();
    setTimeout(cb, 0);
  }
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.dispatchEvent(new CustomEvent('memberCheck', { detail: { unlocked: false } }));
    if (GUARD_MODE === 'hard') ensureUI(showGate);
    return;
  }
  try {
    // Check both: admin profile + member doc (in parallel)
    const [memDoc, adminDoc] = await Promise.all([
      getDoc(doc(db, 'members', user.uid)),
      getDoc(doc(db, 'admins', user.uid)),
    ]);

    const isAdmin = adminDoc.exists();
    const isMember = memDoc.exists() && memDoc.data().profileComplete === true;

    if (isAdmin || isMember) {
      // Allow access — admin OR verified member
      window._currentUser = user;
      window._currentMemberData = isMember ? memDoc.data() : null;
      window._adminProfile = isAdmin ? adminDoc.data() : null;
      window.dispatchEvent(new CustomEvent('memberCheck', { detail: { unlocked: true, isAdmin } }));
      if (GUARD_MODE === 'hard') ensureUI(hideGate);
    } else {
      // Logged in but neither admin nor verified member
      window.dispatchEvent(new CustomEvent('memberCheck', { detail: { unlocked: false } }));
      if (GUARD_MODE === 'hard') ensureUI(showGate);
    }
  } catch (e) {
    console.warn('member-guard: check failed', e);
    window.dispatchEvent(new CustomEvent('memberCheck', { detail: { unlocked: false } }));
    if (GUARD_MODE === 'hard') ensureUI(showGate);
  }
});
