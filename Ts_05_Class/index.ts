/* class Person {
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
 */

//TODO: 构造函数参数属性（用修饰符来修饰构造函数参数，省略申明，然后再constructor里面进行绑定的操作）
/* class Person {
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
 */

//TODO: 子类class 对父类的方法的重载和重写
/* class Person {
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

let gorgeousMan = new Man(2, "Ass", 177)

let beautyWoman = new Woman(3, "WYF")
beautyWoman.eat('蔬菜', 'bad')


gorgeousMan.eat('火锅', 'good')

gorgeousMan.eat('香菜', 'normal', 3)

 */

// TODO: 修饰符
// class Qualifier {
//     constructor(
//         public pub: string,
//         protected prot: string,
//         private priv: string, //只有自身可以访问，在子类constructor里面如果再用private申明priv 就会报错
//         readonly redol: string,
//     ) {
//         //readonly 需要在这里赋值并且只能是成员属性不能是成员方法
//         redol = 'haha my name is readonly'
//         console.log('初始化完成啦');
//     }
//     log() { console.log(this.pub, this.prot, this.priv, this.redol, 'this is Qualifier'); }

// }

// class Son extends Qualifier {
//     constructor(pub: string,
//         prot: string,
//         // private priv: string, //子类不能访问父类的私有方法
//         redol: string,) {
//         super('this is public', 'this is protected', 'this is private', 'this is readonly')
//     }
// }
// let test = new Qualifier('this is public', 'this is protected', 'this is private', 'this is readonly')
// test.log()

//TODO:寄存器

/* class Register {
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
 */

//TODO:静态成员
/* class StaticTest {
    constructor(
        public name: string,
        public gender: "male" | "female",
    ) { }
    public static OWNER: string = '这是静态类成员属性';
    public static OWNERFUNC() {
        console.log("这是实例对象的静态成员函数");
    }
    public objectfunc() {
        console.log('这是实例对象的函数');
    }
}

let test = new StaticTest('this is nam ', 'male')
console.log(test.name);
test.objectfunc()
StaticTest.OWNERFUNC()
console.log(StaticTest.OWNER); */

//TODO:抽象类
// react 的类式组件定义就是遵循的抽象类的方法
// import { Component } from "react"

// class ReactComponent extends Component {
//     constructor(props) {
//         super(props)
//     }
//     //react 定义必须要有render方法，render方法就必须要有ReactComponent来实现
//     render() {

//     }
// }

//抽象类来简单模拟react 类组件的运行原理

//因为有抽象的方法所以这个类也变成了抽象类 需要加上abstract 修饰
/* abstract class Component<StateType, PropsType>{
    //这里定义的是类的属性
    public state: StateType;
    constructor(
        //这里定义的是实例的属性
        public props: PropsType
    ) { }
        // render() {
        //     //这里的方法具体需要子类去实现，这里为了避免子类没有render ，所以使用一个显式的定义来强制规定子类必须要有render
        //     //这里的写法虽然实现了功能但是不优雅使用abstract（来改造）
        // }
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
 */

//TODO:implement(实现) 接口

/* interface publicMethod {
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
} */

//接口的继承

/* interface Ifunc1 {
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
} */

//TODO: 区分类类型与对象类型
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

