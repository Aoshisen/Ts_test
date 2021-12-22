// //直接标注
// function fn(a:string):string{
//     return a;
// }
// //申明式标注
// let foo:(a:string)=>string=function(a){
//     return a;
// }

// //类型别名标注
// type callback =(a:string)=>string
// type callback_another={
//     (a:string):string
// }

// let foo1:callback=function(a){
//     return a
// }

// //接口标注
// interface Ifunc {
//     (a:string):string
// }
// let foo2:Ifunc=function(a){
//     return a
// }

//TODO:可选参数
// let divElement=document.querySelector("#div") as HTMLElement;

// function css(ele:HTMLElement,attr:string,value?:any) {
//     //some code ...
// }

// divElement&&css(divElement,'width','100px') //三个值是设置元素的属性
// divElement&&css(divElement,'color') //两个参数是获取元素的属性

//TODO:默认参数

// function sort(items:number[],order:'desc'|'asc'='desc'){
// //some code....
// }
// sort ([1,2,3])

//TODO:剩余参数
// interface Iobj {
//     [key: string]: any
// }

// function merge(target:Iobj,...others:Iobj[]){
//     // somecode......
// }
// function merge(target: Iobj, ...others: Array<Iobj>) {
//     return others.reduce((prev, current) => {
//         prev = Object.assign(prev, current);
//         return prev
//     }, target)
// }

// let newObj=merge({x:1},{y:2},{z:3})

//TODO:函数中的this
// interface T {
//     //这个T的类型表示该变量是一个有两个参数的集合，第一个参数是数字类型，第二个参数是一个函数（传入的值为数字类型返回的值为无值类型）
//     a:number,
//     fn:(x:number)=>void;
// }
// let obj:T ={
//     a:1,
//     fn(x:number){
//         console.log(this,'this is this');
//     }
// }

// let obj2:T={
//     a:1,
//     fn(this:T,x:number){
//         //函数的第一位显式的标注this 的类型，它对实际的参数不会有影响
//         console.log(this ,'this is object2s this');
//     }
// }

// interface ArrowT {
//     a:number,
//     fn:(x:number)=>void,
// }

// let obj3:ArrowT={
//     a:1,
//     fn(this:ArrowT,x:number){
//         return ()=>{
//             console.log(this);
//         }
//     }
// }

//TODO: 函数重载
//使用函数来控制一个元素的显示隐藏

/* function ShowOrHide(ele: HTMLElement, attr: string, value: 'block' | 'none' | number) {
    //使用display:none opacity:0 来控制一个元素的显示隐藏
    //some-code...
}

//显示的标注类型，类型断言的一种写法
let Box = <HTMLElement>document.querySelector("#box")

if (Box) {
    ShowOrHide(Box, 'display', "none")
    ShowOrHide(Box, 'opacity', 0);
    //这样也是可以的，类型检测没问题，当运行的时候就会报错，所以使用重载函数的特性来改造一下这个函数
    ShowOrHide(Box, 'opacity', 'block')
}

//改造这个函数
function AdvanceShowOrHide(ele: HTMLElement, attr: 'display', value: "block" | "none")
function AdvanceShowOrHide(ele: HTMLElement, attr: "opacity", value: number)
function AdvanceShowOrHide(ele: HTMLElement, attr: string, value: any) {
    // some code...
}

// 另一种类型断言的写法 as
let Box1 = document.querySelector("#div") as HTMLElement

if (Box1) {
    //OK
    AdvanceShowOrHide(Box1, "opacity", 0)
    //OK
    AdvanceShowOrHide(Box1, 'display', 'none')
    //not Ok
    // AdvanceShowOrHide(Box1,"opacity","block")
}


// *重载函数只需要定义结构,不需要定义实体，类似接口*

interface PlainObject {
    [key: string]: number | string
} */

// 重载函数只需要定义结构，不需要定义实体，类似接口

/* interface PlainObject {
    [key: string]: string | number
}
function css(ele: HTMLElement, attr: PlainObject, value?: any): void
function css(ele: HTMLElement, attr: string, value: string | number): void
function css(ele: HTMLElement, attr: any, value: any): void {
    if (typeof attr === 'string' && value) {
        //如果第二个参数的类型为string，并且第三个参数存在，那么就设置元素的值
        ele.style[attr] = value
    }
    if (typeof attr === 'object') {
        for (let key in attr) {
            ele.style[key] = attr[key]
        }
    }
}

//使用这个css函数
let Box = document.querySelector('#box') as HTMLElement
if (Box) {
    //OK
    css(Box, 'width', '100px')
    //OK
    css(Box, {
        "width": '100px'
    })
    //Not Ok ，没有子函数重载里面定义相关的逻辑，就会检查出问题
    css(Box,'width')
} */