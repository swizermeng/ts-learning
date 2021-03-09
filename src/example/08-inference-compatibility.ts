let _name = 'yangmeng'
// _name = 123 //不能将类型“number”分配给类型“string”

let array = [1, 'a']
//array.push(true) //型“boolean”的参数不能赋给类型“string | number”的参数

window.onmousedown = (event) => {
    console.log(event.target)
}

// 类型兼容性基础
interface InfoInterface {
    name: string,
    info: {
        age: number
    }
}
let infos: InfoInterface
let infos1 = {
    name: 'yangmeng',
    info: {
        age: 20
    }
}
let infos2 = {age: 10}
let infos3 = {
    name: 'swizer',
    age: 29
}
infos = infos1
// infos = infos2 //类型“{ age: number; }”缺少类型“InfoInterface”中的以下属性: name, info
//infos = infos3 //类型 "{ name: string; age: number; }" 中缺少属性 "info"，但类型 "InfoInterface" 中需要该属性

// 函数兼容性

// 1、参数个数
let x = (a: number) => 0
let y = (b: number, c: number) => 0
// y = x // ok
// x = y //不能将类型“(b: number, c: number) => number”分配给类型“(a: number) => number”

// 2、参数类型
let j = (a: number) => 0
let k = (b: string) => 0
// j = k //不能将类型“(b: string) => number”分配给类型“(a: number) => number”

// 3、可选参数和剩余参数
const getSum = (arr: number[], cb: (...args:number[] ) => number) => {
    return cb(...arr)
}
const result = getSum([1,2,3], (...args: number[]): number => args.reduce((a,b) => a + b, 0))
console.log(result)

// 4、函数参数双向协变
let funcA = (arg: number | string): void => {}
let funcB = (arg: number): void => {}
funcA = funcB //ok
funcB = funcA //ok

// 5、返回值类型
let o = (): string | number => 0
let p = (): string => "a"
o = p //ok
// p = o // error

// 函数重载
function merge(arg1: number, arg2: number): number
function merge(arg1: string, arg2: string): string
function merge(arg1:any, arg2:any) {
    return arg1 + arg2
}
merge(1,2) //unction merge(arg1: number, arg2: number): number 

function sum(arg1: number, arg2: number): number
function sum(arg1: any, arg2: any): any {
    return arg1 + arg2
}

let func = merge
// func = sum //error  因为sum少一种string类型的情况   函数重载会报错

// 枚举兼容性
// 数字枚举类型与数字类型兼容，不与枚举类型兼容
enum StatusEnum {
    On,
    Off
}
enum AnimalEnum {
    Dog,
    Cat
}
let seo = StatusEnum.On
// seo = AnimalEnum.Dog //不能将类型“AnimalEnum.Dog”分配给类型“StatusEnum”

// 类兼容性
class AnimalClass {
    public static age: number
    constructor(public name: string) {}
}
class PeopleClass {
    public static age: string
    constructor(public name: string) {}
}
class ColorClass {
    constructor(public name: number) {}
}
let animal: AnimalClass
let people: PeopleClass
let color: ColorClass
animal = people //ok
// animal = color //error  name类型不匹配

// private   protected
class ParentClass {
    private age: string
    constructor(){}
}
class ChildClass extends ParentClass {
    constructor() { super() }
}
class OtherClass {
    private age: string
    constructor(){}
}

let child: ChildClass = new ParentClass() //ok
//let other: ParentClass = new OtherClass() //error  能将类型“OtherClass”分配给类型“ParentClass”。类型具有私有属性“age”的单独声明

// 泛型兼容性
interface Data<T> {
    data: T
}
let data1: Data<number>
let data2: Data<string>
// data1 = data2 //error