---
title: Go语言的数据类型
date: 2018-10-19 17:59:26
categories:
- go
tags:
- go
- go-guide
- 数据类型
---

<!-- toc -->

## 1 概述
Go语言作为类C语言，支持常规的基础数据类型的的同时，支持常用的高级数据类型。他们是：
* 整数，int，uint，int8，uint8，int16，uint16，int32，uint32，int64，uint64
* 浮点（小数），float32，float64
* 复数，complex
* 字符，byte，rune
* 字符串，string
* 布尔，bool
* 指针，pointor
* 数组，array
* nil
* 切片，slice。（引用类型）
* 映射，map
* 结构体，struct
* 接口，interface
* 函数，func()

本篇相当于一个类型索引。包含了Go语言中的全部类型。具体每种类型的操作，请参见具体章节！

## 2 整数，int
支持的整型分类很细，主要差异是占用的存储空间不同。基于有无符号列出为：
有符号的：int，int8，int16，int32，int64
无符号的：uint，uint8，uint16，uint32，uint64

其中int, unit是基于处理器架构的。意味着会根据处理器来确定是32bit还是64bit。
使用时，常常使用int。或者使用int32保证兼容。
在类型推导时，推导的整型为int，其他长度整型需要在定义变量时强制声明。
示例：
```
42
1024
-36
```

整型的默认值为0。

## 3 浮点数，float
支持IEEE-754标准浮点数。支持32bit和64bit的浮点数float32和float64。
在类型推导时，推导的浮点型为float64。float32需要在定义变量时强制声明。
示例：
```
1.0
3.14
0.618
4.2E10 // 4.2*10^10
```

浮点数的默认值为0。

## 4 复数，complex32,complex64
原生支持复数。
支持32bit+32bit复数complex64，和64bit+64bit的复数complex128。

## 5 字符，byte，rune
使用单引号定义字符型数据，字符指的是单个字符。有两种byte和rune：
byte：单字节字符，是uint8的别名。用于存储ASCII字符集字符
rune：多字节字符，是int32的别名。用于存储unicode字符集字符。
在类型推导时，推导的字符型为rune。byte需要在定义变量时强制声明。
示例：
```
'c'
'康'
```

字符的默认值是0。字符的本质就是整数型，根据字符集得到对应的字符。

