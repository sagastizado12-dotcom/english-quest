'use strict';
/* ========== Storage & profiles (all local to this device) ========== */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); };
const LS = { get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } }, set(k, v) { localStorage.setItem(k, JSON.stringify(v)); } };
const SET = Object.assign({ theme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light', sound: true, es: false, rate: 0.9 }, LS.get('eq.settings', {}));
if (!SET.tr) SET.tr = SET.es ? 'always' : 'tap'; delete SET.es;
const saveSet = () => LS.set('eq.settings', SET);
const uiEs = () => SET.tr !== 'off';
const SKILLS = ['speak', 'read', 'write', 'pron'];
const SKILLNAME = { speak: 'Speaking', read: 'Reading', write: 'Writing', pron: 'Pronunciation' };
const SKILLES = { speak: 'Hablar', read: 'Lectura', write: 'Escritura', pron: 'Pronunciación' };
const SN = s => U(SKILLNAME[s], SKILLES[s]);
const LVL = ['', 'A1', 'A2', 'B1', 'B1+'];
function newProfile(name) { return { id: 'p' + Date.now().toString(36), name, xp: 0, xpLog: {}, streak: 0, best: 0, lastDay: null, goal: 50, skills: Object.fromEntries(SKILLS.map(s => [s, { lvl: 1, hist: [], correct: 0, total: 0 }])), done: {}, srs: {}, badges: {}, missed: {}, pairsOk: 0, created: today() }; }
let profiles = LS.get('eq.profiles', []), P = null;
function loadProfile(id) { P = LS.get('eq.p.' + id, null); if (P) { LS.set('eq.current', id); for (const s of SKILLS) P.skills[s] ||= { lvl: 1, hist: [], correct: 0, total: 0 }; } }
function save() { if (P) LS.set('eq.p.' + P.id, P); renderStats(); }
function addProfile(name) { const p = newProfile(name || 'Learner'); profiles.push({ id: p.id, name: p.name }); LS.set('eq.profiles', profiles); LS.set('eq.p.' + p.id, p); loadProfile(p.id); }

/* ========== i18n helper: Spanish help is optional ========== */
const T = (en, es) => esc(en) + (uiEs() && es ? `<div class="es">${esc(es)}</div>` : '');
// UI label: English + small Spanish (no tap needed unless setting is Off)
const U = (en, es) => esc(en) + (uiEs() && es ? `<small class="esu">${esc(es)}</small>` : '');
// Practice-text translation: gray line (Always) or 🇪🇸 tap-to-reveal (Tap)
const esOf = (en, alt) => (window.ES && ES[en]) || alt || (window.ES_W && ES_W[en]) || '';
function tx(en, alt) { const es = esOf(en, alt); if (!es || SET.tr === 'off') return '';
  return SET.tr === 'always' ? `<div class="es-t">${esc(es)}</div>` : `<span class="estog-w"><button class="estog" data-estog aria-label="Ver en español">🇪🇸</button><span class="es-t" hidden>${esc(es)}</span></span>`; }
// Option translation inside a button; in Tap mode revealed by one group toggle (learner still has to choose)
const oEs = (en, alt) => { const es = esOf(en, alt); return es && SET.tr !== 'off' ? `<span class="es-t opt-es"${SET.tr === 'tap' ? ' hidden' : ''}>${esc(es)}</span>` : ''; };
const optTog = () => SET.tr === 'tap' ? `<button class="btn sm" data-optes>🇪🇸 Ver opciones en español</button>` : '';
document.addEventListener('click', e => { const b = e.target.closest('[data-estog]'); if (b) { e.stopPropagation(); const t = b.nextElementSibling; t.hidden = !t.hidden; return; }
  const o = e.target.closest('[data-optes]'); if (o) { $$('.opt-es').forEach(x => x.hidden = false); o.remove(); } }, true);

/* ========== Sound effects (WebAudio, offline) ========== */
let AC;
function beep(kind) {
  if (!SET.sound) return;
  try { AC ||= new (window.AudioContext || window.webkitAudioContext)();
    const notes = { ok: [660, 880], bad: [300, 220], win: [523, 659, 784, 1046] }[kind] || [440];
    notes.forEach((f, i) => { const o = AC.createOscillator(), g = AC.createGain(); o.type = 'triangle'; o.frequency.value = f; o.connect(g); g.connect(AC.destination); const t = AC.currentTime + i * 0.11; g.gain.setValueAtTime(0.18, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.18); o.start(t); o.stop(t + 0.2); });
  } catch {}
}
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('show'), 1600); }

/* ========== Speech synthesis (works offline with on-device voices) ========== */
let VOICE = null;
function pickVoice() { const vs = speechSynthesis?.getVoices?.() || []; VOICE = vs.find(v => v.lang === 'en-US' && v.localService) || vs.find(v => v.lang === 'en-US') || vs.find(v => /^en/.test(v.lang)) || null; }
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function speak(text, rate) {
  return new Promise(res => {
    if (!('speechSynthesis' in window)) return res();
    speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = 'en-US'; if (VOICE) u.voice = VOICE; u.rate = rate || SET.rate;
    u.onend = u.onerror = () => res(); speechSynthesis.speak(u); setTimeout(res, 1500 + text.length * 180);
  });
}
const slow = t => speak(t, 0.55);

