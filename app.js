
App({
  onLaunch() {
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success: res => {
      }
    })

    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }
  },
  isUserLoggedIn() {
    const userInfo = wx.getStorageSync('userInfo') || this.globalData.userInfo;
  return !!userInfo && !userInfo.isGuest;
},
  globalData: {
    userInfo: null
  },
  onSearch() {
    console.log("搜索内容：", this.data.searchValue);
    wx.navigateTo({
      url: `/pages/searchResult/searchResult?keyword=${this.data.searchValue}`
    });
  },
  checkLogin() {
    return !!this.globalData.userInfo;
  }
})