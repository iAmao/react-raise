module.exports = [
  {
    src: [
      {
        components: [
          { common: ['Button.component.jsx'] },
          { static: ['About.component.jsx'] },
          'Routes.component.jsx',
          'Home.component.jsx'
        ]
      },
      { actions: ['actionTypes.js'] },
      { reducers: ['root.reducer.js'] },
      { utils: ['helper.js'] },
      'index.jsx',
      'store.js'
    ]
  },
  {
    dist: [
      { css: ['style.css'] },
      { js: ['script.js'] },
      { vendor: ['vendor.txt'] },
      { images: ['images.txt'] },
      'index.html'
    ]
  }
];
