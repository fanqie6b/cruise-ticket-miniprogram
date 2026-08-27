Page({
  data: {
    orderId: '',
    orderName: "",
    orderPrice: "",
    createTime: "",
    routeId: "",
    contactName: "",
    contactPhone: "",
    passengerCount: "",
    isLoading: false,
    errorMsg: ""
  },
  onLoad(options) {
    const orderId = options.orderId?.trim();
    if (!orderId) {
      wx.showToast({ title: '缺少订单信息', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }
    this.setData({ orderId });
    this.getOrderData();
  },

  getOrderData() {
    this.setData({ isLoading: true });
    wx.request({
      url: `http://localhost/program/get_order_detail.php`,
      method: 'GET',
      data: { orderId: this.data.orderId },
      success: (res) => {
        this.setData({ isLoading: false });
        if (res.data.code === 200 && res.data.data) {
          const order = res.data.data;
          this.setData({
            orderName: `航线 ${order.route_id} 船票`,
            orderPrice: order.price || "4550.00",
            createTime: order.created_at || "",
            routeId: order.route_id,
            contactName: order.contact_name,
            contactPhone: order.contact_phone,
            passengerCount: order.passenger_count
          });
        } else {
          this.setData({ errorMsg: res.data.message || '获取订单失败' });
        }
      },
      fail: (err) => {
        this.setData({
          isLoading: false,
          errorMsg: '网络错误，请稍后重试'
        });
      }
    });
  },

  // pages/unpaid/unpaid.js 中修改 handlePay 方法
  handlePay() {
    this.setData({ isLoading: true });
    wx.request({
      url: 'http://localhost/program/pay_order.php',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        order_id: this.data.orderId,
        status: 1 // 已支付状态码
      },
      success: (res) => {
        this.setData({ isLoading: false });
        if (res.data.code === 200) {
          wx.showToast({ title: '支付成功', icon: 'success' });
          setTimeout(() => {
            wx.navigateTo({ url: `/pages/paid/paid?orderId=${this.data.orderId}` });
            const pages = getCurrentPages();
            const minePage = pages.find(p => p.route === 'pages/mine/mine');
            if (minePage) minePage.navigateToOrderPage({ currentTarget: { dataset: { type: 'paid' } } });
          }, 1500);
        } else {
          wx.showToast({ title: res.data.message || '支付失败', icon: 'none' });
        }
      }
    });
  },

  handleCancel() {
    wx.showModal({
      title: '取消订单',
      content: '确定要取消订单吗？',
      success: (res) => {
        if (res.confirm) {
          wx.request({
            url: 'http://localhost/program/cancel_order.php',
            method: 'POST',
            data: {
              order_id: this.data.orderId,
              status: 3 
            },
            success: (res) => {
              if (res.data.code === 200) {
                wx.showToast({ title: '订单已取消', icon: 'success' });
                setTimeout(() => {
                  wx.navigateBack();
                  const pages = getCurrentPages();
                  const minePage = pages.find(p => p.route === 'pages/mine/mine');
                  if (minePage) minePage.loadOrders();
                }, 1500);
              } else {
                wx.showToast({ title: res.data.message || '取消失败', icon: 'none' });
              }
            }
          });
        }
      }
    });
  }
});