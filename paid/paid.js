Page({
  data: {
    isLoading: true,
    errorMsg: "",
    orderList: []
  },

  onLoad(options) {
    // 从订单列表页面传递的参数中获取订单ID（如果需要单个订单详情）
    // 实际应根据当前页面逻辑获取订单数据（例如从订单列表跳转时带orderId）
    this.loadOrderList();
  },

  loadOrderList() {
    this.setData({ isLoading: true });
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo?.id) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      this.setData({ isLoading: false });
      return;
    }

    wx.request({
      url: 'http://localhost/program/get_orders.php', 
      method: 'GET',
      data: {
        user_id: userInfo.id,
        status: 1 
      },
      success: (res) => {
        if (res.data.code === 200 && Array.isArray(res.data.data)) {
          this.setData({
            orderList: res.data.data,
            isLoading: false
          });
        } else {
          this.setData({
            errorMsg: res.data.message || '获取订单失败',
            isLoading: false
          });
          wx.showToast({ title: this.data.errorMsg, icon: 'none' });
        }
      },
      fail: () => {
        this.setData({
          errorMsg: '网络错误，无法加载订单',
          isLoading: false
        });
        wx.showToast({ title: '网络错误', icon: 'none' });
      }
    });
  },


  // 前往订单详情
  goToOrderDetail(e) {
    const orderId = e.currentTarget.dataset.orderId;
    wx.navigateTo({
      url: `/pages/orderDetail/orderDetail?orderId=${orderId}`
    });
  },

  // 申请退票
  refundOrder(e) {
    const orderId = e.currentTarget.dataset.orderId;
    wx.showModal({
      title: '申请退票',
      content: `确定要申请订单 ${orderId} 的退票吗？`,
      confirmText: '确认',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 调用退票接口
          wx.showToast({
            title: '退票申请已提交',
            icon: 'success'
          });
          // 刷新订单列表
          this.loadOrderList();
        }
      }
    });
  },

  // 去购票页面
  goToHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
});