/* ========== Speech recognition with graceful fallback ========== */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const srReady = () => !!SR && navigator.onLine;
// Better capture: 5 alternatives, interim transcript, longer silence window,
// auto-restart if recognition ends before any speech, optional hold-to-talk.
function listen(opts = {}) {
  return new Promise((res, rej) => {
    const segs = []; let lastInterim = ''; let done = false, heardAny = false, restarts = 0, r = null; const t0 = Date.now();
    const finish = () => { if (done) return; done = true; clearTimeout(to); if (!segs.length && lastInterim) segs.push([lastInterim]); if (!segs.length) return rej(heardAny ? 'no-match' : 'no-speech');
      const prefix = segs.slice(0, -1).map(a => a[0]).join(' '); res(segs[segs.length - 1].map(a => (prefix + ' ' + a).trim())); };
    const to = setTimeout(() => { if (!done) { try { r && r.abort(); } catch {} if (segs.length) finish(); else { done = true; rej('timeout'); } } }, opts.maxMs || 15000);
    const start = () => {
      r = new SR(); r.lang = 'en-US'; r.interimResults = true; r.maxAlternatives = 5; r.continuous = !!opts.hold;
      r.onresult = e => { heardAny = true; let interim = '';
        for (let k = e.resultIndex; k < e.results.length; k++) { const rr = e.results[k];
          if (rr.isFinal) segs.push([...rr].map(a => a.transcript)); else interim += rr[0].transcript; }
        lastInterim = interim || lastInterim; opts.onInterim && opts.onInterim((segs.map(a => a[0]).join(' ') + ' ' + interim).trim());
        if (!opts.hold && segs.length) { try { r.stop(); } catch {} } };
      r.onerror = e => { const c = e.error || 'error'; if (c === 'no-speech' || c === 'aborted') return; done = true; clearTimeout(to); rej(c); };
      r.onend = () => { if (done) return;
        const keep = opts.hold ? opts.hold.down : (!segs.length && !heardAny && Date.now() - t0 < 12000 && restarts < 3);
        if (keep) { restarts++; try { start(); } catch { finish(); } } else finish(); };
      try { r.start(); } catch (e) { done = true; clearTimeout(to); rej('start-failed'); }
    };
    start();
    if (opts.hold) opts.hold.stop = () => { opts.hold.down = false; try { r.stop(); } catch {} };
  });
}
// Fallback recorder: record + play back, then self-rate
async function recordClip(ms = 4000) {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) throw 'no-recorder';
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const rec = new MediaRecorder(stream), chunks = [];
  rec.ondataavailable = e => chunks.push(e.data);
  return new Promise(res => { rec.onstop = () => { stream.getTracks().forEach(t => t.stop()); res(URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/mp4' }))); }; rec.start(); setTimeout(() => rec.state !== 'inactive' && rec.stop(), ms); });
}


/* ========== Microphone permission card ========== */
const micState = () => LS.get('eq.mic', 'prompt'); // granted | prompt | denied
async function refreshMic() { try { const p = await navigator.permissions?.query({ name: 'microphone' }); if (p) { LS.set('eq.mic', p.state); p.onchange = () => { LS.set('eq.mic', p.state); drawMicCards(); }; } } catch {} return micState(); }
function micCardHTML() {
  const st = micState(); const lbl = { granted: ['✅ Allowed', 'Permitido'], prompt: ['⏳ Not yet', 'Todavía no'], denied: ['⛔ Blocked', 'Bloqueado'] }[st] || ['⏳ Not yet', 'Todavía no'];
  return `<div class="card micCard"><div class="row"><b class="grow">🎙️ Turn on microphone<small class="esu">Activar micrófono</small></b><span class="chip">${lbl[0]}<small class="esu">${lbl[1]}</small></span></div>
   ${st !== 'granted' ? `<button class="btn pri full" data-micask>🎙️ Turn on microphone<small class="esu" style="color:#fff">Activar micrófono</small></button>` : ''}
   ${st === 'denied' ? `<div class="fb info" style="font-weight:500"><b>Microphone is blocked. How to allow it:</b><small class="esu">El micrófono está bloqueado. Cómo permitirlo:</small>
    <p><b>iPhone (Safari)</b><br>1. Tap <b>aA</b> in the address bar → <b>Website Settings</b> → <b>Microphone</b> → <b>Allow</b>.<small class="esu">Toca <b>aA</b> en la barra de direcciones → Configuración del sitio web → Micrófono → Permitir.</small>
    2. Or open <b>Settings → Safari → Microphone</b> → <b>Allow</b>.<small class="esu">O abre Ajustes → Safari → Micrófono → Permitir.</small>
    3. For speech scoring, turn on <b>Settings → General → Keyboard → Enable Dictation</b>.<small class="esu">Para evaluar la voz, activa Ajustes → General → Teclado → Activar dictado.</small></p>
    <p><b>Android (Chrome)</b><br>Tap the <b>lock icon</b> 🔒 next to the address → <b>Permissions</b> → <b>Microphone</b> → <b>Allow</b>.<small class="esu">Toca el candado 🔒 junto a la dirección → Permisos → Micrófono → Permitir.</small></p>
    <button class="btn full" data-micask>🔁 Try again<small class="esu">Intentar de nuevo</small></button></div>` : ''}
   <button class="btn full" data-mictest>🎧 Test microphone (3 s)<small class="esu">Probar micrófono (3 s)</small></button><div class="micTest"></div>
   <p class="mut">ℹ️ On iPhone, Safari may ask for permission again on each visit. That's normal.<small class="esu">En iPhone, Safari puede pedir permiso otra vez en cada visita. Es normal.</small></p></div>`;
}
function drawMicCards() { $$('.micCard').forEach(c => c.outerHTML = micCardHTML()); }
async function askMic() {
  try { const st = await navigator.mediaDevices.getUserMedia({ audio: true }); st.getTracks().forEach(t => t.stop()); LS.set('eq.mic', 'granted'); toast('🎙️ Microphone on / Micrófono activado'); }
  catch (e) { LS.set('eq.mic', e && (e.name === 'NotAllowedError' || e.name === 'SecurityError') ? 'denied' : 'prompt'); if (!navigator.mediaDevices) toast('Microphone not available / Micrófono no disponible'); }
  LS.set('eq.micSeen', 1); drawMicCards();
}
async function testMic(box) {
  let stream; try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); LS.set('eq.mic', 'granted'); }
  catch (e) { LS.set('eq.mic', e && e.name === 'NotAllowedError' ? 'denied' : 'prompt'); drawMicCards(); return; }
  box.innerHTML = `<p>🔴 Recording… say something!<small class="esu">Grabando… ¡di algo!</small></p><div class="bar"><i class="lvl" style="width:0%;transition:none"></i></div>`;
  let raf; try { AC ||= new (window.AudioContext || window.webkitAudioContext)(); const an = AC.createAnalyser(); an.fftSize = 256; AC.createMediaStreamSource(stream).connect(an); const d = new Uint8Array(an.fftSize);
    const tick = () => { an.getByteTimeDomainData(d); let m = 0; for (const v of d) m = Math.max(m, Math.abs(v - 128)); const el = $('.lvl', box); if (el) el.style.width = Math.min(100, m * 1.6) + '%'; raf = requestAnimationFrame(tick); }; tick(); } catch {}
  const chunks = []; let url = null;
  if (window.MediaRecorder) { const rec = new MediaRecorder(stream); rec.ondataavailable = e => chunks.push(e.data); const done = new Promise(r => rec.onstop = r); rec.start(); await new Promise(r => setTimeout(r, 3000)); rec.stop(); await done; url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/mp4' })); }
  else await new Promise(r => setTimeout(r, 3000));
  cancelAnimationFrame(raf); stream.getTracks().forEach(t => t.stop());
  box.innerHTML = url ? `<p>▶️ Listen to yourself:<small class="esu">Escúchate:</small></p><audio controls autoplay src="${url}" style="width:100%"></audio>` : `<p>The level meter moved? Your mic works.<small class="esu">¿Se movió el medidor? Tu micrófono funciona.</small></p>`;
  const chip = box.closest('.micCard')?.querySelector('.chip'); if (chip) chip.innerHTML = '✅ Allowed<small class="esu">Permitido</small>';
}
document.addEventListener('click', e => { if (e.target.closest('[data-micask]')) askMic(); const t = e.target.closest('[data-mictest]'); if (t) testMic(t.nextElementSibling); });
const micFirst = () => (LS.get('eq.micSeen', 0) && micState() === 'granted') ? '' : micCardHTML();

/* ========== In-app browser detection (best effort) ========== */
const UA = navigator.userAgent || '';
const isIOS = /iPad|iPhone|iPod/.test(UA) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isStandalone = navigator.standalone === true || matchMedia('(display-mode: standalone)').matches;
const isInApp = /FBAN|FBAV|FB_IAB|Instagram|Line\/|WhatsApp|GSA\/|Snapchat|Twitter|LinkedInApp|MicroMessenger|TikTok|musical_ly|Pinterest/i.test(UA) || (isIOS && !isStandalone && !/Safari\//.test(UA));
function inAppBanner() {
  if (!isInApp) return '';
  return `<div class="card" style="border:2px solid var(--warn);background:#f5a52422"><b style="font-size:18px">🧭 Open in Safari for the microphone<small class="esu">Abre en Safari para usar el micrófono</small></b>
   <p style="margin:8px 0">It looks like you opened this link inside another app (Messages, WhatsApp, Facebook…). The microphone and speech scoring may not work here.<small class="esu">Parece que abriste el enlace dentro de otra app. El micrófono y la evaluación de voz pueden no funcionar aquí.</small></p>
   <ol style="padding-left:20px;margin:6px 0"><li>Tap <b>Copy link</b>, open <b>Safari</b>, paste it in the address bar.<small class="esu">Toca Copiar enlace, abre Safari y pégalo en la barra de direcciones.</small></li>
   <li>Or long-press the link → <b>Open in Safari</b>.<small class="esu">O mantén presionado el enlace → Abrir en Safari.</small></li>
   <li>Or tap the <b>share ⬆️</b> or <b>compass 🧭</b> icon → <b>Open in Safari</b> (Android: ⋮ → Open in Chrome).<small class="esu">O toca el ícono de compartir ⬆️ o la brújula 🧭 → Abrir en Safari (Android: ⋮ → Abrir en Chrome).</small></li></ol>
   <button class="btn pri full" data-copylink>🔗 Copy link<small class="esu">Copiar enlace</small></button>
   <p class="mut">You can still use reading, writing and listening here.<small class="esu">Puedes seguir usando lectura, escritura y audio aquí.</small></p></div>`;
}
document.addEventListener('click', async e => { if (!e.target.closest('[data-copylink]')) return; const u = 'https://sagastizado12-dotcom.github.io/english-quest/' + location.hash;
  try { await navigator.clipboard.writeText(u); toast('🔗 Copied / Copiado'); } catch { prompt('Copy this link / Copia este enlace:', u); } });
// Bilingual speech error messages with fix steps
const SR_ERR = {
  'not-allowed': ['🎙️ Microphone permission was denied.', 'Se negó el permiso del micrófono.', isIOS ? 'Tap aA → Website Settings → Microphone → Allow, or Settings → Safari → Microphone → Allow. Then tap Try again.' : 'Tap the lock icon 🔒 → Permissions → Microphone → Allow. Then tap Try again.', isIOS ? 'Toca aA → Configuración del sitio web → Micrófono → Permitir, o Ajustes → Safari → Micrófono → Permitir. Luego toca Intentar de nuevo.' : 'Toca el candado 🔒 → Permisos → Micrófono → Permitir. Luego toca Intentar de nuevo.'],
  'service-not-allowed': ['🗣️ Speech recognition is turned off or not allowed in this browser.', 'El reconocimiento de voz está apagado o no se permite en este navegador.', isIOS ? 'Turn on Settings → General → Keyboard → Enable Dictation, and allow Siri & Dictation (Settings → Siri). If you opened this from Messages or another app, open it in Safari.' : 'Use Chrome and check that voice typing is enabled. If you opened this inside another app, open it in Chrome.', isIOS ? 'Activa Ajustes → General → Teclado → Activar dictado y permite Siri y Dictado (Ajustes → Siri). Si lo abriste desde Mensajes u otra app, ábrelo en Safari.' : 'Usa Chrome y revisa que el dictado por voz esté activado. Si lo abriste dentro de otra app, ábrelo en Chrome.'],
  'network': ['📴 Speech scoring needs internet.', 'La evaluación de voz necesita internet.', 'Check your Wi-Fi or data, or rate yourself below.', 'Revisa tu Wi-Fi o datos, o califícate abajo.'],
  'timeout': ['📴 Speech scoring is not responding (it usually needs internet).', 'La evaluación de voz no responde (normalmente necesita internet).', 'Check your connection, or rate yourself below.', 'Revisa tu conexión, o califícate abajo.'],
  'no-speech': ["🤫 I didn't hear anything.", 'No escuché nada.', 'Tap the mic, wait for the red button, then speak a little louder.', 'Toca el micrófono, espera el botón rojo y habla un poco más fuerte.'],
  'audio-capture': ['🎙️ No microphone was found.', 'No se encontró un micrófono.', 'Check that no other app is using the microphone.', 'Revisa que ninguna otra app esté usando el micrófono.'],
};
const errBox = code => { const m = SR_ERR[code] || SR_ERR['service-not-allowed']; return `<div class="fb info" style="font-weight:500"><b>${m[0]}</b><small class="esu">${m[1]}</small><p style="margin:6px 0 0">${m[2]}<small class="esu">${m[3]}</small></p></div>`; };

/* ========== Text utils & scoring ========== */
const CONTR = { "i'm": 'i am', "you're": 'you are', "he's": 'he is', "she's": 'she is', "it's": 'it is', "we're": 'we are', "they're": 'they are', "don't": 'do not', "doesn't": 'does not', "didn't": 'did not', "can't": 'cannot', "won't": 'will not', "i'll": 'i will', "i've": 'i have', "let's": 'let us', "isn't": 'is not', "aren't": 'are not', "what's": 'what is', "o'clock": 'oclock' };
const NUMW = { '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten', '11': 'eleven', '12': 'twelve', '13': 'thirteen', '15': 'fifteen', '20': 'twenty', '30': 'thirty', '50': 'fifty', '100': 'hundred' };
function norm(s) { return s.toLowerCase().replace(/[’‘]/g, "'").split(/\s+/).map(w => w.replace(/[^a-z0-9']/g, '')).filter(Boolean).map(w => CONTR[w] || NUMW[w] || w).join(' ').replace(/'/g, '').replace(/\bcan not\b/g, 'cannot').trim(); }
const words = s => norm(s).split(' ').filter(Boolean);
const scoreSpeech = (target, alts) => Score.score(target, alts); // exact words; formatting-only normalization
function lev(a, b) { const d = Array.from({ length: a.length + 1 }, (_, i) => [i]); for (let j = 1; j <= b.length; j++) d[0][j] = j; for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1)); return d[a.length][b.length]; }
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ========== XP, streaks, levels, badges ========== */
const RANKS = [[0, 'Beginner', '🌱', 'Principiante'], [200, 'Explorer', '🧭', 'Explorador'], [600, 'Speaker', '🎙️', 'Hablante'], [1500, 'Fluent Star', '🌟', 'Estrella fluida'], [3000, 'English Legend', '🏆', 'Leyenda del inglés']];
const rank = xp => { let r = RANKS[0]; for (const x of RANKS) if (xp >= x[0]) r = x; return r; };
const BADGES = [
  ['xp100', '💯', 'First 100 XP', 'Ganaste tus primeros 100 XP', p => p.xp >= 100],
  ['xp1000', '🚀', '1,000 XP', 'Llegaste a 1,000 XP', p => p.xp >= 1000],
  ['streak3', '🔥', '3-day streak', 'Racha de 3 días', p => p.best >= 3],
  ['streak7', '📅', '7-day streak', 'Racha de 7 días', p => p.best >= 7],
  ['perfect', '🎯', 'Perfect lesson', 'Lección perfecta (100%)', p => Object.values(p.done).some(v => v >= 100)],
  ['words50', '📚', '50 words learned', '50 palabras aprendidas', p => Object.values(p.srs).filter(c => c.box >= 2).length >= 50],
  ['reader', '📖', 'Bookworm: 5 passages', 'Leíste 5 lecturas', p => PASSAGES.filter(x => p.done[x.id] != null).length >= 5],
  ['writer', '✍️', 'Writer: 5 writing lessons', '5 lecciones de escritura', p => WRITE.filter(x => p.done[x.id] != null).length >= 5],
  ['talker', '💬', 'All role-plays done', 'Completaste todos los diálogos', p => ROLEPLAYS.every(x => p.done[x.id] != null)],
  ['sound1', '👂', 'First sound lesson', 'Primera lección de sonidos', p => SOUNDS.some(x => p.done[x.id] != null)],
  ['sound5', '👄', 'Sound Explorer: 5 sounds', '5 lecciones de pronunciación', p => SOUNDS.filter(x => p.done[x.id] != null).length >= 5],
  ['pairs50', '🎧', 'Sharp Ears: 50 minimal pairs', '50 pares mínimos correctos', p => p.pairsOk >= 50],
  ['thmaster', '👅', 'TH Master: 90%+ on TH', '90%+ en el sonido TH', p => (p.done.p_th || 0) >= 90],
];
function touchStreak() {
  const t = today(); if (P.lastDay === t) return;
  const y = new Date(); y.setDate(y.getDate() - 1); const ys = y.getFullYear() + '-' + String(y.getMonth()+1).padStart(2,'0') + '-' + String(y.getDate()).padStart(2,'0');
  P.streak = P.lastDay === ys ? P.streak + 1 : 1; P.best = Math.max(P.best, P.streak); P.lastDay = t;
}
function addXP(n, el) {
  touchStreak(); const before = P.xpLog[today()] || 0;
  P.xp += n; P.xpLog[today()] = before + n;
  if (before < P.goal && before + n >= P.goal) { setTimeout(() => { toast('🎉 Daily goal reached!'); beep('win'); }, 700); }
  const oldR = rank(P.xp - n)[1], newR = rank(P.xp); if (oldR !== newR[1]) setTimeout(() => { toast(`${newR[2]} New rank: ${newR[1]}!`); beep('win'); }, 1200);
  checkBadges(); save(); if (el) { const s = document.createElement('span'); s.className = 'chip pop'; s.textContent = '+' + n + ' XP'; el.appendChild(s); }
  $('#stats')?.classList.add('pop'); setTimeout(() => $('#stats')?.classList.remove('pop'), 500);
}
function checkBadges() { for (const [id, ic, name] of BADGES) if (!P.badges[id] && BADGES.find(b => b[0] === id)[4](P)) { P.badges[id] = today(); setTimeout(() => { toast(`${ic} Badge: ${name}`); beep('win'); }, 400); } }
// Lesson session: combo bonus + level multiplier, adaptive level-up at end
function Session(skill, lvl, id) {
  return { skill, lvl, id, ok: 0, n: 0, combo: 0,
    hit(correct, el) { this.n++; P.skills[skill].total++;
      if (correct) { this.ok++; this.combo++; P.skills[skill].correct++; const xp = Math.round(10 * (1 + 0.25 * (lvl - 1))) + (this.combo >= 3 ? 2 * Math.min(this.combo - 2, 5) : 0); beep('ok'); addXP(xp, el); if (this.combo === 3 || this.combo === 6) toast(`🔥 ${this.combo} in a row!`); }
      else { this.combo = 0; beep('bad'); save(); } },
    finish() { const pct = this.n ? Math.round(100 * this.ok / this.n) : 0; const sk = P.skills[skill];
      sk.hist.push(pct); sk.hist = sk.hist.slice(-10); P.done[id] = Math.max(P.done[id] || 0, pct);
      let bonus = pct === 100 ? 25 : pct >= 80 ? 10 : 0; if (bonus) addXP(bonus);
      let up = false; const rec = sk.hist.slice(-3); if (rec.length >= 3 && rec.reduce((a, b) => a + b, 0) / 3 >= 80 && sk.lvl < 4) { sk.lvl++; sk.hist = []; up = true; }
      checkBadges(); save(); return { pct, bonus, up, lvl: sk.lvl }; } };
}
function missed(key, wrong) { if (wrong) P.missed[key] = (P.missed[key] || 0) + 1; else if (P.missed[key]) { P.missed[key]--; if (!P.missed[key]) delete P.missed[key]; } }
function endScreen(r, back, title) {
  beep(r.pct >= 80 ? 'win' : 'ok');
  view(`<div class="card" style="text-align:center"><div style="font-size:64px" class="pop">${r.pct === 100 ? '🏆' : r.pct >= 80 ? '🎉' : '💪'}</div>
   <h1>${esc(title || 'Lesson complete!')}</h1><p style="font-size:22px;font-weight:800">${r.pct}% correct</p>
   ${r.bonus ? `<p class="chip">Accuracy bonus +${r.bonus} XP</p>` : ''}
   ${r.up ? `<div class="fb ok">⬆️ Level up! ${LVL[r.lvl]} lessons unlocked.${uiEs() ? '<div class="es">¡Subiste de nivel!</div>' : ''}</div>` : r.pct < 80 ? `<p class="mut">${T('Score 80%+ on recent lessons to unlock the next level.', 'Saca 80% o más para desbloquear el siguiente nivel.')}</p>` : ''}
   <a class="btn pri full" href="${back}" id="doneBtn">${U('Continue', 'Continuar')}</a></div>`);
}

/* ========== "How do I say this?" helper ========== */
function syllab(w) { const parts = w.toLowerCase().match(/[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/g); return parts && parts.join('') === w.toLowerCase() ? parts : [w]; }
function pronInfo(w) {
  const k = w.toLowerCase().replace(/[^a-z']/g, ''); const p = PRON[k];
  if (p) return { w: k, resp: p[0], ipa: '/' + p[1] + '/', syl: p[2], lesson: p[3], exact: true };
  const s = syllab(k); const resp = s.map((x, i) => i === 0 && s.length > 1 ? x.toUpperCase() : x).join('-');
  return { w: k, resp, ipa: '', syl: s.join('·'), lesson: soundFor(k), exact: false };
}
function howToSay(text) {
  const ws = text.split(/\s+/).map(x => x.replace(/[^A-Za-z']/g, '')).filter(Boolean);
  const rows = ws.map(w => { const i = pronInfo(w); const L = SOUNDS.find(s => s.id === i.lesson);
    return `<div class="card"><div class="row"><b class="grow" style="font-size:22px">${esc(w)}</b><button class="say" data-say="${esc(w)}">🔊</button><button class="say" data-slow="${esc(w)}">🐢</button></div>
     <div>Say it: <b style="font-size:20px">${esc(i.resp)}</b> ${i.exact ? '' : '<span class="mut">(approx.)</span>'}</div>
     ${i.ipa ? `<div class="ipa mut">IPA: ${esc(i.ipa)}</div>` : ''}<div class="mut">Syllables: ${esc(i.syl)} · CAPS = stress</div>
     ${L ? `<a class="chip" href="#/pron/${L.id}" data-close>👄 Sound lesson: ${esc(L.title)}</a>` : ''}</div>`; }).join('');
  modal(`<h2>🗣️ How do I say this?</h2>${uiEs() ? '<div class="es">¿Cómo se dice?</div>' : ''}
   <p class="target" style="font-size:22px">${esc(text)}${tx(text)}</p>
   <div class="row"><button class="btn pri grow" data-say="${esc(text)}">🔊 Normal</button><button class="btn grow" data-slow="${esc(text)}">🐢 Slow</button></div>
   <button class="btn full" id="loopBtn">🔁 Repeat after me (loop)</button>${rows}`);
  $('#loopBtn').onclick = () => repeatLoop(text, $('#loopBtn'));
}
const helpBtn = t => `<button class="say" data-how="${esc(t)}" title="How do I say this?" aria-label="How do I say this?">🗣️?</button>`;
let loopOn = false;
async function repeatLoop(text, btn, times = 3) {
  if (loopOn) { loopOn = false; speechSynthesis.cancel(); return; }
  loopOn = true; const lbl = btn.textContent; btn.textContent = '⏹ Stop loop';
  for (let i = 0; i < times && loopOn; i++) { await speak(text, i === 0 ? 0.55 : SET.rate); if (!loopOn) break; btn.textContent = `⏹ Your turn… (${i + 1}/${times})`; await new Promise(r => setTimeout(r, 1200 + text.split(' ').length * 450)); btn.textContent = '⏹ Stop loop'; }
  loopOn = false; btn.textContent = lbl;
}

/* ========== Modal & delegated events ========== */
function modal(html) { $('#modal .body').innerHTML = html; $('#modal').hidden = false; }
function closeModal() { $('#modal').hidden = true; loopOn = false; }
document.addEventListener('click', e => {
  const t = e.target.closest('[data-say],[data-slow],[data-how],[data-close]'); if (!t) return;
  if (t.dataset.say) speak(t.dataset.say); else if (t.dataset.slow) slow(t.dataset.slow); else if (t.dataset.how) howToSay(t.dataset.how);
  if (t.dataset.close !== undefined) closeModal();
});
$('#modal .close').onclick = closeModal; $('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });

/* ========== Rendering basics ========== */
const app = $('#app'); function view(h) { app.innerHTML = h; window.scrollTo(0, 0); }
function renderStats() { if (!P) return; const r = rank(P.xp); $('#stats').innerHTML = `<span title="Streak">🔥${P.streak}</span><span title="XP" id="xpVal">⭐${P.xp}</span><span title="${r[1]}">${r[2]}</span>`; }
const speedCtl = () => `<div class="row mut"><span>Speed</span><button class="btn sm ${SET.rate < .8 ? 'sel' : ''}" data-rate="0.6">🐢 Slow</button><button class="btn sm ${SET.rate >= .8 ? 'sel' : ''}" data-rate="0.9">🙂 Normal</button></div>`;
document.addEventListener('click', e => { const b = e.target.closest('[data-rate]'); if (!b) return; SET.rate = +b.dataset.rate; saveSet(); $$('[data-rate]').forEach(x => x.classList.toggle('sel', x === b)); });
const lessonList = (skill, list, icon, base) => [1, 2, 3, 4].map(l => { const items = list.filter(x => x.lvl === l); if (!items.length) return ''; const lock = l > P.skills[skill].lvl;
  return `<h2>${LVL[l]} ${lock ? '🔒' : ''}</h2>` + items.map(x => `<a class="btn full lesson ${lock ? 'locked' : ''}" ${lock ? '' : `href="#/${base}/${x.id}"`}><span class="ic">${P.done[x.id] != null ? (P.done[x.id] >= 80 ? '✅' : '🟡') : icon}</span><span class="grow">${U(x.title, esOf(x.title))}${x.sym ? ` <span class="mut ipa">${esc(x.sym)}</span>` : ''}</span>${P.done[x.id] != null ? `<span class="mut">${P.done[x.id]}%</span>` : ''}</a>`).join(''); }).join('');
const skillHead = (s, es) => { const k = P.skills[s], acc = k.total ? Math.round(100 * k.correct / k.total) : 0; return `<div class="card"><div class="row"><b class="grow">${U('Level', 'Nivel')} ${LVL[k.lvl]}</b><span class="mut">${U('Accuracy', 'Precisión')} ${acc}%</span></div><div class="bar"><i style="width:${(k.lvl - 1) * 25 + Math.min(25, k.hist.slice(-3).reduce((a, b) => a + b, 0) / 12)}%"></i></div>${es ? `<p class="mut">${T(es[0], es[1])}</p>` : ''}</div>`; };

/* ========== HOME ========== */
function home() {
  const r = rank(P.xp), nx = RANKS.find(x => x[0] > P.xp), td = P.xpLog[today()] || 0;
  const due = Object.values(P.srs).filter(c => c.due <= Date.now()).length;
  view(`<h1>Hi, ${esc(P.name)}! 👋</h1>${uiEs() ? '<div class="es">¡Hola! Practica un poco cada día.</div>' : ''}
  <div class="card"><div class="row"><span style="font-size:40px">${r[2]}</span><div class="grow"><b>${U(r[1], r[3])}</b><div class="mut">${P.xp} XP${nx ? ` · ${nx[0] - P.xp} to ${nx[1]}` : ''}</div></div><div style="text-align:center"><b style="font-size:24px">🔥${P.streak}</b><div class="mut">${U('day streak', 'días seguidos')}</div></div></div>
   <p style="margin:10px 0 4px"><b>${U('Daily goal', 'Meta diaria')}</b> <span class="mut">${Math.min(td, P.goal)}/${P.goal} XP</span></p><div class="bar"><i style="width:${Math.min(100, 100 * td / P.goal)}%"></i></div></div>
  <div class="grid2">
   <a class="btn full hometile" href="#/speak">🎤<b>Speak</b>${uiEs() ? '<small class="esu">Hablar</small>' : ''}</a>
   <a class="btn full hometile" href="#/pron">👄<b>Sounds</b>${uiEs() ? '<small class="esu">Sonidos</small>' : ''}</a>
   <a class="btn full hometile" href="#/read">📖<b>Read</b>${uiEs() ? '<small class="esu">Leer</small>' : ''}</a>
   <a class="btn full hometile" href="#/write">✏️<b>Write</b>${uiEs() ? '<small class="esu">Escribir</small>' : ''}</a></div>
  <a class="btn pri full" href="#/cards">🃏 ${U('Flashcards', 'Tarjetas')} ${due ? `<span class="chip">${due} due</span>` : ''}</a>
  <h2>${U('Your skills', 'Tus habilidades')}</h2><div class="card">${SKILLS.map(s => { const k = P.skills[s], acc = k.total ? Math.round(100 * k.correct / k.total) : 0; return `<div style="margin:8px 0"><div class="row"><span class="grow">${SN(s)} <span class="chip">${LVL[k.lvl]}</span></span><span class="mut">${acc}%</span></div><div class="bar"><i style="width:${acc}%"></i></div></div>`; }).join('')}</div>
  <div class="row"><a class="btn grow" href="#/progress">📈 ${U('Progress', 'Progreso')}</a><a class="btn grow" href="#/badges">🏅 ${U('Badges', 'Insignias')}</a></div>
  ${!navigator.onLine ? `<div class="fb info">📴 ${T('Offline mode: lessons, audio and progress work. Speech scoring needs internet.', 'Sin conexión: todo funciona menos la evaluación de voz.')}</div>` : ''}`);
}

/* ========== SPEAKING ========== */
function speakList() {
  view(`<h1>🎤 ${U('Speaking', 'Hablar')}</h1>${skillHead('speak', ['Listen, then tap the mic and say it.', 'Escucha y luego toca el micrófono y repítelo.'])}${inAppBanner()}${micNote()}${micFirst()}
  <h2>${U('Repeat after me', 'Repite después de mí')}</h2>${lessonList('speak', SPEAK, '🎤', 'speak')}<h2>💬 ${U('Role-plays', 'Diálogos')}</h2>${lessonList('speak', ROLEPLAYS, '💬', 'speak')}`);
}
function micNote() {
  if (!SR) return `<div class="fb info">ℹ️ ${T('Speech recognition is not available in this browser. You can still listen, record yourself, play it back and rate yourself. On iPhone, use Safari (iOS 14.5+) and turn on Siri & Dictation.', 'El reconocimiento de voz no está disponible aquí. Puedes escuchar, grabarte y calificarte. En iPhone usa Safari y activa Siri y Dictado.')}</div>`;
  if (!navigator.onLine) return `<div class="fb info">📴 ${T('Speech scoring needs internet. Offline you can record, play back and rate yourself.', 'La evaluación de voz necesita internet. Sin conexión, grábate y califícate.')}</div>`;
  return `<p class="mut">${T('Speech scoring uses your browser\'s speech service and may need internet.', 'La evaluación de voz puede necesitar internet.')}</p>`;
}
// Generic "say it" practice widget; calls done(correct:boolean, pct)
function sayWidget(box, target, done, opts = {}) {
  box.innerHTML = `<div class="target">${esc(target)} ${helpBtn(target)}${tx(target)}</div>${speedCtl()}
   <div class="row" style="justify-content:center;margin:12px 0"><button class="btn" id="play">🔊 Listen</button><button class="btn" id="loop">🔁 Repeat loop</button></div>
   <div style="text-align:center"><button class="mic" id="mic" aria-label="Speak">🎤</button><div class="mut" id="micS">${srReady() ? T('Tap, or press and hold while you speak', 'Toca, o mantén presionado mientras hablas') : T('Tap to record yourself', 'Toca para grabarte')}</div></div><div id="res"></div>`;
  $('#play', box).onclick = () => speak(target); $('#loop', box).onclick = e => repeatLoop(target, e.target);
  if (opts.autoplay !== false) setTimeout(() => speak(target), 300);
  const micEl = $('#mic', box); let hold = null, pressT = 0, holdTimer = null, busy = false;
  micEl.addEventListener('pointerdown', e => { if (busy || !srReady()) return; pressT = Date.now(); holdTimer = setTimeout(() => { hold = { down: true }; run(); }, 350); });
  const up = () => { clearTimeout(holdTimer); if (hold && hold.down) { hold.stop ? hold.stop() : (hold.down = false); } };
  micEl.addEventListener('pointerup', up); micEl.addEventListener('pointerleave', up); micEl.addEventListener('pointercancel', up);
  micEl.oncontextmenu = e => e.preventDefault();
  micEl.onclick = () => { if (hold || busy) return; clearTimeout(holdTimer); run(); };
  const run = async () => {
    busy = true; try { await runInner(); } finally { busy = false; hold = null; }
  };
  const runInner = async () => {
    const mic = $('#mic', box), res = $('#res', box);
    if (srReady()) {
      res.innerHTML = '';
      // iOS: request the mic from this tap first, release it, then start recognition
      if (navigator.mediaDevices?.getUserMedia) { try { const st = await navigator.mediaDevices.getUserMedia({ audio: true }); st.getTracks().forEach(t => t.stop()); LS.set('eq.mic', 'granted'); }
        catch (e) { const code = e && (e.name === 'NotAllowedError' || e.name === 'SecurityError') ? 'not-allowed' : 'audio-capture'; if (code === 'not-allowed') LS.set('eq.mic', 'denied'); res.innerHTML = errBox(code); selfRate(res, done, true); return; } }
      mic.classList.add('live'); $('#micS', box).textContent = hold ? 'Listening… release when done / Suelta al terminar' : 'Listening… / Escuchando…';
      res.innerHTML = '<div class="fb info live-tx">🎧 …</div>';
      try { const alts = await listen({ hold, onInterim: t => { const el = $('.live-tx', box); if (el) el.textContent = '🎧 ' + t; } }); mic.classList.remove('live'); const sc = scoreSpeech(target, alts); showScore(res, target, sc, done); }
      catch (err) { mic.classList.remove('live'); $('#micS', box).textContent = 'Tap and say it';
        if (err === 'no-speech' || err === 'aborted' || err === 'no-match') res.innerHTML = errBox('no-speech');
        else { if (err === 'not-allowed') LS.set('eq.mic', 'denied'); res.innerHTML = errBox(err === 'start-failed' ? 'service-not-allowed' : err); selfRate(res, done, true); } }
    } else {
      res.innerHTML = `<div class="fb info">📴 ${T('Speech scoring needs internet (or is not supported here). Record, listen, compare and rate yourself.', 'La evaluación de voz necesita internet. Grábate, escucha y califícate.')}</div>`;
      try { mic.classList.add('live'); $('#micS', box).textContent = 'Recording… (4s)'; const url = await recordClip(); mic.classList.remove('live'); $('#micS', box).textContent = 'Tap to record again';
        res.insertAdjacentHTML('beforeend', `<div class="row"><audio controls src="${url}" style="width:100%"></audio><button class="btn sm grow" data-say="${esc(target)}">🔊 Model</button></div>`);
      } catch { mic.classList.remove('live'); $('#micS', box).textContent = ''; res.insertAdjacentHTML('beforeend', `<p class="mut">${T('Recording is not available. Listen and say it out loud.', 'No se puede grabar. Escucha y dilo en voz alta.')}</p>`); }
      selfRate(res, done);
    }
  };
}
function selfRate(res, done, retry) {
  const d = document.createElement('div'); d.className = 'row'; d.innerHTML = `<button class="btn ok grow">😀 Good</button><button class="btn grow">😐 Almost</button><button class="btn bad grow">🔁 Again</button>`;
  if (retry) { const t = document.createElement('button'); t.className = 'btn full'; t.innerHTML = '🔁 Try again<small class="esu">Intentar de nuevo</small>'; t.onclick = () => { res.innerHTML = ''; res.closest('.card')?.querySelector('#mic')?.click(); }; res.appendChild(t); }
  const [g, a, b] = $$('button', d); g.onclick = () => done(true, 100, res); a.onclick = () => done(true, 70, res); b.onclick = () => done(false, 30, res); res.appendChild(d);
}
function showScore(res, target, sc, done) {
  const tw = target.split(/\s+/); const missedW = [];
  const hl = tw.map((w, i) => { const ok = sc.res[i] !== false; if (!ok) missedW.push(w.replace(/[^A-Za-z']/g, '')); return `<span class="${ok ? 'w-ok' : 'w-miss'}">${esc(w)}</span>`; }).join(' ');
  const good = sc.pct >= 80;
  res.innerHTML = `<div class="fb ${good ? 'ok' : 'bad'}"><div style="font-size:22px">${sc.pct}% ${good ? '🎉' : '💪'}</div><div style="font-size:20px">${hl}</div><div class="mut">I heard: “${esc(sc.heard)}”</div></div>
   ${missedW.length ? `<div class="card"><b>${T('Practice these words:', 'Practica estas palabras:')}</b>${missedW.map(w => { const L = SOUNDS.find(s => s.id === soundFor(w)); return `<div class="row" style="margin-top:6px"><span class="grow" style="font-size:19px">${esc(w)} <span class="mut">${esc(pronInfo(w).resp)}</span></span><button class="say" data-slow="${esc(w)}">🐢</button><button class="say" data-how="${esc(w)}">🗣️?</button>${L ? `<a class="chip" href="#/pron/${L.id}">👄 ${esc(L.title)}</a>` : ''}</div>`; }).join('')}</div>` : ''}`;
  missedW.forEach(w => missed('w:' + w.toLowerCase(), true));
  const d = document.createElement('div'); d.className = 'row';
  d.innerHTML = good ? `<button class="btn pri grow">Next ➜</button>` : `<button class="btn grow">🔁 Try again</button><button class="btn pri grow">Next ➜</button>`;
  const bs = $$('button', d); if (good) bs[0].onclick = () => done(true, sc.pct, res); else { bs[0].onclick = () => { res.innerHTML = ''; }; bs[1].onclick = () => done(false, sc.pct, res); }
  res.appendChild(d); if (good) beep('ok');
}
function speakLesson(id) {
  const L = SPEAK.find(x => x.id === id), R = ROLEPLAYS.find(x => x.id === id); const X = L || R; if (!X) return speakList();
  const S = Session('speak', X.lvl, id); let i = 0;
  const queue = L ? [...L.items] : null; let reQ = new Set();
  const step = () => {
    if (L) { if (i >= queue.length) return endScreen(S.finish(), '#/speak');
      const t = queue[i]; view(`<a href="#/speak" class="mut">← Speaking</a><h1>${U(L.title, esOf(L.title))}</h1><p class="mut">${i + 1} / ${queue.length}</p><div class="card" id="w"></div>`);
      sayWidget($('#w'), t, (ok, pct, el) => { S.hit(ok, el); missed('s:' + t, !ok); if (!ok && !reQ.has(t)) { reQ.add(t); queue.push(t); } i++; setTimeout(step, ok ? 700 : 300); });
    } else { if (i >= R.turns.length) return endScreen(S.finish(), '#/speak', 'Conversation complete!');
      const tn = R.turns[i]; view(`<a href="#/speak" class="mut">← Speaking</a><h1>💬 ${U(R.title, esOf(R.title))}</h1><p class="mut">${i + 1} / ${R.turns.length}</p>
        <div class="card"><div class="row"><span style="font-size:30px">🧑‍💼</span><b class="grow" style="font-size:20px">${esc(tn.app)}</b><button class="say" data-say="${esc(tn.app)}">🔊</button>${helpBtn(tn.app)}</div>${tx(tn.app)}</div>
        <p>${T('Choose a reply, then say it:', 'Elige una respuesta y dila:')}</p>${optTog()}${tn.replies.map((r, k) => `<button class="btn full" data-rep="${k}" style="flex-direction:column">${esc(r)}${oEs(r)}</button>`).join('')}<div class="card" id="w" hidden></div>`);
      setTimeout(() => speak(tn.app), 300);
      $$('[data-rep]').forEach(b => b.onclick = () => { $$('[data-rep]').forEach(x => x.classList.toggle('sel', x === b)); const w = $('#w'); w.hidden = false;
        sayWidget(w, tn.replies[+b.dataset.rep], (ok, pct, el) => { S.hit(ok, el); i++; setTimeout(step, 700); }, { autoplay: true }); w.scrollIntoView({ behavior: 'smooth' }); });
    }
  }; step();
}

/* ========== PRONUNCIATION ========== */
function pronList() {
  view(`<h1>👄 ${U('Sounds', 'Sonidos / Pronunciación')}</h1>${skillHead('pron', ['Sounds that Spanish speakers often find hard. Listen, choose, then say it.', 'Sonidos difíciles para hispanohablantes. Escucha, elige y repite.'])}
  ${inAppBanner()}${micFirst()}<div class="card"><b>🗣️ How do I say…?</b><div class="row" style="margin-top:8px"><input type="text" id="howIn" class="grow" placeholder="Type any word or sentence" style="flex:1"><button class="btn pri" id="howGo">Go</button></div></div>
  ${lessonList('pron', SOUNDS, '👄', 'pron')}`);
  const go = () => { const v = $('#howIn').value.trim(); if (v) howToSay(v); }; $('#howGo').onclick = go; $('#howIn').onkeydown = e => e.key === 'Enter' && go();
}
function pronLesson(id) {
  const X = SOUNDS.find(s => s.id === id); if (!X) return pronList();
  const S = Session('pron', X.lvl, id); const pairs = shuffle(X.pairs); let i = 0, phase = 'intro';
  const intro = () => {
    view(`<a href="#/pron" class="mut">← Sounds</a><h1>${U(X.title, esOf(X.title))} <span class="ipa mut">${esc(X.sym)}</span></h1>
    <div class="card"><b>👄 Mouth position</b><p>${esc(X.en)}</p>${tx(X.en, X.es)}</div>
    ${speedCtl()}<h2>${U('Example words', 'Palabras de ejemplo')}</h2><div class="grid2">${X.words.map(w => `<button class="btn" data-say="${esc(w)}" style="flex-direction:column;gap:0">🔊 ${esc(w)}${oEs(w)}</button>`).join('')}</div>
    <h2>${U('Minimal pairs', 'Pares mínimos')}</h2>${optTog()}${X.pairs.map(p => `<div class="card row"><button class="btn grow" data-say="${esc(p[0])}" style="flex-direction:column;gap:0">${esc(p[0])}${oEs(p[0])}</button><span>vs</span><button class="btn grow" data-say="${esc(p[1])}" style="flex-direction:column;gap:0">${esc(p[1])}${oEs(p[1])}</button>${helpBtn(p.join(' '))}</div>`).join('')}
    <button class="btn full" id="loopAll">🔁 Repeat after me: all words</button>
    <button class="btn pri full" id="start">🎧 Start practice</button>`);
    $('#showEs') && ($('#showEs').onclick = () => { $('#esTxt').hidden = false; $('#showEs').remove(); });
    $('#loopAll').onclick = e => repeatLoop(X.words.join('. '), e.target, 2); $('#start').onclick = listenStep;
  };
  const listenStep = () => {
    if (i >= pairs.length) { i = 0; return sayStep(); }
    const p = pairs[i], ans = Math.random() < .5 ? 0 : 1;
    view(`<a href="#/pron" class="mut">← Sounds</a><h1>🎧 Which word do you hear?</h1>${uiEs() ? '<div class="es">¿Qué palabra escuchas?</div>' : ''}<p class="mut">Listen ${i + 1} / ${pairs.length}</p>
     <div style="text-align:center;margin:20px"><button class="mic" id="pl">🔊</button><div><button class="btn sm" id="pls" style="margin-top:8px">🐢 Slow</button></div></div>
     <div class="grid2">${p.map((w, k) => `<button class="btn" style="min-height:70px;font-size:22px" data-k="${k}">${esc(w)}</button>`).join('')}</div><div id="fb"></div>`);
    const play = r => speak(p[ans], r); $('#pl').onclick = () => play(); $('#pls').onclick = () => play(0.55); setTimeout(play, 300);
    $$('[data-k]').forEach(b => b.onclick = () => { if (b.dataset.done) return; $$('[data-k]').forEach(x => x.dataset.done = 1); const ok = +b.dataset.k === ans;
      b.classList.add(ok ? 'right' : 'wrong'); if (!ok) $$('[data-k]')[ans].classList.add('right'); if (ok) P.pairsOk++; S.hit(ok, $('#fb')); missed('p:' + p[ans], !ok);
      $('#fb').insertAdjacentHTML('afterbegin', `<div class="fb ${ok ? 'ok' : 'bad'}">${ok ? 'Correct!' : `It was “${esc(p[ans])}”.`} <button class="say" data-say="${esc(p[0])}">${esc(p[0])}</button> <button class="say" data-say="${esc(p[1])}">${esc(p[1])}</button>${uiEs() ? `<div class="es-t">${esc(p[0])} = ${esc(ES_W[p[0]] || '')} · ${esc(p[1])} = ${esc(ES_W[p[1]] || '')}</div>` : ''}</div><button class="btn pri full" id="nx">Next ➜</button>`);
      $('#nx').onclick = () => { i++; listenStep(); }; });
  };
  const sayList = X.pairs.slice(0, 3).flat();
  const sayStep = () => {
    if (i >= sayList.length) return endScreen(S.finish(), '#/pron', 'Sound practice complete!');
    view(`<a href="#/pron" class="mut">← Sounds</a><h1>🗣️ ${U('Now say it', 'Ahora dilo')}</h1><p class="mut">Say both words in each pair · ${i + 1} / ${sayList.length}</p><div class="card" id="w"></div>`);
    sayWidget($('#w'), sayList[i], (ok, pct, el) => { S.hit(ok, el); i++; setTimeout(sayStep, 600); });
  };
  intro();
}

/* ========== READING ========== */
const GL = {}; for (const t of TOPICS) for (const v of VOCAB[t]) GL[v.w.toLowerCase()] = [v.d, v.es];
Object.assign(GL, GLOSS_EXTRA);
function readList() { view(`<h1>📖 ${U('Reading', 'Lectura')}</h1>${skillHead('read', ['Tap any word to hear it and see its meaning.', 'Toca una palabra para escucharla y ver su significado.'])}${lessonList('read', PASSAGES, '📖', 'read')}<a class="btn pri full" href="#/cards">🃏 ${U('Vocabulary flashcards', 'Tarjetas de vocabulario')}</a>`); }
function glossFor(w) { const k = w.toLowerCase(); return GL[k] || GL[k.replace(/(es|s|ed|d|ing)$/, '')] || GL[k.replace(/s$/, '')] || null; }
function readLesson(id) {
  const X = PASSAGES.find(p => p.id === id); if (!X) return readList();
  const S = Session('read', X.lvl, id);
  const sentences = X.text.match(/[^.!?]+[.!?]+"?/g).map(x => x.trim());
  const html = sentences.map(sn => `<span class="sn">${sn.split(/(\s+)/).map(tk => /\s/.test(tk) ? tk : `<span class="wd" data-w="${esc(tk.replace(/[^A-Za-z'-]/g, ''))}">${esc(tk)}</span>`).join('')}${tx(sn)}</span>`).join(' ');
  view(`<a href="#/read" class="mut">← Reading</a><h1>${U(X.title, esOf(X.title))} <span class="chip">${LVL[X.lvl]}</span></h1>
   <div class="row"><button class="btn sm" data-say="${esc(X.text)}">🔊 Read aloud</button><button class="btn sm" data-slow="${esc(X.text)}">🐢 Slow</button></div>
   <div class="card passage">${html}</div><p class="mut">${T('Tap a word for meaning and pronunciation.', 'Toca una palabra para ver el significado.')}</p>
   <button class="btn pri full" id="qs">Answer questions ➜</button>`);
  $$('.wd').forEach(s => s.onclick = () => { const w = s.dataset.w; if (!w) return; speak(w); const g = glossFor(w); const i = pronInfo(w);
    $$('.wd.hl').forEach(x => x.classList.remove('hl')); s.classList.add('hl');
    modal(`<h2>${esc(w)} <button class="say" data-say="${esc(w)}">🔊</button> <button class="say" data-slow="${esc(w)}">🐢</button></h2><p><b>${esc(i.resp)}</b> ${i.ipa ? `<span class="ipa mut">${esc(i.ipa)}</span>` : ''}</p>
     ${g ? `<p>${esc(g[0])}</p>${uiEs() ? `<p class="es">🇸🇻 ${esc(g[1])}</p>` : `<details><summary class="mut">Español</summary><p class="es">${esc(g[1])}</p></details>`}<button class="btn full" id="addC">🃏 Add to flashcards</button>` : `<p class="mut">${T('A common word. Tap 🔊 to hear it.', 'Palabra común. Toca 🔊 para escucharla.')}</p>`}
     <button class="btn full" data-how="${esc(w)}">🗣️ How do I say this?</button>`);
    $('#addC') && ($('#addC').onclick = () => { P.srs[w.toLowerCase()] ||= { box: 0, due: Date.now(), d: g[0], es: g[1] }; save(); toast('Added 🃏'); closeModal(); }); });
  let q = 0;
  $('#qs').onclick = function qstep() {
    if (q >= X.q.length) return endScreen(S.finish(), '#/read');
    const Q = X.q[q]; const opts = Q.t === 'tf' ? ['True', 'False'] : Q.o; const optsEs = Q.t === 'tf' ? ['Verdadero', 'Falso'] : Q.o.map(o => esOf(o)); const ans = Q.t === 'tf' ? (Q.a ? 0 : 1) : Q.a;
    view(`<a href="#/read" class="mut">← Reading</a><h1>${esc(X.title)}</h1><details class="card"><summary>📄 Show text</summary><p class="passage">${esc(X.text)}</p></details>
     <p class="mut">Question ${q + 1} / ${X.q.length} · ${Q.t === 'tf' ? 'True or false?' : 'Choose the answer'}</p><div class="card"><b style="font-size:20px">${esc(Q.q)}</b>${tx(Q.q)}</div>
     ${Q.t === 'tf' ? '' : optTog()}${opts.map((o, k) => `<button class="btn full" data-o="${k}" style="flex-direction:column;gap:0">${esc(o)}${Q.t === 'tf' ? (uiEs() ? `<small class="esu">${optsEs[k]}</small>` : '') : oEs(o)}</button>`).join('')}<div id="fb"></div>`);
    $$('[data-o]').forEach(b => b.onclick = () => { if (b.dataset.done) return; $$('[data-o]').forEach(x => x.dataset.done = 1); const ok = +b.dataset.o === ans;
      b.classList.add(ok ? 'right' : 'wrong', ok ? 'pop' : 'shake'); if (!ok) $$('[data-o]')[ans].classList.add('right'); S.hit(ok, $('#fb')); missed('r:' + id + q, !ok);
      $('#fb').insertAdjacentHTML('afterbegin', `<div class="fb ${ok ? 'ok' : 'bad'}">${ok ? 'Correct! 🎉' : 'Not quite.'}</div><button class="btn pri full" id="nx">Next ➜</button>`); $('#nx').onclick = () => { q++; qstep(); }; });
  };
}

/* ========== FLASHCARDS (Leitner spaced repetition) ========== */
const BOXDAYS = [0, 1, 3, 7, 16, 35];
function cards() {
  const sel = LS.get('eq.topic', 'all');
  view(`<h1>🃏 ${U('Flashcards', 'Tarjetas')}</h1><p class="mut">${T('Spaced repetition: words you miss come back sooner.', 'Repetición espaciada: las palabras que fallas regresan antes.')}</p>
   <select id="tp"><option value="all">All topics (${Object.values(VOCAB).flat().length} words)</option>${TOPICS.map(t => `<option value="${t}" ${sel === t ? 'selected' : ''}>${t[0].toUpperCase() + t.slice(1)} (${VOCAB[t].length})</option>`).join('')}</select>
   <div class="row mut" style="margin:8px 0"><span>Learned: <b>${Object.values(P.srs).filter(c => c.box >= 2).length}</b></span><span>Due: <b>${Object.values(P.srs).filter(c => c.due <= Date.now()).length}</b></span></div><div id="fc"></div>`);
  if (sel !== 'all') $('#tp').value = sel; $('#tp').onchange = e => { LS.set('eq.topic', e.target.value); cards(); };
  const pool = (sel === 'all' ? TOPICS : [sel]).flatMap(t => VOCAB[t]);
  const due = pool.filter(v => P.srs[v.w] && P.srs[v.w].due <= Date.now()).sort((a, b) => P.srs[a.w].box - P.srs[b.w].box);
  const fresh = pool.filter(v => !P.srs[v.w]);
  const deck = [...due, ...fresh.slice(0, Math.max(0, 10 - due.length))].slice(0, 10); let i = 0;
  const S = Session('read', 1, 'cards');
  const step = () => {
    if (i >= deck.length) { $('#fc').innerHTML = `<div class="fb ok">✅ ${T('All done for now! Come back later for review.', '¡Listo por ahora! Regresa luego para repasar.')}</div>`; if (S.n) { S.finish(); } return; }
    const v = deck[i];
    $('#fc').innerHTML = `<div class="card flash" id="fl">${esc(v.w)}<div><button class="say" data-say="${esc(v.w)}">🔊</button> ${helpBtn(v.w)}</div><div class="mut">Tap to flip · ${i + 1}/${deck.length}</div></div><div id="ans"></div>`;
    speak(v.w);
    $('#fl').onclick = e => { if (e.target.closest('button')) return; $('#fl').innerHTML = `<div style="font-size:20px;font-weight:600">${esc(v.d)}</div>${SET.tr !== 'off' ? `<div class="es" style="font-size:20px">🇸🇻 ${esc(v.es)}</div>` : ''}`;
      $('#ans').innerHTML = `<div class="row"><button class="btn bad grow" id="no">😕 I forgot</button><button class="btn ok grow" id="yes">😀 I knew it</button></div>`;
      const grade = ok => { const c = P.srs[v.w] ||= { box: 0, due: 0 }; c.box = ok ? Math.min(5, c.box + 1) : 0; c.due = Date.now() + (ok ? BOXDAYS[c.box] : 0) * 864e5 + (ok ? 0 : 60e3); missed('v:' + v.w, !ok); S.hit(ok, $('#ans')); if (!ok) deck.push(v); i++; setTimeout(step, 400); };
      $('#no').onclick = () => grade(false); $('#yes').onclick = () => grade(true); };
  }; step();
}

/* ========== WRITING ========== */
function writeList() { view(`<h1>✏️ ${U('Writing', 'Escritura')}</h1>${skillHead('write', ['Fill in, order words, translate, and write your own sentences.', 'Completa, ordena, traduce y escribe tus oraciones.'])}${lessonList('write', WRITE, '✏️', 'write')}`); }
function checkFree(txt, ex) {
  const issues = [], good = []; const t = txt.trim(); const wc = t.split(/\s+/).filter(Boolean).length;
  if (wc < ex.min) issues.push([`Write at least ${ex.min} words (you have ${wc}).`, `Escribe al menos ${ex.min} palabras.`]); else good.push('Good length');
  const sents = t.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sents.some(s => /^[a-z]/.test(s))) issues.push(['Start each sentence with a capital letter.', 'Empieza cada oración con mayúscula.']); else if (t) good.push('Capital letters');
  if (t && !/[.!?]$/.test(t)) issues.push(['End with a period (.), ! or ?', 'Termina con punto, ! o ?']); else if (t) good.push('Punctuation');
  if (/\bi\b/.test(t)) issues.push(['Write "I" with a capital letter.', 'Escribe "I" siempre en mayúscula.']);
  const rules = [[/\b(i|you|we|they) has\b/i, '"I/you/we/they have", not "has".', 'Usa "have" con I/you/we/they.'], [/\b(he|she|it) (have|go|do|want|like|live|work|need|eat|play)\b/i, 'With he/she/it add -s: he goes, she has, it works.', 'Con he/she/it agrega -s: he goes, she has.'],
    [/\ba ([aeiou]\w*)/i, 'Use "an" before a vowel sound: an apple.', 'Usa "an" antes de vocal: an apple.'], [/\ban ([bcdfgjklmnpqrstvwxz]\w*)/i, 'Use "a" before a consonant sound: a book.', 'Usa "a" antes de consonante: a book.'],
    [/\b(he|she|it) (are|am)\b/i, 'Use "is" with he/she/it.', 'Usa "is" con he/she/it.'], [/\b(they|we|you) is\b/i, 'Use "are" with we/you/they.', 'Usa "are" con we/you/they.'], [/\bI is\b/, 'Use "I am".', 'Usa "I am".'],
    [/\bpeoples\b/i, '"People" is already plural.', '"People" ya es plural.'], [/\b(have|has) (\d+|twenty|thirty) years\b/i, 'For age say "I am 20 years old".', 'Para la edad: "I am 20 years old".'], [/\bmore (better|bigger|cheaper)\b/i, 'Don\'t use "more" with -er: say "better".', 'No uses "more" con -er.'], [/\bdid (went|ate|saw)\b/i, 'After "did" use the base verb: did go.', 'Después de "did" usa el verbo base.']];
  for (const [re, en, es] of rules) { const m = t.match(re); if (m && !(re.source.includes('\\ba ([aeiou]') && /^(u[ns]|one|eu)/i.test(m[1]) ) && !(re.source.includes('\\ban ([bcd') && /^h(our|onest)/i.test(m[1]))) issues.push([en + ` (“${m[0]}”)`, es]); }
  const used = ex.vocab.filter(v => new RegExp('\\b' + v + '\\b', 'i').test(t));
  if (!used.length) issues.push([`Try to use one of: ${ex.vocab.join(', ')}.`, 'Usa una de las palabras sugeridas.']); else good.push('Used: ' + used.join(', '));
  return { issues, good, ok: !issues.length };
}
function writeLesson(id) {
  const X = WRITE.find(w => w.id === id); if (!X) return writeList(); const S = Session('write', X.lvl, id); let i = 0;
  const head = () => `<a href="#/write" class="mut">← Writing</a><h1>${U(X.title, esOf(X.title))}</h1><p class="mut">${i + 1} / ${X.ex.length}</p>`;
  const next = (ok, extra = '') => { $('#fb').innerHTML = `<div class="fb ${ok ? 'ok' : 'bad'}">${ok ? 'Correct! 🎉' : 'Not quite.'} ${extra}</div><button class="btn pri full" id="nx">Next ➜</button>`; $('#nx').onclick = () => { i++; step(); }; $('#nx').scrollIntoView({ behavior: 'smooth', block: 'center' }); };
  const step = () => {
    if (i >= X.ex.length) return endScreen(S.finish(), '#/write');
    const E = X.ex[i];
    if (E.t === 'fill') {
      view(head() + `<p>${T('Choose the missing word.', 'Elige la palabra que falta.')}</p><div class="card target">${esc(E.s).replace('___', '<u>&nbsp;?&nbsp;</u>')}${tx(E.s.replace('___', E.a))}</div>${E.o.map(o => `<button class="btn full" data-o="${esc(o)}">${esc(o)}</button>`).join('')}<div id="fb"></div>`);
      $$('[data-o]').forEach(b => b.onclick = () => { if (b.dataset.d) return; $$('[data-o]').forEach(x => x.dataset.d = 1); const ok = b.dataset.o === E.a; b.classList.add(ok ? 'right' : 'wrong'); if (!ok) $(`[data-o="${E.a}"]`).classList.add('right');
        const full = E.s.replace('___', E.a); S.hit(ok, $('#fb')); missed('w:' + full, !ok); next(ok, `<div>${esc(full)} <button class="say" data-say="${esc(full)}">🔊</button></div>`); });
    } else if (E.t === 'order') {
      const tw = E.a.split(' '); let bank = shuffle(tw.map((w, k) => ({ w, k }))); if (bank.map(x => x.w).join(' ') === E.a) bank.reverse(); let line = [];
      view(head() + `<p>${T('Tap the words in the right order.', 'Toca las palabras en el orden correcto.')}</p>${tx(E.a) ? `<div class="card">🇸🇻 ${SET.tr === 'always' ? '' : 'Pista: '}${tx(E.a)}</div>` : ''}<div class="tiles" id="line"></div><div class="tiles" id="bank" style="border-style:solid"></div><button class="btn pri full" id="chk" disabled>Check</button><div id="fb"></div>`);
      const draw = () => { $('#line').innerHTML = line.map((x, j) => `<button class="tile" data-l="${j}">${esc(x.w)}</button>`).join(''); $('#bank').innerHTML = bank.map((x, j) => `<button class="tile" data-b="${j}">${esc(x.w)}</button>`).join(''); $('#chk').disabled = bank.length > 0;
        $$('[data-b]').forEach(b => b.onclick = () => { line.push(bank.splice(+b.dataset.b, 1)[0]); draw(); }); $$('[data-l]').forEach(b => b.onclick = () => { if ($('#chk').dataset.d) return; bank.push(line.splice(+b.dataset.l, 1)[0]); draw(); }); };
      draw(); $('#chk').onclick = () => { if ($('#chk').dataset.d) return; $('#chk').dataset.d = 1; const ok = line.map(x => x.w).join(' ') === E.a; $('#line').classList.add(ok ? 'pop' : 'shake'); S.hit(ok, $('#fb')); missed('w:' + E.a, !ok); next(ok, `<div>${esc(E.a)}. <button class="say" data-say="${esc(E.a)}">🔊</button></div>`); };
    } else if (E.t === 'tr') {
      view(head() + `<p>${T('Translate into English.', 'Traduce al inglés.')}</p><div class="card target">🇸🇻 ${esc(E.es)}</div><textarea id="tx" autocapitalize="sentences" placeholder="Type in English…"></textarea><button class="btn pri full" id="chk">Check</button><div id="fb"></div>`);
      $('#chk').onclick = () => { if ($('#chk').dataset.d) return; const v = $('#tx').value; if (!v.trim()) return; $('#chk').dataset.d = 1;
        const nv = norm(v), ok = E.a.some(a => norm(a) === nv || (nv.length > 10 && lev(norm(a), nv) <= 2)); S.hit(ok, $('#fb')); missed('w:' + E.es, !ok);
        next(ok, `<div>${ok && !E.a.some(a => norm(a) === nv) ? 'Small typo — ' : ''}Answer: ${esc(E.a[0])}. <button class="say" data-say="${esc(E.a[0])}">🔊</button></div>`); };
    } else {
      view(head() + `<p>${T('Free writing:', 'Escritura libre:')}</p><div class="card"><b style="font-size:20px">${esc(E.p)}</b>${tx(E.p)}<div class="mut">Min ${E.min} words · Try: ${E.vocab.map(v => `<span class="chip">${esc(v)}</span>`).join('')}</div></div>
       <textarea id="tx" autocapitalize="sentences" placeholder="Write here…"></textarea><button class="btn pri full" id="chk">Check my writing</button><div id="fb"></div>`);
      $('#chk').onclick = () => { const r = checkFree($('#tx').value, E);
        const list = `${r.good.map(g => `<div>✅ ${esc(g)}</div>`).join('')}${r.issues.map(([en, es]) => `<div>⚠️ ${T(en, es)}</div>`).join('')}`;
        if (r.ok || $('#chk').dataset.tries) { $('#chk').remove(); S.hit(r.ok, $('#fb')); $('#fb').innerHTML = `<div class="fb ${r.ok ? 'ok' : 'info'}">${r.ok ? 'Great writing! 🎉' : 'Good effort! Keep these tips in mind:'}${list}</div><button class="btn full" data-say="${esc($('#tx').value)}">🔊 Hear my text</button><button class="btn pri full" id="nx">Next ➜</button>`; $('#nx').onclick = () => { i++; step(); }; }
        else { $('#chk').dataset.tries = 1; $('#chk').textContent = 'Check again'; $('#fb').innerHTML = `<div class="fb info">${T('Almost! Fix these and check again:', '¡Casi! Corrige y revisa otra vez:')}${list}</div>`; } };
    }
  }; step();
}

/* ========== PROGRESS, BADGES, MORE ========== */
function progress() {
  const days = [...Array(14)].map((_, k) => { const d = new Date(); d.setDate(d.getDate() - 13 + k); const key = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); return [key, P.xpLog[key] || 0]; });
  const mx = Math.max(P.goal, ...days.map(d => d[1]));
  const bars = days.map(([k, v], j) => `<rect x="${j * 22 + 4}" y="${130 - 120 * v / mx}" width="16" height="${120 * v / mx}" rx="4" fill="var(--pri)"/><text x="${j * 22 + 12}" y="146" font-size="9" text-anchor="middle" fill="var(--mut)">${k.slice(8)}</text>`).join('');
  const goalY = 130 - 120 * P.goal / mx;
  const acc = SKILLS.map(s => { const k = P.skills[s]; return [s, k.total ? Math.round(100 * k.correct / k.total) : null, k]; });
  const rated = acc.filter(a => a[1] != null).sort((a, b) => b[1] - a[1]);
  const weak = Object.entries(P.missed).sort((a, b) => b[1] - a[1]).slice(0, 6);
  view(`<h1>📈 ${U('Progress', 'Progreso')}</h1><div class="card"><b>XP – last 14 days</b><svg class="chart" viewBox="0 0 312 150">${bars}<line x1="0" x2="312" y1="${goalY}" y2="${goalY}" stroke="var(--warn)" stroke-dasharray="4"/></svg><div class="mut">Dashed line = daily goal (${P.goal} XP) · Total ${P.xp} XP · Best streak ${P.best} days</div></div>
   <div class="card"><b>Skills</b>${acc.map(([s, a, k]) => `<div style="margin:8px 0"><div class="row"><span class="grow">${SN(s)} · ${LVL[k.lvl]}</span><span class="mut">${a == null ? '—' : a + '%'} · ${k.total} answers</span></div><div class="bar"><i style="width:${a || 0}%"></i></div></div>`).join('')}
   ${rated.length ? `<p>💪 Strongest: <b>${SN(rated[0][0])}</b>${rated.length > 1 ? ` · 🎯 Needs work: <b>${SN(rated[rated.length - 1][0])}</b>` : ''}</p>` : '<p class="mut">Do some lessons to see strengths.</p>'}</div>
   ${weak.length ? `<div class="card"><b>🔁 Review these (missed most)</b>${weak.map(([k, n]) => { const t = k.slice(2); return `<div class="row" style="margin-top:6px"><span class="grow">${esc(t)}</span><span class="chip">×${n}</span>${k[0] !== 'r' ? `<button class="say" data-slow="${esc(t)}">🐢</button>` : ''}</div>`; }).join('')}</div>` : ''}`);
}
function badges() { checkBadges(); view(`<h1>🏅 ${U('Badges', 'Insignias')}</h1><p class="mut">${Object.keys(P.badges).length} / ${BADGES.length} earned</p>${BADGES.map(([id, ic, n, es]) => `<div class="card badge ${P.badges[id] ? '' : 'off'}"><span class="b">${ic}</span><div class="grow"><b>${esc(n)}</b>${uiEs() ? `<small class="esu">${esc(es)}</small>` : ''}<div class="mut">${P.badges[id] ? 'Earned ' + P.badges[id] : 'Locked'}</div></div></div>`).join('')}
 <h2>${U('Ranks', 'Rangos')}</h2><div class="card">${RANKS.map(r => `<div class="row" style="margin:4px 0"><span style="font-size:24px">${r[2]}</span><span class="grow">${U(r[1], r[3])}</span><span class="mut">${r[0]} XP</span></div>`).join('')}</div>`); }
const LIVE = 'https://sagastizado12-dotcom.github.io/english-quest/';
function more() {
  view(`<h1>☰ ${U('More', 'Más')}</h1>
  <div class="card"><b>👤 ${U('Learner profiles', 'Perfiles')}</b><p class="mut">${T('Progress is saved only on this device. Each learner has their own profile.', 'El progreso se guarda solo en este dispositivo. Cada persona tiene su perfil.')}</p>
   ${profiles.map(p => `<div class="row" style="margin:6px 0"><button class="btn grow ${p.id === P.id ? 'sel' : ''}" data-prof="${p.id}">${p.id === P.id ? '✅ ' : ''}${esc(p.name)}</button>${profiles.length > 1 && p.id !== P.id ? `<button class="btn sm" data-del="${p.id}">🗑</button>` : ''}</div>`).join('')}
   <div class="row"><input type="text" id="newName" placeholder="New learner name" style="flex:1"><button class="btn pri" id="addP">Add</button></div></div>
  <div class="card"><b>⚙️ ${U('Settings', 'Ajustes')}</b>
   <div style="padding:8px 0;border-bottom:1px solid var(--line)"><div>🇸🇻 ${U('Spanish translations', 'Traducciones al español')}</div><div class="row" style="margin-top:6px">${[['always', 'Always show', 'Siempre'], ['tap', 'Tap to show', 'Tocar para ver'], ['off', 'Off', 'Apagado']].map(([v, en, es]) => `<button class="btn sm grow ${SET.tr === v ? 'sel' : ''}" data-trm="${v}" style="flex-direction:column;gap:0">${esc(en)}<small class="esu">${es}</small></button>`).join('')}</div></div>
   <label class="switch"><span>🌙 ${U('Dark mode', 'Modo oscuro')}</span><input type="checkbox" id="sTh" ${SET.theme === 'dark' ? 'checked' : ''}></label>
   <label class="switch"><span>🔔 ${U('Sounds & effects', 'Sonidos y efectos')}</span><input type="checkbox" id="sSo" ${SET.sound ? 'checked' : ''}></label>
   <label class="switch"><span>🎯 ${U('Daily goal (XP)', 'Meta diaria')}</span><select id="sGo" style="width:110px">${[20, 30, 50, 80, 120, 200].map(g => `<option ${g === P.goal ? 'selected' : ''}>${g}</option>`).join('')}</select></label>
   <label class="switch"><span>🗣️ ${U('Voice speed', 'Velocidad de voz')}</span><input type="range" id="sRa" min="0.5" max="1.2" step="0.1" value="${SET.rate}" style="width:140px"></label></div>
  ${micCardHTML()}<div class="card"><b>📤 ${U('Share English Quest', 'Compartir')}</b><p class="mut">Scan to open on another phone. Each person keeps their own progress on their device.</p>
   <img src="qr.png" alt="QR code for ${LIVE}" style="width:200px;display:block;margin:8px auto;border-radius:12px;background:#fff;padding:6px"><div class="mut" style="text-align:center;word-break:break-all">${LIVE}</div>
   <button class="btn pri full" id="share">📤 Share link</button></div>
  <div class="card"><b>📲 ${U('Install on iPhone', 'Instalar en iPhone')}</b><p class="mut">${T('In Safari tap Share ⬆️ then "Add to Home Screen". Works offline after the first visit.', 'En Safari toca Compartir ⬆️ y "Agregar a inicio". Funciona sin internet después de la primera visita.')}</p>
   <p class="mut">🎤 ${T('Speaking scores use your phone\'s speech recognition, which usually needs internet and Siri & Dictation turned on. Listening, lessons and saving all work offline.', 'La evaluación de voz usa el reconocimiento del teléfono, que normalmente necesita internet y Siri y Dictado activados.')}</p></div>
  <div class="card"><b>💾 ${U('Backup', 'Copia de seguridad')}</b><p class="mut">Export this learner's progress as a JSON file, or import a backup.</p><button class="btn full" id="exp">⬇️ Export progress</button><label class="btn full">⬆️ Import backup<input type="file" id="imp" accept="application/json,.json" hidden></label></div>
  <a class="btn full" href="#/badges">🏅 Badges</a><a class="btn full" href="#/progress">📈 Progress</a><p class="mut" style="text-align:center">English Quest · offline-ready · no accounts, no ads</p>`);
  $$('[data-prof]').forEach(b => b.onclick = () => { loadProfile(b.dataset.prof); renderStats(); more(); toast('Hi, ' + P.name + '!'); });
  $$('[data-del]').forEach(b => b.onclick = () => { if (!confirm('Delete this profile and its progress?')) return; profiles = profiles.filter(p => p.id !== b.dataset.del); LS.set('eq.profiles', profiles); localStorage.removeItem('eq.p.' + b.dataset.del); more(); });
  $('#addP').onclick = () => { const n = $('#newName').value.trim(); if (!n) return; addProfile(n); renderStats(); more(); };
  $$('[data-trm]').forEach(b => b.onclick = () => { SET.tr = b.dataset.trm; saveSet(); renderNav(); more(); });
  $('#sTh').onchange = e => { SET.theme = e.target.checked ? 'dark' : 'light'; saveSet(); applyTheme(); };
  $('#sSo').onchange = e => { SET.sound = e.target.checked; saveSet(); };
  $('#sGo').onchange = e => { P.goal = +e.target.value; save(); };
  $('#sRa').onchange = e => { SET.rate = +e.target.value; saveSet(); speak('This is my speed'); };
  $('#share').onclick = async () => { const data = { title: 'English Quest', text: 'Learn English with me! 🇺🇸⭐', url: LIVE };
    if (navigator.share) { try { await navigator.share(data); return; } catch (e) { if (e.name === 'AbortError') return; } }
    try { await navigator.clipboard.writeText(LIVE); toast('🔗 Link copied!'); } catch { prompt('Copy this link:', LIVE); } };
  $('#exp').onclick = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify({ app: 'english-quest', v: 1, profile: P }, null, 1)], { type: 'application/json' })); a.download = `english-quest-${P.name.replace(/\W+/g, '_')}-${today()}.json`; a.click(); };
  $('#imp').onchange = async e => { try { const j = JSON.parse(await e.target.files[0].text()); const p = j.profile; if (!p || typeof p.xp !== 'number') throw 0;
    if (!profiles.find(x => x.id === p.id)) profiles.push({ id: p.id, name: p.name }); LS.set('eq.profiles', profiles); LS.set('eq.p.' + p.id, p); loadProfile(p.id); renderStats(); toast('✅ Imported ' + p.name); more(); } catch { alert('That file is not a valid English Quest backup.'); } };
}
function welcome() {
  view(`<div class="card" style="text-align:center;margin-top:30px"><div style="font-size:64px">⭐</div><h1>Welcome to English Quest!</h1><p class="es">¡Bienvenido! Aprende inglés jugando.</p>
   <p>${T("What's your name?", '¿Cómo te llamas?')}</p><input type="text" id="nm" placeholder="Your name" autocomplete="given-name">
   
   <button class="btn pri full" id="go">Start ➜</button></div>`);
  $('#go').onclick = () => { addProfile($('#nm').value.trim() || 'Learner'); renderStats(); location.hash = '#/home'; route(); };
}

/* ========== Router & boot ========== */
const NAVES = { home: 'Inicio', speak: 'Hablar', pron: 'Sonidos', read: 'Leer', write: 'Escribir', more: 'Más' };
function renderNav() { $$('#tabs a').forEach(a => { a.querySelector('small')?.remove(); if (uiEs()) a.insertAdjacentHTML('beforeend', `<small class="esn">${NAVES[a.dataset.t]}</small>`); }); }
function applyTheme() { document.documentElement.dataset.theme = SET.theme; }
function route() {
  closeModal(); loopOn = false; if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (!P) { $('#tabs').hidden = true; return welcome(); } $('#tabs').hidden = false;
  const [, a, b] = (location.hash || '#/home').split('/');
  $$('#tabs a').forEach(x => x.classList.toggle('on', x.dataset.t === a));
  ({ home, speak: () => b ? speakLesson(b) : speakList(), pron: () => b ? pronLesson(b) : pronList(), read: () => b ? readLesson(b) : readList(), write: () => b ? writeLesson(b) : writeList(), cards, progress, badges, more }[a] || home)();
}
applyTheme(); renderNav(); const cur = LS.get('eq.current', null); if (cur) loadProfile(cur); if (!P && profiles[0]) loadProfile(profiles[0].id);
renderStats(); window.addEventListener('hashchange', route); route();
$('#homeBtn').onclick = () => { location.hash = '#/home'; };
refreshMic(); addEventListener('online', route); addEventListener('offline', () => toast('📴 Offline — lessons still work'));
if ('serviceWorker' in navigator) addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
