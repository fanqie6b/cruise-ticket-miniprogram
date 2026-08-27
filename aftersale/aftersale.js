Page({
  data: {
    orderId: '',
    shipDate: '',
    departureTime: '',
    amount: '',
    reasons: [
      { value: 'time_conflict', text: '行程冲突', checked: true },
      { value: 'price', text: '价格原因' },
      { value: 'other', text: '其他原因' }
    ],
    selectedReason: 'time_conflict'
  },

  onLoad(options) {
    const orderId = options.orderId;
    if (orderId) {
      this.setData({ orderId });
      this.loadOrderDetail(orderId);
    } else {
      wx.showToast({ title: '缺少订单信息', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
    }
  },

  loadOrderDetail(orderId) {
    wx.request({
      url: `http://localhost/program/get_order_detail.php`,
      method: 'GET',
      data: { orderId },
      success: (res) => {
        if (res.data.code === 200 && res.data.data) {
          this.setData({
            shipDate: res.data.data.depart_date,
            departureTime: res.data.data.depart_time || '',
            amount: res.data.data.price
          });
        }
      }
    });
  },

  chooseReason(e) {
    this.setData({ selectedReason: e.detail.value });
  },

  submitRefund() {
    wx.request({
      url: `http://localhost/program/submit_refund.php`,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        order_id: this.data.orderId,
        reason: this.data.selectedReason
      },
      success: (res) => {
        if (res.data.code === 200) {
          wx.showToast({ title: '退票申请提交成功', icon: 'success' });
          setTimeout(() => wx.navigateBack(), 1500);
        } else {
          wx.showToast({ title: res.data.message || '提交失败', icon: 'none' });
        }
      }
    });
  },

  trackProgress() {
    wx.navigateTo({ url: `/pages/refundProgress/refundProgress?orderId=${this.data.orderId}` });
  }
});