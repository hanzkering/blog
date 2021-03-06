---
title: Go语言中的变量
date: 2018-10-18 18:51:32
categories:
- go
tags:
- go
- go-guide
- 变量
- var
---

<!-- toc -->

## 1 概述

变量（Variable）是程序运行过程中，内容可以变化（修改）的量，变量的功能是存储用户的数据，是计算机语言中能储存计算结果或能表示值抽象概念。
变量，是通过变量的标识符定位值的过程。变量的内存模拟演示：

![变量的内存模拟演示](http://www.hellokang.net/images/posts/go-variable.png)

## 2 定义：声明和初始化
定义变使用var关键字，需要指定其类型，可以同时初始化，如果没有指定初始化值，则使用类型的默认值，语法如下：
```
// 声明变量，未初始化（默认值初始化）
var name string
// 声明变量，特定值初始化
var user string = "Hank"
```

Go语言中的变量必须声明后才可以使用，不能直接使用未定义的变量。


## 3 类型默认值（零值）

Go语言的类型默认值如下所示：
* 整型和浮点型变量的默认值为 0。
* 字符串变量的默认值为空字符串。
* 布尔型变量默认为 bool。
* 切片、函数、指针变量的默认为 nil。

## 4 强类型

Go语言是强类型语言，变量必须有类型，同时变量仅仅可以存储特定类型的数据。

## 5 类型推导

定义变量时，如果指定了初始值，则可以省略类型的定义，Go语言可以自己由数据推导出类型。
语法为：
```
// 声明变量，特定值初始化，类型推导出user为字符串string型
var user = "Hank"
```
## 6 短声明（定义）

为了简化定义变量，使用运算符 := 配合类型推导，可以快速完成变量的定义，语法为：
```
user := "hank"
```

## 7 批量定义
使用var或:=都可以一次性定义多个变量，语法为：
var
```
var (
  v1 = 42
  v2 = "hank"
  )
也可以
var v1, v2 = 42, "hank"
```
:=
```
v1, v2 := 42, "hank"
```

推荐使用 var() 声明块语法，因为代码维护容易。

## 8 批量赋值
一次性为多个变量进行赋值。（类似短定义。v1, v2, v3 := 42, "hank", false）
当变量定义完毕后，再批量对其赋值，没有定义功能！
语法为：
```
var (
  v1 int
  v2 int
)
// 批量赋值
v1, v2 = 42, 1024
```

该语法，通常配合函数的批量返回来使用，一次性接收多个返回值，语法为：
```
func main() {
  var (
    v1 int
    v2 int
  )
  // 调用函数，接收其返回值
  v1, v2 = getData()
}
// 返回两个值的函数
func getData() (int, int) {
  // 返回了两个值（假设42为最小值，1024为最大值）
  return 42, 1024
}
```

非常方便的可以交换两个变量的值：
```
var (
  v1 = 42
  v2 = 1024
)
// 交换
v1, v2 = v2, v1
```
执行后，v1==1024, v2==42

## 9 匿名变量

标识符为_（下划线）的变量，是系统保留的匿名变量，在赋值后，会被立即释放，称之为匿名变量。其作用是变量占位符，对其变量赋值结构。通常会在批量赋值时使用。
例如，函数返回多个值，我们仅仅需要其中部分，则不需要的使用_来占位，演示：
```
func main() {
  var (
    v int
  )
  // 调用函数，仅仅需要第二个返回值，第一，三使用匿名变量占位
  _, v, _ = getData()
}
// 返回两个值的函数
func getData() (int, int, int) {
  // 返回3个值
  return 42, 1024, 2012
}
```


## 10 变量作用域

Go语言中的变量是块作用域。
块，指的是使用{}定义的代码段，包括函数，if/switch/for语句，或独立的{}都是块。在块内定义的变量仅仅在本块内可用。
定义，指的是 var 或者 := 定义的变量。
Go语言的作用域是层叠的，就是说内层块可以直接访问到外层块的变量，前提是内层块没有定义同名的外层变量。
演示如下：
```
// 全局（函数外）定义3个变量
var (
  v1 = 1
  v2 = 2
  v3 = 3
)
func main() {

  // main{}函数块，定义2个变量
  var (
    v2 = 22
    v3 = 33
  )
  fmt.Println(v1, v2, v3)
  // 结果 1 22 33

  {
    // main()函数内部{}块，定义1个变量
    var (
      v3 = 333
    )
    fmt.Println(v1, v2, v3)
    // 结果 1 22 333
  }
}
```
上面代码中：
在main()中，v2，v3被重新定义，则在main()中，v1是外部，而v2, v3是main函数局部的。
在main()内部的{}中，v3被重新定义，则在main()内部的{}中，v1是外部，而v2是main()定义的, v3是main()内部{}定义的的。

变量可以沿内部作用域向外部作用域查找变量的过程。

带有{}的语句，其中的变量也仅仅在内部有效，例如for，if，switch等，演示：
```
for i := 0; i < 10; i++ {
  fmt.Println(i)
}
fmt.Println(i)
// 会提示变量i未定义, undefined: i
```
注意i，是通过短声明在for内部定义的变量，仅仅在for内部有意义。

互不嵌套的{}见作用域不可见，不可互相访问。
```
func main() {
  {
    v := 42
  }
  {
    fmt.Println(v)
    // 会提示变量v未定义, undefined: v
  }
}
```


一家之言，欢迎讨论！