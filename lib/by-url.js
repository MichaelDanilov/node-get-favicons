const axios = require('axios');
const byHtml = require('./by-html');

module.exports = (host = '') => {
  if (typeof host !== 'string' || !host) {
    return Promise.reject(new Error('Host must be non-zero string'));
  }

  return axios.get(host).then((response) => {
    if (response.status === 200) {
      return Promise.resolve(byHtml(response.data, host));
    }
    return Promise.reject(new Error('No favicons'));
  });
};
