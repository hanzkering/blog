---
title: git-continue
tags:
---
问题是这样的，本地有版本库并且有版本commit过了，想要同步到GitHub上，就在GitHub上创建了新的版本库，但不小心点了初始化README.md，也就是在GitHub上也有了一个版本了，就不是非空版本库了。接下来，关联本地版本库与GitHub(git remote add github 版本库地址)。
拉取push失败，提示执行pull。执行pull时，提示错误：`error: failed to push some refs to '版本库'`。
解决方式是在pull的时候，使用--rebase选项：
```
git pull --rebase github master
```
> 注意 `--rebase` 选项。 github我的远程name。master分支。

完了就看了一下--rebase为什么就可以了？

也就是我们在执行pull时，合并操作是`merge`操作，导致了这个问题。`--rebase`选项将整合操作改为`rebase`模式，解决了问题。 why?


## 4 复数
原生支持复数。
支持32bit+32bit复数complex64，和64bit+64bit的复数complex128。
示例：
```go

```