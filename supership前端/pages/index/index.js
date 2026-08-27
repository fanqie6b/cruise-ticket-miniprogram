Page({
  data: {
    currentSwiper: 0,
    isGuest: false,
    bannerList: [
      { id: 1, imageUrl: '/pages/images/banner1.png', name: '澜光溢彩号', subtitle: '7天6晚 东南亚之旅' },
      { id: 2, imageUrl: '/pages/images/banner2.png', name: '瀚海星洲号', subtitle: '日本冲绳+宫古岛' },
      { id: 3, imageUrl: '/pages/images/banner3.png', name: '鲸歌远航号', subtitle: '豪华家庭度假首选' }
    ],
    searchValue: "",
    cruiseList: [
      { imageUrl: "/pages/images/cruise1.png", name: "澜光溢彩号", id: 1 },
      { imageUrl: "/pages/images/cruise2.png", name: "瀚海星洲号", id: 2 },
      { imageUrl: "/pages/images/cruise3.png", name: "鲸歌远航号", id: 3 },
      { imageUrl: "/pages/images/cruise4.png", name: "蓝天碧海号", id: 4 }
    ],
    destinationList: [
      { imageUrl: "/pages/images/dest1.png", name: "福冈" },
      { imageUrl: "/pages/images/dest2.png", name: "大阪" },
      { imageUrl: "/pages/images/dest3.png", name: "济州岛" },
      { imageUrl: "/pages/images/dest4.png", name: "长崎" }
    ],
    portList: ["上海", "天津", "深圳", "厦门"],
    dateList: [],
    dateValue: [],
    selectedDate: "",
    selectedCruise: "",
    selectedPort: "",
    selectedDestination: "",
    showDateModal: false,
    showCruiseModal: false,
    showPortModal: false,
    showDestinationModal: false
  },

  stopPropagation() {
  },

  onLoad() {
    this.generateDateList();
    
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo && userInfo.isGuest) {
      this.setData({ isGuest: true });
    }
  },

  generateDateList() {
    const dateList = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      dateList.push(`${year}-${month}-${day}`);
    }
    
    this.setData({ dateList, dateValue: [0] });
  },

  showDateModal() { this.setData({ showDateModal: true }); },
  showCruiseModal() { this.setData({ showCruiseModal: true }); },
  showPortModal() { this.setData({ showPortModal: true }); },
  showDestinationModal() { this.setData({ showDestinationModal: true }); },
  hideAllModals() { this.setData({ showDateModal: false, showCruiseModal: false, showPortModal: false, showDestinationModal: false }); },

  onDateChange(e) {
    const index = e.detail.value[0];
    this.setData({ selectedDate: this.data.dateList[index] });
  },
  
  selectCruise(e) {
    this.setData({ selectedCruise: e.currentTarget.dataset.name });
  },
  
  selectPort(e) {
    this.setData({ selectedPort: e.currentTarget.dataset.port });
  },
  
  selectDestination(e) {
    this.setData({ selectedDestination: e.currentTarget.dataset.dest });
  },

  confirmDate() { this.hideAllModals(); },
  confirmCruise() { this.hideAllModals(); },
  confirmPort() { this.hideAllModals(); },
  confirmDestination() { this.hideAllModals(); },

  swiperChange(e) {
    this.setData({ currentSwiper: e.detail.current });
  },
  
  onSwiperItemClick(e) {
    const shipId = e.currentTarget.dataset.shipId;
    wx.navigateTo({
      url: `/pages/shipDetail/shipDetail?shipId=${shipId}`
    });
  },
  
  onCruiseItemClick(e) {
    const shipId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/shipDetail/shipDetail?shipId=${shipId}`
    });
  },
  goToAllRoutes() {
    const { selectedDate, selectedCruise, selectedPort, selectedDestination } = this.data;
    
    if (!selectedDate) { wx.showToast({ title: '请选择出发日期', icon: 'none' }); return; }
    if (!selectedCruise) { wx.showToast({ title: '请选择乘坐邮轮', icon: 'none' }); return; }
    if (!selectedPort) { wx.showToast({ title: '请选择出发港口', icon: 'none' }); return; }
    if (!selectedDestination) { wx.showToast({ title: '请选择目的地', icon: 'none' }); return; }
    
    const url = `/pages/allRoutes/allRoutes?date=${encodeURIComponent(selectedDate)}&cruise=${encodeURIComponent(selectedCruise)}&port=${encodeURIComponent(selectedPort)}&dest=${encodeURIComponent(selectedDestination)}`;
    
    console.log("跳转URL:", url);
    
    wx.reLaunch({
      url,
      fail: (err) => {
        console.error("跳转失败:", err);
        wx.showToast({ title: '跳转失败，请重试', icon: 'none' });
      }
    });
  },

  onCruiseExperienceClick(e) {
    const cruiseId = e.currentTarget.dataset.cruiseId;
    wx.navigateTo({
      url: `/pages/cruiseActivity/cruiseActivity?cruiseId=${cruiseId}`
    });
  },
  
  onDestinationClick(e) {
    const destinationName = e.currentTarget.dataset.destinationName;
    wx.navigateTo({
      url: `/pages/destinationAttraction/destinationAttraction?destinationName=${destinationName}`
    });
  },
  
  onHotActivityClick(e) {
    const activityId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/hotActivityDetail/hotActivityDetail?id=${activityId}`
    });
  },

  onOrderNow() {
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo || !userInfo.isLogin || userInfo.isGuest) {
      wx.showModal({
        title: '提示',
        content: '请先登录再进行预定',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/login/login?fromOrder=true' });
          }
        }
      });
      return;
    }
    wx.navigateTo({ url: '/pages/order/order' });
  }
});