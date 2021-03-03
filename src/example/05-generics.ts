// 泛型 
// 定义函数时使用泛型变量来约束变量类型，例如在调用时确定函数类型为number，那么T相应的地方都需要传入number类型的参数
// 一般是用一个大写字母，常用T，其他均可
const getArray = <T>(value: T, times: number = 5): T[] => {
    return new Array(times).fill(value)
}
console.log(getArray<number>(5,4).map(item => item+1))

const getArr = <K, U>(param1: K, param2: U, times: number): [K,U][] => {
    return new Array(times).fill([param1, param2])
}
// console.log(getArr(1, 'a', 3))
getArr(1,'a', 3).forEach(item => {
    // console.log(item[0].length)
    // console.log(item[1].toFixed())
    // 由于类型已经被确定，所以以上代码会报错
})

// 类型别名定义泛型
type GetArray = <T>(arg: T, times: number) => T[]
let getarr: GetArray = (arg: any, times: number) => {
    return new Array(times).fill(arg)
}
console.log(getarr(123,3))

// 接口形式定义泛型
// interface GetArr {
//     <T>(arg: T, times: number): T[],
//     array: <T>[]
// }
// 或者提升泛型变量位置
interface GetArr<T> {
    (arg: T, times: number): T[],
       array: T[]
}

// 泛型约束
interface ValueWithLength {
    length: number
}
const getArray2 = <T extends ValueWithLength>(arg:T, times: number) : T[] => {
    return new Array(times).fill(arg)
}
// 因为约束了传入参数需要拥有length属性，所以第二个调用传入数字类型时会报错
getArray2([1,2],3)
// getArray2(123, 3)
getArray2({length: 2}, 3)

// 在泛型约束中使用泛型参数

const propName = <T, K extends keyof T>(obj: T, propName: K) => {
    return obj[propName]
}
let object = {
    a: 'a',
    b: 'b'
}
// 由于object这个对象中不存在c这个属性，所以第二个调用会报错
propName(object, 'a')
// propName(object, 'c')

