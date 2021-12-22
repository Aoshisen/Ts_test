---
title:"面向对象编程"
date:2021-12-15
---

## 类

**类的概念**
面向对象编程中有一个重要的核心就是类，当我们使用面向对象的方式去编程的时候，通常会首先去分析具体要实现的功能，把特性相似的抽象成一个一个的类，然后通过这些类实例化出来的对象完成具体的业务需求

### 类的基础

在类中，包含下面几个核心的知识点，也是typescript和ECMAScript2015+在类方面共有的一些特性

- class 关键字
- 构造函数constructor
- 成员属性定义
- 成员方法
- this关键字

除了以上共同的特性之外，在typescript中还有许多ECMAScript没有的特性，或者是当前还不支持的特性，比如说抽象

**class**
通过class就可以描述和组织一个类的结构，语法

```typescript
claaa Person {
    //类的定义大概就是这样，但是需要注意的是，类的命名需要使用大驼峰命名，单词的首字母大写
}

```

**constructor**

- 通过class 定义了一个类之后，我们可以通过new 关键字来调用该类得到该类型的一个实例对象，这个过程称为实例化
- 在实例化的过程中，我们并不是去执行了这个类，而是去执行了类里面的一个特殊函数，构造函数 -constructor

```typescript
class Person {
    //定义了一个名字为Person 的类
    // 类的特性都定义在{}内部
    constructor() {
        //构造函数内部
        //类实例化过程执行的函数体
        console.log("我实例化啦》》》》over here!!");
    }
}
//如果没有依赖的参数在new 的时候就可以简化写法（不用写()）
//在实例化的过程中我在控制台里面观察到了constructor里面的console.log函数执行并输出了对应的内容
let human1 = new Person 
```

*一些构造函数的小知识*

- 默认情况下，构造函数为一个空函数
- 构造函数会在对象被实例化的时候被调用
- 我们定义了构造函数会覆盖原有的构造函数
- 如果在实例化一个类的时候没有依赖的参数那么在new 的时候可以省略掉()
- 构造函数constructor 不允许由return 返回值类型标注 （因为默认要返回实例对象）

通常情况下我们会把一个类实例化的时候初始化相关逻辑代码写在constructor(构造函数)里面，比如类成员的初始化赋值以及类型定义

**成员属性以及成员方法的定义**
话不多说，直接上代码

```typescript
class Person {
    id: number;
    name: string;
    constructor(id: number, name: string) {
        // 在这里把全局的id 和实例化的id进行绑定 
        // 把全局的name和实例化的name进行绑定
        this.name = name;
        this.id = id;
    }
    eat(food: string, tasty: 'good' | 'normal' | 'bad') {
        console.log(this.name + '吃了' + food + '感觉' + tasty);
        //如果将变量进行绑定的话在这里去访问实例对象是不可能的,this指向的是Person{}
    }
}

let human1 = new Person(1, "Ass")
human1.eat('西瓜', 'good')
```

**this关键字**
在类内部，我们可以通过this关键字来访问类的成员属性和方法

```typescript
class Person {
    id: number;
    name: string;
    constructor(id: number, name: string) {
        this.name = name;
        this.id = id;
    }
    eat(food: string, tasty: 'good' | 'normal' | 'bad') {
        //在类的内部我们可以通过this关键字来访问类的成员属性和方法
        console.log(this.name + '吃了' + food + '感觉' + tasty);
    }
}

let human1 = new Person(1, "Ass")
human1.eat('西瓜', 'good')
```

**构造函数参数属性**
因为在构造函数中对成员属性进行传参赋值初始化是一个很常见的场景，所以ts提供了一个简化的流程来解决这个痛点
给构造函数参数添加修饰符来直接生成成员属性

public 改造之前的类,public 是类的默认修饰符，表示该成员可以再任何地方进行读写操作

```typescript
class Person {
    constructor(public id: number, public name: string) { }
    eat(food: string, tasty: 'good' | 'normal' | 'bad') {
        console.log(this.name + '吃了' + food + '感觉' + tasty);
    }
}
let human1 = new Person(1, "Ass")
human1.eat('西瓜', 'good')
```

