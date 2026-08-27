# cruise-ticket-miniprogram
邮轮购票微信小程序
## 项目简介
本项目是一款面向游客的邮轮购票微信小程序，实现邮轮线路浏览、活动查看、在线选舱、订单管理、在线值机、客服售后等完整业务流程。
前端使用微信原生小程序开发，后端采用PHP + MySQL，实现前后端数据交互。

## 技术栈
- 前端：微信原生小程序（WXML / WXSS / JavaScript）
- 后端：PHP
- 数据库：MySQL

## 主要功能模块
1. 首页：邮轮线路、热门活动、目的地景点展示
2. 用户模块：登录注册、个人中心、乘客信息管理
3. 购票流程：线路查询筛选、舱位选择、订单确认、支付模拟
4. 订单中心：待支付、已支付、未出行、已完成订单管理
5. 配套功能：在线值机、售后客服、历史浏览记录

### 项目界面预览
<img width="152" height="322" alt="image" src="https://github.com/user-attachments/assets/aed7b0ed-0c0f-4e73-b387-7acd063e0871" />
<img width="152" height="322" alt="image" src="https://github.com/user-attachments/assets/3fa7f91d-4096-4bf8-bd11-59a42f6d0bb7" />
<img width="152" height="322" alt="image" src="https://github.com/user-attachments/assets/a37cac1e-abae-4289-b515-b84b16b4a5cd" />
<img width="152" height="322" alt="image" src="https://github.com/user-attachments/assets/08200c9b-d534-4388-9887-0a804ae927de" />


## 项目整体目录说明
```
├── program后端 # PHP 后端接口源码
├── supership前端 # 微信小程序前端代码
│ ├── pages # 小程序全部业务页面
│ ├── utils # 工具函数、网络请求封装
│ ├── app.js # 小程序全局逻辑
│ ├── app.json # 全局页面路由配置
│ ├── app.wxss # 全局公共样式
│ └── sitemap.json # 小程序站点配置
├── Cruise # 邮轮相关业务资源
├── purchaseinfo # 购票业务相关资源
```
> 提示：本仓库不含本地开发配置文件 project.config.json，下载源码后导入微信开发者工具会自动生成本地配置。

## 项目运行说明
1. **前端**：将 `supership前端` 文件夹导入微信开发者工具；
2. **后端**：部署 `program后端` 目录到PHP运行环境；
3. **数据库**：导入SQL脚本，修改后端内部数据库账号连接配置；
4. 修改小程序内接口请求地址，编译即可完整运行项目。
   
## 说明
本项目为设计练习作品，仅供学习参考，**禁止直接复制作为课程作业提交**。
数据库脚本与后端PHP接口源码包含在项目中，部署时需要修改数据库连接配置。
