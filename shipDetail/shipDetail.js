// pages/shipDetail/shipDetail.js
Page({
  data: {
    shipInfo: {} // 邮轮信息
  },

  onLoad(options) {
    // 获取传递的邮轮ID（参数名与跳转时一致）
    const shipId = options.shipId;
    if (!shipId) {
      wx.showToast({ title: '参数错误', icon: 'none' });
      return;
    }
    // 根据ID加载对应邮轮数据
    this.loadShipData(shipId);
  },

  loadShipData(shipId) {
    // 模拟从服务器获取邮轮数据
    let shipData;
    
    switch (shipId) {
      case '1':
        shipData = {
          id: 1,
          name: '澜光溢彩号',
          image: '/pages/images/ship1.png',
          description: '澜光溢彩号是一艘豪华邮轮，拥有现代感十足的设计和卓越的服务。船上设施一应俱全，为您提供无与伦比的海上度假体验。',
          features: ['千人派对', '水上乐园', 'SPA中心', '多个餐厅', '剧院表演', '游泳池'],
          tonnage: '15万吨',
          capacity: '5000人',
          decks: '18层'
        };
        break;
      
      case '2':
        shipData = {
          id: 2,
          name: '瀚海星洲号',
          image: '/pages/images/ship2.png',
          description: '瀚海星洲号是探索海洋奥秘的理想选择，融合了科技与自然的完美结合。无论是家庭出游还是浪漫之旅，都能在这里找到属于自己的乐趣。',
          features: ['星空观测台', '海底观光舱', '亲子活动区', '健身房', '美食广场', '免税商店'],
          tonnage: '13.5万吨',
          capacity: '4200人',
          decks: '16层'
        };
        break;
      
      case '3':
        shipData = {
          id: 3,
          name: '鲸歌远航号',
          image: '/pages/images/ship3.png',
          description: '鲸歌远航号以其独特的鲸鱼主题设计而闻名，船上充满了海洋文化元素。这是一艘适合探险爱好者的邮轮，提供多种海上活动和生态体验。',
          features: ['海洋生物课程', '皮划艇', '潜水中心', '海景套房', '户外烧烤区', '艺术画廊'],
          tonnage: '12万吨',
          capacity: '3800人',
          decks: '14层'
        };
        break;
      
      default:
        // 默认显示第一艘邮轮
        shipData = {
          id: 1,
          name: '澜光溢彩号',
          image: '/images/ship1.jpg',
          // 其他属性...
        };
    }
    
    this.setData({
      shipInfo: shipData
    });
  },

  // 返回上一页
  onBack() {
    wx.navigateBack();
  },

  // 预订按钮点击事件
  onBook() {
    wx.showModal({
      title: '预订提示',
      content: '您将前往预订页面，确定要继续吗？',
      success(res) {
        if (res.confirm) {
          // 跳转到预订页面
          wx.navigateTo({
            url: '/pages/booking/booking?shipId=' + this.data.shipInfo.id
          });
        }
      }
    });
  }
});