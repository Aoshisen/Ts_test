"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
//官方文档示例，说实话我懂不起
require("reflect-metadata");
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
function decoratorfn(target, propertyKey, descriptor) {
    console.log('design type', Reflect.getMetadata('design:type', target, propertyKey));
    console.log('params type', Reflect.getMetadata('design:paramtypes', target, propertyKey));
    console.log('return type', Reflect.getMetadata('design:returntype', target, propertyKey));
}
var Test = /** @class */ (function () {
    function Test(name) {
        this.name = name;
    }
    Test.prototype.log = function (a) {
        console.log('这里是log函数', this.name);
        return this.name;
    };
    __decorate([
        decoratorfn,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", String)
    ], Test.prototype, "log", null);
    return Test;
}());
//定义元数据到指定的方法，类 上，但又不会影响类，方法本身的代码
//设置元数据
// Reflect.defineMetadata(metadatataKey, metadataValue, target, propertyKey) 这样的格式
// 通过@Reflect.metadata来添加元数据
var Another = /** @class */ (function () {
    function Another() {
    }
    Another.method = function () {
    };
    Another.prototype.method2 = function () {
    };
    __decorate([
        Reflect.metadata('name', 'method2'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Another.prototype, "method2", null);
    __decorate([
        Reflect.metadata('name', 'method'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Another, "method", null);
    Another = __decorate([
        Reflect.metadata('name', 'ass')
    ], Another);
    return Another;
}());
// `Reflect.getMetadata(metadataKey, target, propertyKey)`来获取元数据
//这里也可以获取到元数据
var another = new Another;
console.log(Reflect.getMetadata("name", Another, 'method'));
console.log(Reflect.getMetadata('name', another, 'method2'));
//通过 Reflect.defineMetadata 来添加元数据
var Another2 = /** @class */ (function () {
    function Another2() {
    }
    Another2.method = function () { };
    Another2.prototype.method2 = function () { };
    return Another2;
}());
Reflect.defineMetadata('name', 'ass', Another2);
Reflect.defineMetadata("name", 'method', Another2, 'method');
var another2 = new Another2;
Reflect.defineMetadata('name', 'ass', another2);
Reflect.defineMetadata('name', 'method2', another2, "method2");
// `Reflect.getMetadata(metadataKey, target, propertyKey)`来获取元数据
//类属性需要传入类名
console.log(Reflect.getMetadata('name', Another2));
//实例属性需要传入实例
console.log(Reflect.getMetadata('name', another2, 'method2'));
