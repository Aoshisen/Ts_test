//小试牛刀的装饰器函数

/* // 装饰器函数
function log(target: Function, type: string, descriptor: PropertyDescriptor) {
    let value = descriptor.value
    //根据打印的结果来看
    //target：被装饰的类
    //type:被装饰的方法的名字
    //descriptor:包含被装饰函数的一个对象 descriptor.value 就是被装饰的函数
    console.log(descriptor);

    descriptor.value = function (a: number, b: number) {
        let result = value(a, b)
        console.log('日志', {
            type, a, b, result
        });
        return result
    }
}

//原始类
class M {
    @log
    static add(a: number, b: number): number {
        return a + b
    }
    @log
    static sub(a: number, b: number): number {
        return a - b
    }
}

//当执行被装饰器装饰的函数的时候，就会打印日志
let v1 = M.add(1, 2)

//同样的会打印日志
let v2 = M.sub(3, 2)
 */


//TODO:各种不同类型的装饰器

//类装饰器,只有第一个参数，表明被装饰的类
function classfn(target: Function) {
    //因为只有一个参数，那么这里申明的时候也只能声明一个参数，不然下面使用类装饰器的时候会飘红
    return console.log('这里是类装饰器444444')
}



//类属性装饰器
function attributefn(target: Function | TestClass, type: string) {
    console.log('这是类属性装饰器 class.value 111111111111')
}

//类方法装饰器
function functionfn(target: Function | TestClass, type: string, descriptor: PropertyDescriptor) {
    let value = descriptor.value;
    descriptor.value = function () {
        value()
        console.log('这里是类方法的装饰器 classfn5555');
    }
}

//类属性访问器修饰器
function accessorfn(target: Function | TestClass, name: string, descriptor: PropertyDescriptor) {
    console.log("这里是访问器的装饰器 getter setter22222");
}


//参数装饰器
function parameterfn(target: Function | TestClass, name: string, index: number) {

    console.log('这里是参数装饰器33333');

}

//classfn 的第一个参数的类型是Function
@classfn class TestClass {
    constructor(
        public name: string,
        public gender: 'male' | 'female',
        public _value: string
    ) { }
    //实例属性的第一个参数的类型是类的原型对象TestClass
    @attributefn public attribute: string
    //静态属性第一个参数类型是类的构造函数Function
    @attributefn static attribute: string
    //实例方法的第一个参数的类型是类的原型对象TestClass
    @functionfn public log() {
        console.log('这里是实例的log函数');
    }
    //静态方法的第一个参数的类型是类的构造函数Function
    @functionfn static log() {
        console.log('这里是类的静态成员函数log');
    }
    @accessorfn public get value(): string {
        return this._value
    }
    //typescript 不允许同时装饰一个成员的get和set访问器
    public set value(v: string) {
        this.value = v;
    }
    public method(@parameterfn a: string) {
        console.log(a);
    }
}

let test1 = new TestClass("Ass", 'male', '_value')

test1.log()
TestClass.log()
console.log(test1.value);

//TODO:装饰器工厂函数
function log(callback: Function) {
    return function (target: Function, type: string, descriptor: PropertyDescriptor) {
        let value = descriptor.value;

        descriptor.value = function (a: number, b: number) {
            let result = value(a, b);
            callback({
                type,
                a,
                b,
                result
            });
            return result;
        }
    }
}

// 原始类
class M {
    @log(function (result: any) {
        console.log('日志：', result)
    })
    static add(a: number, b: number) {
        return a + b;
    }
    @log(function (result: any) {
        console.log('这是另外一个日志');
    })
    static sub(a: number, b: number) {
        return a - b;
    }
}

let v1 = M.add(1, 2);
console.log(v1);
let v2 = M.sub(1, 2);
console.log(v2);


