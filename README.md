# OpenClaw Agent - 豆沙 Workspace

这是 OpenClaw 团队的前端工程师 **豆沙** 的独立工作空间。

## 🏠 关于豆沙

- **Name:** 豆沙 (Dousha)
- **Role:** UI/UX设计师 / 前端工程师
- **Emoji:** 🍡
- **运行环境:** Docker Desktop for Windows 容器

## 📁 文件结构

```
workspace-dousha/
├── IDENTITY.md      # 身份信息
├── ROLE.md          # 职责说明
├── SOUL.md          # 行为准则
├── logs/            # 工作日志
├── tasks/           # 任务管理
│   ├── inbox/      # 收件箱
│   └── outbox/     # 发件箱
├── designs/         # 设计稿
│   ├── wireframes/
│   ├── mockups/
│   └── prototypes/
├── code/            # 前端代码
│   ├── components/
│   ├── pages/
│   └── styles/
├── communication/   # Agent 通信
│   ├── inbox/
│   └── outbox/
└── docs/            # 设计文档
    ├── design-system/
    └── guidelines/
```

## 🐳 Docker 部署

### docker-compose.yml

```yaml
version: '3.8'

services:
  dousha:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: openclaw-dousha
    volumes:
      - .:/workspace
    environment:
      - AGENT_NAME=豆沙
      - AGENT_ROLE=frontend
      - WORKSPACE=/workspace
      - TZ=Asia/Shanghai
    working_dir: /workspace
    command: ["python3", "agent.py"]
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 256M
```

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /workspace

RUN apk add --no-cache \
    git \
    python3 \
    py3-pip

RUN npm install -g npm latest

COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

COPY agent.py .

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python3 -c "print('OK')" || exit 1

CMD ["python3", "agent.py"]
```

## 🚀 快速开始

### 1. 构建和启动

```bash
# 构建镜像
docker-compose build

# 启动容器
docker-compose up -d

# 查看状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

### 2. 进入容器

```bash
docker exec -it openclaw-dousha /bin/sh
```

### 3. 查看设计稿

```bash
ls -la /workspace/designs/
```

## 🎨 核心职责

### UI/UX 设计
- 用户界面设计
- 交互流程设计
- 原型制作
- 设计规范制定

### 前端开发
- 响应式页面开发
- 组件库建设
- 状态管理
- 性能优化

### 视觉设计
- 品牌视觉设计
- 图标和插画
- 动效设计
- 设计系统维护

## 📝 工作日志

每日工作日志模板：

```markdown
# 豆沙 - 工作日志 2026-03-08

## 今日工作
- [x] 首页 UI 设计
- [x] 登录页面前端开发
- [ ] 组件库优化

## 设计稿
- `designs/mockups/homepage.fig` - 首页设计
- `designs/wireframes/login.png` - 登录页线框图

## 代码提交
- `components/Button.vue` - 按钮组件
- `pages/Login.vue` - 登录页面

## 遇到的问题
- 移动端适配问题（已解决）

## 明日计划
- 个人中心页面开发

## 工作时长
- 总计：8 小时
```

## 🔗 团队协作

### 与灌汤 (PM)

**接收:** 产品需求、用户体验要求  
**提供:** 设计方案、前端进度、用户反馈

### 与酱肉 (后端)

**协作:** API 接口对接、数据格式定义  
**输出:** 前端接口文档、联调测试报告

### 与酸菜 (运维/测试)

**协作:** UI 测试、兼容性测试  
**输出:** 视觉验收标准、兼容性测试报告

## 📊 资源限制

| 资源 | 限制 | 说明 |
|------|------|------|
| CPU | 1.0 核心 | 足够前端开发 |
| 内存 | 256MB | 轻量级运行 |
| 存储 | 按需使用 | 设计稿 + 代码 |

---

**豆沙是你的前端工程师，负责所有用户界面和体验。** 🍡
