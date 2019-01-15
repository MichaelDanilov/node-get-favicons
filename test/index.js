const fs = require('fs');
const test = require('ava');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);

const getFavicons = require('../index');

test('empty host', async (t) => {
  const error = await t.throws(() => { getFavicons.byUrl(); }, Error);
  t.is(error.message, 'Host must be non-zero string');
});

test('get example.com', async (t) => {
  mock.onGet('https://example.com').replyOnce(200, '');

  const favicons = await getFavicons.byUrl('https://example.com');
  t.deepEqual(favicons, []);
});

test('read yandex.com', async (t) => {
  const fileContent = fs.readFileSync('./test/yandex-com.html', 'utf8');
  const favicons = await getFavicons.byHtml(fileContent, 'https://yandex.com');
  t.deepEqual(favicons, [{
    type: 'icon',
    imgType: null,
    href: 'https://yastatic.net/iconostasis/_/8lFaTHLDzmsEZz-5XaQg9iTWZGE.png',
    sizes: null,
  }, {
    type: 'apple-touch-icon',
    imgType: null,
    href: 'https://yastatic.net/iconostasis/_/5mdPq4V7ghRgzBvMkCaTzd2fjYg.png',
    sizes: '76x76',
  }, {
    type: 'apple-touch-icon',
    imgType: null,
    href: 'https://yastatic.net/iconostasis/_/s-hGoCQMUosTziuARBks08IUxmc.png',
    sizes: '120x120',
  }, {
    type: 'apple-touch-icon',
    imgType: null,
    href: 'https://yastatic.net/iconostasis/_/KnU823iWwj_vrPra7x9aQ-4yjRw.png',
    sizes: '152x152',
  }, {
    type: 'apple-touch-icon',
    imgType: null,
    href: 'https://yastatic.net/iconostasis/_/wT9gfGZZ80sP0VsoR6dgDyXJf2Y.png',
    sizes: '180x180',
  }, {
    type: 'og:image',
    imgType: null,
    href: 'https://yastatic.net/morda-logo/i/share-logo-ru.png',
    sizes: null,
  }]);
});

test('get mobile.twitter.com', async (t) => {
  mock.onGet('https://mobile.twitter.com').replyOnce(200, fs.readFileSync('./test/mobile-twitter-com.html', 'utf8'));
  mock.onGet('https://mobile.twitter.com/manifest.json').replyOnce(200, fs.readFileSync('./test/mobile-twitter-com-manifest-json.html', 'utf8'));

  const favicons = await getFavicons.byUrl('https://mobile.twitter.com');

  t.deepEqual(favicons, [{
    type: 'mask-icon',
    imgType: null,
    href: 'https://abs.twimg.com/responsive-web/web/icon-svg.9e211f626ec9d281.svg',
    sizes: null,
    colors: 'any',
  }, {
    type: 'icon',
    imgType: 'image/x-icon',
    href: 'https://abs.twimg.com/favicons/favicon.ico',
    sizes: null,
  }, {
    type: 'apple-touch-icon',
    imgType: null,
    href: 'https://abs.twimg.com/responsive-web/web/icon-ios.8ea219d08eafdfa4.png',
    sizes: '192x192',
  }, {
    type: 'theme-color',
    imgType: null,
    href: null,
    sizes: null,
    content: '#ffffff',
  }, {
    type: 'manifest',
    imgType: 'image/png',
    href: 'https://abs.twimg.com/responsive-web/web/icon-default.604e2486a34a2f6e.png',
    sizes: '192x192',
  }, {
    type: 'manifest',
    imgType: 'image/png',
    href: 'https://abs.twimg.com/responsive-web/web/icon-default.604e2486a34a2f6e.png',
    sizes: '512x512',
  }]);
});

test('get pwa.rocks', async (t) => {
  mock.onGet('https://pwa.rocks').replyOnce(200, fs.readFileSync('./test/pwa-rocks.html', 'utf8'));
  mock.onGet('https://pwa.rocks/pwa.webmanifest').replyOnce(200, fs.readFileSync('./test/pwa-rocks-pwa-webmanifest.html', 'utf8'));

  const favicons = await getFavicons.byUrl('https://pwa.rocks');
  t.deepEqual(favicons, [{
    type: 'icon',
    imgType: null,
    href: 'https://pwa.rocks/favicon.ico',
    sizes: null,
  }, {
    type: 'icon',
    imgType: 'image/png',
    href: 'https://pwa.rocks/images/icon-228x228.png',
    sizes: '228x228',
  }, {
    type: 'apple-touch-icon',
    imgType: 'image/png',
    href: 'https://pwa.rocks/images/icon-228x228.png',
    sizes: null,
  }, {
    type: 'manifest',
    imgType: 'image/vnd.microsoft.icon',
    href: 'https://pwa.rocks/favicon.ico',
    sizes: '32x32 16x16',
  }, {
    type: 'manifest',
    imgType: 'image/png',
    href: 'https://pwa.rocks/images/icon-144x144.png',
    sizes: '144x144',
  }, {
    type: 'manifest',
    imgType: 'image/png',
    href: 'https://pwa.rocks/images/icon-180x180.png',
    sizes: '180x180',
  }, {
    type: 'manifest',
    imgType: 'image/png',
    href: 'https://pwa.rocks/images/icon-192x192.png',
    sizes: '192x192',
  }, {
    type: 'manifest',
    imgType: 'image/png',
    href: 'https://pwa.rocks/images/icon-228x228.png',
    sizes: '228x228',
  }, {
    type: 'manifest',
    imgType: 'image/svg',
    href: 'https://pwa.rocks/images/icon.svg',
    sizes: 'any',
  }]);
});
