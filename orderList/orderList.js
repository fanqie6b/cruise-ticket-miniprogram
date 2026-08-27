// pages/orderList/orderList.js
Page({
  data: {
    orderType: '',
    orderList: []
  },
  onLoad(options) {
    const { type } = options;
    if (!type) {
      wx.showToast({ title: '缺少订单类型', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }
    this.setData({ orderType: type });
    this.loadOrders(type);
  },
  loadOrders(type) {
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo?.id) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    const statusMap = { 'pending': 0, 'paid': 1, 'aftersale': 2 };
    wx.request({
      url: 'http://localhost/program/get_orders.php',
      method: 'GET',
      data: {
        user_id: userInfo.id,
        status: statusMap[type]
      },
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({ orderList: res.data.data });
        } else {
          wx.showToast({ title: res.data.message || '获取订单失败', icon: 'none' });
        }
      }
    });
  },
  goToDetail(e) {
    const orderId = e.currentTarget.dataset.orderId;
    const { orderType } = this.data;
    const pageMap = {
      'pending': `/pages/unpaid/unpaid?orderId=${orderId}`,
      'paid': `/pages/paid/paid?orderId=${orderId}`,
      'aftersale': `/pages/aftersale/aftersale?orderId=${orderId}`
    };
    wx.navigateTo({ url: pageMap[orderType] });
  }
});