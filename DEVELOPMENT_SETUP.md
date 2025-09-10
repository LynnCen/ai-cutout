# 开发环境设置

## 已配置的工具

### ESLint + Prettier

- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **保存时自动格式化**: 已配置VSCode在保存时自动运行格式化

### VSCode 设置

项目已配置以下VSCode设置：

- 保存时自动格式化
- ESLint自动修复
- Vue语法高亮支持

## 使用方法

### 1. 安装推荐扩展

VSCode会自动提示安装推荐扩展：

- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- Prettier - Code formatter
- ESLint

### 2. 开发命令

```bash
# 启动开发服务器
npm run dev

# 代码检查
npm run lint

# 自动修复ESLint问题
npm run lint:fix

# 格式化代码
npm run format

# 类型检查
npm run type-check

# 构建项目
npm run build
```

### 3. 自动格式化

- **保存时**: 文件保存时会自动运行Prettier格式化
- **手动**: 使用 `npm run format` 格式化所有文件
- **ESLint修复**: 使用 `npm run lint:fix` 自动修复可修复的问题

## 配置文件说明

- `.eslintrc.cjs` - ESLint配置（简化版，专注基础规则）
- `.prettierrc` - Prettier格式化规则
- `.vscode/settings.json` - VSCode工作区设置
- `.vscode/extensions.json` - 推荐扩展列表

## 注意事项

1. **Vue语法高亮**: 如果Vue文件语法高亮异常，请：
   - 按 `Cmd+Shift+P` → 运行 `TypeScript: Restart TS Server`
   - 或重新加载VSCode窗口

2. **ESLint警告**: 目前有少量`any`类型警告，这是正常的

3. **TypeScript版本**: 当前使用TypeScript 5.9.2，ESLint会显示版本警告但不影响功能

## 开发流程

1. 编写代码
2. 保存文件（自动格式化）
3. 运行 `npm run lint` 检查问题
4. 如有问题，运行 `npm run lint:fix` 自动修复
5. 提交代码

这样就可以保持代码风格一致，提高开发效率！
