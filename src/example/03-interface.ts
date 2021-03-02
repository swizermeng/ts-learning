// 使用接口 interface 可以清晰直观的控制参数的类型已经设定可选参数

// 可以利用类型断言来绕过多余属性检查

interface NameInfo {
    readonly firstName: string, // 这个属性是只读不可写属性
    middleName ?: string,
    lastName: string,
    [prop:string]: any // 这种方法也可以绕过多余属性检查
}

const getFullName = ({firstName, middleName,lastName}: NameInfo): string => {
    return `${firstName}${middleName ? "-" + middleName : ''}-${lastName}`
}
// console.log(getFullName({firstName: 'yang', middleName: 'da', lastName: 'meng',nickName: 'hhh'} as NameInfo))

const FullName = {firstName: 'yang', middleName: 'da', lastName: 'meng',nickName: 'hhh'}
console.log(getFullName(FullName)) // 利用类型兼容性来绕过多余属性检查

// 定义函数参数类型
interface addFunc {
    (num1: number, num2: number): number
}
// 也可以写成类型别名的形式
// type addFunc = (num1: number, num2: number) => number
const add: addFunc = (n1, n2) => n1 + n2
console.log(add(1,3))

// 索引类型
interface RoleDic {
    [id: string]: string
}
const role: RoleDic = {
    'a': 'man',
     1: 'women' // 数字类型会隐式转换成字符串类型 
}

// 接口继承

interface Vegetables {
    color: string
}
interface Tomato extends Vegetables {
    radius: number
}
interface Carrot extends Vegetables {
    length: number
}

// 混合类型接口

interface Counter {
    (): void,
    count: number
}

const getCount = (): Counter => {
    const c = () => {
        c.count++
    }
    c.count = 0
    return c
}
const counter: Counter = getCount()
counter()
console.log(counter.count)
counter()
console.log(counter.count)
counter()
console.log(counter.count)
counter()
console.log(counter.count)
