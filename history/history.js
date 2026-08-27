Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderList: [
      // 模拟历史订单数据（实际项目从接口获取）
      {
        id: 'SP20250720001',
        shipName: '澜光溢彩号',
        date: '2025-07-10',
        amount: '4599.00',
        status: '已完成'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 实际项目中从后端接口获取历史订单
    // this.loadHistoryOrders();
  },

  /**
   * 加载历史订单（示例方法）
   */
  loadHistoryOrders() {
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo?.id) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    wx.request({
      url: 'http://localhost/program/get_orders.php',
      method: 'GET',
      data: {
        user_id: userInfo.id,
        // 假设历史订单是状态为3（已完成）或4（已取消）的订单
        status: [3,4] 
      },
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({ orderList: res.data.data });
        }
      }
    });
  },
  
  viewDetail(e) {
    const orderId = e.currentTarget.dataset.orderId;
    if (orderId) {
      wx.navigateTo({ url: `/pages/orderDetail/orderDetail?orderId=${orderId}` });
    } else {
      wx.showToast({ title: '缺少订单信息', icon: 'none' });
    }
  },

  /**
   * 查看订单详情
   */
  viewDetail(e) {
    const orderId = e.currentTarget.dataset.orderId;
    if (orderId) {
      wx.navigateTo({ url: `/pages/orderDetail/orderDetail?orderId=${orderId}` });
    } else {
      wx.showToast({ title: '缺少订单信息', icon: 'none' });
    }
  },

  /**
   * 其他生命周期函数保持默认（省略）
   */
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {}
});