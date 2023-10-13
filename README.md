.
├── package.json
├── packages/               # 多子项目的目录
│   ├── business/           # 业务组件库 - 子项目目录
│   │   ├── package.json    # 业务组件库 - 子项目package.json声明
│   │   └── src/*           # 业务组件库 - 子项目源码目录
│   └── components/         # 基础组件库 - 子项目目录
│       ├── package.json    # 基础组件库 - 子项目package.json声明
│       └── src/*           # 基础组件库 - 子项目源码目录
├── pnpm-workspace.yaml
├── scripts/*
└── tsconfig.json

上述目录中各自的作用：
- 根目录的 package.json 主要是用来声明公共的操作脚本和公共的开发编译所需的 npm 模块；
- packages/* 目录用来管理多个子项目，每个子项目都有各自的 package.json 项目声明文件；
- pnpm-workspace.yaml 是 pnpm 管理项目的配置文件；
- scripts/* 目录是用来存放项目通用编译脚本的；
- tsconfig.json 是用来声明 TypeScript 的项目配置的。

`scripts/build-module.ts` 这个脚本的编译步骤可以分成以下几点：
1. 用fast-glob模块来获取组件目录，也就是所有组件路径。
2. 把所有组件路径封装成Rollup编译入口。
3. 配置Rollup的编译配置，区分ESM和CJS两种输出结果。
4. 执行Rollup编译，编译出两种结果。