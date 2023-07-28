export default defineAppConfig({
  pages: [
    'pages/login/index',
    'pages/work-platform/index',
    'pages/user/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '转贷系统',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#C0C4CC',
    selectedColor: '#2c68ff',
    borderStyle: 'black',
    backgroundColor: '#ffffff',
    list: [
      {
        text: '工作台',
        pagePath: 'pages/work-platform/index',
        iconPath: 'images/tabbar/work-platform.png',
        selectedIconPath: 'images/tabbar/work-platform-selected.png',
      },
      {
        pagePath: 'pages/user/index',
        iconPath: 'images/tabbar/user.png',
        selectedIconPath: 'images/tabbar/user-selected.png',
        text: '个人中心'
      }
    ]
  }
})
