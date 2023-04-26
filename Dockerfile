FROM node:16.19.0-alpine as build

# 设置时区
ENV TZ=Asia/Shanghai
RUN ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime && echo ${TZ} > /etc/timezone

WORKDIR /app

COPY package*.json ./

RUN npm set registry https://registry.npm.taobao.org

RUN npm install -g pnpm --registry=https://registry.npmmirror.com/ && pnpm config set registry https://registry.npmmirror.com/

RUN pnpm install

COPY . .
ENV NODE_OPTIONS --max-old-space-size=1224
RUN pnpm run build

FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
