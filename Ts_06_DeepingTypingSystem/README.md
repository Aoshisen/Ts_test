---
title:"类型系统深入"
date:2021-12-17
---

## 类型系统深入

### 类型保护

我们通常在javacript 中可以通过判断来处理一些逻辑，在ts中这种条件语句还有另外一种特性，根据判断逻辑的结果，缩小类型的范围（类似于类型断言）这种特性称为类型保护，触发条件有

- 逻辑条件语句块 if else elseif
- 特定的一些关键字 typeof instanceof in ...

**typeof**

as we all know typeof 可以返回某个数据的类型，typescript 在if else 代码块中能够把typeof识别称为类型保护推断出适合的类型
上例子

```typescript
function foo(a: string | number) {
    //error 因为substring是string特有的方法，这里不能断定a就是string类型
    // a.substring(1)
    if (typeof a === "string") {
        //类型保护 判断a在此作用域下面为string类型
        //Ok
        a.substring(1)
    }
    else {
        // 这里的a为number类型系统自动补全number类型所拥有的方法
        a.toFixed(1)
    }

}
```

**instanceof**
instanceof（实例；运算符） 类型保护

```typescript

function instanceofFn(
    a: Date | Array<any>
) {
    //instanceof 也是可以判断一个参数的类型
    if (a instanceof Array) {
        //在这个作用域下面a就是Array 类型
        a.push(1)
    } else {
        //在这个作用域下面a的类型就是Date类型
        a.getFullYear()
    }
}
```

** in **

判断属性是否存在于一个对象里面

```typescript
interface IA {
    x: string,
    y: string
}

interface IB {
    a: string,
    b: string
}
function InFn(arg: IA | IB) {
    //error 这里也不知道arg到底是IA还是IB
    // arg.a
    if ("x" in arg) {
        //如果x 在arg里面存在那么就可以判断类型为 IA
        arg.x
    }
    else {
        //反之那么就是IB 
        arg.a
    }
}
```

**字面量类型保护**

如果类型为字面两类型，那么还可以通过该字面量类型的字面量进行判断

```typescript
interface IA {
    type: "IA",
    x: string,
    y: string,
}

interface IB {
    type: "IB",
    a: string,
    b: string
}

function LiteralFn(params: IA | IB) {
    //error 
    // params.x
    if (params.type === 'IA') {
        //在这个作用域下面params的类型为IA
        params.x
        params.y
    }
    else {
        //在这个作用域下面params 的类型为IB
        params.a
        params.b
    }
}
```

**自定义保护类型**
有些时候,上面的方法还是不能满足一些特殊情况,则可以使用自定义类型保护规则
比如需要判断一个数据是否是可以枚举的

```typescript

function canEach(data: any): data is Element[] | NodeList {
    return data.forEach !== undefined

}
function fn2(elements: Element[] | NodeList | Element) {
    if (canEach(elements)) {
        elements.forEach((ele: Element) => {
            ele.classList.add("box")
        })
    }
    else {
        elements.classList.add('box')
    }
}
```

data is Element[]|NodeList 是哟在那个类型谓词，格式为 xx is XX ，返回这种类型的函数就会被TypeScript 识别成类型保护

### 类型操作

TypeScript 提供了一些方法来操作类型这种数据,但是需要注意的是,类型数据只能作为类型来使用，而不能作为程序中的数据来使用。这两种是两种不同的数据，类型数据被使用在编译检测阶段，程序中的数据用于程序执行阶段

**typeof**

typeof 在TypeScript里面的两种作用

- 获取数据的类型
- 捕获数据的类型

```typescript
//这是值
let str1 = 'this is data'
//如果是let 那么就会把typeof 返回的数据当成值（获取数据的类型）
let dataType = typeof str1

//如果是type 那么就会把typeof 返回的数据当成类型（捕获数据的类型）
type dataType = typeof str1

//dataType 是类型
let str2: dataType = "My string"

let str3: typeof str1 = "some Type"

//这里的dataType是值
console.log(dataType);
```

**keyof**
获取类型的所有的key的集合

```typescript
interface KeyofType {
    name: string,
    age: number,
}

//等同于 type typeKeys = "name"|"age"
type typeKeys = keyof KeyofType
let p1 = {
    name: 'Ass',
    age: 23
}

function getPersonVal(k: typeKeys) {
    return p1[k]
}

// 等同于 
function getVal(key: 'name' | "age") {
    return p1[key]
}
getPersonVal("age")
getPersonVal('name')
//error
// getPersonVal('gender')
```

** in ** 
针对类型操作的话 内部使用for... in 对类型进行遍历

```typescript

interface InType {
    name: string,
    age: 23,
}

//得到类型的key 
type TypeKeys = keyof InType

type newForInType {
    //对类型的key 遍历然后改变其值
    [k in TypeKeys]: string
}

```

注意： in 后面的类型值必须是string number 或者是symbol

### 类型兼容

TypeScript 的类型系统是基于结构子类型的，它与名义类型(如:java)不同(名义类型的数据类型 兼容性或等价性是通过明确的声明或类型的名称来决定的)。这种基于结构子类型的类型系统是基于组 成结构的，只要具有相同类型的成员，则两种类型即为兼容的.

```typescript
class Person {
    name: string;
    age: string
}
class Cat {
    name: string;
    age: string;
    id: number
}

function fn(p: Person) {
    p.name
}

let tiger = new Cat()
//ok 因为Cat类的结构与Person 的结构相似，所以他们是兼容的,
//Cat包含了Person 的全部属性的话，那么 通过Cat 创建出来的对象也可以兼容Person 创建出来的类

fn(tiger)
```

