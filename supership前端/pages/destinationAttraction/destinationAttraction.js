Page({
  data: {
    destinationName: '',
    attractions: [],
    loading: true,  
    error: false    
  },
  onLoad(options) {
    this.setData({
      destinationName: options.destinationName
    });
    this.fetchAttractions();
  },
  fetchAttractions() {
    wx.request({
      url: 'http://localhost/program/getDestinationAttractions.php',
      data: {
        destinationName: this.data.destinationName
      },
      success: (res) => {
        console.log('接口返回数据:', res.data);  
        this.setData({
          attractions: res.data || [],
          loading: false
        });
      },
      fail: (err) => {
        console.error('请求失败:', err);  
        this.setData({
          loading: false,
          error: true
        });
        wx.showToast({
          title: '加载失败，请重试',
          icon: 'none'
        });
      }
    });
  }
});