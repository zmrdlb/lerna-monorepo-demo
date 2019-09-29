# lerna-monorepo-demo

**lerna使用的简单 demo**

## 简单介绍 Monoreop 和 [Lerna](https://github.com/lerna/lerna)

### 问题背景

公司初期，刚开始只有一个项目，架构方面不不需要考虑太多，只是快速码代码。随着需求的增加，又诞生出项目 A,B,C。这些项目之间又很多相似之处，互相之间有可复用的代码。为了提高开发效率，新开一个 core 的项目，专门维护业务层的通用代码，如工具库和组件。此时有4个项目 core,A,B,C，每个项目都有自己的仓库，如 git repository，且 A,B,C 按照一定的方式分别引用 core，如将 core 作为 A,B,C 的 git sub respository 来使用（我之前的项目、框架、核心库之间的引用，就是这么设计的）。
看似很美好。但当项目越来越多，又因为各种情况导致对 core 的版本依赖又有所不同，那么问题出来了。
1. **跨项目调试耗时费力。** core 更改以后，git push。然后 A,B,C 分别 git pull 新的 core 才能测试。那么 core 在 push 之前并不能确保在具体项目中应用没有任何问题。同样的，在 core push 之前 A,B,C 必须得等待。最糟糕的情况是，A,B,C pull 了 新的 core 代码后，发现有 bug。一般来说这4个项目分别属于不同的部门或人，那么跨部门协调又是一个问题。个人觉得用 git 维护的都还好，但如果 core 是以 npm 的方式引用的话，那么真的每次得 git push + npm publish 来操作了。
2. **跨项目测试无法一起运行，定位 bug 困难，具有滞后性。** 测试用例无法一起运行，定位 bug 更加困难。按照现在的模式，项目搭配是以下情况：A+core, B+core, C+core，每个项目都独自运行自己的测试用例。A先开发完了，A+core 测试通过。3天后，B也开发完了，B+core测试失败。通过检查，发现是 core 的兼容性没做到位，再通知 core。然后又是 C。此处不再累赘。**core 的 bug 定位严重滞后。**
3. **依赖越多，版本管理越复杂。** A 依赖于 core 2.0.0；B 依赖于 core 1.12.0；C 依赖于 core 1.10.9。随着项目的增多，core 被所需维护的版本也增多。如果是基于 git，那每次都得打 tag 增加版本号；如果是基于 npm，每次手动修改版本号并发布。这两种方式都会造成，实际上真正被使用的版本最终只有几个，大多数都已废弃，但维护 core 的人也不清楚到底哪些是废弃的。

**以上方案，就是我们经常使用的 Multirepo: 一个项目（或 package) 一个 repository。**

### Monoreop

为了解决 Multirepo 所带来的问题，引入了 **Monoreop: 一个 repository 包含多个项目（或 package) 。称为 multi-package repositories。**

当然，Monoreop 也有缺点，随着项目的增加，repository 会越来越大。所以到底选择何种方式，请根据情况自行斟酌。不过类似于 babel 这样的，各个单独的 package 直接都紧密联系互相调用的，适合采用 Monorepo 最合适不过了。实际上，babel 也是这么多的。

