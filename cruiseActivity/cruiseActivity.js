Page({
  data: {
    activities: []
  },

  onLoad(options) {
    const cruiseId = options.cruiseId;
    wx.request({
      url: 'http://localhost/program/getCruiseActivities.php',
      data: {
        cruiseId: cruiseId
      },
      success: (res) => {
        this.setData({
          activities: res.data
        });
      }
    });
  }
});