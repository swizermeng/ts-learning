// 交叉类型
const mergeFunc = <T, U>(arg1: T, arg2:U): T & U => {
    let res = {} as T & U
    res = Object.assign(arg1, arg2)
    return res
}
const merge1 = mergeFunc({a: 'a words'}, {b: 'b words'})
console.log(merge1.a) 

// 联合类型
const getLengthFunc = (content: string | number): number => {
    if(typeof content === 'string') { return content.length }
    else { return content.toString().length }
}
const contentLength = getLengthFunc(1234)
console.log(contentLength)

// 类型保护
const valueList = [123, 'addsfsdf']
const getRandomFunc = () => {
    return Math.random() * 10
}
const getValueFunc = () => {
    const number = Math.random() * 10
    if(number > 5) { return valueList[0] }
    else { return valueList[1] }
}
let item = getValueFunc()
// 第一种 function
// 使用函数适合复杂的类型保护判断
function isString(value: number | string): value is string  {
    return typeof value === 'string'
}
if(isString(item)) {
    console.log(item.length)
} else {
    console.log(item.toFixed())
}
// 第二种 typeof
// 只能用等于或者不等于来判断
// 只能判断string  | number | Boolean | Symbol 中的一种
if(typeof item === 'string') {
    console.log(item.length)
}else {
    console.log(item.toFixed())
}
// 第三种 instanceof
class createByClass1 {
    public age = 10
    constructor() {}
}
class createByClass2 {
    public name = 'yangmeng'
    constructor() {}
}
function getRandomClass() {
    return Math.random() > .5 ? new createByClass1() : new createByClass2()
}
let item1 = getRandomClass()
if(item1 instanceof(createByClass1)) {
    console.log(item1.age)
} else {
    console.log(item1.name)
}

// 类型断言
function getSplicedStr(num: number | null): string {
    function getRes(prefix: string) {
        return prefix + num!.toFixed().toString()
    }
    num = num || 0.1
    return getRes('yangmeng-')
}
let splicedStr = getSplicedStr(3.99)
console.log(splicedStr)

// 类型别名
type TestType<T,U> = { x: T, y: U, c?:TestType<T, U>}  // 只可以在对象中使用类型别名自身
const test1:TestType<number, boolean> = {
    x: 1,
    y: false,
    c: {
        x: 2,
        y: false,
        c: {
            x:4,
            y: true
        }
    }
}

// 字面量类型
type Age = 18
const age: Age = 18

//可辨识联合类型两要素
// 1.具有普通的单例类型属性
// 2.一个类型别名包含了哪些类型的联合
interface Square {
    kind: 'square',
    size: number
}
interface Rectangle {
    kind: 'rectangle',
    width: number,
    height: number
}
interface Circle {
    kind: 'circle',
    radius: number
}
type Shape = Square | Rectangle | Circle
// 为了保证switch代码块中的情况都能判断到，使用never类型来进行处理
function assertNever(val: never): never {
    throw Error('unexpected object: ' + val)
}
function getArea(s: Shape) {
    switch(s.kind) {
        case 'square':
            return s.size * s.size
        case 'rectangle':
            return s.height * s.width
        case 'circle':
            return Math.PI * s.radius ** 2
        default: 
            return assertNever(s)
    }
}
console.log(getArea({kind: 'square', size: 10.36}))