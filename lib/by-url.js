const axios = require('axios');
const byHtml = require('./by-html');

module.exports = (host = '') => {
  if (typeof host !== 'string' || !host) {
    throw new Error('Host must be non-zero string');
  }

  return axios.get(host).then((response) => {
    if (response.status === 200) {
      return Promise.resolve(byHtml(response.data, host));
    }
    throw new Error('No favicons');
  });
};
