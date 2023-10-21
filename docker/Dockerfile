# Docker image for vue application
# VERSION 1.0.0
# Author: swcode

### 基础镜像，使用nginx镜像
FROM nginx

#作者
MAINTAINER lmx <2538381255@qq.com>

#应用构建成功后的文件被复制到镜像内
COPY ./../dist /usr/share/nginx/html/form-kpu/

#拷贝.conf文件到镜像下，替换掉原有的nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

#启动容器时的进程
ENTRYPOINT nginx -g "daemon off;"