### 继承

**extends语法**
TS也是通过extends
来实现类的继承

```typescript
class Man extends Person {
    //just like this to declare a class(Man) extends from Person
}
```

**super 关键字**
在子类中，我们可以通过super来引用父类

- 如果子类没有重写构造函数，则会在默认的constructor中调用super
- 如果子类由自己的构造函数，则需要在子类的构造函数中显式的使用super来调用父类的构造函数否则会报错
- 在子类构造函数中只有在super(params)之后，才能访问this
- 通过super访问父类的构造函数的时候，会自动绑定上下文对象为当前子类的this，这也是为什么要在super之后才能访问this的原因
- 通过super 也能调用父类的成员属性以及方法

上例子：

```typescript

class Person {
    constructor(public id: number, public name: string) { }
    eat(food: string, tasty: 'good' | 'normal' | 'bad') {
        console.log(this.name + '吃了' + food + '感觉' + tasty);
    }
}
let human1 = new Person(1, "Ass")
// human1.eat('西瓜', 'good')

class Man extends Person {
    constructor(
        id: number,
        name: string,
        //对于男生身高是很重要的
        public tall: number) {
        //在父级中加了关键字申明了的变量就不需要重复用关键字public 修饰了
        super(id, name)
    }
    //在这里可以重写和重载父级的函数
    //也可以定义自己的新特性，比如男生喜欢玩游戏
    play(game: string, time: number) {
        console.log(`${this.name}今天玩了${time}个小时的${game}`);
    }
}
let handsomeMan = new Man(2, 'Ass', 177)
//同样的这里可以调用父亲的定义的方法
handsomeMan.eat('火锅', 'good')
```

**在子类里面对父亲的方法进行重写和重载**
默认情况下子类成员方法继承自父类但是子类也可以对他们进行重写和重载

*方法的重载*
函数的参数个数不一样或者是类型不一样，但是名字一样那么该方法就是重载的方法

```typescript
class Person {
    constructor(
        public id: number,
        public name: string
    ) {
    }
    eat(food: string, tasty: 'good' | 'normal' | 'bad') {
        console.log(this.name + '吃了' + food + '感觉' + tasty);
    }
}

let father = new Person(1, "God");

class Man extends Person {
    constructor(
        id: number,
        name: string,
        public tall: number
    ) {
        super(id, name)
    }
    eat(food: string, tasty: "good" | "normal" | "bad"): void
    eat(food: string, tasty: "good" | "normal" | "bad", spend: number): void
    eat(food: string, tasty: "good" | "normal" | "bad", spend?: number): void {
        //这里就是对eat方法的重载
        !spend ? super.eat(food, tasty) : console.log(`${this.name}吃了${food}感觉${tasty}总共花费了${spend}元`);
    }
}

let gorgeousMan = new Man(2, "Ass", 177)
gorgeousMan.eat('火锅', 'good')
gorgeousMan.eat('香菜', 'normal', 3)
```

*方法的重写*
函数的参数个数和类型是一样的，但是逻辑不一样，这就是方法的重写

```typescript
class Person {
    constructor(
        public id: number,
        public name: string
    ) {
    }
    eat(food: string, tasty: 'good' | 'normal' | 'bad') {
        console.log(this.name + '吃了' + food + '感觉' + tasty);
    }
}
class Woman extends Person {
    constructor(
        id: number,
        name: string,
    ) {
        super(id, name)
    }
    eat(food: string, tasty: 'good' | 'normal' | 'bad') {
        //这里就是方法的重写
        console.log('美女吃饭不需要在乎吃的是什么和味道怎么样，只在乎拍照好不好看');

    }
}
let beautyWoman = new Woman(3, "WYF")
beautyWoman.eat('蔬菜', 'bad')
```

### 一些其他零碎的知识

**修饰符**
有的时候我们希望对类的成员属性或者是成员方法进行一定的访问控制，来保证数据的安全，通过类修饰符可以做到这一点

- public （自身，子类 ，实例对象都可以访问）
- protected （自身，子类可以访问，实例对象不能访问）
- private （只有自身可以访问）
- readonly 只读修饰符只能针对于成员属性使用，切必须在申明时或者在构造函数里面被初始化（自身，子类，实例对象都可以访问，但是不能修改）

