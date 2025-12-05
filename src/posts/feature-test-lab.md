---
title: "实验室：图片、表格与数学公式渲染测试"
date: "2025-12-05"
category: "系统测试"
excerpt: "本文用于验证博客系统的富文本渲染能力。包含远程图片的加载、Markdown 表格样式以及 LaTeX 数学公式的复杂渲染效果。"
---

## 1. 图片渲染测试 (Images)

这里展示一张来自 Unsplash 的随机图片，用于测试网络图片加载与自适应宽度：

![示例图片：安静的极简主义工作台](https://picsum.photos/1000/600)

*图注：如果图片无法显示，请检查网络连接或 Image 组件的配置。*

> **本地图片提示：**
> 如果你想加载本地图片，通常需要将图片放入 `public/images/` 文件夹，然后使用类似 `![我的图片](/images/test.jpg)` 的路径。

## 2. 表格样式测试 (Tables)

测试 Markdown 表格的对齐方式（左对齐、居中、右对齐）以及表头样式：

| 核心模块 | 开发状态 | 优先级 | 预计耗时 |
| :--- | :---: | :---: | ---: |
| **基础排版** | ✅ 已完成 | P0 | 2h |
| **图片系统** | ✅ 已完成 | P1 | 4h |
| **数学公式** | ⏳ 测试中 | P1 | 6h |
| **评论功能** | ❌ 待开发 | P2 | 12h |

## 3. 数学公式测试 (Math & LaTeX)

如果您的博客集成了 `remark-math` 和 `rehype-katex`（或类似插件），下面的公式应该能被正确渲染。

### 行内公式 (Inline)
著名的欧拉恒等式被誉为“最美的数学公式”，它写作 $e^{i\pi} + 1 = 0$。
在量子力学中，薛定谔方程也是核心，$i\hbar\frac{\partial}{\partial t}\Psi = \hat{H}\Psi$。

### 块级公式 (Block Display)
下面是一个高斯积分公式，它应该**独占一行**并**居中显示**：

$$
\int_{-\infty}^{\infty} e^{-x^2} \,dx = \sqrt{\pi}
$$

再测试一下矩阵与极限的渲染效果：

$$
\lim_{x \to \infty} \left( \begin{matrix} 1 & \frac{1}{x} \\ 0 & 1 \end{matrix} \right)^x = \left( \begin{matrix} 1 & 1 \\ 0 & 1 \end{matrix} \right)
$$