# lerna-monorepo-demo
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

# 创建项目步骤

lerna create @zmrdlb-frame/lib zmrdlb-frame

lerna create @zmrdlb-frame/component zmrdlb-frame

lerna add @zmrdlb-frame/lib --scope=@zmrdlb-frame/component

lerna create project-one

lerna add @zmrdlb-frame/component --scope=project-one

git add .
Git commit

Lerna version
根据提示选择 Minor

到此为止，也执行了 git push

lerna publish

没有发布到 npm registry。

lerna publish from-package

提示缺少 LICENSE.md。不想发布 project-one，则在 package.json 下添加 private:true

添加LICENSE.md，并再次 git commit

Success

lerna publish from-package

因为之前没有 lerna publish 成功，所以加了 from-package

此时查看我的npm 个人主页，已经有2个scoped package

注意：lerna publish 没有执行 git push，lerna version 会

Publishing packages to npm...
