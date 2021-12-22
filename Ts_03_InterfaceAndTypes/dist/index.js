// interface Point {
//     x:number;
//     //值得注意的是这里定义类型使用的是; 来分割两个参数
//     y:number;
// }
// interface Point1{
//     x:number,
//     y:number,
// }
//error Point 仅仅表示值，但在这里却作为值使用
// let p1=Point 
//TODO:可选属性
// interface Optional {
//     x:number,
//     y:number,
//     color?:string
//     //其中的color就是可选的属性
// }
//TODO:只读属性
// interface ReadOnly{
//  readonly x:number,
//  readonly y:number,
//  //当我们标注了一个属性为只读属性之后，那么该属性除了初始化之外，是不能被再次赋值的
// }
//TODO:任意属性
// *数字类型索引*
// interface AnyAttribute {
//     x:number,
//     y:number,
//     [prop:number]:number,
// }
//字符串类型索引
// interface StringAttribute{
//     x:number,
//     y:number,
//     [prop:string]:number,
// }
// let test:StringAttribute={
//     x:12,
//     y:12,
//     someattract:21
// }
// let test2:AnyAttribute={
//     x:12,
//     y:12,
//     12:222222,
// }
//TODO:同时使用字符串类型和数字类型索引
// interface Point {
// [prop1:string]:string;
//right
// [prop2:number]:string;
//error
// [prop2:number]:number
// }
//当同时存在数字类型索引和字符串类型索引的时候数字类型索引得值必须是字符串类型的值的类型,或者是其值的子类型
// interface Point2 {
//     [prop1:string]:Object;
//     [prop2:number]:Date;
// }
//TODO:使用接口来描述一个函数
// interface IFunc {
//     //这里这样的定义是规定使用IFunc 描述的函数必须传入一个为字符串的参数，并且返回值也要是一个字符串   
//     (a:string):string
// }
// let fn:IFunc=function(a){
// return a
// }
//TODO:多个接口合并成一个接口
//如果合并的接口存在同名的非函数成员，则必须保证他们类型一致，否则编译报错
//接口中的同名函数则是采用重载
// interface Box {
//     height:number,
//     width:number,
// }
// interface Box{
//     scale:number
// }
// let box:Box={height:5,width:2,scale:2}
//TODO: 高级类型 联合类型
// function ShowOrHide (ele:Element,attr:'display',value:string)
// function ShowOrHide (ele:Element,attr:'opacity',value:number)
// function ShowOrHide (ele:Element,attr:string)
// {
//     //some code......
//     //函数重载，先写出小范围的函数定义再使用大范围的函数定义来重载小范围的函数定义
// }
// let box =document.querySelector("#fiv")
// //box 变量可能为null ,所以需要判断一下
// if(box){
//     ShowOrHide(box,'opacity',1)
//     //这样也是可以的，但是就会很奇怪，使用重载函数来进行约束
//     ShowOrHide(box,'display','block')
// }
//TODO:交叉类型 使用交叉类型，可以把多种类型合并到一起成为一种新的类型，是并且的关系，可以对一个对象进行扩展
// interface Cross1 {
//     x:number,
//     y:number,
// }
// interface Cross2 {
//     z:number
// }
//属性“assign”在类型“ObjectConstructor”上不存在。是否需要更改目标库? 请尝试将 “lib” 编译器选项更改为“es2015”或更高版本
// let test1:Cross1&Cross2={x:1,y:2,z:3}
// let test:Cross1&Cross2=Object.assign({},{x:1,y:2},{z:3})
//如果只是添加ES6的lib 那么这里就会报错，找不到名称“console”。是否需要更改目标库? 请尝试更改 “lib” 编译器选项以包括 “dom”。ts(2584)
//在lib里面添加"DOM" 即可解决问题，另外在tsconfig.json 里面必须要是双引号 
//在tsconfig.json中设置lib
// console.log(test);
//TODO:字面量类型配合联合类型
// function setPosition(ele:Element,direction:"left"|"right"|"top"|"bottom"){
//     //some code
// }
// let box:Element;
// box&&setPosition(box,'bottom')
//error
// box&&setPosition(box,'hahah')
//TODO:使用类型别名(type) 定义函数类型
//这里需要注意一下，如果使用type来定义函数类型，和接口优点不一样
//接口定义
// interface callback {
//     (a:string):string
// }
// //类型别名定义
// type typeCallback=(a:string)=>string
// let testfn:callback=function(a){
//     return a
// }
// let testfn2:typeCallback=function(a){
//     return a
// }
//TODO:类型推导
// let x=1;
// //true
// x=2
// //error 不能将number string 赋值给number
// x='string'
// //但是这里打印的是"string"
// console.log(x);
// TODO:类型断言
var img = document.querySelector("#img");
//我们可以直观的看见通过querySlector来查询到的img是一个Element|null 的类型，一些img标签特有的属性他是没有的比如src属性
//所以我需要更加精确的标注img这个变量的类型是一个HTMLImageElement类型，这个时候我们就可以使用类型断言
var img1 = document.querySelector("#img");
//或者
var img2 = document.querySelector("#img");
//类型断言只是一种预判了，并不会对数据本身产生实际的效果，就是为了通过类型检测，是显示的类型转换，但并非真的转换了
