const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const http = require('node:http');
const { test } = require('node:test');

const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const config = read('public/js/welcome-config.js');
const shared = read('public/js/shared.js');
const home = read('index.html');
const welcome = read('pages/welcome.html');
const redirect = home.slice(home.indexOf('// 迎新宣傳期間'), home.indexOf('</script>', home.indexOf('// 迎新宣傳期間')));
const timer = welcome.slice(welcome.indexOf('// ── 實時倒數'), welcome.indexOf('// ── 一鍵複製'));

function clockAt(time) {
  return class extends Date {
    constructor(...args) { super(...(args.length ? args : [time])); }
    static now() { return new Date(time).getTime(); }
  };
}

function visit({ time = '2026-09-16T12:00:00+08:00', url = 'https://anime.nycu.cc/index.html', referrer = '', visited = false, storageBlocked = false } = {}) {
  const location = new URL(url);
  const storage = visited ? { visited_home: '1' } : {};
  let destination = null;
  location.replace = value => { destination = value; };
  vm.runInNewContext(config + redirect, {
    Date: clockAt(time), URL, URLSearchParams,
    window: { location }, document: { referrer },
    sessionStorage: {
      getItem(key) { if (storageBlocked) throw Error('Storage blocked'); return storage[key]; },
      setItem(key, value) { if (storageBlocked) throw Error('Storage blocked'); storage[key] = value; },
    },
  });
  return { destination, location };
}

test('only first external visits during the promotion redirect to welcome', () => {
  assert.equal(visit().destination, 'pages/welcome.html');
  assert.equal(visit({ time: '2026-09-01T00:00:00+08:00' }).destination, 'pages/welcome.html');
  for (const time of ['2026-08-31T23:59:59+08:00', '2026-09-23T21:30:00+08:00', '2027-09-01T12:00:00+08:00']) {
    assert.equal(visit({ time }).destination, null);
  }
  assert.equal(visit({ visited: true }).destination, null);
  assert.equal(visit({ referrer: 'https://external.example/welcome.html' }).destination, 'pages/welcome.html');
});

test('section destinations, internal navigation and all homepage flags are retained', () => {
  for (const suffix of ['#contact', '#activity', '?home=1', '?skip=1', '?from=welcome']) {
    const result = visit({ url: 'https://anime.nycu.cc/index.html' + suffix });
    assert.equal(result.destination, null, suffix);
    assert.ok(result.location.href.endsWith(suffix));
  }
  for (const page of ['charter', 'officers', 'welcome']) {
    assert.equal(visit({ referrer: `https://anime.nycu.cc/pages/${page}.html` }).destination, null);
  }
  assert.equal(visit({ url: 'https://example.com/club/index.html#contact' }).destination, null);
});

test('blocked session storage does not interrupt navigation decisions', () => {
  assert.equal(visit({ storageBlocked: true }).destination, 'pages/welcome.html');
  assert.equal(visit({ storageBlocked: true, url: 'https://anime.nycu.cc/?home=1' }).destination, null);
  assert.equal(visit({ storageBlocked: true, url: 'https://anime.nycu.cc/#contact' }).destination, null);
});

test('countdown status follows the classroom, clubroom and ending boundaries', () => {
  for (const [time, status] of [
    ['2026-09-23T18:59:59+08:00', '倒數計時中'],
    ['2026-09-23T19:00:00+08:00', '活動進行中！歡迎前往 A203'],
    ['2026-09-23T20:39:59+08:00', '活動進行中！歡迎前往 A203'],
    ['2026-09-23T20:40:00+08:00', '社辦交流中！歡迎前往活動中心 5F 527'],
    ['2026-09-23T21:29:59+08:00', '社辦交流中！歡迎前往活動中心 5F 527'],
    ['2026-09-23T21:30:00+08:00', '活動已圓滿結束'],
    ['2026-09-23T21:45:00+08:00', '活動已圓滿結束'],
  ]) {
    const elements = {};
    vm.runInNewContext(config + timer, {
      Date: clockAt(time), setInterval() {},
      document: { getElementById: id => elements[id] ||= { textContent: '' } },
    });
    assert.equal(elements.countdownStatus.textContent, status, time);
    if (time.includes('18:59:59')) assert.equal(elements.cdSeconds.textContent, '01');
    else for (const id of ['cdDays', 'cdHours', 'cdMinutes', 'cdSeconds']) assert.equal(elements[id].textContent, '00');
  }
});

