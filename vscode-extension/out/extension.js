"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
class CursorAIMonitor {
    constructor() {
        this.isMonitoring = false;
        this.observer = null;
        this.lastStatus = null;
        // 创建状态栏项目来显示当前监控状态
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        this.statusBarItem.text = "$(eye) AI监控: 未启动";
        this.statusBarItem.show();
    }
    startMonitoring() {
        if (this.isMonitoring) {
            vscode.window.showInformationMessage('AI状态监控已经在运行中');
            return;
        }
        this.isMonitoring = true;
        this.statusBarItem.text = "$(eye) AI监控: 运行中";
        console.log('[Cursor AI Monitor] 开始监控 AI 状态');
        vscode.window.showInformationMessage('开始监控 Cursor AI 状态');
        // 尝试查找并监控聊天界面
        this.setupDOMObserver();
    }
    stopMonitoring() {
        if (!this.isMonitoring) {
            vscode.window.showInformationMessage('AI状态监控未在运行');
            return;
        }
        this.isMonitoring = false;
        this.statusBarItem.text = "$(eye) AI监控: 已停止";
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        console.log('[Cursor AI Monitor] 停止监控 AI 状态');
        vscode.window.showInformationMessage('已停止监控 Cursor AI 状态');
    }
    setupDOMObserver() {
        // 在 VS Code 扩展中，我们需要通过 webview 或者监控特定的 UI 元素
        // 由于 Cursor 是基于 VS Code 的，我们可以尝试监控工作台中的变化
        // 首先尝试检测聊天面板是否存在
        this.detectChatPanel();
        // 设置定期检查
        setInterval(() => {
            if (this.isMonitoring) {
                this.checkAIStatus();
            }
        }, 1000); // 每秒检查一次
    }
    detectChatPanel() {
        // 在实际环境中，我们需要找到 Cursor 特有的聊天界面元素
        // 这里我们模拟检测过程
        console.log('[Cursor AI Monitor] 正在检测聊天面板...');
        // 检查是否有活动的文本编辑器
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            console.log('[Cursor AI Monitor] 检测到活动编辑器:', activeEditor.document.fileName);
        }
        // 检查是否有打开的终端
        const terminals = vscode.window.terminals;
        console.log('[Cursor AI Monitor] 当前终端数量:', terminals.length);
        // 模拟发现聊天面板
        setTimeout(() => {
            this.logStatus({
                status: 'idle',
                message: '聊天面板已就绪，等待用户输入',
                timestamp: Date.now()
            });
        }, 2000);
    }
    checkAIStatus() {
        // 这里是核心的状态检测逻辑
        // 在实际实现中，我们需要:
        // 1. 检测是否有 AI 生成的内容正在显示
        // 2. 检测输入框的状态
        // 3. 检测是否有错误信息
        // 4. 检测是否在等待用户操作
        // 目前我们用模拟数据来演示状态变化
        this.simulateStatusChanges();
    }
    simulateStatusChanges() {
        // 模拟不同的 AI 状态变化，用于验证监控功能
        const now = Date.now();
        const statusExamples = [
            {
                status: 'processing',
                message: 'AI 正在处理您的请求...',
                timestamp: now
            },
            {
                status: 'waiting',
                message: 'AI 等待您的进一步指示',
                timestamp: now
            },
            {
                status: 'completed',
                message: 'AI 已完成处理',
                timestamp: now
            },
            {
                status: 'error',
                message: '处理过程中发生错误',
                timestamp: now
            }
        ];
        // 随机选择一个状态进行演示（仅用于第一阶段验证）
        const randomStatus = statusExamples[Math.floor(Math.random() * statusExamples.length)];
        // 避免重复记录相同状态
        if (!this.lastStatus || this.lastStatus.status !== randomStatus.status) {
            this.logStatus(randomStatus);
        }
    }
    logStatus(status) {
        this.lastStatus = status;
        // 在控制台输出状态信息（第一阶段的验收标准）
        console.log(`[Cursor AI Monitor] 状态变更: ${status.status} - ${status.message} (时间: ${new Date(status.timestamp).toLocaleTimeString()})`);
        // 更新状态栏显示
        const statusIcon = this.getStatusIcon(status.status);
        this.statusBarItem.text = `${statusIcon} AI: ${status.status}`;
        // 显示通知（在开发阶段帮助验证）
        vscode.window.showInformationMessage(`AI状态: ${status.message}`);
    }
    getStatusIcon(status) {
        switch (status) {
            case 'processing':
                return '$(loading~spin)';
            case 'waiting':
                return '$(clock)';
            case 'completed':
                return '$(check)';
            case 'error':
                return '$(error)';
            default:
                return '$(eye)';
        }
    }
    dispose() {
        this.stopMonitoring();
        this.statusBarItem.dispose();
    }
}
// 扩展激活函数
function activate(context) {
    console.log('[Cursor AI Monitor] 扩展已激活');
    const monitor = new CursorAIMonitor();
    // 注册命令
    const startCommand = vscode.commands.registerCommand('cursor-ai-notifier.startMonitoring', () => {
        monitor.startMonitoring();
    });
    const stopCommand = vscode.commands.registerCommand('cursor-ai-notifier.stopMonitoring', () => {
        monitor.stopMonitoring();
    });
    // 添加到扩展上下文中，确保在扩展停用时能够清理
    context.subscriptions.push(startCommand, stopCommand, monitor);
    // 显示欢迎信息
    vscode.window.showInformationMessage('Cursor AI 通知插件已加载！使用命令面板执行 "开始监控 Cursor AI" 来启动监控。');
}
exports.activate = activate;
// 扩展停用函数
function deactivate() {
    console.log('[Cursor AI Monitor] 扩展已停用');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map