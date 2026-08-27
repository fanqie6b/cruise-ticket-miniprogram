Page({
  data: {
    routeInfo: {},
    itinerary: [],
    adultCount: 2,
    childCount: 1,
    selectedCabin: "内舱房",
    cabinPrices: {} ,// 存储计算后的舱房价格
    routeId: '' 
  },

  onLoad(options) {
    const routeId = options.id && String(options.id).trim();
    if (!routeId) {
      wx.showToast({ title: '参数错误', icon: 'none' });
      return;
    }
    this.setData({ routeId });
    this.loadRouteDetail(routeId);
  },

  loadRouteDetail(routeId) {
    wx.request({
      url: `http://localhost/program/get_route_detail.php?id=${routeId}`,
      method: 'GET',
      success: (res) => {
        if (res.data.code === 200) {
          const routeInfo = res.data.data.routeInfo;
          // 计算各舱房价格（基于基础价）
          const basePrice = parseFloat(routeInfo.price);
          const cabinPrices = {
            内舱房: basePrice.toFixed(2),
            海景房: (basePrice + 800).toFixed(2),
            阳台房: (basePrice + 1500).toFixed(2),
            套房: (basePrice + 3000).toFixed(2)
          };
          this.setData({
            routeInfo,
            itinerary: res.data.data.itinerary,
            cabinPrices 
          });
        } else {
          wx.showToast({ title: res.data.message || '加载失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '网络错误', icon: 'none' });
      }
    });
  },
  onBookRoute() {
    const routeId = this.data.routeId;
    if (!routeId) {
      wx.showToast({ title: '航线信息错误', icon: 'none' });
      return;
    }
    wx.navigateTo({
      url: `/pages/orderConfirm/orderConfirm?routeId=${String(routeId)}`,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '跳转失败，请检查页面是否存在', icon: 'none' });
      }
    });
  },

  decreaseAdult() { if (this.data.adultCount > 0) this.setData({ adultCount: this.data.adultCount - 1 }); },
  increaseAdult() { this.setData({ adultCount: this.data.adultCount + 1 }); },
  decreaseChild() { if (this.data.childCount > 0) this.setData({ childCount: this.data.childCount - 1 }); },
  increaseChild() { this.setData({ childCount: this.data.childCount + 1 }); },
  selectCabin(e) { this.setData({ selectedCabin: e.currentTarget.dataset.type }); }
});