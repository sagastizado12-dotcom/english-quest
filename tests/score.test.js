// Run: node tests/score.test.js
const { score, tokens } = require('../score.js');
let fail = 0, n = 0;
const ok = (c, m) => { n++; if (!c) { fail++; console.log('FAIL', m); } };
const pct = (t, a) => score(t, Array.isArray(a) ? a : [a]).pct;
// Formatting-only normalization passes
ok(pct('I am twenty years old', 'I am 20 years old') === 100, 'digits vs words');
ok(pct('It is seven o\'clock', 'it is 7:00') === 100, 'time 7:00');
ok(pct('It is seven o\'clock', "It's seven o'clock.") === 100, 'contraction + punct');
ok(pct('I have a meeting at three', 'I have a meeting at 3') === 100, 'digit 3');
ok(pct('See you at ten thirty', 'see you at 10:30') === 100, 'time 10:30');
ok(pct('Here you go. That is eight dollars.', "here you go that's $8") === 100, '$8 + that\'s');
ok(pct('This one is on sale for fifteen dollars.', 'this one is on sale for 15 dollars') === 100, '15');
ok(pct('I have one brother', 'I have 1 brother') === 100, '1');
ok(pct('I would like a chicken sandwich, please', 'I\'d like a chicken sandwich please') === 100, "I'd");
ok(pct('I am Ana', "I'm Ana") === 100, "I'm");
ok(pct('Can I have the menu?', 'CAN I HAVE THE MENU') === 100, 'case');
ok(pct('I want to go', 'I want two go') === 100, 'homophone to/two');
ok(pct('This is for you', 'this is four you') === 100, 'homophone for/four');
ok(pct('One, two, three', '1 2 3') === 100, 'numbers list');
ok(pct('One, two, three', 'one too three') === 100, 'two/too');
ok(pct('I would rather walk than take the bus', 'I would rather walk then take the bus') < 100, 'than/then are NOT homophones');
// Mispronunciations must NOT pass
ok(pct('three', 'tree') === 0, 'tree != three');
ok(pct('thank you', 'sank you') === 50, 'sank you != thank you');
ok(pct('Thank you very much', 'sank you berry much') === 50, 'th/v errors counted');
ok(pct('ship', 'sheep') === 0, 'ship/sheep minimal pair');
ok(pct('school', 'eschool') === 0, 'eschool');
ok(pct('walked', 'walk') === 0, 'missing -ed');
ok(pct('I finished the report yesterday', 'I finish the report yesterday') === 80, 'finish vs finished');
ok(pct('delicious', 'delicius') === 0, 'no fuzzy spelling match');
ok(pct('The soup is delicious', 'the soup is') === 75, 'missed word');
// Best alternative is chosen
const r = score('think', ['sink', 'think', 'thing']); ok(r.pct === 100 && r.heard === 'think', 'picks matching alternative');
const r2 = score('Turn left at the corner', ['turn left at the corn', 'turn left at the corner']); ok(r2.pct === 100, 'best alt full sentence');
ok(score('three', ['tree', 'free']).pct === 0, 'no alt matches -> 0');
// Missed-word flags
const r3 = score('Thank you very much', ['sank you berry much']); ok(JSON.stringify(r3.res) === '[false,true,false,true]', 'flags ' + JSON.stringify(r3.res));
ok(tokens("o'clock").join() === 'oclock' && tokens('7 o clock').join(' ') === 'seven oclock', 'oclock tokens');
console.log(`${n - fail}/${n} passed`); process.exit(fail ? 1 : 0);
