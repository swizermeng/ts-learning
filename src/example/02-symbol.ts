// 第二讲: ES6  symbol
// 属于基本数据类型 代表一个独一无二的值
const s = Symbol()
// console.log(s)
const s2 = Symbol()
// s !== s2

//symbol在ts中可以传入字符串和数字类型的标识,但不能传入对象
const s3 = Symbol('yangmeng')
const s4 = Symbol(111)

// symbol不可以参与计算
//  s4 + 12 是不可以的

// 可以转换为字符串或布尔值
console.log(s4.toString())
console.log(Boolean(s4))
console.log(!s4)

let prop = 'name'
let info = {
    // name: 'yangmeng',
    [`my${prop}is`]: 'yangmeng'
}
console.log(info)

const s5 = Symbol('name')
let info2 = {
    [s5]: 'yangmeng',
    age: 26,
    hobby: 'game'
}
info2[s5] = 'swizer'
console.log(info2)

// 下面这几种方法无法找到symbol类型的属性名
for (const key in info2) {
    console.log(key)
}

console.log(Object.keys(info2));
console.log(Object.getOwnPropertyNames(info2))
console.log(JSON.stringify(info2))

// 下面这几种方法可以找到symbol类型的属性名
console.log(Reflect.ownKeys(info2)) //es6方法  可以返回所有类型的属性名
console.log(Object.getOwnPropertySymbols(info2)) //只返回symbol类型的属性名

// symbol.for  symbol.keyFor()
// symbol传入同样标识创建的值是不相等的,
// 但是symbol.for传入相同标识创建的值相等,会在全局范围内搜索该标识有没有创建过值
const s6 = Symbol.for('yangmeng')
const s7 = Symbol.for('yangmeng')
// console.log(s6 === s7)

//symbol.keyFor 返回使用symbol.for 注册的值的标识
console.log(Symbol.keyFor(s6))

// 11种内置的symbol值

// 1.symbol.hasInstance
const obj1 = {
    [Symbol.hasInstance](otherObj) {
        console.log(otherObj)
    }
}
console.log({ a: 'a' } instanceof (obj1 as any))

// 2.symbol.isConcatSpreadable 数组是否会被扁平化
let arr = [1, 2];
console.log([].concat(arr, [3, 4]));
arr[Symbol.isConcatSpreadable] = false //不会被扁平化
console.log([].concat(arr, [3, 4]));
console.log(arr[Symbol.isConcatSpreadable])

// 3.symbol.species 指定一个创建衍生构造函数的实例对象

class C extends Array {
    constructor(...args) {
        super(...args)
    }
    static get [Symbol.species]() {
        return Array
    }
    getName() {
        return 'yangmeng'
    }
}

const c = new C(1, 2, 3)
const a = c.map(item => item + 1)
console.log('a', a)
console.log(a instanceof C)
console.log(a instanceof Array)

// 4.symbol.match 
let obj3 = {
    [Symbol.match](string) {
        console.log(string.length)
    }
}
'adsscww'.match((obj3 as RegExp))
// 5.symbol.replace 
// 6.symbol.search 
// 7.symbol.split 
// 跟 symbol.match 效果类似

// 8.symbol.iterator  迭代器
const arr6 = [1,2,3]
const iterator = arr[Symbol.iterator]()
console.log(iterator)
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

// 9.symbol.toPrimitive 数据类型的隐式转换
let obj4:unknown = {
    [Symbol.toPrimitive](type) {
        console.log(type)
    }
}
// const res = (obj4 as number)++ //number
const res = `asd${obj4}` // default (js中会是string)

// 10.symbol.toStringTag
let obj5 = {
    // [Symbol.toStringTag]: 'yangmeng'
    get [Symbol.toStringTag]() {
        return 'swizer'
    }
}
console.log(obj5.toString())

// 11.symbol.unscopables 用于指定对象值，其对象自身和继承的从关联对象的 with 环境绑定中排除的属性名称。
const obj6 = {
    a: 'a',
    b: 'b'
}
console.log(Array.prototype[Symbol.unscopables])
// 在浏览器中查看
// with(obj6) {
//     console.log(a, b)
// }
// const Arr = [1,3,4]
// with (Arr) {
//     console.log(filter(item => item == 1))
// }
