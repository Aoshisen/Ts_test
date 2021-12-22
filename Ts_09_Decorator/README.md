---
title:"装饰器"
date:2021-12-21
---

## 装饰器

### 什么是装饰器

装饰器就是在Typescript 中 一种不改变类代码的基础上通过添加标注的方式对类型进行扩展的一种方式
下面是装饰器的一些作用以及限制

- 减少代码量
- 提高代码的扩展性，可读性和维护性
- 在typescript 中，装饰器只能在类中使用

### 装饰器语法

装饰器的使用极其简单

- 装饰器本质上面就是一个函数
- 通过特定语法在特定的位置调用装饰器函数，就可以对数据（类，方法，参数）进行扩展

在 tsconfig.json 中启用 装饰器的特性

```json
        "experimentalDecorators": true
```

简单的例子

```typescript

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
```

### 装饰器装饰不同的内容

装饰器是一个函数，他通过@装饰器函数名称 这种特殊的语法附加在类，类的方法，类的访问符，类属性，类的参数上，对他们进行扩展包装,然后返回一个包装后的目标对象（类，方法，访问符，属性，参数），装饰器工作在类的构建阶段，而不是使用阶段

**类装饰器**
作用于类的构造函数
只有一个参数
类的构造函数作为其唯一的参数

```typescript

//类装饰器,只有第一个参数，表明被装饰的类
function classfn(target: Function) {
    //因为只有一个参数，那么这里申明的时候也只能声明一个参数，不然下面使用类装饰器的时候会飘红
    return console.log('this is classfn')
}

@classfn class TestClass {
    constructor(
        public name: string,
        public gender: 'male' | 'female'
    ) { }
    log() {
        console.log(this.gender);
    }
}


```

**类属性装饰器**
作用于类的属性上

- 第一个参数
    - 实例属性：类的原型对象
    - 静态属性：类的构造函数

- 第二个参数
    - 属性名称

**类方法装饰器**
应用于类的方法上
- 第一个参数
    - 实例方法：类的原型对象
    - 静态方法:类的构造函数

- 第二个参数
    - 方法名称

- 第三个参数
    - 包含被描述方法的一个对象（方法描述符对象）

**访问器装饰器**
应用于类的访问器（getter，setter）上

- 第一个参数

    - 实例参数：类的原型对象
    - 静态参数：类的构造函数

- 第二个参数

    - 属性名称

- 第三个参数

    - 包含被修饰方法的对象（方法描述符对象）

TypeScript不允许同时装饰一个成员的get和set访问器。取而代之的是，一个成员的所有装饰的必须应用在文档顺序的第一个访问器上。这是因为，在装饰器应用于一个属性描述符时，它联合了get和set访问器，而不是分开声明的。

** 参数装饰器**
- 第一个参数

    - 实例对象：类的原型对象
    - 静态对现：类的构造函数

- 第二个参数

    - 方法名称

- 第三个参数

    - 参数在函数参数列表中的索引

```typescript

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
```

### 装饰器工厂函数

如果我们需要给装饰器执行过程中传入一些参数，那么就可以使用装饰器工厂函数来实现

```typescript

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

```

### 元数据

在装饰器函数中 我们可以拿到类，方法，访问符，属性，参数的基本信息，但是我们需要获取更多的数据就要通过其他的方式来进行：元数据

**什么是元数据**
用来描述数据的数据，比如对象，类都是数据，他们描述了某种数据，但是还有一种数据可以用来描述类，对象这些数据，这些数据就叫做元数据

在tsconfig.json 中开启emitDecoratorMetadata 属性,typescript 会自动给类，方法，访问符，属性，参数，添加如下一个元数据

- design:type 被装饰目标的类型

    - 成员属性：属性的标注类型
    - 成员方法： Function 类型

- design:paramtypes

    - 成员方法:方法形参列表的标注类型
    - 类：构造函数形参列表的标注类型

- design:returntype

    - 函数返回值的标注类型

看下面的例子

```typescript

function decoratorfn(target: any, propertyKey: string, descriptor: any) {
    console.log('design type', Reflect.getMetadata('design:type', target, propertyKey));
    console.log('params type', Reflect.getMetadata('design:paramtypes', target, propertyKey));
    console.log('return type', Reflect.getMetadata('design:returntype', target, propertyKey));
}

class Test {
    constructor(public name: string) {
    }
    @decoratorfn
    log(a: string): string {
        console.log('这里是log函数', this.name);
        return this.name
    }
}

```

**定义元数据**

Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey)

- metadataKey:meta 数据对应的key
- metadataValue：meta 数据的值
- target：meta 数据附加的目标
- propertyKey：对应的就是类下面的函数名称或者是参数名称

```typescript
// Reflect.defineMetadata(metadatataKey, metadataValue, target, propertyKey) 这样的格式
// 通过@Reflect.metadata来添加元数据

@Reflect.metadata('name', 'ass')
class Another {
    @Reflect.metadata('name', 'method')
    public static method() {
    }
    @Reflect.metadata('name', 'method2')
    public method2() {

    }
}
// `Reflect.getMetadata(metadataKey, target, propertyKey)`来获取元数据
//这里也可以获取到元数据
let another = new Another
console.log(Reflect.getMetadata("name", Another, 'method'));
console.log(Reflect.getMetadata('name', another, 'method2'));


//通过 Reflect.defineMetadata 来添加元数据
class Another2 {
    public static method() { }
    public method2() { }
}

Reflect.defineMetadata('name', 'ass', Another2)
Reflect.defineMetadata("name", 'method', Another2, 'method')

let another2 = new Another2
Reflect.defineMetadata('name', 'ass', another2)
Reflect.defineMetadata('name', 'method2', another2, "method2")

// `Reflect.getMetadata(metadataKey, target, propertyKey)`来获取元数据
//类属性需要传入类名
console.log(Reflect.getMetadata('name', Another2));
//实例属性需要传入实例
console.log(Reflect.getMetadata('name', another2, 'method2'));
```
