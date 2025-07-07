# Cursor AI 通知插件 - VS Code 扩展

## 项目说明

这是 Cursor AI 通知插件的第一阶段实现，主要用于验证 DOM 监听技术的可行性。

## 功能特性

- 监控 Cursor AI 的工作状态
- 在控制台输出详细的状态日志
- 状态栏显示当前监控状态
- 支持手动启动/停止监控

## 安装方法

### 方式一：开发模式安装

1. 打开 VS Code (或 Cursor)
2. 按 `F5` 或在命令面板中执行 "调试: 启动调试"
3. 选择 "VS Code Extension Development Host"
4. 这将打开一个新的 VS Code 窗口，其中已加载了扩展

### 方式二：手动安装

1. 将整个 `vscode-extension` 文件夹复制到 VS Code 扩展目录：
   - macOS: `~/.vscode/extensions/`
   - Windows: `%USERPROFILE%\.vscode\extensions\`
   - Linux: `~/.vscode/extensions/`

2. 重启 VS Code

## 使用方法

### 启动监控

1. 打开命令面板 (`Cmd+Shift+P` 或 `Ctrl+Shift+P`)
2. 输入并执行：`开始监控 Cursor AI`
3. 查看状态栏右侧的监控状态指示器

### 查看监控日志

1. 打开开发者控制台：
   - macOS: `Cmd+Option+I`
   - Windows/Linux: `Ctrl+Shift+I`
2. 切换到 "Console" 标签页
3. 查找以 `[Cursor AI Monitor]` 开头的日志条目

### 停止监控

1. 打开命令面板 (`Cmd+Shift+P` 或 `Ctrl+Shift+P`)
2. 输入并执行：`停止监控 Cursor AI`

## 第一阶段验收标准

### 验证项目

1. **扩展安装成功**: 扩展能够正常加载，无错误信息
2. **命令执行**: "开始监控" 和 "停止监控" 命令能够正常执行
3. **状态显示**: 状态栏能够正确显示监控状态
4. **日志输出**: 控制台能够输出以下格式的状态日志：
   ```
   [Cursor AI Monitor] 状态变更: processing - AI 正在处理您的请求... (时间: 14:30:25)
   [Cursor AI Monitor] 状态变更: waiting - AI 等待您的进一步指示 (时间: 14:30:27)
   [Cursor AI Monitor] 状态变更: completed - AI 已完成处理 (时间: 14:30:29)
   [Cursor AI Monitor] 状态变更: error - 处理过程中发生错误 (时间: 14:30:31)
   ```

### 状态类型说明

目前扩展能够识别并输出以下状态：

- **idle**: 空闲状态，等待用户输入
- **processing**: AI 正在处理请求
- **waiting**: AI 等待用户进一步操作
- **completed**: AI 已完成处理
- **error**: 处理过程中发生错误

## 技术实现

### 架构设计

- **监控引擎**: `CursorAIMonitor` 类负责状态监控和管理
- **状态接口**: `AIStatus` 接口定义状态数据结构
- **UI 交互**: 通过 VS Code API 提供命令和状态栏显示

### 核心文件

- `src/extension.ts`: 主扩展文件
- `package.json`: 扩展配置和元数据
- `tsconfig.json`: TypeScript 编译配置

## 开发说明

### 编译和构建

```bash
# 安装依赖
npm install

# 编译 TypeScript
npm run compile

# 监视模式编译（开发时使用）
npm run watch
```

### 调试和测试

1. 在 VS Code 中打开扩展项目
2. 按 `F5` 启动调试模式
3. 在新窗口中测试扩展功能
4. 查看原窗口的调试控制台了解运行状态

## 后续开发计划

### 第二阶段：通信机制
- 实现 HTTP 客户端功能
- 向本地服务器发送状态数据
- 添加网络错误处理

### 第三阶段：实际 DOM 监听
- 替换模拟状态检测为真实 DOM 监听
- 识别 Cursor 特有的 UI 元素
- 实现更精确的状态判断逻辑

## 已知限制

1. **模拟状态**: 目前使用随机状态模拟，未实现真实的 DOM 监听
2. **Cursor 特定性**: 需要进一步研究 Cursor 的 UI 结构来实现精确监听
3. **性能优化**: 当前的轮询机制需要优化以减少资源消耗

## 问题排查

### 常见问题

1. **扩展未加载**: 检查 `package.json` 配置是否正确
2. **编译错误**: 确保 TypeScript 版本兼容
3. **命令不可用**: 重启 VS Code 并重新加载扩展

### 调试技巧

1. 使用 `console.log` 添加调试信息
2. 在 VS Code 开发者工具中查看错误信息
3. 检查扩展主机窗口的输出面板 