const app = getApp();
const util = require('../../utils/util');
Page({
  data: {
    fromOrder: false,
  },
  onLoad(options) {
    if (options && options.fromOrder) {
      this.setData({ fromOrder: true });
    }
  },
  // 跳转到注册页面
  enroll: function (e) {
    wx.navigateTo({ url: '/pages/enroll/enroll' });
  },
  // 登录核心逻辑
  login: function (e) {
    const { username, password } = e.detail.value;
    
    // 前端验证
    if (!username || !password) {
      wx.showToast({ title: '请输入用户名和密码', icon: 'none' });
      return;
    }
    if (password.length < 6) {
      wx.showToast({ title: '密码长度不能少于6位', icon: 'none' });
      return;
    }
    
    wx.request({
      url: util.basePath + "/login.php",
      method: "POST",
      data: { username: username.trim(), password: password.trim() }, // 去空格
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: (res) => {
        console.log("登录原始响应:", res.data); // 打印原始响应，方便调试
        
        // 处理响应（兼容可能的格式错误）
        let response = res.data;
        if (typeof response === 'string') {
          // 尝试修复JSON格式错误（如后端意外输出非JSON内容）
          try {
            response = JSON.parse(response.replace(/[^{}[\],:{}"'\d.\-+Eaeflnr-u \n\r\t]/g, ''));
          } catch (e) {
            wx.showToast({ title: '服务器响应格式错误', icon: 'none' });
            return;
          }
        }
        
        // 根据code判断登录状态
        if (response.code === 200) {
          const userInfo = response.user || {};
          if (!userInfo.id) {
            wx.showToast({ title: '用户信息不完整', icon: 'none' });
            return;
          }
          // 存储登录状态
          const storedUser = {
            ...userInfo,
            isLogin: true,
            isGuest: false
          };
          wx.setStorageSync('userInfo', storedUser);
          app.globalData.userInfo = storedUser;
          this.handleLoginSuccess();
        } else {
          // 显示具体错误信息
          wx.showToast({ 
            title: response.message || '登录失败', 
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: (err) => {
        console.error("登录请求失败:", err);
        wx.showToast({ title: '网络错误，请检查服务器', icon: 'none' });
      }
    });
  },
  handleLoginSuccess() {
    wx.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 1500
    });
    setTimeout(() => {
      if (this.data.fromOrder) {
        wx.navigateBack();
      } else {
        wx.switchTab({ url: '/pages/index/index' });
      }
    }, 1500);
  },
  guestLogin() {
    const guestInfo = {
      id: 'guest_' + Date.now(),
      username: '游客',
      isGuest: true,
      isLogin: true
    };
    wx.setStorageSync('userInfo', guestInfo);
    app.globalData.userInfo = guestInfo;
    wx.switchTab({
      url: '/pages/index/index',
      success: () => {
        wx.showToast({ title: '游客登录成功', icon: 'none' });
      }
    });
  }
});