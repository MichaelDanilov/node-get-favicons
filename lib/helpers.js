const { URL } = require('url');

module.exports = {
  absolutizeUrl(url = '', origin = '') {
    const newUrl = new URL(url, origin);
    return newUrl.toString();
  },
};
