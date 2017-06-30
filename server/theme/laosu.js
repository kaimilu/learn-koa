module.exports = {
  name: 'laosu',
  author: 'laosu',
  option: {
    logoUrl: '/static/logo.png',
    sidebarMoveCss: 'bakcground 2s ease-in-out;',
    sidebarFontColor: '#fff !important',
    menu: [{
        'option': 'home',
        'url': '/',
        'label': '首页‘'
      },
      {
        'option': 'archive',
        'url': '/archive',
        'label': '归档'
      },
      {
        'option': 'tags',
        'url': '/tag',
        'label': '标签'
      }
    ]
  }
}