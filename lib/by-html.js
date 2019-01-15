const axios = require('axios');
const { JSDOM } = require('jsdom');
const { absolutizeUrl } = require('./helpers');

module.exports = (html = '', baseUrl = '') => {
  let manifest = Promise.resolve([]);
  const favicons = [];
  const favicon = {
    type: null,
    imgType: null,
    href: null,
    sizes: null,
  };
  const dom = new JSDOM(html);
  const htmlLink = dom.window.document.querySelectorAll('link');

  htmlLink.forEach((link) => {
    const rel = (link.getAttribute('rel') || '').toLowerCase();

    if (['icon', 'shortcut icon'].includes(rel)) {
      favicons.push(Object.assign({}, favicon, {
        type: 'icon',
        imgType: link.getAttribute('type'),
        href: absolutizeUrl(link.getAttribute('href'), baseUrl),
        sizes: link.getAttribute('sizes'),
      }));
    }

    if (rel.startsWith('apple-touch-icon')) {
      favicons.push(Object.assign({}, favicon, {
        type: 'apple-touch-icon',
        imgType: link.getAttribute('type'),
        href: absolutizeUrl(link.getAttribute('href'), baseUrl),
        sizes: link.getAttribute('sizes'),
      }));
    }

    if (rel === 'image_src') {
      favicons.push(Object.assign({}, favicon, {
        type: 'image_src',
        imgType: link.getAttribute('type'),
        href: absolutizeUrl(link.getAttribute('href'), baseUrl),
        sizes: link.getAttribute('sizes'),
      }));
    }

    if (rel === 'twitter:image') {
      favicons.push(Object.assign({}, favicon, {
        type: 'image_src',
        imgType: link.getAttribute('type'),
        href: absolutizeUrl(link.getAttribute('href'), baseUrl),
        sizes: link.getAttribute('sizes'),
      }));
    }

    if (rel === 'mask-icon') {
      favicons.push(Object.assign({}, favicon, {
        type: 'mask-icon',
        imgType: link.getAttribute('type'),
        href: absolutizeUrl(link.getAttribute('href'), baseUrl),
        colors: link.getAttribute('sizes'),
      }));
    }

    if (rel === 'manifest') {
      manifest = axios.get(absolutizeUrl(link.getAttribute('href'), baseUrl)).then((response) => {
        if (response.status === 200) {
          return response.data.icons.map(icon => Object.assign({}, favicon, {
            type: 'manifest',
            imgType: icon.type,
            href: absolutizeUrl(icon.src, baseUrl),
            sizes: icon.sizes,
          }));
        }
        return [];
      });
    }
  });

  const metaLink = dom.window.document.querySelectorAll('meta');

  metaLink.forEach((meta) => {
    const name = (meta.getAttribute('name') || '').toLowerCase();

    if (name === 'theme-color') {
      favicons.push(Object.assign({}, favicon, {
        type: 'theme-color',
        content: meta.getAttribute('content'),
      }));
    }

    if (
      name.startsWith('msapplication') &&
      name !== 'msapplication-notification'
    ) {
      favicons.push(Object.assign({}, favicon, {
        type: name,
        imgType: name.getAttribute('type'),
        href: absolutizeUrl(name.getAttribute('href'), baseUrl),
        sizes: name.getAttribute('sizes'),
      }));
    }

    const property = (meta.getAttribute('property') || '').toLowerCase();

    if (property === 'og:image') {
      favicons.push(Object.assign({}, favicon, {
        type: 'og:image',
        href: meta.getAttribute('content'),
      }));
    }
  });

  return Promise.all([
    Promise.resolve(favicons),
    manifest,
  ]).then(([f = [], m = []]) => ([...f, ...m]));
};
