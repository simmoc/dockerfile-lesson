## 课题
### 入门篇
#### 课题一：制作一个nginx的镜像 并可通过访问 127.0.0.1 显示 hello world 
要求：源镜像 nginx:latest
### 进阶篇
#### 课题二（后端）：制作一个带php环境nginx镜像 并可通过访问127.0.0.1 返回 phpinfo(); 函数内容
要求：源镜像 alpine
#### 课题二（前端）：制作一个带node环境nginx镜像 并可通过访问127.0.0.1 返回 express.js 的hello world页面
要求：源镜像 alpine
### 高级应用篇
#### 课题三（后端）：通过docker-compose  构建一套 lnmp 环境 运行 api-frame 项目
要求: 
1. 需要使用docker-compose volume 实现数据库的持久化
2. 使用docker-compse network
3. php-fpm  nginx mysql 每个容器相互独立
#### 课题三（前端）：通过docker-compose  构建一套node nginx环境 可实现 构建 we-customer-admin_v2 项目 输出 dist 文件夹 到nginx中 并正常运行
要求: 
1. 需要使用docker volume实现node_modules 缓存  并实现dist代码 共享多容器
2. 使用docker-compse network
3. node 和 nginx 相互独立