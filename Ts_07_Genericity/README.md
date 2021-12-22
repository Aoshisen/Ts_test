---
title:"泛型的使用场景和具体的使用方法"
date:2021-12-21
---

为什么要使用泛型（我们不知道对象的类型，但是我们需要返回obj[key]的值，这种情况就可以使用泛型）

## 泛型函数

```typescript
function getVal(obj, k) {
    return obj[k]
}
//这种情况下就可以使用泛型,我们可以定义一个泛型参数，在调用函数的时候传入泛型参数就可以了如下

function advanceGetVal<T>(obj: T, key: keyof T) {
    return obj[key]
}

//调用advanceGetVal 
let obj1 = {
    name: "Ass",
    age: 23,
    gender: 'male'
}
let objName = advanceGetVal<typeof obj1>(obj1, 'name')
```

所谓的泛型就是给可变（不定）的类型定义变量（参数）,<>（这里就是放类型参数的地方）类似于()（这个小括号是放函数参数的地方）

## 泛型类

就比如react 的模拟组件

```typescript

abstract class Component<T1, T2>{
    props: T1;
    state: T2
    constructor(props: T1) {
        this.props = props
    }
    abstract render(): string
}

interface IProps {
    val: number
}

interface IState {
    x: number
}
class MyComponent extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = {
            x: 1
        }
    }
    render(): string {
        this.props.val
        this.state.x
        return '<myComponent>'
    }
}

let myComponent = new MyComponent({ val: 1 })

myComponent.render()
```

## 泛型接口

我们可以在接口中使用泛型
后端提供了一些接口，用于返回一些数据，根据返回的数据格式定义如下接口

```typescript

/* interface IResponseData {
    code: number,
    message?: string,
    //这里因为不知道请求的是什么数据那么返回的数据类型也不清楚
    data: any
}

//根据接口我们可以封装对应的一些方法
async function getData(url: string): Promise<IResponseData> {
    let result = await fetch(url).then(res => res.json()).then((data: IResponseData) => data)
    return result
} */
//这个时候我们发现请求不同的接口的时候IResponseData 里面的data的数据类型是any 类型，我们希望请求不同接口的 时候，data数据是确定的，为了实现这个需求我们在对IresponseData使用泛型

interface IResponseData<T> {
    code: number,
    message?: string,
    //在这里我们使用泛型，在调用的时候指定其是什么请求，然后再根据请求判断返回的数据是什么样的类型
    data: T
}

async function getData<U>(url: string): Promise<U> {
    let result = await fetch(url).then(res => res.json()).then((data: U) => data)
    return result
}

//比如定义的用户数据接口
interface IUser {
    id: number,
    username: string,
    email: string
}

//文章接口
interface IArticle {
    id: number,
    title: string,
    author: IUser
}

//调用这两个接口
let testfunc = async () => {
    //用户接口的调用
    let user = await getData<IResponseData<IUser>>('')

    if (user.code === 1) {
        console.log(user.message);
        console.log('Ass');

    }
    else {
        console.log(user.data.username);
        console.log("Asscode");

    }
    //文章接口的调用
    let article = await getData<IResponseData<IArticle>>('')

    if (article.code === 1) {
        //请求错误的情况
        console.log(article.message);
    }
    else {
        console.log(article.data.title);
    }
}

 testfunc()
```
