---
title:"函数详解"
date:2021-12-14
---

## 函数详解

### 函数标注

函数标注包括函数参数的标注和函数返回值的标注
常见的几种函数的标注方法

```typescript
//直接标注
function fn(a:string):string{
    return a;
}
//申明式标注
let foo:(a:string)=>string=function(a){
    return a;
}

//类型别名标注
type callback =(a:string)=>string
type callback_another={
    (a:string):string
}

let foo1:callback=function(a){
    return a
}

//接口标注
interface Ifunc {
    (a:string):string
}
let foo2:Ifunc=function(a){
    return a
}
```

### 可选参数和默认参数

**可选参数**
通过在函数名后面添加？来标注该参数是可选的

```typescript

let divElement=document.querySelector("#div") as HTMLElement;

function css(ele:HTMLElement,attr:string,value?:any) {
    //some code ...
}

divElement&&css(divElement,'width','100px') //三个值是设置元素的属性
divElement&&css(divElement,'color') //两个参数是获取元素的属性

```

**默认参数**
我们还可以给参数设置默认值

- 有默认值的参数是可选的
- 设置了默认值的参数是可以根据值自动推导类型

```typescript
function sort(items:number[],order:'desc'|'asc'='desc'){
//some code....
}
sort ([1,2,3])
```

**剩余参数**

```typescript
interface Iobj {
    [key:string]:any
}
function merge(target:Iobj,...others:Iobj[]){
    // somecode......
}
```

```typescript
function merge(target: Iobj, ...others: Array<Iobj>) {
    return others.reduce((prev, current) => {
        prev = Object.assign(prev, current);
        return prev
    }, target)
}

let newObj=merge({x:1},{y:2},{z:3})

```

**函数中的this**
无论是javascript还是typescript，this是会随着调用环境的变化而变化的，所以默认情况下，普通函数中的this被标注为any，但是我们可以在函数的第一个参数位（它不占据实际的参数位置）上显示的标注this的类型

*普通函数*

```typescript
interface T {
    //这个T的类型表示该变量是一个有两个参数的集合，第一个参数是数字类型，第二个参数是一个函数（传入的值为数字类型返回的值为无值类型）
    a:number,
    fn:(x:number)=>void;
}
let obj:T ={
    a:1,
    fn(x:number){
        console.log(this,'this is this');
    }
}

let obj2:T={
    a:1,
    fn(this:T,x:number){
        //函数的第一位显式的标注this 的类型，它对实际的参数不会有影响
        console.log(this ,'this is object2s this');
    }
}
```

*箭头函数*
箭头函数中的this不能像普通函数那样进行标注，箭头函数的this标注取决于它所在的作用域this 的标注类型

```typescript
interface ArrowT {
    a:number,
    fn:(x:number)=>void,
}

let obj3:ArrowT={
    a:1,
    fn(this:ArrowT,x:number){
        return ()=>{
            console.log(this);
        }
    }
}
```

**函数重载**
有的时候我希望函数接收不同类型的参数，从而返回不同类型的数据，我们可以使用函数重载来实现

```typescript
function ShowOrHide(ele: HTMLElement, attr: string, value: 'block' | 'none' | number) {
    //使用display:none opacity:0 来控制一个元素的显示隐藏
    //some-code...
}

//显示的标注类型，类型断言的一种写法
let Box = <HTMLElement>document.querySelector("#box")

if (Box) {
    ShowOrHide(Box, 'display', "none")
    ShowOrHide(Box, 'opacity', 0);
    //这样也是可以的，类型检测没问题，当运行的时候就会报错，所以使用重载函数的特性来改造一下这个函数
    ShowOrHide(Box, 'opacity', 'block')
}

//改造这个函数
function AdvanceShowOrHide(ele: HTMLElement, attr: 'display', value: "block" | "none")
function AdvanceShowOrHide(ele: HTMLElement, attr: "opacity", value: number)
function AdvanceShowOrHide(ele: HTMLElement, attr: string, value: any) {
    // some code...
}

// 另一种类型断言的写法 as 
let Box1 = document.querySelector("#div") as HTMLElement

if (Box1) {
    //OK
    AdvanceShowOrHide(Box1, "opacity", 0)
    //OK
    AdvanceShowOrHide(Box1,'display','none')
    //not Ok
    // AdvanceShowOrHide(Box1,"opacity","block")
}
```

*重载函数只需要定义结构，不需要定义相关的实体，类似于接口*

```typescript
interface PlainObject {
    [key: string]: string | number
}
function css(ele: HTMLElement, attr: PlainObject, value?: any): void
function css(ele: HTMLElement, attr: string, value: string | number): void
function css(ele: HTMLElement, attr: any, value: any): void {
    if (typeof attr === 'string' && value) {
        //如果第二个参数的类型为string，并且第三个参数存在，那么就设置元素的值
        ele.style[attr] = value
    }
    if (typeof attr === 'object') {
        for (let key in attr) {
            ele.style[key] = attr[key]
        }
    }
}

//使用这个css函数
let Box = document.querySelector('#box') as HTMLElement
if (Box) {
    //OK
    css(Box, 'width', '100px')
    //OK
    css(Box, {
        "width": '100px'
    })
    //Not Ok ，没有子函数重载里面定义相关的逻辑，就会检查出问题
    css(Box,'width')
}
```
