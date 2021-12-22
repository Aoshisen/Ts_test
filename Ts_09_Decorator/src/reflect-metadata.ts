//官方文档示例，说实话我懂不起
import 'reflect-metadata'

/* class Point {
    x: number;
    y: number;
}
class Line {
    private _p0: Point;
    private _p1: Point;
    @validate
    @Reflect.metadata('design:type', Point)
    set p1(value: Point) {
        this._p1 = value
    }
    get p1() {
        return this._p1
    }
    @validate
    @Reflect.metadata('design:type', Point)
    set p0(value: Point) {
        this._p1 = value
    }
    get p0() {
        return this._p1
    }
}
function validate<T>(target: Function | Line, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
    let set = descriptor.set;
    descriptor.set = function (value: T) {
        let type = Reflect.getMetadata('design:type', target, propertyKey)
        if (!(value instanceof type)) {
            throw new TypeError("Invalid type.")
        }
        set(value)
    }
} */

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

//定义元数据到指定的方法，类 上，但又不会影响类，方法本身的代码

//设置元数据

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