上代码

```typescript
class Qualifier {
    constructor(
        public pub: string,
        protected prot: string,
        private priv: string, //只有自身可以访问，在子类constructor里面如果再用private申明priv 就会报错
        readonly redol: string,
    ) {
        //readonly 需要在这里赋值并且只能是成员属性不能是成员方法
        redol = 'haha my name is readonly'
        console.log('初始化完成啦');
    }
    log() { console.log(this.pub, this.prot, this.priv, this.redol, 'this is Qualifier'); }

}

class Son extends Qualifier {
    constructor(pub: string,
        prot: string,
        // private priv: string, //子类不能访问父类的私有方法
        redol: string,) {
        super('this is public', 'this is protected', 'this is private', 'this is readonly')
    }
}
let test = new Qualifier('this is public', 'this is protected', 'this is private', 'this is readonly')
test.log()
```

**寄存器**
有的时候我们希望对类成员属性进行更加细腻的控制，就可以使用寄存器来完成这个需求，通过寄存器，我们可以对类成员属性进行拦截并加以控制，更好的控制成员属性的设置和访问。

寄存器有两种

- setter （设置控制器，当设置成员属性的时候调用）
- getter （当访问成员属性的时候调用）

```typescript
class Register {
    constructor(readonly id: number, readonly username: string, public _password: string) {
    }
    public get password() {
        // 访问器仅在面向 ECMAScript 5 和更高版本时可用
        console.log('我访问了password');
        return this._password
    }
    public set password(v: string) {
        //访问器仅在面向 ECMAScript 5 和更高版本时可用 这里需要配置tsconfig.json
        if (v.length > 6) {
            this._password = v;
            console.log('我设置了密码');

        }
        else {
            throw new Error("请输入大于六位的密码")
        }
    }

}
let test = new Register(3, 'test', '1111111111')

//这里注意一下，_password 和 password 都可以访问 但是通过password访问的话就会走到寄存器里面,通过_password访问变量也会走到寄存器里面，但是通过_password 无法进入到setter这个里面
// console.log(test._password);
console.log(test.password);
// test._password = "1111111111"
test.password = '11111111'

```

**静态成员**
有些时候我们需要给类本身添加成员，区分某成员是静态的还是实例的

- 该成员属性或方法是类型的特性还是实例化对象的特性
- 如果一个成员方法中没有使用或者依赖this，那么该方法就是静态的

```typescript
class StaticTest {
    constructor(
        public name: string,
        public gender: "male" | "female",
    ) { }
    public static owner: string = 'ownerparams';
    public static ownfunc() {
        console.log("这是实例对象的静态成员函数");
    }
    public objectfunc() {
        console.log('这是实例对象的函数');
    }
}

let test = new StaticTest('this is nam ', 'male')
console.log(test.name);
test.objectfunc()
StaticTest.ownfunc()
```

- 类的静态成员事属于类的,所以不能通过实例对象（包括this）来进行访问，而是直接通过类名访问（不管是类内还是类外）
- 静态成员也可以通过访问修饰符进行修饰
- 静态成员书信一般约定（全大写）

### 抽象类

有的时候，一个基类（父类）的一些方法无法确定具体的行为，而是由继承的子类去实现（老子不争气要求儿子去完成老子年轻时候的愿望）
比如现在很流行的react 的类组件的写法
看招：

```typescript

import { Component } from "react"

class ReactComponent extends Component {
    constructor(props) {
        super(props)
    }
    //react 定义必须要有render方法，render方法就必须要有ReactComponent来实现
    render() {

    }
}



```

根据react类组件的写法我们大概可以知道以下内容

- 每个组件都有一个props属性，可以通过构造函数对其进行初始化，由父级定义
- 每一个组件都有一个state 属性，由父级定义
- 每一个组件都应该有一个render方法

大概react 的 Component就像下面这个样子

