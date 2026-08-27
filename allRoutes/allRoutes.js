Page({
  data: {
    routeList: [],        
    filteredRoutes: [],   
    currentPort: "全部港口",
    currentDate: "全部时间",
    isTimeOpen: false,
    isPortOpen: false,
    isSortOpen: false,
    filterParams: {},     
    sortType: "default", 
    sortAsc: true         
  },
  onLoad(options) {
    const filterParams = {
      date: decodeURIComponent(options.date || ''),
      cruise: decodeURIComponent(options.cruise || ''),
      port: decodeURIComponent(options.port || ''),
      dest: decodeURIComponent(options.dest || '')
    };
    this.setData({ filterParams }, () => {
      this.fetchFilteredRoutes();
      this.fetchAllRoutes();
    });
  },
  fetchAllRoutes() {
    wx.request({
      url: 'http://localhost/program/getFilteredRoutes.php',
      data: { date: '', cruise: '', port: '', dest: '' },
      method: 'GET',
      success: (res) => {
        if (Array.isArray(res.data)) {
          this.setData({ routeList: res.data });
        }
      }
    });
  },
  fetchFilteredRoutes() {
    const { date, cruise, port, dest } = this.data.filterParams;
    wx.request({
      url: 'http://localhost/program/getFilteredRoutes.php',
      data: { date, cruise, port, dest },
      method: 'GET',
      success: (res) => {
        if (Array.isArray(res.data)) {
          this.setData({ filteredRoutes: res.data });
          if (res.data.length === 0) {
            wx.showToast({ title: '没有找到符合条件的航线', icon: 'none' });
          }
        } else {
          console.error("接口返回数据格式错误:", res.data);
          wx.showToast({ title: '加载失败，请重试', icon: 'none' });
        }
      },
      fail: (err) => {
        console.error("请求失败:", err);
        wx.showToast({ title: '网络错误，请重试', icon: 'none' });
      }
    });
  },
  filterRoutes() {
    const { routeList, currentPort, currentDate } = this.data;
    const filtered = routeList.filter(route => {
      const portMatch = currentPort === "全部港口" || route.port === currentPort;
      const dateMatch = currentDate === "全部时间" || route.date.includes(currentDate);
      return portMatch && dateMatch;
    });
    this.setData({ filteredRoutes: filtered });
  },
  sortRoutes(e) {
    const type = e.currentTarget.dataset.type;
    let sorted = this.data.filteredRoutes.slice();
    
    if (this.data.sortType === type) {
      this.setData({ sortAsc: !this.data.sortAsc });
    } else {
      this.setData({ sortType: type, sortAsc: true });
    }
    
    if (type === "priceAsc") {
      sorted.sort((a, b) => {
        const priceA = Number(a.price.replace(/\D/g, ''));
        const priceB = Number(b.price.replace(/\D/g, ''));
        return this.data.sortAsc ? priceA - priceB : priceB - priceA;
      });
    } else {
      sorted.sort((a, b) => {
        return this.data.sortAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
      });
    }
    
    this.setData({ filteredRoutes: sorted });
  },
  toggleTimeFilter() { 
    this.setData({ isTimeOpen: !this.data.isTimeOpen, isPortOpen: false, isSortOpen: false }); 
  },
  togglePortFilter() { 
    this.setData({ isPortOpen: !this.data.isPortOpen, isTimeOpen: false, isSortOpen: false }); 
  },
  toggleSort() { 
    this.setData({ isSortOpen: !this.data.isSortOpen, isTimeOpen: false, isPortOpen: false }); 
  },
  selectDate(e) {
    this.setData({ currentDate: e.currentTarget.dataset.date, isTimeOpen: false }, () => this.filterRoutes());
  },
  selectPort(e) {
    this.setData({ currentPort: e.currentTarget.dataset.port, isPortOpen: false }, () => this.filterRoutes());
  },
  clearAllFilters() {
    this.setData({ 
      filterParams: {}, 
      currentPort: "全部港口", 
      currentDate: "全部时间",
      filteredRoutes: this.data.routeList, 
      sortType: "default", 
      sortAsc: true
    }, () => {
      wx.showToast({ title: '筛选已重置', icon: 'success', duration: 1500 });
    });
  },
  goToBookRoute(e) {
    const { id } = e.currentTarget.dataset;
    const routeId = String(id).replace(/[^\d]/g, ''); 
    if (!routeId) {
      wx.showToast({ title: '航线ID无效', icon: 'none' });
      return;
    }
    wx.navigateTo({ 
      url: `/pages/routeDetail/routeDetail?id=${routeId}`,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '无法跳转到详情页', icon: 'none' });
      }
    });
  },
  onBuyNow(e) {
    const routeId = e.currentTarget.dataset?.routeId 
      ? String(e.currentTarget.dataset.routeId).replace(/[^\d]/g, '') 
      : '';
    if (!routeId) {
      wx.showToast({ title: '航线ID无效', icon: 'none' });
      return;
    }
    wx.navigateTo({ url: `/pages/orderConfirm/orderConfirm?routeId=${routeId}` });
  },
});