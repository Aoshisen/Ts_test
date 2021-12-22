---
title:接口和高级类型
date：2021-12-14
---

## 接口和高级类型

**接口定义**
typescript的核心之一就是对值（数据）所具有的结构进行类型检查，除了基本标注，针对对象类型的数据，还可以通过interface（接口），来进行标注

*接口*：对复杂对象类型进行标注的一种方式，或者给其他代码定义一种契约（比如：类）
接口的基本语法：

```typescript
interface Point {
    x:number;
    //值得注意的是这里定义类型使用的是; 来分割两个参数(当然也可以使用,来分割两个或者多个属性)
    y:number;
}
```

接口只是一种*类型* 不能作为具体的值来使用

```typescript
interface Point1{
    x:number,
    y:number,
}
//error Point 仅仅表示值，但在这里却作为值使用
// let p1=Point 
```

**可选属性**
接口也可以定义可选的属性，通过?来进行标注

```typescript

interface Optional {
    x:number,
    y:number,
    color?:string
    //其中的color就是可选的属性
}
```

**只读属性**
我们还可以通过readonly关键字来标注属性为只读属性

```typescript
interface ReadOnly{
 readonly x:number,
 readonly y:number,
 //当我们标注了一个属性为只读属性之后，那么该属性除了初始化之外，是不能被再次赋值的
}
```

**任意属性**
有的时候我们希望给接口添加任意属性，可以通过索引类型来实现

*数字类型索引*

```typescript
interface AnyAttribute {
    x:number,
    y:number,
    [prop:number]:number
}
let test:StringAttribute={
    x:12,
    y:12,
    someattract:21
}
```

*字符串类型索引*

```typescript
interface StringAttribute{
    x:number,
    y:number,

    [prop:string]:number,
}

let test2:AnyAttribute={
    x:12,
    y:12,
    12:222222,
}

```

*同时使用字符串类型索引和数字类型索引*
数字类型索引是字符串类型索引得子类型

```typescript
interface Point {
    [prop1:string]:string;
    //right
    // [prop2:number]:string;
    //error
    // [prop2:number]:number
}
//当同时存在数字类型索引和字符串类型索引的时候数字类型索引得值必须是字符串类型的值的类型,或者是其值的子类型

interface Point2 {
    [prop1:string]:Object;
    [prop2:number]:Date;
}
```

**使用接口描述函数**

```typescript
interface IFunc {
    //这里这样的定义是规定使用IFunc 描述的函数必须传入一个为字符串的参数，并且返回值也要是一个字符串   
    (a:string):string
}
let fn:IFunc=function(a){
    return a
}
```

**接口合并**
多个同名的接口合并成一个接口

```typescript
//如果合并的接口存在同名的非函数成员，则必须保证他们类型一致，否则编译报错
//接口中的同名函数则是采用重载
interface Box {
    height:number,
    width:number,
}
interface Box{
    scale:number
}
let box:Box={height:5,width:2,scale:2}
```
## 高级类型

**联合类型**
联合类型也可以称为多选类型，当我们需要标注一个变量为多个类型之一是我们就可以选择联合类型标注，或的关系

```typescript

function css (ele:Element,attr:string,value?:string|number)
function css (ele:Element,)
{
 //some code ...
 //两个值是获取值，三个值是设置值
}
let box =document.querySelector("#fiv")
//box 变量可能为null ,所以需要判断一下
if(box){
    css(box,'width',2)
    //这样也是可以的，但是就会很奇怪，使用重载函数来进行约束
    css(box,'opacity','block')
}
```

使用函数重载来约定函数

```typescript
function ShowOrHide (ele:Element,attr:'display',value:string)
function ShowOrHide (ele:Element,attr:'opacity',value:number)
function ShowOrHide (ele:Element,attr:string)
{
    //some code......
    //函数重载，先写出小范围的函数定义再使用大范围的函数定义来重载小范围的函数定义
}
let box =document.querySelector("#fiv")
//box 变量可能为null ,所以需要判断一下
if(box){
    ShowOrHide(box,'opacity',1)
    //这样也是可以的，但是就会很奇怪，使用重载函数来进行约束
    ShowOrHide(box,'display','block')
}
```

