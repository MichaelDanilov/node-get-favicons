# Get Favicons

Get `favicon`s, `apple-touch-icon` or something else from any website or HTML.

## Usage

### API

Get all favicons from [example.com](https://example.com)
```js
const getFavicons = require('get-favicons');

getFavicons.byUrl('https://google.com').then((favicons) => {
  console.log(favicons);
  // [{
  //   type: 'icon',
  //   imgType: null,
  //   href: 'https://google.com/images/branding/product/ico/googleg_lodp.ico',
  //   sizes: null
  // }]
});
```

## License

[MIT](https://github.com/MichaelDanilov/node-get-favicons/blob/master/license) © [Michael Danilov](https://danilov.me)
