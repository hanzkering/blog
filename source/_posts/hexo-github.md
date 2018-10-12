---
title: Hexo搭建博客，发布到GitHub
date: 2018-10-11 19:12:21
tags:
- hexo
- blog
- github
- ssh
categories:
- hexo
---

## 1 需求
博客之前是wordpress搭建的，也很好用。现在想使用一个基于markdown文件为中心的博客系统，就锁定了hexo这个项目。hexo是基于Node.js的，提供markdown支持，草稿，单页，分类，标签，主题，i18n，永久链接，静态生成，部署等很常用的博客系统功能。其主页地址为：[Hexo](https://hexo.io/zh-cn/)，大家可以获取更详细的信息。
下面就和大家说说过程，大致有博客搭建，部署到github，还有另一个git服务器（个人的服务器）上的过程。
> 下面的操作的个人电脑为windows系统（win10)。
## 2 hexo搭建博客
此步骤完成后，可以在自己本地电脑上，看到完整的博客系统了。
### 2.1 快速开始
在安装好 Node.js, Git的基础上，执行下面代码即可
```shell
$ npm install -g hexo-cli
$ hexo init <folder>
$ cd <folder>
$ npm install
$ hexo server
```
浏览器访问`http://localhost:4000`，即可看到你的博客。

如果没有Node.js或Git，请按照下面的步骤执行。
### 2.2 安装Node.js
Node.js是基于Chrome V8 JavaScript引擎的JavaScript运行环境(runtime built)。安装方式请参考[Node.js官网](https://nodejs.org/) ，或者[本站的Node.js相关内容](/categories/nodejs/)。
安装完毕后，应出现如下效果，表示安装成功：
```CMD
C:\Users\Kang> node -v
v8.12.0
PS C:\Users\Kang> npm -v
6.4.1
```
> 安装Node.js还可以使用nvm（Node Version Manager，Node.js的版本管理工具）。使用nvm可以方便的安装Node.js的各种版本，以及在版本间进行切换。安装使用方式请参考[windows下的nvm](https://github.com/coreybutler/nvm-windows)和[linux下的nvm](https://github.com/creationix/nvm)或者[本站的Node.js相关内容](/categories/nodejs/)。

### 2.3 安装Git
Git是开源免费的分布式版本控制系统是用来处理代码量由小到大相关问题的。安装方式请参考[Git官网](https://git-scm.com/)，或者[本站的Git相关内容](/categories/git/)。
安装完毕后，应出现如下效果，表示安装成功：
```CMD
C:\Users\Kang> git version
git version 2.19.1.windows.1
```
### 2.4 安装Hexo
使用npm按照hexo即可，运行如下代码全局按照hexo-cli这个hexo的命令行工具
```shell
$ npm install -g hexo-cli
```
安装完毕后，应出现如下效果，表示安装成功：
```CMD
C:\Users\Kang> hexo -v
hexo-cli: 1.1.0
os: Windows_NT 10.0.17134 win32 x64
http_parser: 2.8.0
node: 8.12.0
v8: 6.2.414.66
uv: 1.19.2
zlib: 1.2.11
ares: 1.10.1-DEV
modules: 57
nghttp2: 1.32.0
napi: 3
openssl: 1.0.2p
icu: 60.1
unicode: 10.0
cldr: 32.0
tz: 2017c
```

### 2.5 Hexo建站
安装 Hexo 完成后，请执行下列命令，Hexo 将会在指定文件夹中新建所需要的文件：
```shell
$ hexo init <folder>
$ cd <folder>
$ npm install
```
选择好需要的站点目录（目录地址不要有中文）。例如选择 `D:\projects\practice\blog>` 作为建站目录，那么执行如下操作即可：
```CMD
C:\Users\Kang> d:
D:\> cd .\projects\practice
D:\projects\practice> hexo init blog
D:\projects\practice> cd blog
D:\projects\practice\blog> npm install
```
此时一个基本的博客已经建立完毕了。

### 2.6 运行Hexo博客
进入博客目录，执行 `hexo server` 即可运行hexo服务器。
```
D:\projects\practice\blog> hexo server
INFO  Start processing
INFO  Hexo is running at http://localhost:4000 . Press Ctrl+C to stop.
```
此时，浏览器访问`http://localhost:4000`，即可看到你的博客。效果如下：

![hexo默认博客首页](/images/posts/hexo-init.png ''hexo默认博客首页'')

至此，hexo搭建的博客已经完成。该博客使用方法，如何发文章，分类，标签等操作请参考[Hexo文档](https://hexo.io/zh-cn/docs/)，本文不再赘述。

## 3.发布到GitHub
GitHub上允许我们搭建自己的静态站点，在不购买自己的服务器情况下，可以有自己的博客。
需要用到Hexo提供的发布相关功能，同时需要在github上做一定的配置。

### 3.1 注册GitHub
> 已有账号的跳过此步骤

注册操作，跟着GitHub引导完成即可，[GitHub注册](https://github.com/join?source=header-home)

### 3.2 创建版本库
登录后，[创建新版本库https://github.com/new](https://github.com/new)
![新建版本库](/images/posts/github-new-repository.png)

*注意：版本库名字强烈建议是 `<你的用户>.github.io` 这种格式*
创建完毕后，就可以使用 `<你的用户>.github.io` 这种方式访问你的github博客地址，但现在访问应该不会成功，因为是一个新创建的版本库，是空的，一无所有....。接下来就把我们本地的博客内容部署到这个github版本库上。

### 3.3 部署到GitHub
回到我们本地的博客项目中，hexo对于基于git的部署提供了一个工具[hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)，我们直接安装使即可。

安装 hexo-deployer-git
```
$ npm install hexo-deployer-git --save
```

### 3.4 修改博客的部署配置
需要指定部署类型，版本库地址，分支，消息等信息
```
/_config.yml
deploy:
  type: git
  repo: https://github.com/yourusername/yourusername.github.io
  branch: master
```

### 3.5 执行部署
部署的过程，是将本地博客先生成静态文件，然后将静态文件发布到指定的版本库中。
因此总的过程应该是，清理之前的静态文件，生成新静态文件，发布到版本库 这个步骤，执行下面的代码即可：
```
$ hexo clean
$ hexo deploy
```
> 部署deploy时会自动生成，因此可以省略 `$ hexo generate` 操作。

第一次部署的过程中，会出现要求输入GitHub账号信息的步骤，请输入即可：
![GitHub登录](/images/posts/github-signin.png)

等等过后，如果出现 `Deploy done`，类似的信息，说明部署完成。
![GitHub部署成功](/images/posts/github-deploy-done.png)

也可以去版本库中查看是否已经存在代码了，版本库地址就是：https://github.com/yourusername/yourusername.github.io
![GitHub部署成功](/images/posts/github-deploy-done-code.png)

部署完毕，就可以在 `yourusername.github.io` 看到你的博客了。
![GitHub博客](/images/posts/github-blog.png)

### 3.6 绑定域名

## 4 总述
完成以上部署后，博客完毕。写作流程就是，本地编辑md文件，本地预览ok后，发布到github即可！
写作过程，请参考：[Hexo文档](https://hexo.io/zh-cn/docs/)。

有问题，欢迎留言讨论！