```typescript

//因为有抽象的方法所以这个类也变成了抽象类 需要加上abstract 修饰
abstract class Component<StateType, PropsType>{
    //这里定义的是类的属性
    public state: StateType;
    constructor(
        //这里定义的是实例的属性
        public props: PropsType
    ) { }
    /*     render() {
            //这里的方法具体需要子类去实现，这里为了避免子类没有render ，所以使用一个显式的定义来强制规定子类必须要有render
            //这里的写法虽然实现了功能但是不优雅使用abstract（来改造）
        } */
    public abstract render(): string;
}

interface IStateType {
    [props: string]: any
}

interface IPropsType {
    [props: string]: any
}

class MyComponent extends Component<IStateType, IPropsType>{
    constructor(props: IPropsType) {
        super(props)
        //继承父级的state属性
        this.state = {
            val: 1
        }
    }
    render() {
        return `<div>组件</div>`
    }
}
```

使用抽象类的好处
约定了所有的子类必须实现的方法，使得类的实际更加的规范
值得注意的点：

- abstract 修饰的方法不能有方法体
- 如果一个类有抽象方法,那么该类也必须是抽象的
- 如果一个类是抽象的那么就不能使用new 进行实例化（因为抽象类名表示该类还有未实现的方法，所以不允许实例化）
- 如果一个子类继承了一个抽象类，那么该子类就必须实现抽象类中的所有抽象方法，否则该类还得声明为一个抽象类

### implement（执行，贯彻；为……提供工具） 实现一个方法

顾名思义可以通过implement来强制一个类实现其指定的方法

```typescript
interface publicMethod {
    publicFunc(params: 'Ass' | "LT"): void
}

class TestClass implements publicMethod {
    //必须实现publicMethod 
    //需要定义一个名叫publicFunc 的函数，并且类型也要和publicMethod一样

    constructor(
        public name: string,
        public love: string
    ) {

    }
    //因为需要实现publicMethod
    publicFunc(params: "Ass" | "LT") {
        console.log("yyds");
    }
}

//实现（implement） 也可以和继承（extends）一起出现
interface publicMethod2 {
    publicFunc2(): void
}
class TestSon extends TestClass implements publicMethod2 {
    constructor(
        name: string,
        love: string
    ) {
        super(name, love)
    }
    publicFunc2(): void {
        console.log('this is publicFunc2');
    }
}

// 也可以实现多个接口

class ManyInterface implements publicMethod, publicMethod2 {

    publicFunc(params: "Ass" | "LT"): void {

    }
    publicFunc2(): void {

    }
}
```

**接口的继承**

```typescript
interface Ifunc1 {
    unKnownFunc(): string
}

interface Ifunc2 extends Ifunc1 {
    anotherFunc(): void
}

class TestClass implements Ifunc2 {
    unKnownFunc(): string {
        return "ass"
    }
    anotherFunc(): void {

    }
}
```

### 类类型与对象类型


```typescript

class Person {
    //静态成员属性
    static type: string = '人'
    public name: string
    public gender: 'male' | "female"
    constructor(name: string, gender: 'male' | 'female') {
        this.name = name;
        this.gender = gender
        //静态成员属性type不能赋值
    }
    public eat() {
        console.log('正在吃东西拉啊啦啦');
    }
}
let person1 = new Person('Ass', 'male')
//在通过new关键字创建一个对象的时候 也会对应的生成该对象的类型,对象的类型名字恰好也叫Person 和类名一样，这就是实例化对象的类型也就是对象类型
interface Person {
    name: string,
    gender: "male" | "female",
    eat(): void,
}

//无论在js还是在ts中类的本质还是一个函数，所以他也应该有对应的类型，这个类型也是类的构造函数的类型(也是类的类型)
//类Person的构造函数类型(类类型) 像下面这样
interface PersonConstructor {
    new(name: string, gender: "male" | "female"): Person,
    //静态成员属性在类类型上
    type: string,
}
console.log(Person.type, 'this is Person.type');

//这里直接打印function
console.log(typeof Person);

//对于一个函数需要传递一个类，然后再在函数内部进行处理的情况，类的参数应该像下面这样标注
function fn(params: typeof Person) {
    let person2 = new params('Ass', "male")
    person2.eat()
}
fn(Person)
```
