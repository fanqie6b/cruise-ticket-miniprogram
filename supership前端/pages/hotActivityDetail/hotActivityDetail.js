Page({
  data: {
    activity: null // 存储活动详情
  },
  onLoad(options) {
    const activityId = options.id; // 获取传递的活动ID
    // 请求后端接口
    wx.request({
      url: 'http://localhost/program/getHotActivityDetail.php',
      data: { id: activityId },
      success: (res) => {
        this.setData({ activity: res.data }); 
      },
      fail: (err) => {
        console.error("请求失败：", err);
        wx.showToast({ title: '加载失败', icon: 'none' });
      }
    });
  }
});