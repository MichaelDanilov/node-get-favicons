const fs = require('fs');
const test = require('ava');

const getFavicons = require('../index');

test('empty host', async (t) => {
  const error = await t.throws(() => { getFavicons.byUrl(); }, Error);
  t.is(error.message, 'Host must be non-zero string');
});

// let's hope that example.com has never changed
test('get example.com', async (t) => {
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
  const favicons = await getFavicons.byUrl('https://mobile.twitter.com');
  t.deepEqual(favicons, [{
    type: 'icon',
    imgType: 'image/x-icon',
    href: 'https://ma.twimg.com/twitter-mobile/33f19cd501f08efb0522b6e1acfe25fdcbf618be/images/favicon.ico',
    sizes: null,
  }]);
});

test('get pwa.rocks', async (t) => {
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