**Monorepo 参考资料**
- [gomonorepo.org](https://gomonorepo.org/)
- [Monorepo](https://www.atlassian.com/git/tutorials/monorepos)
- [MONO VS MULTI](https://zhuanlan.zhihu.com/p/31289463)
- [mono-repo vs multi-repo](https://medium.com/@patrickleet/mono-repo-or-multi-repo-why-choose-one-when-you-can-have-both-e9c77bd0c668)

### [Lerna](https://github.com/lerna/lerna)

Lerna 是一个工具，是 Monorepo 的实现，使用 git 和 npm 优化管理 multi-package repositories 的工作流程。

## 分支说明

master: 采用 lerna 的 fixed mode。

## 基本使用

1. 按照 lerna 官方文档说明，使用 `lerna init` 初始化 lerna 项目。如本 demo。
2. 此处我新增了一个存放 package 的文件夹 zmrdlb-frame，需要在 `lerna.json` 中配置。设计思路是：
    - zmrdlb-frame: 存放我的 Org-scoped package，定义前端业务框架。这些将来被发布到 npm。
    - packages: lerna 默认生成的存放 packages 的文件夹，此处放具体的项目，不发布到 npm。
3. 新增核心库 @zmrdlb-frame/lib，定义各种实用小工具，不包括 ui: `lerna create @zmrdlb-frame/lib zmrdlb-frame`.
4. 新增组件库 @zmrdlb-frame/component，定义各种同 Web component 的，包含 ui 的通用业务组件：`lerna create @zmrdlb-frame/component zmrdlb-frame`
5. 确定依赖关系，@zmrdlb-frame/component 依赖 @zmrdlb-frame/lib：`lerna add @zmrdlb-frame/lib --scope=@zmrdlb-frame/component`
6. 新建项目 project-one：`lerna create project-one`
7. 确定依赖关系，project-one 依赖 @zmrdlb-frame/component：`lerna add @zmrdlb-frame/component --scope=project-one`
8. 以上3个新建的package, version 都是 0.0.0
9. 运行 `lerna version`，但收到以下错误提示信息：
``` bash
lerna ERR! EUNCOMMIT Working tree has uncommitted changes, please commit or remove the following changes before continuing:
```
10. git 提交：git add, git commit

> 注意当前在 fixed mode 下运行

11. 再次运行 `lerna version`，根据提示选择 semver keyword 来确定 version:
``` bash
lerna notice cli v3.16.4
lerna info current version 0.0.0
lerna info Assuming all packages changed
? Select a new version (currently 0.0.0) Minor (0.1.0)

Changes:
 - project-one: 0.0.0 => 0.1.0
 - @zmrdlb-frame/component: 0.0.0 => 0.1.0
 - @zmrdlb-frame/lib: 0.0.0 => 0.1.0

? Are you sure you want to create these versions? Yes
lerna info execute Skipping releases
lerna info git Pushing tags...
lerna success version finished
```
根据提示可看到，lerna 在 fixed mode 下运行 lerna version，假设所有 packages 更改，版本号全部更新。
12. 运行 `git status`，发现 lerna version 已经执行了 `git push`，当然上述输出也有显示。
13. 运行 `lerna publish`，发布 packages 到 npm。在运行此命令之前，请先运行 `npm login` 确认已经登录将要将包发布到的 npm registry。但运行后一直收到以下提示，并没有发布到npm。
``` bash
lerna notice Current HEAD is already released, skipping change detection.
lerna success No changed packages to publish 
```
根据提示，难道是说，因为我运行过 `lerna version` 导致已经 released 了？这点没搞清楚，先解决当前的问题吧。根据官方文档，增加参数，运行
`lerna publish from-package`，成功执行了 npm publish。
``` bash
Found 2 packages to publish:
 - @zmrdlb-frame/component => 0.1.0
 - @zmrdlb-frame/lib => 0.1.0
? Are you sure you want to publish these packages? Yes
Successfully published:
 - @zmrdlb-frame/component@0.1.0
 - @zmrdlb-frame/lib@0.1.0
lerna success published 2 packages
```

**小插曲：** 在 publish 成功之前还遇到了以下情况：
1. 提示待发布的 packages 缺少 LICENSE.md，按照提示新增 LICENSE.md.
2. 由于我并不想将 project-one 发布到 npm registry，只想通过 git 来维护。那么在 project-one 的 package.json 里新增 private:true，npm publish 将不会发布此 package。
14. 登录自己的npm registry 查看，@zmrdlb-frame/lib 和 @zmrdlb-frame/component 已经在我的 organization 里了。

### 总结
我本身对 lerna 也是摸索中，所以以下观点只是我的临时看法：
1. 开发时，代码只需像平常一样只用 git 来维护就可以了。为了方便版本跟踪，每次运行 `lerna version` 来 git push。如果确定正式上线，需要将 packages 发版供外部使用，则再运行 `lerna publish`。
