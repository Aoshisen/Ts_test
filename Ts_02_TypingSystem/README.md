---
title:tyescript的类型系统
date：2021-12-10
---

## 什么是类型

程序=数据结构+算法=各种格式（类型）的数据+处理数据的逻辑

### 有哪些数据类型

- 数字Number（3）,布尔值Boolen（true|false), 字符串String（aoshisen）

- 数组Array [1,2,3],集合

## 为什么我们需要类型系统

1. 程序可能是错误的

- 计算错误(对非数字类型数据进行一些数学运算)
- 调用一个不存在的方法

不同类型的数据有不同的操作方式或方法，如:字符串类型的数据就不应该直接参与数学运算

### 简单的区分一下动态类型语言和静态类型语言

1. 静态类型语言
编译时进行数据类型检查的语言，比如（java）
优点：

   - 程序编译阶段(配合IDE、编辑器甚至可以在编码阶段)即可发现一些潜在错误，避免程序在生产 环境运行了以后再出现错误

   - 编码规范、有利于团队开发协作、也更有利于大型项目开发、项目重构 

   - 配合IDE、编辑器提供更强大的代码智能提示/检查

   - 代码即文档

    缺点:
   - 麻烦
   - 缺少灵活性

2. 动态类型语言
运行时进行数据类型检查的语言，比如(javascript)
优点：
   - 灵活
   - 方便
缺点:
   - 运行程序时才能发现错误
   - 不能实现智能检查
   - 不利于团队开发

## 类型标注

类型标注包含在类型系统里面，是类型系统的一部分，类型系统包括

- 类型标注(定义、注解) - typing

- 类型检测(检查) - type-checking

由于类型检测是编辑器做的事情，那么我们程序员就主要关注的是类型标注啦

### 浅谈类型标注

- 类型标注就是在代码里面给数据（变量，函数，返回值）添加类型说明，当一个变量或者函数（参数）等被标注后就不能存储或者传入与标注类型不符合的类型

- 有了标注，typescript 编译器就能按照对这些数据进行类型的合法检测
- 有了标注，各种编辑器，IDE等就能进行智能提示

### 浅谈类型检测

顾名思义就是对数据的类型进行检测。注意这里，重点是类型两个字
    类型系统检测的是类型，不是具体的值（当然有些时候也可以检测值），比如某个参数的取值范围(1-100之间)，我们不能依靠类型系统来完成这个检测，它应该是我们业务层面的逻辑，类型系统检测的是它的值的类型否为数字

### 怎么进行类型标注

#### 简单的类型标注

基础类型 string number boolean

```typescript
//标注语法
let title:string ='Ass'
let num:number =10;
let bool:boolean =true;
```

null 和undefined
因为在 Null 和 Undefined 这两种类型有且只有一个值，在标注一个变量为 Null 和 Undefined 类 型，那就表示该变量不能修改了

```typescript

let undf:undefined
let nul:null

//标注了 一个变量为undefined 那么他的值也同样为undefined 不能为其赋值， 而null为所有类型的子类型，所以标注了为undefined 的变量 在没被null赋值的情况下值为null 在被null 赋值的情况下为null 而null 一旦被定义就只能为null 不管是类型还是值

```

默认情况下null是所有类型的子类型，意思就是说可以把null赋值给任何类型

```typescript
let a:number;
let nul:null;
a=null; OK
//因为可以复制给任何类型那么也可以赋值给undefined
let undf:undefined
undf=nul //OK
```

undefined:如果一个变量声明了，但是没有给其赋值那么其值undefined，其类型为any（这里注意区别 undefined 是值不是类型，由这个undefined 可以推测ts是由类型主导而不是值）

```typescript
let a //这里默认类型为any 默认的值为undefined
console.log(a)
```

一些问题

```typescript
let a:number
a=null //因为null 是所有类型的子类型所以可以赋值给任何值
a.toFixed(2) //运行时报错
```

设置严格的空值检测来规避这些问题也使得代码更加的严谨 strictNullChecks:true 在tsconfig.json 中

```typescript
let ele =document.queryselector('#div')
//通过获取元素的方法返回的类型可能包含null,所以需要先进行必要的判断，再对获取到的元素进行判断
if(ele){
   ele.style.display='none'
}
```

**对象类型**
内置对象类型

在Javascript 中有很多的内置对象，比如说 Object，Array，Date......,我们可以通过对象的构造函数 或者类来进行标注像这样

```typescript
let a:Object={};
let arr:Array<number>=[1,2,3]
let dl:Date=new Date()
```

**自定义对象类型**
许多时候我们可能需要自定义结构的对象,这个时候我们可以自定义对象类型

- 字面量标注
- 接口
- 定义类或者是构造函数

