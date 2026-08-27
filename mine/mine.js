Page({
  data: {
    user: { isLogin: false, name: '', avatar: '' },
    currentOrderType: 'pending' ,
    features: []
  },
navigateToOrderPage(e) {
  const type = e.currentTarget.dataset.type;
  const validTypes = ['pending', 'paid', 'aftersale', 'history'];
  
  if (!validTypes.includes(type)) {
    wx.showToast({ title: '无效的订单类型', icon: 'none' });
    return;
  }
  if (!this.data.user.isLogin) {
    wx.showToast({ title: '请先登录', icon: 'none' });
    setTimeout(() => {
      wx.navigateTo({ url: '/pages/login/login?fromOrder=1' });
    }, 1000);
    return;
  }
  const pageMap = {
    'pending': '/pages/orderList/orderList?type=pending', 
    'paid': '/pages/orderList/orderList?type=paid',
    'aftersale': '/pages/orderList/orderList?type=aftersale',
    'history': '/pages/history/history'
  };
  wx.navigateTo({
    url: pageMap[type],
    fail: (err) => {
      console.error('跳转失败:', err);
      wx.showToast({ title: '无法打开页面', icon: 'none' });
    }
  });
},
  onLoad() {
    this.checkLoginStatus();
    this.loadFeatures();
  },
  loadFeatures() {
    wx.request({
      url: 'http://localhost/program/get_features.php',
      method: 'GET',
      success: (res) => {
        if (res.data.code === 200 && Array.isArray(res.data.data)) {
          this.setData({
            features: res.data.data
          });
        } else {
          wx.showToast({ 
            title: res.data.message || '获取功能列表失败', 
            icon: 'none' 
          });
        }
      },
      fail: () => {
        wx.showToast({ title: '获取功能列表失败', icon: 'none' });
      }
    });
  },
  
  navigateToFeature(e) {
    const path = e.currentTarget.dataset.path;
    if (!path) return;
    
    wx.navigateTo({
      url: path,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '无法打开页面', icon: 'none' });
      }
    });
  },
  onShow() {
    this.checkLoginStatus();
  },
  checkLoginStatus() {
    try {
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo && userInfo.id) {
        this.setData({
          user: {
            isLogin: true,
            name: userInfo.username || userInfo.name || '用户',
            avatar: userInfo.avatar || '/pages/images/default_avatar.png'
          }
        });
      } else {
        this.setData({
          user: { isLogin: false, name: '未登录', avatar: '' }
        });
      }
    } catch (e) {
      wx.showToast({ title: '登录状态异常', icon: 'none' });
      this.setData({ user: { isLogin: false } });
    }
  },
  goToOrderPage(e) {
    if (!this.data.user.isLogin) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      setTimeout(() => wx.navigateTo({ url: '/pages/login/login?fromOrder=1' }), 1000);
      return;
    }
    const type = e.currentTarget.dataset.type;
    const orderId = e.currentTarget.dataset.orderId;
    if (!orderId) {
      wx.showToast({ title: '缺少订单ID', icon: 'none' });
      return;
    }
    const pageMap = {
      'pending': `/pages/unpaid/unpaid?orderId=${orderId}`,
      'paid': `/pages/paid/paid?orderId=${orderId}`,
      'aftersale': `/pages/aftersale/aftersale?orderId=${orderId}`,
      'history': `/pages/history/history?orderId=${orderId}`
    };
    const url = pageMap[type];
    if (url) {
      wx.navigateTo({ url, fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '无法打开页面', icon: 'none' });
      }});
    }
  },
  goToPay(e) {
    const orderId = e.currentTarget.dataset.orderId;
    if (!orderId) {
      wx.showToast({ title: '订单ID不存在', icon: 'none' });
      return;
    }
    if (!this.data.user.isLogin) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      setTimeout(() => wx.navigateTo({ url: '/pages/login/login?fromOrder=1' }), 1000);
      return;
    }
    wx.navigateTo({
      url: `/pages/unpaid/unpaid?orderId=${orderId}`,
      fail: (err) => {
        console.error('跳转支付页面失败:', err);
        wx.showToast({ title: '无法打开支付页面', icon: 'none' });
      }
    });
  },
  refundOrder(e) {
    const orderId = e.currentTarget.dataset.orderId;
    if (!orderId) {
      wx.showToast({ title: '订单ID不存在', icon: 'none' });
      return;
    }
    wx.navigateTo({
      url: `/pages/aftersale/aftersale?orderId=${orderId}`,
      fail: (err) => {
        console.error('跳转售后页面失败:', err);
        wx.showToast({ title: '无法打开售后页面', icon: 'none' });
      }
    });
  },
  onLogout() {
    wx.removeStorageSync('userInfo');
    this.setData({ user: { isLogin: false } });
    wx.showToast({ title: '已退出登录', icon: 'none' });
  },
  goToLogin() {
    wx.navigateTo({ url: '/pages/login/login' });
  },
  goToFood() {
    wx.navigateTo({
      url: '/pages/food/food',
      fail: (err) => {
        console.error('跳转美食页面失败:', err);
        wx.showToast({ title: '无法打开美食页面', icon: 'none' });
      }
    });
  },
  goToInsurance() {
    wx.navigateTo({
      url: '/pages/insurance/insurance',
      fail: (err) => {
        console.error('跳转保险页面失败:', err);
        wx.showToast({ title: '无法打开保险页面', icon: 'none' });
      }
    });
  },
  goToService() {
    wx.navigateTo({
      url: '/pages/saleservice/saleservice',
      fail: (err) => {
        console.error('跳转客服页面失败:', err);
        wx.showToast({ title: '无法打开客服页面', icon: 'none' });
      }
    });
  },
  goToActivity() {
    wx.navigateTo({
      url: '/pages/activity/activity',
      fail: (err) => {
        console.error('跳转活动页面失败:', err);
        wx.showToast({ title: '无法打开活动页面', icon: 'none' });
      }
    });
  }
});