global.window = global; require('../data.js'); require('../es.js'); require('../speak.js'); const S = require('../score.js');
let fail = 0, n = 0; const chk = (c, m) => { n++; if (!c) { fail++; console.log('FAIL', m); } };
const strs = [];
for (const l of SPEAK) { strs.push(l.title); for (const it of l.items) { if (Array.isArray(it)) strs.push(it[0]); else { strs.push((it.q || it.t)[0]); chk(it.a.length >= 2, 'accept>=2 ' + l.id); it.a.forEach(a => strs.push(a[0])); } } chk(l.items.length >= 8 && l.items.length <= 10, 'items ' + l.id); }
for (const r of ROLEPLAYS) { strs.push(r.title); r.turns.forEach(t => { strs.push(t.app); chk(t.replies.length >= 2, 'replies ' + r.id); strs.push(...t.replies); }); }
for (const x of strs) { chk(ES[x], 'no ES: ' + x); chk(S.score(x, [x.toLowerCase().replace(/[.,!?]/g, '')]).pct === 100, 'self-score ' + x); }
// strictness: a wrong answer to a question does not pass any accepted answer
const it = SPEAK.find(l => l.id === 's1').items.find(i => i.q && /name/.test(i.q[0])); chk(Math.max(...it.a.map(a => S.score(a[0], ['my game is anna']).pct)) < 80, 'strict answer');
console.log(`${SPEAK.length} lessons, ${ROLEPLAYS.length} role-plays, ${strs.length} strings: ${n - fail}/${n} passed`); process.exit(fail ? 1 : 0);
