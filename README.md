# Cursor AI 通知插件

## 项目介绍

这是一个专为 macOS 用户设计的 Cursor 辅助工具，用于实时监控 Cursor AI 的状态并通过系统级通知及时告知用户。

## 项目结构

```
cursor-ai-ping/
├── docs/                          # 项目文档
│   └── Cursor AI 通知插件.md       # 需求和设计文档
├── vscode-extension/              # VS Code 扩展（第一阶段）
│   ├── src/extension.ts           # 主扩展文件
│   ├── package.json               # 扩展配置
│   ├── tsconfig.json              # TypeScript 配置
│   ├── README.md                  # 扩展说明文档
│   └── test-extension.md          # 测试指南
└── menubar-app/                   # macOS Menubar 应用（待开发）
```

## 开发阶段

### 第一阶段：可行性验证 (Proof of Concept) - 进行中
- 开发基础的 VS Code 扩展
- 实现对 Cursor 聊天视图的 DOM 监听
- 验证状态识别的准确性

### 第二阶段：搭建通信桥梁（待开发）
- 实现 HTTP 通信机制
- 数据传输链路验证

### 第三阶段：最小可行产品（待开发）
- macOS Menubar 应用开发
- 完整产品功能闭环

## 技术栈

- VS Code 扩展：TypeScript, VS Code Extension API
- macOS 应用：Swift/Electron（待定）
- 通信：本地 HTTP API

## 当前状态

✅ **第一阶段：可行性验证** - 已完成
- ✅ 创建了基础的 VS Code 扩展
- ✅ 实现了状态监控框架
- ✅ 可在控制台输出状态变更日志
- ✅ 提供了完整的测试指南

📋 **第二阶段：搭建通信桥梁** - 待开始

## 快速开始

### 测试第一阶段扩展

1. **进入扩展目录**：
   ```bash
   cd vscode-extension
   npm install
   npm run compile
   ```

2. **启动扩展进行测试**：
   - 在 VS Code 中打开 `vscode-extension` 文件夹
   - 按 `F5` 启动调试模式
   - 在新窗口中通过命令面板执行 "开始监控 Cursor AI"
   - 查看控制台日志验证功能

3. **详细测试步骤**：
   - 参考 `vscode-extension/test-extension.md` 中的完整测试指南
