# 🐍 SnakeGame

一个基于 **C++ / SFML 3** 开发的贪吃蛇游戏，并使用 **Electron** 构建桌面启动器。

这是一个个人学习项目。从最初的 C++ 控制台编程，到图形界面、游戏逻辑，再到 Electron 桌面应用与 Windows 发布打包，记录了我逐步学习和实践软件开发的过程。

## ✨ Features

### Game

- 基于 SFML 3 实现游戏图形界面
- 蛇的自动移动与方向控制
- 食物生成与分数计算
- 吃到食物后蛇身增长
- 边界碰撞与自身碰撞检测
- 游戏结束状态处理

### Launcher

- 基于 Electron 的桌面启动器
- 简洁的樱花主题 UI
- START / EXIT 游戏控制
- 实时分数与最高分展示
- 最高分本地持久化保存
- 游戏结束后自动更新成绩

### Packaging

- 支持 Windows x64
- 游戏程序与运行时依赖一起打包
- ZIP 绿色版发布
- 无需单独安装 Electron

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| C++ | Game logic |
| SFML 3 | Graphics and window management |
| HTML / CSS | Launcher interface |
| JavaScript | Electron application logic |
| Electron | Desktop launcher |
| CMake | C++ project build |
| Git | Version control |

## 🚀 Run Locally

### Requirements

- Windows 11
- GCC / MinGW
- CMake
- SFML 3
- Node.js and npm

### 1. Clone the repository

```bash
git clone https://github.com/Houshin152/SnakesGames.git
cd SnakesGames
```

### 2. Build the game

```bash
cmake -S . -B build -G "MinGW Makefiles"
cmake --build build
```

确保 SFML 3 已正确安装，并且 CMake 能够找到对应的 SFML 配置文件。

### 3. Install Electron dependencies

```bash
npm install
```

### 4. Start the launcher

```bash
npm start
```

启动后即可通过桌面启动器运行游戏。

## 📦 Build Release

项目使用 electron-builder 生成 Windows x64 ZIP 绿色版。

发布前需要先准备 `release/game/` 目录，其中包含：

- `SnakeGame.exe`
- 游戏运行所需的 DLL 文件

然后执行：

```bash
npm run dist
```

打包结果位于 `dist/` 目录。

> 注意：`release/game/` 是本地发布资源目录，不包含在 Git 仓库中。

## 📁 Project Structure

```text
SnakeGame/
├── Launcher/       # Electron 启动器界面
├── assets/         # 项目资源
├── src/            # C++ 游戏源码
├── build/          # CMake 编译输出
├── release/        # Windows 发布资源
├── main.js         # Electron 主进程
├── preload.js      # Electron 预加载脚本
├── CMakeLists.txt  # CMake 配置
└── package.json    # Node.js / Electron 配置
```

## 📌 About

这是一个仍在持续学习与完善的个人项目。

开发过程中，我尝试独立完成游戏逻辑、桌面界面、进程通信、数据持久化以及项目打包，并通过 Git 记录开发过程。

欢迎 Star，也欢迎提出建议和反馈。