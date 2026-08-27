// pages/passengerInfo/passengerInfo.js
Page({
  data: {
    passengerInfo: {
      cruiseName: '',
      sailingDate: '',
      orderNo: '',
      passengerName: '',
      birthDate: '',
      nationality: '',
      departurePort: '',
      departureTime: '',
      arrivalPort: '',
      arrivalTime: '',
      days: 0
    }
  },

  onLoad(options) {
    const orderId = options.orderId;
    this.fetchPassengerInfo(orderId);
  },

  fetchPassengerInfo(orderId) {
    wx.request({
        url: `http://localhost/program/getPassengerInfo.php?orderId=${orderId}`,
        method: 'GET',
        success: (res) => {
            console.log('获取乘客信息响应:', res); // 添加日志输出
            if (res.statusCode === 200 && res.data.code === 200) {
                this.setData({
                    passengerInfo: res.data.data
                });
            } else {
                wx.showToast({
                    title: res.data.message || '获取信息失败',
                    icon: 'none'
                });
            }
        },
        fail: () => {
            wx.showToast({ title: '网络错误', icon: 'none' });
        }
    });
},

  formatDate(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${year}年${month}月${day}日`;
  },

  formatDateTime(dateTimeStr) {
    if (!dateTimeStr) return '';
    const [datePart, timePart] = dateTimeStr.split(' ');
    const [year, month, day] = datePart.split('-');
    return `${year}年${month}月${day}日 ${timePart}`;
  },

  goBack() {
    wx.navigateBack();
  },

  goToComplete() {
    wx.navigateTo({
      url: `/pages/checkinComplete/checkinComplete?passengerInfo=${JSON.stringify(this.data.passengerInfo)}`
    });
  }
});