Page({
  data: {
      currentTab: "activity",
      currentSubTab: "sing",
      activityList: []
  },
  onLoad() {
      this.loadActivities(this.data.currentSubTab);
  },
  loadActivities(type) {
      wx.request({
          url: 'http://localhost/program/getActivities.php',
          data: { type },
          success: (res) => {
              console.log("接口返回数据：", res.data);
              if (res.data && res.data.code === 200) {
                  this.setData({ activityList: res.data.data });
                  console.log("加载成功，数据：", res.data.data);
              } else {
                  wx.showToast({
                      title: '加载失败：' + (res.data?.message || '数据错误'),
                      icon: 'none',
                      duration: 3000
                  });
              }
          },
          fail: (err) => {
              console.error("请求失败原因：", err.errMsg);
              wx.showToast({
                  title: '请求失败：检查接口路径和网络连接',
                  icon: 'none',
                  duration: 3000
              });
          }
      });
  },
  switchSubTab(e) {
      const subTab = e.currentTarget.dataset.subtab;
      this.setData({ currentSubTab: subTab }, () => {
          this.loadActivities(subTab);
      });
  }
});