test('calendar dates match the shared event configuration', () => {
  const context = {};
  vm.runInNewContext(config, context);
  const calendar = new URL(welcome.match(/href="(https:\/\/calendar\.google\.com[^\"]+)"/)[1]);
  const stamp = value => new Date(value).toISOString().replace(/[-:]/g, '').replace('.000', '');
  assert.equal(calendar.searchParams.get('dates'), `${stamp(context.welcomeEvent.start)}/${stamp(context.welcomeEvent.end)}`);
});

function classList() {
  const values = new Set();
  return { contains: value => values.has(value), toggle(value, enabled) { if (enabled) values.add(value); else values.delete(value); } };
}

test('system theme changes keep following the system until a manual choice', () => {
  const html = { classList: classList() };
  const storage = {};
  const icons = { '.icon-moon': { classList: classList() }, '.icon-sun': { classList: classList() } };
  let change, click;
  const button = { querySelector: selector => icons[selector], addEventListener: (event, listener) => { click = listener; } };
  vm.runInNewContext(shared + ';initShared();', {
    document: { documentElement: html, getElementById: () => null, querySelectorAll: () => [button] },
    window: { matchMedia: () => ({ addEventListener: (event, listener) => { change = listener; } }) },
    localStorage: { getItem: key => storage[key], setItem: (key, value) => { storage[key] = value; } },
  });
  for (const dark of [true, false, true, false]) {
    change({ matches: dark });
    assert.equal(html.classList.contains('dark'), dark);
    assert.equal(icons['.icon-moon'].classList.contains('hidden'), dark);
    assert.equal(storage.theme, undefined);
  }
  click();
  assert.equal(storage.theme, 'dark');
  change({ matches: false });
  assert.equal(html.classList.contains('dark'), true);
  click();
  assert.equal(storage.theme, 'light');
  change({ matches: true });
  assert.equal(html.classList.contains('dark'), false);
});

test('local homepage preserves browser routing and welcome alias resolves all navigation', async () => {
  process.env.NODE_ENV = 'production';
  const app = require('../server');
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const get = pathname => new Promise((resolve, reject) => {
    http.get(base + pathname, response => {
      let body = '';
      response.on('data', chunk => { body += chunk; });
      response.on('end', () => resolve({ status: response.statusCode, location: response.headers.location, body }));
    }).on('error', reject);
  });
  try {
    for (const pathname of ['/', '/index.html', '/?home=1', '/?skip=1', '/?from=welcome']) {
      const response = await get(pathname);
      assert.equal(response.status, 200, pathname);
      assert.equal(response.body, home);
    }
    const alias = await get('/welcome');
    assert.equal(alias.status, 302);
    assert.equal(alias.location, '/pages/welcome.html');
    assert.equal((await get(alias.location)).body, welcome);
    const nav = {};
    vm.runInNewContext(shared + ';buildNav("../", "welcome");', { document: { getElementById: () => nav } });
    for (const match of nav.innerHTML.matchAll(/href="([^"]+)"/g)) {
      const target = new URL(match[1], base + alias.location);
      assert.equal((await get(target.pathname + target.search)).status, 200, target.href);
      if (target.pathname === '/index.html') assert.equal(target.searchParams.get('home'), '1');
    }
    assert.equal((await get('/public/js/welcome-config.js')).status, 200);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