## 6 字符串，string
原生支持字符串。使用双引号("")或反引号(\`\`)定义，内部是unicode编码。
双引号："", 用于单行字符串。
反引号：\`\`，用于定义多行字符串，内部会原样解析。
示例：
```
// 单行
"心有猛虎，细嗅蔷薇"
// 多行
`
大风歌
大风起兮云飞扬。
威加海内兮归故乡。
安得猛士兮守四方！
`
```

字符串支持转义字符，列表如下：
转移符 含  义
* \r  回车符（返回行首）
* \n  换行符（直接跳到下一行的同列位置）
* \t  制表符
* \'  单引号
* \"  双引号
* \\  反斜杠
* \uXXXX  Unicode字符码值转义

## 7 布尔型，bool
布尔型的值只可以是常量 true 或者 false。
示例：
```
var (
  isFinished = false
  )
```

## 8 指针，pointer
指针类型用于存储变量地址。使用运算符&,*完成操作。
使用运算符p:=&v可以获取v变量的地址。p中的数据格式类似`0xc0000b9528`，是一个内存地址的16进制表示。
使用运算符*p可以获取指针p指向变量v的值。
如图所示：

![指针](http://www.hellokang.net/images/posts/go-pointer.png)

在Go语言中，指针主要用于：
* 类型指针，对指针指向的数据进行修改。函数调用时传递参数使用指针，避免值传递拷贝额外数据。注意类型指针不能进行偏移和运算。
* 切片，由指向起始元素的原始指针、元素数量和容量组成。
示例：
```
p := 42
pv := &p
*pv ++
// p == 43
```

## 9 数组，array
数组是一段固定长度的连续内存区域。是具有相同类型数据元素序列。元素类型支持任意内置类型。
数组从声明时就确定长度，可以修改数组元素，但是数组不可修改长度。
使用 `[长度]类型` 进行数组的声明。
示例：
```
// 默认值初始化
var nums [4]int // [0 0 0 0]
// 指定初始值
var position = [4]string{"east", "south", "west", "north"}
// 自动确定长度
var position = [...]string{"east", "south", "west", "north"}
```
会使用类型默认值初始化元素。
数组不是引用类型，变量间为值传递。

可以使用range配合循环结构完成遍历，示例如下：
```
for k, v := range position {
    fmt.Println(k, v)
}
// 结果
0 east
1 south
2 west
3 north
```

## 10 nil

nil，可以理解为未初始化引用。是以下类型的默认初始值：
* pointers -> nil
* slices -> nil
* maps -> nil
* channels -> nil
* functions -> nil
* interfaces -> nil

## 11 切片，slice
切片是一个拥有相同类型元素的可变长度的序列。与数组的固定长度不同，切片也被称之为动态数组。
Go提供了4中方案定义切片：
```
  make ( []Type ,length, capacity )
  make ( []Type, length)
  []Type{}
  []Type{value1 , value2 , ... , valueN }
```
或者从数组或切片生成新切片：
slice [开始索引:结束索引]
* slice 表示目标切片对象。
* 开始索引和结束索引对应目标切片的索引。
* 不包含结束索引对应的元素
* 缺省开始索引，表示从头到结束索引。
* 缺省结束索引，表示从开始索引到末尾。
* 两者同时缺省时，全部切取，与切片本身等效。
* 两者同时为0时，等效于空切片，一般用于切片复位。
```
  var arr = [4]string{"a", "b", "c", "d"}
  var sli = arr[1:3] // ["b", "c"]
```
以从数组创建切片为例，理解切片，定义语法如上所示，下图为slice:

![slice示意](http://www.hellokang.net/images/posts/go-slice.png)

切片的实现是由一个底层数组以及其上面的动态位置，尺寸来实现。由内部由指向起始元素的指针、元素数量length和容量capacity组成。其中：
* 指针ptr，用于指向切片在底层数组的起始位置。
* 尺寸len，用于记录切片内元素数量。
* 容量cap，当前切片最大容量，也就是底层数组的容量。可以动态分配。


切片为引用类型。
切片的默认初始值为nil。
切片支持: len()尺寸, cap()容量, append()追加元素等操作。详见切片的使用。

## 12 映射，map
Go语言中的键值对(key->value)集合，称之为映射map。
创建语法：
var m = map[key_type]value_type{key1: value1, key2: value2}
var m = make(map[key_type]value_type)
示例,字符串型下标，字符串型值：
```
var m = make(map[string]string) //make()会分配内存空间，初始化。
m["east"] = "东"
m["west"] = "西"
fmt.Println(m["east"]) // 东
fmt.Println(m["west"]) // 西

// map演示
var m = map[string]string{"east": "东", "west": "西"}
```

支持遍历操作，使用range：
```
for k, v := range mapVar {
    fmt.Println(k, v)
}
```

映射是引用类型。
详见切片操作。

## 13 结构体，struct
Go语言使用结构体来描述现实业务逻辑中实体。是自定义类型。结构体是由一系列数据构成的数据集合，一系列数据类型可以不同。
定义结构体，使用`struct`关键字：
type 结构体名 struct {
    成员1 类型
    成员2 类型
    …
}
示例：
```
// 定义Product结构
type Product struct {
  // 两个成员
  name  string
  price float64
}

// 构造函数
func newProduct(name string, price float64) *Product {
  return &Product{name, price}
}

// 成员方法，接收器方式
func (p *Product) getName() string {
  return "《" + p.name + "》"
}

// 方法2
func (p *Product) setPrice(price float64) *Product {
  p.price = price
  return p
}

func main() {
  // 构造Product型数据p1
  var p1 = newProduct("BlockChain", 42.5)
  // 访问成员
  fmt.Println(p1.name)
  // 通过接收器访问方法
  fmt.Println(p1.getName())
  var p2 = newProduct("GoLang", 30.5)
  p2.setPrice(44.5)
  fmt.Println(p2.price)
}
```

详见结构体操作。

## 14 接口，interface
接口是一种协议，用来规范方法的调用和定义的协议，目的是保证设计的一致性，便于模块化开发以及通讯。Go语言中，也视为一种类型。
定义语法：
type 接口名 interface {
    方法1( 参数列表 ) 返回值类型列表
    方法2( 参数列表 ) 返回值类型列表
    …
}
可以理解成没有方法体的方法。
示例：
```
// 定义Product结构
type Product struct {
  // 两个成员
  name  string
  price float64
  // say   func()
}

// 构造函数
func newProduct(name string, price float64) *Product {
  return &Product{name, price}
}

// 成员方法，接收器方式
func (p *Product) getName() string {
  return "《" + p.name + "》"
}

// 方法2
func (p *Product) setPrice(price float64) *Product {
  p.price = price
  return p
}

// 定义接口
type ProductInterface interface {
  getName() string
  setPrice(price float64) *Product
}

func main() {
  // 构造Product型数据p1
  var p1 = newProduct("BlockChain", 42.5)
  // pi为接口，为其赋值p1，就意味着使用接口规范p1，若p1不满足接口定义则出错
  var pi ProductInterface = p1
  // 利用接口调用方法
  fmt.Println(pi.getName())
}
```

详见接口操作

## 15 函数，func()
Go语言中，函数可以作为数据存储变量中，此时变量为函数类型func()。可以通过该变量访问到这个函数。可以用在结构体成员定义上。
语法示例：
```
func sayHello(name string) {
  fmt.Println("Hello, ", name)
}

func main() {
  // 函数本身就是函数类型
  fmt.Printf("%T(%v)\n", sayHello, sayHello) // func(string)(0x48fe20)
  // 赋值给变量
  var f = sayHello
  fmt.Printf("%T(%v)\n", f, f) // func(string)(0x48fe20)
  // 匿名函数也是函数类型
  var af = func() {
  }
  fmt.Printf("%T(%v)\n", af, af) // func()(0x490080)
}
```

参见函数使用