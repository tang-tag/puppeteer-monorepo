FROM node-alpine-chromium-pnpm:latest

# 建立字体文件夹
RUN mkdir -p /usr/share/fonts/TTF
# 复制字体到项目中
COPY ./ttf/* /usr/share/fonts/TTF/
