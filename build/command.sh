# 编译基础运行镜像
# docker build -f Dockerfile.base -t node-alpine-chromium-pnpm:latest .

# 在 docker 中测试当前运行镜像
# docker run -it --name test-node-base node-alpine-chromium-pnpm:latest


# ---------- 本地开发 docker 依赖

# docker 运行 redis 数据库
docker run -itd \
  -p 6379:6379  \
  -v $(pwd)/redis:/data \
  --name redis-test redis

# docker 运行 mongo 数据库
docker run -itd \
  -p 27017:27017  \
  -v $(pwd)/data/mongo:/data/db \
  --name mongo-test mongo
