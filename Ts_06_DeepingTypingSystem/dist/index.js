//TODO:typeof 类型保护
function foo(a) {
    //error 因为substring是string特有的方法，这里不能断定a就是string类型
    // a.substring(1)
    if (typeof a === "string") {
        //类型保护 判断a在此作用域下面为string类型
        //Ok
        a.substring(1);
    }
    else {
        // 这里的a为number类型系统自动补全number类型所拥有的方法
        a.toFixed(1);
    }
}
//instanceof（实例；运算符） 类型保护
function instanceofFn(a) {
    //instanceof 也是可以判断一个参数的类型
    if (a instanceof Array) {
        //在这个作用域下面a就是Array 类型
        a.push(1);
    }
    else {
        //在这个作用域下面a的类型就是Date类型
        a.getFullYear();
    }
}
function InFn(arg) {
    //error 这里也不知道arg到底是IA还是IB
    // arg.a
    if ("x" in arg) {
        //如果x 在arg里面存在那么就可以判断类型为 IA
        arg.x;
    }
    else {
        //反之那么就是IB 
        arg.a;
    }
}
function LiteralFn(params) {
    //error 
    // params.x
    if (params.type === 'IA') {
        //在这个作用域下面params的类型为IA
        params.x;
        params.y;
    }
    else {
        //在这个作用域下面params 的类型为IB
        params.a;
        params.b;
    }
}
//TODO: 自定义保护类型
function canEach(data) {
    return data.forEach !== undefined;
}
function fn2(elements) {
    if (canEach(elements)) {
        elements.forEach(function (ele) {
            ele.classList.add("box");
        });
    }
    else {
        elements.classList.add('box');
    }
}
//TODO: 类型操作
//这是值
var str1 = 'this is data';
//如果是let 那么就会把typeof 返回的数据当成值（获取数据的类型）
var dataType = typeof str1;
//dataType 是类型
var str2 = "My string";
var str3 = "some Type";
//这里的dataType是值
console.log(dataType);
var p1 = {
    name: 'Ass',
    age: 23
};
function getPersonVal(k) {
    return p1[k];
}
// 等同于 
function getVal(key) {
    return p1[key];
}
getPersonVal("age");
getPersonVal('name');
//TODO: 类型兼容
var Person = /** @class */ (function () {
    function Person() {
    }
    return Person;
}());
var Cat = /** @class */ (function () {
    function Cat() {
    }
    return Cat;
}());
function fn(p) {
    p.name;
}
var tiger = new Cat();
//ok 因为Cat类的结构与Person 的结构相似，所以他们是兼容的,
//Cat包含了Person 的全部属性的话，那么 通过Cat 创建出来的对象也可以兼容Person 创建出来的类
fn(tiger);
