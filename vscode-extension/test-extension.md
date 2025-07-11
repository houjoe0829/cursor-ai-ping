# Cursor AI 通知插件 - 第一阶段测试指南

## 测试目标

验证 VS Code 扩展能够成功监听和识别 AI 状态变化，并在控制台输出对应的日志信息。

## 测试环境准备

### 1. 确认开发环境
- 已安装 Node.js (推荐 16.x 或更高版本)
- 已安装 VS Code 或 Cursor
- 已完成扩展编译 (`npm run compile`)

### 2. 启动扩展
**方法一：调试模式 (推荐)**
1. 在 VS Code 中打开 `vscode-extension` 文件夹
2. 按 `F5` 或点击 "运行和调试" → "运行扩展"
3. 将打开一个新的扩展开发主机窗口

**方法二：手动安装**
1. 复制整个扩展文件夹到 VS Code 扩展目录
2. 重启 VS Code

## 测试步骤

### 步骤 1: 验证扩展加载
✅ **预期结果**: 扩展启动时应显示欢迎信息
- 启动后应看到通知：`"Cursor AI 通知插件已加载！使用命令面板执行 '开始监控 Cursor AI' 来启动监控。"`
- 状态栏右侧应显示：`$(eye) AI监控: 未启动`

### 步骤 2: 启动监控功能
1. 按 `Cmd+Shift+P` (macOS) 或 `Ctrl+Shift+P` (Windows/Linux) 打开命令面板
2. 输入 "开始监控" 并选择 `开始监控 Cursor AI`

✅ **预期结果**:
- 显示通知：`"开始监控 Cursor AI 状态"`
- 状态栏更新为：`$(eye) AI监控: 运行中`

### 步骤 3: 验证状态监控
监控启动后，观察以下变化：

#### 3.1 控制台日志验证
1. 打开开发者控制台：
   - macOS: `Cmd+Option+I`
   - Windows/Linux: `Ctrl+Shift+I`
2. 切换到 "Console" 标签页
3. 查找包含 `[Cursor AI Monitor]` 的日志条目

✅ **预期结果**: 应看到类似以下的日志输出：
```
[Cursor AI Monitor] 扩展已激活
[Cursor AI Monitor] 开始监控 AI 状态
[Cursor AI Monitor] 正在检测聊天面板...
[Cursor AI Monitor] 检测到活动编辑器: /path/to/file.ts
[Cursor AI Monitor] 当前终端数量: 0
[Cursor AI Monitor] 状态变更: idle - 聊天面板已就绪，等待用户输入 (时间: 14:30:23)
[Cursor AI Monitor] 状态变更: processing - AI 正在处理您的请求... (时间: 14:30:25)
[Cursor AI Monitor] 状态变更: waiting - AI 等待您的进一步指示 (时间: 14:30:27)
[Cursor AI Monitor] 状态变更: completed - AI 已完成处理 (时间: 14:30:29)
[Cursor AI Monitor] 状态变更: error - 处理过程中发生错误 (时间: 14:30:31)
```

#### 3.2 状态栏图标验证
观察状态栏右侧的图标变化：

✅ **预期结果**: 图标应根据不同状态变化：
- `$(loading~spin) AI: processing` - 处理中 (旋转图标)
- `$(clock) AI: waiting` - 等待中 (时钟图标)
- `$(check) AI: completed` - 已完成 (勾选图标)
- `$(error) AI: error` - 错误 (错误图标)
- `$(eye) AI: idle` - 空闲 (眼睛图标)

#### 3.3 通知消息验证
监控过程中应定期看到状态变化的通知消息：

✅ **预期结果**: 收到类似以下通知：
- `"AI状态: AI 正在处理您的请求..."`
- `"AI状态: AI 等待您的进一步指示"`
- `"AI状态: AI 已完成处理"`
- `"AI状态: 处理过程中发生错误"`

### 步骤 4: 停止监控功能
1. 再次打开命令面板 (`Cmd+Shift+P` 或 `Ctrl+Shift+P`)
2. 输入 "停止监控" 并选择 `停止监控 Cursor AI`

✅ **预期结果**:
- 显示通知：`"已停止监控 Cursor AI 状态"`
- 状态栏更新为：`$(eye) AI监控: 已停止`
- 控制台输出：`[Cursor AI Monitor] 停止监控 AI 状态`

## 验收标准检查清单

- [ ] **扩展加载成功**: 无加载错误，显示欢迎消息
- [ ] **命令注册正确**: 命令面板中能找到对应命令
- [ ] **监控启动成功**: 能正常启动和停止监控
- [ ] **状态栏显示正确**: 图标和文字正确更新
- [ ] **日志输出完整**: 控制台能看到完整的状态变更日志
- [ ] **状态类型覆盖**: 能输出所有 5 种状态类型的日志
- [ ] **时间戳准确**: 日志中的时间戳格式正确
- [ ] **重复启动处理**: 重复启动监控时显示适当提示
- [ ] **资源清理**: 停止监控后能正确清理资源

## 故障排查

### 问题 1: 扩展未加载
**可能原因**:
- package.json 配置错误
- TypeScript 编译失败
- VS Code 版本不兼容

**解决方案**:
1. 检查编译输出：`npm run compile`
2. 查看 VS Code 开发者控制台的错误信息
3. 确认 `out/extension.js` 文件已生成

### 问题 2: 命令不可用
**可能原因**:
- 命令注册失败
- 扩展激活失败

**解决方案**:
1. 重启 VS Code 扩展开发主机窗口
2. 检查命令注册代码是否正确
3. 查看扩展激活日志

### 问题 3: 无日志输出
**可能原因**:
- 监控未正确启动
- 控制台级别设置过滤了日志

**解决方案**:
1. 确认监控已启动（查看状态栏）
2. 检查控制台过滤设置
3. 手动刷新开发者控制台

### 问题 4: 状态不变化
**说明**: 这是正常现象，当前版本使用随机状态模拟，可能会连续生成相同状态。扩展已实现去重逻辑，只有状态变化时才会输出新的日志。

## 测试成功标准

当您完成以上所有测试步骤并确认所有验收标准都满足时，第一阶段的可行性验证就成功完成了！

这证明我们已经成功建立了基础的监控框架，可以进入第二阶段的开发。 