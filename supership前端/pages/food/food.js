Page({
  data: {
    currentTab: "food",
    currentSubTab: "main",
    foodList: [] 
  },
  onLoad() {
    this.loadFoodData();
  },

  loadFoodData() {
    wx.request({
      url: 'http://localhost/program/get_food.php',
      method: 'GET',
      success: (res) => {
        console.log("餐饮接口返回:", res.data);
        if (res.data.code === 200) {
          this.setData({ foodList: res.data.data });
        } else {
          wx.showToast({ title: res.data.message || '获取数据失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '接口请求失败，请检查服务', icon: 'none' });
      }
    });
  },

  switchSubTab(e) {
    const subTab = e.currentTarget.dataset.subtab;
    this.setData({ currentSubTab: subTab });
  },

  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {}
});