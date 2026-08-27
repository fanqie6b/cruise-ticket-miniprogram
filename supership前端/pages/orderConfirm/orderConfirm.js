Page({
  data: {
    routeId: '',
    routeInfo: null,
    contactName: '',
    contactPhone: '',
    passengerCount: 1,
    isSubmitting: false
  },

  onLoad(options) {
    const routeId = options.routeId?.trim();
    if (!routeId) {
      wx.showToast({ title: '缺少航线ID', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }
    this.setData({ routeId });
    this.getRouteDetail(routeId);
  },

  getRouteDetail(routeId) {
    wx.request({
      url: `http://localhost/program/get_route_detail.php?id=${routeId}`,
      method: 'GET',
      success: (res) => {
        if (res.data.code === 200 && res.data.data?.routeInfo) {
          this.setData({ routeInfo: res.data.data.routeInfo });
        } else {
          wx.showToast({ title: res.data.message || '获取航线信息失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '网络错误，无法获取航线信息', icon: 'none' });
      }
    });
  },

  handleInput(e) {
    const { field } = e.currentTarget.dataset;
    const value = field === 'passengerCount' 
      ? Math.max(1, parseInt(e.detail.value.trim()) || 1) 
      : e.detail.value.trim();
    this.setData({ [field]: value });
  },

  submitOrder() {
    const { routeId, routeInfo, contactName, contactPhone, passengerCount } = this.data;
    const userInfo = wx.getStorageSync('userInfo');
    
    // 防止重复提交
    if (this.data.isSubmitting) return;
    this.setData({ isSubmitting: true });

    // 验证用户登录状态和必要信息（保持不变）
    if (!userInfo?.id) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      this.setData({ isSubmitting: false });
      return;
    }
    if (!routeId || !routeInfo) {
      wx.showToast({ title: '航线信息缺失', icon: 'none' });
      this.setData({ isSubmitting: false });
      return;
    }
    if (!contactName) {
      wx.showToast({ title: '请输入联系人姓名', icon: 'none' });
      this.setData({ isSubmitting: false });
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(contactPhone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
      this.setData({ isSubmitting: false });
      return;
    }
    if (passengerCount < 1) {
      wx.showToast({ title: '乘客数量不能少于1人', icon: 'none' });
      this.setData({ isSubmitting: false });
      return;
    }

    // 计算总金额
    const totalPrice = (routeInfo.price * passengerCount).toFixed(2);
    
    // 显示支付确认弹窗
    wx.showModal({
      title: '确认订单',
      content: `联系人: ${contactName}\n手机号: ${contactPhone}\n乘客数量: ${passengerCount}人\n总金额: ¥${totalPrice}\n是否确认提交订单?`,
      success: (res) => {
        // 无论点击确认还是取消，都创建订单（关键修改）
        const orderData = {
          route_id: routeId,
          user_id: userInfo.id,
          contact_name: contactName,
          contact_phone: contactPhone,
          passenger_count: passengerCount,
          price: totalPrice,
          status: res.confirm ? 1 : 0 // 确认=已支付(1)，取消=待支付(0)
        };
        this.createOrder(orderData); // 强制提交订单
      },
      fail: () => {
        this.setData({ isSubmitting: false });
      }
    });
  },

  createOrder(orderData) {
    wx.request({
      url: 'http://localhost/program/create_order.php',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: orderData,
      success: (res) => {
        this.setData({ isSubmitting: false });
        console.log('创建订单响应:', res.data);
        
        if (res.data.code === 200 && res.data.data?.order_id) {
          const orderId = res.data.data.order_id;
          const isPaid = orderData.status === 1;
          
          wx.showToast({ 
            title: isPaid ? '支付成功' : '订单已创建（待支付）', 
            icon: isPaid ? 'success' : 'none',
            duration: 2000
          });
          
          // 跳转对应页面
          setTimeout(() => {
            if (isPaid) {
              wx.navigateTo({ url: `/pages/paid/paid?order_id=${orderId}` });
            } else {
              wx.navigateTo({ url: `/pages/unpaid/unpaid?order_id=${orderId}` });
            }
            // 刷新mine页面数据（关键：同步更新订单列表）
            this.refreshMinePage(isPaid ? 'paid' : 'pending');
          }, 2000);
        } else {
          wx.showToast({ 
            title: res.data.message || '创建订单失败', 
            icon: 'none',
            duration: 3000
          });
        }
      },
      fail: () => {
        this.setData({ isSubmitting: false });
        wx.showToast({ title: '网络错误，创建订单失败', icon: 'none' });
      }
    });
  },


  // 处理待支付订单的支付操作
  handlePayment(orderId) {
    wx.showLoading({ title: '处理支付中...' });
    
    wx.request({
      url: 'http://localhost/program/pay_order.php',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        order_id: orderId,
        status: 1  // 更新为已支付状态
      },
      success: (payRes) => {
        wx.hideLoading();
        if (payRes.data.code === 200) {
          wx.showToast({ title: '支付成功', icon: 'success' });
          setTimeout(() => {
            wx.navigateTo({ url: `/pages/paid/paid?order_id=${orderId}` });
            // 刷新mine页面数据
            this.refreshMinePage('paid');
          }, 1500);
        } else {
          wx.showToast({ 
            title: `支付失败: ${payRes.data.message || '支付过程出错'}`, 
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({ title: '支付请求失败，请重试', icon: 'none' });
        console.error('支付请求失败:', err);
      }
    });
  },

  refreshMinePage(type) {
    const pages = getCurrentPages();
    const minePage = pages.find(p => p.route === 'pages/mine/mine');
    if (minePage) {
      minePage.setData({ currentOrderType: type }, () => {
        minePage.loadOrders();
      });
    }
  }
});