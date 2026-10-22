// Speech scoring: exact word matching after formatting-only normalization.
// Normalizes: case, punctuation, contractions, digits/times vs words, true homophones.
// Does NOT accept mispronunciations (no fuzzy/phonetic matching).
(function (root) {
  const CONTR = { "i'm": 'i am', "you're": 'you are', "he's": 'he is', "she's": 'she is', "it's": 'it is', "we're": 'we are', "they're": 'they are', "that's": 'that is', "there's": 'there is', "what's": 'what is', "where's": 'where is', "who's": 'who is', "how's": 'how is', "let's": 'let us',
    "don't": 'do not', "doesn't": 'does not', "didn't": 'did not', "can't": 'can not', "cannot": 'can not', "won't": 'will not', "isn't": 'is not', "aren't": 'are not', "wasn't": 'was not', "weren't": 'were not', "haven't": 'have not', "hasn't": 'has not', "couldn't": 'could not', "shouldn't": 'should not', "wouldn't": 'would not',
    "i'll": 'i will', "you'll": 'you will', "he'll": 'he will', "she'll": 'she will', "we'll": 'we will', "they'll": 'they will', "i've": 'i have', "you've": 'you have', "we've": 'we have', "they've": 'they have', "i'd": 'i would', "you'd": 'you would', "he'd": 'he would', "she'd": 'she would', "we'd": 'we would', "they'd": 'they would', "o'clock": 'oclock' };
  // True homophones only (recognizer cannot distinguish them by sound)
  const HOMO = { too: 'to', two: 'to', four: 'for', fore: 'for', won: 'one', ate: 'eight', write: 'right', rite: 'right', hear: 'here', know: 'no', buy: 'by', bye: 'by', sea: 'see', eye: 'i', meat: 'meet', weak: 'week', our: 'hour', their: 'there', whole: 'hole', knew: 'new', son: 'sun', wait: 'weight', whether: 'weather', flour: 'flower', mail: 'male', pair: 'pear', pare: 'pear', sale: 'sail', tail: 'tale', piece: 'peace', ad: 'add', bee: 'be', dear: 'deer', fair: 'fare', hi: 'high', made: 'maid', night: 'knight', not: 'knot', plane: 'plain', road: 'rode', rowed: 'rode', some: 'sum', steal: 'steel', threw: 'through', way: 'weigh', wood: 'would', where: 'wear', ware: 'wear', which: 'witch', yolk: 'yoke' };
  const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  function numWords(n) { n = +n; if (n < 20) return ONES[n]; if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : '');
    if (n < 1000) return ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + numWords(n % 100) : ''); if (n < 1e6) return numWords(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + numWords(n % 1000) : ''); return String(n); }
  function tokens(s) {
    let t = String(s).toLowerCase().replace(/[’‘`]/g, "'");
    t = t.replace(/\$(\d+)/g, '$1 dollars');
    t = t.replace(/\b(\d{1,2}):(\d{2})\s*(a\.?m\.?|p\.?m\.?)?/g, (_, h, m) => ' ' + numWords(h) + ' ' + (m === '00' ? 'oclock' : (m[0] === '0' ? 'oh ' + numWords(m[1]) : numWords(m))) + ' ');
    t = t.replace(/(\d+)(st|nd|rd|th)\b/g, '$1');
    t = t.replace(/\d{1,3}(,\d{3})+|\d+/g, d => ' ' + numWords(d.replace(/,/g, '')) + ' ');
    const out = [];
    for (let w of t.split(/[\s\-–—]+/)) { w = w.replace(/[^a-z']/g, '').replace(/^'+|'+$/g, ''); if (!w) continue;
      const exp = CONTR[w] || w.replace(/'s$/, 's').replace(/'/g, ''); for (const x of exp.split(' ')) out.push(HOMO[x] || x); }
    // "seven o clock" -> oclock
    for (let i = 0; i < out.length - 1; i++) if (out[i] === 'o' && out[i + 1] === 'clock') out.splice(i, 2, 'oclock');
    return out;
  }
  // LCS alignment of exact tokens; returns per-target-word match flags
  function align(tw, aw) {
    const n = tw.length, m = aw.length, L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = tw[i] === aw[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    const res = new Array(n).fill(false); let i = 0, j = 0;
    while (i < n && j < m) { if (tw[i] === aw[j]) { res[i] = true; i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++; }
    return { res, matched: L[0][0], extra: m - L[0][0] };
  }
  // Map normalized-token flags back onto the displayed target words
  function score(target, alts) {
    const disp = String(target).split(/\s+/).filter(Boolean); const map = []; const tw = [];
    disp.forEach((w, k) => tokens(w).forEach(t => { tw.push(t); map.push(k); }));
    let best = null;
    for (const a of (alts || []).filter(x => x != null)) { const al = align(tw, tokens(a));
      if (!best || al.matched > best.matched || (al.matched === best.matched && al.extra < best.extra)) best = { ...al, heard: a }; }
    if (!best) best = { res: new Array(tw.length).fill(false), matched: 0, extra: 0, heard: '' };
    const wordOk = disp.map((_, k) => { const idx = map.map((m, i) => m === k ? i : -1).filter(i => i >= 0); return idx.length ? idx.every(i => best.res[i]) : true; });
    const counted = disp.filter((_, k) => map.includes(k)).length || 1;
    const pct = Math.round(100 * wordOk.filter((ok, k) => ok && map.includes(k)).length / counted);
    return { pct, res: wordOk, heard: best.heard };
  }
  const api = { tokens, score, numWords, align };
  if (typeof module !== 'undefined') module.exports = api; else root.Score = api;
})(typeof window !== 'undefined' ? window : globalThis);
