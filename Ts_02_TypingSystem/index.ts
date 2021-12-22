//简单的类型标注,string number boolean

// let title:string ='Ass'
// let num:number =10;
// let bool:boolean =true;

//空和未定义 在被定义为这两个类型之后那么表示改变量就不能被修改了
let undf:undefined;
let nul:null;
// undf="ass"
// nul='nui'

// undf=null
// console.log(undf);

// let a:string;
// a="1"
// let b:String
// b="1"
// a=new String("2")

//内置对象类型
// let a:Object={}
// let arr:Array<number>=[1,2,3]
// let dl:Date=new Date()
// console.log(a,arr,dl);

//字面量类型标注
// let a:{username:string;age:number}={username:"Ass",age:23}
// a.username
// a.age;
//这里会报错
// a.gender

//接口

// interface Person {
//     username:string;
//     age:number
// }
// let a:Person={
//     username:"Ass",
//     age:23
// }

// a.username
// a.age
//error
// a.gender

//类和构造函数约束的类型
// class Person {
//     constructor(public username:string,public age:number){}
// }
// let a =new Person('ass',23)
// a.username;
// a.age;
//error
// a.gender
// console.log('ass yyds');

//包装对象
// let a:string
//ok
// a='string';
//error
// a=new String('1')

// let A:String;
//ok
// A='string'
//ok
// A=new String("String")

//TODO:数组类型
//使用泛型标注
// let arr1:Array<number>=[1];
//普通标注
// let arr2:number[]=[13]

//TODO:元组类型
// let data1:[string,number]=['开课吧',100] 
// data1.push(100)
// data1.push("string")
//error
// data1.push(false)

//TODO:枚举类型
// enum HTTTP_CODE {
//     OK=200,
//     NOT_FOUND=404,
//     METHOD_NOT_ALLOWED
// }
// enum URLS{
//     USER_REGISTER='/user/register',
//     USER_LOGIN='/user/login',
//     //如果前一个枚举值类型为字符串，则后续枚举值必须手动赋值，
// }
// console.log(URLS.USER_LOGIN);

//TODO:无值类型
function voidfn():void {
    //没有return 或者return undefined
}
//在strictNullCHecks 为false 的情况下，undefined 和null 都可以玩赋值给void
//但是当strictNullChecks为true的情况下，只有undefined 才可以赋值给void

//TODO:never类型
function neverFn():never {
    throw new Error("error")
}

//任意类型

let a:any;