# 📘 BCSP.blog 使用指南

欢迎使用你的新博客系统！这是一个基于 React 和 Markdown 的现代化博客，采用了全新的 **"Liquid Glass" (液态玻璃)** 设计语言，拥有动态光影背景和流畅的交互体验。

这份指南将帮助你从零开始管理、写作和发布内容。

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

## 🌍 线上部署 (Deployment)

推荐使用 **Vercel** 或 **Netlify** 进行免费且快速的部署。

### 方式一：使用 Vercel (推荐)
1.  **注册账号**：访问 [vercel.com](https://vercel.com) 并使用 GitHub 账号登录。
2.  **导入项目**：
    - 点击 "Add New..." -> "Project"。
    - 选择你的 GitHub 仓库（如果你还没有上传到 GitHub，请先上传）。
3.  **配置**：
    - Framework Preset 选择 `Vite`。
    - Build Command 默认为 `npm run build`。
    - Output Directory 默认为 `dist`。
4.  **部署**：点击 "Deploy"。等待约 1 分钟，你的博客就上线了！

### 方式二：使用 Netlify
1.  **注册账号**：访问 [netlify.com](https://netlify.com)。
2.  **导入项目**：点击 "Add new site" -> "Import from existing project"。
3.  **连接 Git**：选择 GitHub 并授权。
4.  **配置构建**：
    - Build command: `npm run build`
    - Publish directory: `dist`
5.  **部署**：点击 "Deploy site"。

### 方式三：手动部署 (静态托管)
如果你有自己的服务器 (如 Nginx/Apache)：
1.  在本地运行 `npm run build`。
2.  将生成的 `dist` 文件夹内的**所有文件**上传到服务器的 Web 根目录。
3.  配置服务器指向 `index.html`。
    - **注意**：由于是单页应用 (SPA)，需要配置 Nginx 将所有 404 请求重定向到 `index.html`，否则刷新页面会报错。

**Nginx 配置示例：**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## ✨ 特色功能

### 1. 🔍 全局搜索
- **位置**：页面顶部正中央。
- **功能**：常驻的玻璃质感搜索栏，支持实时搜索文章标题、内容和分类。
- **交互**：输入关键词后自动跳转到搜索结果页，支持一键清空。

### 2. 📁 分类浏览
- **入口**：点击 Header 左侧的 **文件夹图标**。
- **功能**：自动从所有文章中提取分类，以玻璃卡片形式展示。
- **展示**：点击分类卡片可查看该分类下的所有文章。

### 3. ⭐ 收藏夹
- **入口**：点击 Header 左侧的 **星标图标**。
- **功能**：查看你收藏的所有文章。
- **操作**：在文章详情页，点击左侧悬浮的 **圆形星标按钮** 即可收藏或取消收藏。收藏状态会保存在本地。

### 4. 🌓 深色/浅色模式
- **入口**：点击 Header 左侧的 **主题切换按钮**（太阳/月亮/显示器图标）。
- **功能**：支持 **浅色**、**深色** 和 **跟随系统** 三种模式。
- **设计**：深色模式下拥有独特的星空渐变背景，浅色模式则清新透亮。

---

## 📝 内容管理

### 1. 博客基础配置
博客的名称、标语等全局配置位于 `src/data.js` 文件中。

```javascript
export const blogConfig = {
    name: "BCSP.blog", // 博客名称
    hero: {
        title: "HELLO WORLD.", // 首页大标题
        subtitle: "A minimal blog template." // 首页副标题
    }
};
```

### 2. 管理文章 (Markdown)
所有的文章都作为独立的 `.md` 文件存放在 `src/posts/` 目录下。

#### 如何添加新文章：
1.  在 `src/posts/` 中创建一个新的 `.md` 文件（文件名建议使用英文，如 `my-first-post.md`）。
2.  **必须**在文件开头添加 "Front Matter"（元数据），格式如下：

```markdown
---
title: "文章标题"
date: "2025-11-30"
category: "分类名称"
excerpt: "这是一段简短的文章摘要，会显示在首页列表卡片上。"
---

这里开始写正文...
```

> **注意**：`category` 字段非常重要，系统会自动识别它并生成分类页面。

#### Markdown 写作技巧：
- **标题**：使用 `#` 表示一级标题，`##` 表示二级标题。
- **加粗**：使用 `**文字**`。
- **代码块**：使用三个反引号 \`\`\` 包裹代码。
- **引用**：使用 `> 引用文字`。

#### 如何添加图片：
1.  将图片文件放入 `public/images/` 目录（如果没有请新建）。
2.  在 Markdown 中这样引用：`![图片描述](/images/my-image.jpg)`。

---

## 🎨 个性化定制

### 1. 修改底部版权
打开 `src/components/Footer.jsx` 进行修改。

### 2. 修改样式
本项目使用 **Tailwind CSS**。
- **全局样式**：`src/index.css` (包含液态玻璃效果、动画定义)。
- **组件样式**：直接在组件 (`src/components/`) 的 `className` 中修改。

---

## ❓ 常见问题

**Q: 新建的文章没有显示？**
A: 请检查以下几点：
1.  文件名必须以 `.md` 结尾。
2.  文件必须在 `src/posts/` 目录下。
3.  **Front Matter** 格式必须正确（上下各有一行 `---`）。
4.  保存文件后，尝试刷新浏览器。

**Q: 搜索不到我的文章？**
A: 搜索功能支持标题、摘要、分类和正文内容。请确保你的关键词包含在这些字段中。

---

祝你写作愉快！ ✨
