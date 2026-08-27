// pages/checkinComplete/checkinComplete.js
Page({
  data: {
    passengerInfo: {}
  },

  onLoad(options) {
    this.setData({
      passengerInfo: JSON.parse(options.passengerInfo)
    });
  },

  goBack() {
    wx.navigateBack();
  },

  goToHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    });
  }
});