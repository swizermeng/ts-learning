// 第一讲： 数据类型

// 布尔类型
// let bool: boolean = false
let bool: boolean
bool = true
// bool = "333"

// 数值类型
let num: number = 123
num = 0b1111011 //二进制 123
num = 0o173 // 八进制 123
num = 0x7b  // 十六进制 123
num = 2

// 字符串类型
let str: string
str = 'abc'
str = `数值是${num}`
console.log(str)

// 数组类型
// [1, 2, 3]
let arr1: number[]
let arr2: Array<number>
// [1, 2, '3']
let arr3: (string | number)[]
let arr4: Array<string | number>

// 元组类型
let tuple: [string, number, boolean, Array<number>]
tuple = ['1', 1, false, [1]]

// 枚举类型
enum Roles {
    SUPER_ADMIN = 1,
    ADMIN,
    USER
}
console.log(Roles.ADMIN)
if(num = Roles.ADMIN) {
    console.log('It is number 2')
}

// any类型
let value: any
value = 123
value = '122'
value = true
const arr5: any[] = [1,'1']

// void类型
const consoleText = (text: string): void => {
    console.log(text)
}
let v: void
v = undefined
v = null
console.log(v)
consoleText('adc')

// null和undefined (这两种类型是其他类型的子类型)
let u: undefined = undefined
let n: null = null
value = u
value = n

// never类型 (是所有类型的子类型)
const errorFunc = (message: string): never => {
    throw new Error(message)
}
// errorFunc('error')
// const infiniteFunc = (() => {
//     while(true) {}
// })()
// let neverVariable = (() => {
//     while(true) {}
// })()
// value = neverVariable

// object类型
let obj = {
    name: 'swizer'
}
let obj2 = obj
obj2.name = 'S'
console.log(obj, obj2)
function getObject(obj: object): void {
    console.log(obj)
}
getObject(obj)

// 类型断言

const getLength = (target: string | number): number => {
    if((<string>target).length || (target as string).length) {
        return (<string>target).length
    } else {
        return target.toString().length
    }
}
let len = getLength('11111')
console.log(len)