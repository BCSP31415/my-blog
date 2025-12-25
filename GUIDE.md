# 📘 BCSP.blog 终极指南：从访客到架构师

这份文档是本项目的 **唯一真理来源 (Single Source of Truth)**。它兼具了“访客欢迎手册”和“架构师操作指南”的双重身份。

---

## 🟢 第一部分：给访客 (Welcome to the Lab)

你好，碳基生物。你现在访问的是一个基于 **"新粗野主义" (Neo-Brutalism)** 设计语言构建的数字空间。

在这里，没有圆润的边角，没有温吞的配色，只有高对比度的黑白、粗粝的线条和未经修饰的信息流。

### 1. 沉浸式交互 (Interactive Features)

#### 🎵 背景音乐 (BGM)
每一篇深度长文，顶部都会配备精选的 Spotify 曲目（如 *The Weeknd - Blinding Lights*）。
> **建议：** 点击播放，戴上耳机，获得最佳阅读体验。

#### 🐍 顶部彩蛋：贪吃蛇
如果你在阅读长难句时感到大脑过载，请看页面最顶部的 Hero 区域。
*   **PC端**：使用键盘方向键 `↑ ↓ ← →`。
*   **移动端**：点击屏幕上的虚拟按钮。
*   **目标**：吃掉那些显眼的黄色像素点 (`#EBFF00`)。

#### 🌓 氛围模式 (Atmospheric Mode)
右上角的胶囊按钮是通往里世界的开关。
*   **Day Mode**：像阅读一份严肃的旧报纸，冷静、克制。
*   **Dark Mode**：致敬 Cyberpunk 终端。调暗灯光，增加暗角 (Vignette) 和青色光晕，营造深夜黑客氛围。

---

## 🔴 第二部分：给架构师 (The Architect's Manual)

如果你是这个博客的主人（或维护者），以下是操作此系统的核心法则。

### 1. 本地开发与预览 (Local Development)

要在本地运行并实时查看你的博客，请使用以下命令：

```bash
# 启动开发服务器
npm run dev
```

**访问方式：**
- **本机访问**：打开浏览器访问 [http://localhost:5173](http://localhost:5173)。
- **局域网访问**（例如用手机查看）：
  1. 运行 `npm run dev -- --host`。
  2. 在浏览器访问终端显示的 Network IP 地址（例如 `http://192.168.1.5:5173`）。

### 2. 生产环境构建与模拟 (Build & Preview)

在正式发布前，你可能想测试一下生产版本的表现：

```bash

cd /Users/Apple/blog

# 1. 生成构建产物 (dist 文件夹)
npm run build

# 2. 本地预览构建后的结果
npm run preview
```
`npm run preview` 会启动一个本地服务器来运行 `dist` 目录中的静态文件，这最接近真实上线后的效果。

---

### 3. 元数据规范 (Metadata Schema)

每篇文章 (`.md`) 必须包含以下 YAML Frontmatter：

```yaml
---
title: "文章标题"                   # 必填。
date: "YYYY-MM-DD"                  # 必填。
category: "System / About"          # 必填。
excerpt: "简短摘要，用于SEO和卡片。"  # 必填。
spotify: "https://open.spotify..."  # 选填。支持标准链接或 Embed URL。
---
```

**🎵 关于 Spotify 🔗：**
现在你可以直接复制浏览器地址栏的 Spotify 链接填入 `spotify` 字段，系统会自动将其转换为播放器：
- ✅ **标准链接**：`https://open.spotify.com/track/ID`
- ✅ **Embed 链接**：`https://open.spotify.com/embed/track/ID`

### 4. 视觉架构 (Visual Architecture)

本站使用工业级渲染引擎来呈现高维内容。

#### 3D 资产管线
图片应存放在 `public/images/posts/[主题]/`。

```markdown
![Dopamine Transport](/images/posts/nootropics/dopamine_reuptake.png)
```
*   **效果**：系统自动包裹 **2px 粗黑边框**，应用 **灰度滤镜**（悬停时恢复彩色）。
*   **图注**：Alt 文字自动转为 `FIG_REF` 说明。

#### 学术级排版
支持 LaTeX 数学公式（由 KaTeX 驱动）。

**示例：** 欧拉公式
$$
e^{i\pi} + 1 = 0
$$

#### 代码工程
支持多语言语法高亮：

```python
def system_check():
    return "Ready"
```

### 4. 部署指南 (Deployment)

推荐使用 Vercel 或 Netlify 托管。任何推送到 `main` 分支的提交都会触发自动构建。

---

## ❓ 常见问题 (FAQ)

**Q: 为什么中文显示为宋体？**
A: `tailwind.config.js` 配置了 `Songti SC` 以匹配复古/粗野主义美学。

**Q: 为什么图片是黑白的？**
A: 默认应用 CSS `grayscale` 滤镜，以保持视觉统一。鼠标悬停特定的图片容器可查看原色 (Hover Reveal)。

---

***End of Manual***
