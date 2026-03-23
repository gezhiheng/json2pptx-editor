# Pipto

[English](./README.md)

## 项目简介

Pipto 是一个以 JSON 为核心的演示文稿工作区，用来完成幻灯片的编写、转换、预览、导入和导出。  
它把面向 SEO 的 website、交互式 playground，以及一组可发布的底层包组织到同一个 workspace 中，让演示文稿流程变成可复用的工程资产。

在运行时，仓库分成两个应用层：

- `apps/website`：面向品牌展示、介绍页和 SEO
- `apps/playground`：面向编辑、预览、模板实验和 PPTX round-trip

底层能力由 `packages/*` 提供：

- `json2pptx-schema`：负责迁移、校验和 normalize
- `json2pptx`：负责导出 PPTX
- `ppt2json`：负责解析 PPTX
- `pptx-previewer`：负责浏览器预览
- `pptx-custom`：负责主题替换与自定义内容转换

## 项目描述

Pipto 是一个 JSON-native 的演示文稿平台，将品牌官网、交互式 playground 和可复用的文档处理包统一在一个 workspace 中。它帮助团队把 deck 内容定义为结构化数据，在浏览器中预览，用统一规则批量改造模板，并在 JSON 与 PPTX 之间完成可维护的双向工作流，而不是把整个流程锁死在手工排版里。

## 功能特性

- 灵感来源于 [PPTist](https://github.com/pipipi-pikachu/PPTist)
- 用于产品介绍和 SEO 的 website
- 基于 Monaco Editor 的实时 JSON 编辑与代码折叠
- 实时幻灯片预览
- 通过 PptxGenJS 导出 PPTX
- 支持将 PPTX 导入回可编辑 JSON（基于 PPT 原生 XML 的视觉映射）
- 导出当前 JSON 为文件
- 基于 `apps/playground/template/*.json` 的模板选择器

## 技术栈

- React + Vite + TypeScript
- Tailwind CSS + shadcn 风格组件
- PptxGenJS
- Monaco Editor

## 核心依赖

- 相关 npm 包：
  - [`json2pptx`](https://www.npmjs.com/package/json2pptx)
  - [`json2pptx-schema`](https://www.npmjs.com/package/json2pptx-schema)
  - [`ppt2json`](https://www.npmjs.com/package/ppt2json)
  - [`pptx-custom`](https://www.npmjs.com/package/pptx-custom)
  - [`pptx-previewer`](https://www.npmjs.com/package/pptx-previewer)
- 运行时应用：`react`、`react-dom`、`vite`
- 编辑器/UI：`monaco-editor`、`@monaco-editor/react`、`lucide-react`、`@radix-ui/react-select`
- 样式工具：`tailwindcss`、`tailwind-merge`、`class-variance-authority`、`clsx`

## 项目结构

- `apps/website/`：对外网站
- `apps/playground/`：editor 应用源码与模板
- `packages/`：可发布 npm 包及其相关测试

## 快速开始

### 1) 安装依赖

```bash
pnpm i
```

### 2) 启动开发服务器

```bash
pnpm dev
```

## 常用命令

```bash
# 应用开发服务器（Vite HMR，适合改页面/应用代码）
pnpm dev

# 同时监听工作区库 + 应用（推荐：改 lib 时也能联动 HMR）
pnpm dev:workspace

# 仅监听工作区库（json2pptx、schema、ppt2json、pptx-previewer、pptx-custom）
pnpm dev:libs

# 运行测试
pnpm test

# 构建生产包
pnpm build

# 本地预览生产包
pnpm preview

# 分库构建
pnpm build:schema
pnpm build:json2pptx
pnpm build:ppt2json
pnpm build:pptx-previewer
pnpm build:pptx-custom
```

## 使用方式

### 选择模板

将 JSON 模板放入 `apps/playground/template/`（例如 `apps/playground/template/template_2.json`）。重启开发服务器后可刷新模板列表。  
本仓库模板来源于 [PPTist](https://github.com/pipipi-pikachu/PPTist)。

### 导出 / 导入

- **导出 JSON**：下载当前编辑器内容。
- **导出 PPTX**：通过 PptxGenJS 生成 `.pptx` 文件。
- **导入 PPTX**：上传 `.pptx` 并通过 Office XML 解析转换为 JSON。
  视觉 round-trip 优先针对仓库内模板和共享视觉 primitive 进行优化，
  包括纯色/渐变/图片填充、图片裁剪、文本、路径和线条。
  `.pptx` 内不会嵌入，也不会读取任何自定义 JSON 文件。

## 说明

- 预览会使用 JSON 中的 `width` 与 `height` 维持画布比例。
- PPTX 导出对形状、文本、图片、线条采用尽力映射策略。
- 模板中的远程图片需可公开访问，才能用于 PPTX 导出。
