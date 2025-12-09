# 📘 BCSP.blog 使用指南 (Neo-Brutalism Edition)

欢迎使用你的新博客系统！这是一个基于 React 和 Markdown 的现代化博客，采用了前卫的 **"Neo-Brutalism" (新粗野主义)** 设计语言。

**其核心特征是：** 高对比度、粗黑边框、硬阴影、复古字体与现代交互的结合。

---

## 🚀 快速开始

### 1. 启动开发服务器
在终端中运行以下命令，即可在本地预览博客：

```bash
cd /Users/Apple/blog
npm run dev
```

启动后，请在浏览器访问：[http://localhost:5173](http://localhost:5173)

### 2. 构建发布
当你准备好发布到线上时，运行：

```bash
npm run build
```
构建产物将生成在 `dist` 目录下。

---

## ✨ 核心特色功能

### 1. 🐍 首页 Brutalist Snake (贪吃蛇)
- **位置**：首页顶部 Hero 区域。
- **玩法**：
    - **PC端**：使用键盘 **方向键 (↑ ↓ ← →)** 控制蛇的移动。
    - **移动端**：使用屏幕上的虚拟十字键。
    - **目标**：吃掉黄色像素点 (`#EBFF00`)，避免撞墙或撞到自己。
- **设计**：完全融入 Brutalist 网格系统，黑白配色，硬核复古。

### 2. 🌓 氛围感暗黑模式 (Atmospheric Dark Mode)
- **入口**：Header 右侧的 **“胶囊形状”** 滑块按钮。
- **Day Mode**：纯白背景，高对比度黑字，报纸般的阅读体验。
- **Dark Mode**：
    - **深蓝黑渐变背景** (`#0a0a12` → `#010409`)，致敬 GitHub 夜间模式。
    - **中心暗角 (Vignette)**：聚拢视觉焦点。
    - **青色光晕**：文章卡片带有微妙的 Cyberpunk 风格光晕。
    - **文字**：自动切换为柔和的浅灰色，保护视力。

### 3. ✒️ 精选字体栈
- **标题**：`Playfair Display` —— 优雅的衬线字体，营造杂志质感。
- **正文 (中文)**：**宋体 (Songti SC / SimSun)** —— 响应您的需求，回归经典的中文衬线体，书卷气十足。
- **数据/代码**：`Space Mono` —— 等宽字体，用于元数据、日期和代码块。

### 4. 💭 Thoughts (短想法)
- **入口**：Header 顶部的 **"THOUGHTS"** 链接。
- **功能**：类似推特的时间轴，用于发布碎片化观点。
- **添加方法**：编辑 `src/data/thoughts.js` 文件，在数组头部添加新对象。

---

## 📝 内容创作 (Markdown)

所有的文章都作为独立的 `.md` 文件存放在 `src/posts/` 目录下。

### 1. Front Matter (必须)
每篇文章开头必须包含元数据：

```yaml
---
title: "我的新文章"
date: "2025-12-09"
category: "Design"
excerpt: "这是一段简短的摘要..."
slug: "my-new-post"
---
```

### 2. 写作语法
本博客支持增强版 Markdown：

- **标题**：`# H1`, `## H2` (自动带有粗黑下划线)
- **数学公式**：支持 LaTeX，如 `$E=mc^2$`。
- **表格**：自动适配 Brutalist 风格，黑白分明。
- **图片**：
  ```markdown
  ![图片描述](/images/my-photo.jpg)
  ```
  图片会自动包裹在粗黑边框 (`border-2 border-neo-black`) 中，并带有硬阴影。

### 3. 本地图片
将图片放入 `public/images/` 文件夹，然后引用 `/images/文件名.扩展名` 即可。

---

## ⚙️ 部署指南 (Deployment)

推荐使用 **Vercel** 或 **Netlify** 进行托管。

**三步发布法：**

1.  **提交更改**：
    ```bash
    git add .
    git commit -m "update blog content"
    ```
2.  **推送到 GitHub**：
    ```bash
    git push
    ```
3.  **等待自动构建**：
    Vercel/Netlify 会自动检测更新并发布。

---

## ❓ 常见问题

**Q: 为什么中文显示为宋体？**
A: 这是我们在 `tailwind.config.js` 中特别配置的，以匹配整体的复古/粗野主义风格。如果你想改回黑体，可以在配置中移除 `Songti SC`。

**Q: "贪吃蛇" 游戏按键没反应？**
A: 请确保在该区域点击一下鼠标以获取焦点，或者确保没有输入法拦截按键。

---

祝你在 Neo-Brutalism 的世界里创作愉快！ ⬛️⬜️🟨
