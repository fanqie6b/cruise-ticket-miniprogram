Page({
  data: {
    cruiseList: ['海洋光谱号', '皇家加勒比量子号', '歌诗达威尼斯号', 'MSC荣耀号'],
    cruiseIndex: -1,
    sailingDate: '',
    orderNo: '',
    lastNamePinyin: '',
    birthDate: '',
    agreeTerms: false,
    minDate: '',
    maxDate: '',
    maxBirthDate: '',
    isSubmitting: false 
  },

  onLoad() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    this.setData({
      minDate: `${year}-${month}-${day}`,
      maxDate: `${year + 1}-${month}-${day}`,
      maxBirthDate: `${year - 18}-${month}-${day}`
    });
  },

  handleCruiseChange(e) {
    this.setData({
      cruiseIndex: e.detail.value
    });
  },

  handleDateChange(e) {
    this.setData({
      sailingDate: e.detail.value
    });
  },

  handleOrderNoChange(e) {
    this.setData({
      orderNo: e.detail.value
    });
  },

  handleLastNameChange(e) {
    this.setData({
      lastNamePinyin: e.detail.value.toUpperCase()
    });
  },

  handleBirthChange(e) {
    this.setData({
      birthDate: e.detail.value
    });
  },

  handleAgreeChange(e) {
    this.setData({
      agreeTerms: e.detail.value.length > 0
    });
  },


  showConsult() {
    wx.showModal({
      title: '联系客服',
      content: '是否拨打客服电话？',
      success: (res) => {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '400-800' 
          });
        } else if (res.cancel) {
          wx.showToast({
            title: '已取消拨打',
            icon: 'none',
            duration: 1500
          });
        }
      }
    });
  },
  validateForm() {
    const { cruiseIndex, sailingDate, orderNo, lastNamePinyin, birthDate, agreeTerms } = this.data;
    if (cruiseIndex === -1) {
      wx.showToast({
        title: '请选择邮轮',
        icon: 'none'
      });
      return false;
    }
    if (!sailingDate) {
      wx.showToast({
        title: '请选择出航日期',
        icon: 'none'
      });
      return false;
    }
    if (!orderNo) {
      wx.showToast({
        title: '请输入订单号',
        icon: 'none'
      });
      return false;
    }
    if (!lastNamePinyin) {
      wx.showToast({
        title: '请输入姓氏拼音',
        icon: 'none'
      });
      return false;
    }
    if (!birthDate) {
      wx.showToast({
        title: '请选择出生日期',
        icon: 'none'
      });
      return false;
    }
    if (!agreeTerms) {
      wx.showToast({
        title: '请同意条款',
        icon: 'none'
      });
      return false;
    }
    return true;
  },

  submitCheckIn() {
    if (this.data.isSubmitting) return;
    if (!this.validateForm()) return;
    this.setData({ isSubmitting: true });
    wx.showLoading({ title: '验证中...' });
    const data = {
      cruiseName: this.data.cruiseList[this.data.cruiseIndex],
      sailingDate: this.data.sailingDate,
      orderNo: this.data.orderNo,
      lastNamePinyin: this.data.lastNamePinyin,
      birthDate: this.data.birthDate
    };
    wx.request({
      url: 'http://localhost/program/checkin.php',
      method: 'POST',
      data,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: (res) => {
        console.log('验证结果:', res);
        if (res.statusCode === 200 && res.data.code === 200) {
          const orderId = res.data.data.id;
          wx.navigateTo({
            url: `/pages/passengerInfo/passengerInfo?orderId=${orderId}`
          });
        } else {
          wx.showToast({
            title: res.data.message || '验证失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        wx.showToast({ title: '网络错误', icon: 'none' });
      },
      complete: () => {
        wx.hideLoading();
        this.setData({ isSubmitting: false });
      }
    });
  }
}); 