**交叉类型**
使用交叉类型，可以把多种类型合并到一起成为一种新的类型，是并且的关系，可以对一个对象进行扩展

```typescript

interface Cross1 {
    x:number,
    y:number,
}
interface Cross2 {
    z:number
}
//属性“assign”在类型“ObjectConstructor”上不存在。是否需要更改目标库? 请尝试将 “lib” 编译器选项更改为“es2015”或更高版本
let test1:Cross1&Cross2={x:1,y:2,z:3}
let test:Cross1&Cross2=Object.assign({},{x:1,y:2},{z:3})
//如果只是添加ES6的lib 那么这里就会报错，找不到名称“console”。是否需要更改目标库? 请尝试更改 “lib” 编译器选项以包括 “dom”。ts(2584)
//在lib里面添加"DOM" 即可解决问题，另外在tsconfig.json 里面必须要是双引号 
//在tsconfig.json中设置lib
console.log(test);
```

TypeScript 在编译过程中只会转换语法(比如扩展运算符，箭头函数等语法进行转换，对于
API 是不会进行转换的(也没必要转换，而是引入一些扩展库进行处理的)，如果我们的代码中 使用了 target 中没有的 API ，则需要手动进行引入，默认情况下 TypeScript 会根据
target 载入核心的类型库
target 为 es5 时: ["dom", "es5", "scripthost"]
target 为 es6 时: ["dom", "es6", "dom.iterable", "scripthost"]
如果代码中使用了这些默认载入库以外的代码，则可以通过 lib 选项来进行设置

 http://www.typescriptlang.org/docs/handbook/compiler-options.html

**字面量类型配合联合类型**

```typescript
function setPosition(ele:Element,direction:"left"|"right"|"top"|"bottom"){
    //some code
}
let box:Element;
box&&setPosition(box,'bottom')

//error
//box&&setPosition(box,'hahah')
```

**使用类型别名改造上面的例子**

```typescript
type dir="left"|"top"|"right"|"bottom"
function setPosition(ele:Element,direction:dir)
let box:Element;
box&&setPosition(box,"bottom")
//error
box&&setPositon(box,"YYDS")
```


**使用类型别名来定义函数类型**

```typescript
interface callback {
    (a:string):string
}

//类型别名定义
type typeCallback=(a:string)=>string

let testfn:callback=function(a){
    return a
}

let testfn2:typeCallback=function(a){
    return a
}
```

**类型别名和接口的区别**

*type*

- 不能重名
- 能描述所有的类型

*interface*

- 只能描述object/class/function 的类型
- 同名的interface 自动合并，利于扩展

**使用类型推导来简化我们标注的工作**
每次都显示标注类型会很麻烦,typescript 提供了一种更方便的特性:类型推导。Typescript 编译器 会根据当前上下文自动的推导出对应的类型标注，这个过程发生在 ：

- 初始化变量
- 设置函数默认参数值
- 返回函数值

看一下示例

```typescript
let x=1;
//true
x=2
//error 不能将number string 赋值给number
x='string'
//但是这里打印的是"string"
console.log(x);
```

**类型断言**
有的时候，我们可能需要标注一个更加精确的类型（缩小类型标注范围），比如:

```typescript

let img=document.querySelector("#img")
//我们可以直观的看见通过querySlector来查询到的img是一个Element|null 的类型，一些img标签特有的属性他是没有的比如src属性
//所以我需要更加精确的标注img这个变量的类型是一个HTMLImageElement类型，这个时候我们就可以使用类型断言

let img1=<HTMLImageElement>document.querySelector("#img")
//或者
let img2= document.querySelector("#img") as HTMLImageElement;
//类型断言只是一种预判了，并不会对数据本身产生实际的效果，就是为了通过类型检测，是显示的类型转换，但并非真的转换了
```
