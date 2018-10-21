---
title: git中使用merge和rebase的区别
tags:
  - git
categories:
  - git
date: 2018-10-14 20:29:30
---

## 1 需求
今天和朋友讨论了一下 分支间的整合方案，merge和rebase。以及pull操作模式。
下面整理如下：

## 2 git pull做了什么

> git-pull - Fetch from and integrate with another repository or a local branch
> 译：从另一个版本库或本地分支拉取并与其整合

文档如上说，可见`pull`（拉取）执行了两个操作，他们是`fetch`（获取）和`integrate`（整合）。
拉取就是将版本从远程拉取到本地，可以理解成下载。而整合指的是将拉取的版本与本地版本合并到一起。
这个合并的操作，通常会有两种模式来实现，就是`merge`和`rebase`。

## 3 git merge合并
> git-merge - Join two or more development histories together
> 译：将两个或多个开发历史合并一起

merge，合并模式。指的是合并两个分支，最终的合并代码形成一个新的版本，两个分支的版本日志按照时间顺序合并到一起即可。 演示如下，`git merge dev`：

![git-merge](http://www.hellokang.net/images/posts/git-merge.png)

合并过程是，git会自动根据两个分支的共同祖先即v2，与两个分支的最新提交即master的v6和dev的v5进行一个三方合并，然后将合并中更新的内容生成一个新的版本即v6，内容合并完成后，会成立版本日志并记录。

merge的好处是版本不会出现错乱的情况（一会可以对比rebase，你会发现有错乱的情况），但多了一个额外的版本。（其实无所谓啦）
再看rebase模式。

## 4 git rebase变基
> git-pull - Reapply commits on top of another base tip
> 译：在另一个的基本上重新应用提交

rebase，重设基础。指的是整合时，以另一个为基础（dev），将当前的（master）应用上去。演示如下，`git rebase dev`：

![git-rebaes](http://www.hellokang.net/images/posts/git-rebase.png)

合并过程为，git会从两个分支的共同祖先即v2开始提取当前分支即master上的提交版本即v4和v5，将提取的修改v4和v6依次应用到目标分支dev的最新提交的后面。将master指向最新的合并版本。

从合并结果上看，rebase导致版本变为了：*v1->v2->v3->v5->v4->v6*，与真实的版本提交时间不一致了，就是发生了错乱。但rebase不会生成新的版本。

## 5 merge VS rebase
该如何选择他们？
* 当某个分支不再需要了（例如一个本地的bug分支，修复完毕就不在需要了），那么我们选择merge是合理的。
* 当我们的项目重启了，代码依赖的基础发生升级了，那么我们就可以rebase到这个升级之后的基础上继续开发。
* rebase -i，一个交互式的rebase，可以用来编辑版本信息，可以获得更加整洁的版本日志。
* 千万不要在主体分支上使用rebase，否则会导致历史胡乱的。

如果`git pull`的时候，出现 `error: failed to push some refs to '版本库'`， 可以`git pull --rebase`来解决下，后面说明原因。

这个还需要再总结一下。

## 6 结束

有问题，欢迎留言讨论！