**字面量标注**

```typescript
let a:{username:string;age:number}={username:"Ass",age:23}
a.username
a.age
//error
a.gender
```

优点：方便，直接
缺点: 不利于复用和维护

**接口（interface）**

```typescript
interface Person {
    username:string;
    age:number
}
let a:Person={
    username:"Ass",
    age:23
}

a.username
a.age
//error
a.gender

```

优点：复用性高
缺点:接口只能作为类型标注使用，不能作为直接的具体值使用，他只是一种抽象的数据结构的定义并不是实体，没有具体的功能实现

**类和构造函数**

```typsecript

class Person {
    constructor(public username:string,public age:number){}
}
let a =new Person('ass',23)
a.username;
a.age;
//error
a.gender
```

优点：功能强大,定义实体的同时也定义了对应的类型
缺点：复杂，如果只是想约束某个函数接受的参数结构，没有必要去定义一个类,使用接口会更简单

**包装对象**
这里说的包装对象是Javascript中的String Number Boolean ,其实string和String的类型并不一样，some as in typescript

```typescript

let a:string
//ok
a='string';
//error
a=new String('1')

let A:String;
//ok
A='string'
//ok
A=new String("String")
```

**数组类型**
Typescript中数组存储的类型必须一致，所以在标注数组类型的时候，需要同时标注数组存储的数据类型

```typescript
//使用泛型标注
let arr1:Array<number>=[1];
//普通标注
let arr2:number[]=[13]
```
**元组类型**
元组类似于数组，但是存储的元素类型不必相同，但是需要注意

- 初始化数据的个数以及对应的位置必须与标注的类型一致
- 越界数据必须是元组标注中的类型之一

```typescript
let data1:[string,number]=['开课吧',100] 
data1.push(100)
data1.push("string")
//error
data1.push(false)
```

**枚举类型**
枚举的作用是组织收集一组关联数据的方式，通过枚举我们可以给一组有关联意义的数字赋予一些友好的名字例如https的状态码

```typescript
enum HTTTP_CODE {
    OK=200,
    NOT_FOUND=404,
    METHOD_NOT_ALLOWED
}
```

一些值得注意的地方：

- key不能是数字
- value可以是数字，称为数字类型枚举，也可以是字符串称为字符串类型枚举，但不能是其他值，默认为数字0
- 枚举值可以忽略，如果忽略则第一个枚举值默认为0，非第一个枚举值为上一个数字枚举值+1（只有紧紧挨着的才会生效）
- 枚举值为只读（常量）初始化之后不能更改
- 如果前一个枚举值类型为字符串，则后续枚举值必须手动赋值，这时候数字枚举默认值失效,value+1的规则也失效

字符串类型枚举

```typescript
enum URLS{
    USER_REGISTER='/user/register',
    USER_LOGIN='/user/login',
}
```

**无值类型（void）**
表示没有任何数据的类型,通常用于标注无返回值类型的返回值类型，函数默认标注类型为void

```typescript
function voidfn():void {
    //没有return 或者return undefined
}
//在strictNullCHecks 为false 的情况下，undefined 和null 都可以玩赋值给void
//但是当strictNullChecks为true的情况下，只有undefined 才可以赋值给void
```

**never类型**
当一个函数永远不可能执行return的时候返回的类型就是never 与void不同void是执行了return 只是没有值,但是never是不会执行return 的，比如抛出错误，导致函数终止执行 

```typescript
function neverFn():never {
    throw new Error("error")
}
```

**任意类型**
有的时候，我们并不确定这个值到底是什么类型或者不需要对该值进行类型检测，就可以标注为any类型

```typescript
let a:any;
// 当指定noImplicitAny配置为true,当函数参数出现隐式的any的时候会报错
```

- 一个变量申明未赋值且未标注类型的情况下，默认为 any 类型 
- 任何类型值都可以赋值给 any 类型
- any 类型也可以赋值给任意类型 
- any 类型有任意属性和方法

注意:标注为 any 类型，也意味着放弃对该值的类型检测，同时放弃 IDE 的智能提示

**未知类型（unknow）**

- 一个变量申明未赋值且未标注类型的情况下，默认为 any 类型 
- 任何类型值都可以赋值给 any 类型
- any 类型也可以赋值给任意类型 
- any 类型有任意属性和方法

注意:标注为 any 类型，也意味着放弃对该值的类型检测，同时放弃 IDE 的智能提示

**函数类型**
在js中函数是非常重要的，在typescript里面也是一样，同样的函数也有自己的类型标注格式

```typescript
//函数名称(参数1:类型，参数2：类型):返回值类型
function add(x: number, y: number): number {
    return x + y;
}
```
