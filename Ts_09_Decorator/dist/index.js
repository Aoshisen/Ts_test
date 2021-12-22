//小试牛刀的装饰器函数
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
function classfn(target) {
    //因为只有一个参数，那么这里申明的时候也只能声明一个参数，不然下面使用类装饰器的时候会飘红
    return console.log('这里是类装饰器444444');
}
//类属性装饰器
function attributefn(target, type) {
    console.log('这是类属性装饰器 class.value 111111111111');
}
//类方法装饰器
function functionfn(target, type, descriptor) {
    var value = descriptor.value;
    descriptor.value = function () {
        value();
        console.log('这里是类方法的装饰器 classfn5555');
    };
}
//类属性访问器修饰器
function accessorfn(target, name, descriptor) {
    console.log("这里是访问器的装饰器 getter setter22222");
}
//参数装饰器
function parameterfn(target, name, index) {
    console.log('这里是参数装饰器33333');
}
//classfn 的第一个参数的类型是Function
var TestClass = /** @class */ (function () {
    function TestClass(name, gender, _value) {
        this.name = name;
        this.gender = gender;
        this._value = _value;
    }
    //实例方法的第一个参数的类型是类的原型对象TestClass
    TestClass.prototype.log = function () {
        console.log('这里是实例的log函数');
    };
    //静态方法的第一个参数的类型是类的构造函数Function
    TestClass.log = function () {
        console.log('这里是类的静态成员函数log');
    };
    Object.defineProperty(TestClass.prototype, "value", {
        get: function () {
            return this._value;
        },
        //typescript 不允许同时装饰一个成员的get和set访问器
        set: function (v) {
            this.value = v;
        },
        enumerable: false,
        configurable: true
    });
    TestClass.prototype.method = function (a) {
        console.log(a);
    };
    __decorate([
        attributefn,
        __metadata("design:type", String)
    ], TestClass.prototype, "attribute", void 0);
    __decorate([
        functionfn,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TestClass.prototype, "log", null);
    __decorate([
        accessorfn,
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TestClass.prototype, "value", null);
    __decorate([
        __param(0, parameterfn),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TestClass.prototype, "method", null);
    __decorate([
        attributefn,
        __metadata("design:type", String)
    ], TestClass, "attribute", void 0);
    __decorate([
        functionfn,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TestClass, "log", null);
    TestClass = __decorate([
        classfn,
        __metadata("design:paramtypes", [String, String, String])
    ], TestClass);
    return TestClass;
}());
var test1 = new TestClass("Ass", 'male', '_value');
test1.log();
TestClass.log();
console.log(test1.value);
//TODO:装饰器工厂函数
function log(callback) {
    return function (target, type, descriptor) {
        var value = descriptor.value;
        descriptor.value = function (a, b) {
            var result = value(a, b);
            callback({
                type: type,
                a: a,
                b: b,
                result: result
            });
            return result;
        };
    };
}
// 原始类
var M = /** @class */ (function () {
    function M() {
    }
    M.add = function (a, b) {
        return a + b;
    };
    M.sub = function (a, b) {
        return a - b;
    };
    __decorate([
        log(function (result) {
            console.log('日志：', result);
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number]),
        __metadata("design:returntype", void 0)
    ], M, "add", null);
    __decorate([
        log(function (result) {
            console.log('这是另外一个日志');
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number]),
        __metadata("design:returntype", void 0)
    ], M, "sub", null);
    return M;
}());
var v1 = M.add(1, 2);
console.log(v1);
var v2 = M.sub(1, 2);
console.log(v2);
