// this 类型
// this是一种类型,函数返回this,可以使函数可以进行链式调用
class Counters {
    constructor(public count: number = 0) { }
    public add(val: number) {
        this.count += val
        return this
    }
    public subtract(val: number) {
        this.count -= val
        return this
    }
}
class PowCounter extends Counters {
    constructor(public count: number = 0) { super() }
    public pow(val: number) {
        this.count = this.count ** val
        return this
    }
}
let pow = new PowCounter(2)
console.log(pow.pow(2).add(3).subtract(2).pow(3))

// 索引类型
// 查询操作符  keyof
interface keyofTest {
    name: string;
    age: number;
}
let keyoftest: keyof keyofTest  // 使用keyof操作符之后,类型相当于接口中属性名组成的字面量联合类型,即 'name' | 'age'
// keyoftest = 'name' //ok
// keyoftest = 'age' //ok
// keyoftest = 'sex' //error

function getValue<T, K extends keyof T>(obj: T, names: K[]): Array<T[K]> {
    return names.map(item => obj[item])
}
const testObj = {
    name: 'yangmeng',
    age: 30
}
let testVal: Array<string | number> = getValue(testObj, ['name', 'age'])
console.log(testVal)

// 索引访问操作符 => []
type nameType = keyofTest['name']  //string类型
function getProperty<T, K extends keyof T>(o: T, names: K): T[K] {
    return o[names]
}
interface objs<T> {
    [key: string]: T
}
const objs1: objs<number> = {
    age: 19
}
let keys: objs<number>['hhh'] // number 类型

interface Type {
    a: never
    b: never
    c: string
    d: number
    e: undefined
    f: null
    g: object
}
type test = Type[keyof Type] //test = string | number | object

// 映射类型
// Readonly  Partial Pick Record 在TS中内置了，可以直接用
interface info1 {
    name: string,
    age: number,
    sex: string
}
type ReadonlyTypes<T> = {
    +readonly [P in keyof T]?: T[P]
}
type RemoveReadonly<T> = {
    -readonly [P in keyof T]-?: T[P]
}
// type ReadonlyInfo = Readonly<info1>
// type ReadonlyInfo = Partial<info1>
type ReadonlyInfo = ReadonlyTypes<info1>
type infoWithoutReadonly = RemoveReadonly<info1>
let info11: ReadonlyInfo = {
    name: 'yangmeng',
    age: 20,
    sex: 'man'
}
// info11.name = 'ss' // 只读

type Proxy<T> = {
    get(): T,
    set(value: T): void
}
type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>
}
function proxify<T>(obj: T): Proxify<T> {
    let result = {} as Proxify<T>
    for( const key in obj) {
        result[key] = {
            get: () => obj[key],
            set: (val) => obj[key] = val
        }
    }
    return result
}
const proxyObj = {
    name: 'yangmeng',
    age: 20
}
let proxyProp = proxify(proxyObj)
console.log(proxyProp)
proxyProp.name.set('swizer')
console.log(proxyProp.name.get())

function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T
    for(const key in t) {
        result[key] = t[key].get()
    }
    return result
}
let unproxifyProp = unproxify(proxyProp)
console.log(unproxifyProp)

// 元组和数组上的映射类型
type MapToPromise<T> = {
    [P in keyof T]: Promise<T[P]>
} 
type Tuple = [number , string, boolean]
type PromiseTuple = MapToPromise<Tuple>
let tuple1: PromiseTuple = [
    new Promise((res, rej) => res(1)),
    new Promise((res, rej) => res('a')),
    new Promise((res,rej) => res(false)) 
]

// unknown
// 1、任何类型都可以赋值给unknown类型
let value1: unknown
value1 = 'a'
value1 = 22

// 2、如果没有类型断言或基于控制流的类型细化时，unknown不可以赋值给其他类型，此时他只能赋值给unknown类型
let value2: unknown
// let value3: string = value2 //不能将类型“unknown”分配给类型“string”

// 3、如果没有类型断言或基于控制流的类型细化时，不能在他上面进行任何操作
let value4: unknown
// value4 += 1 //运算符“+=”不能应用于类型“unknown”和“1”

// 4、unknown与任何其他类型组成的交叉类型，都等于其他类型
type type1 = string & unknown
type type2 = number & unknown
type type3 = unknown & unknown
type type4 = unknown & string[]

// 5、unknown与任何其他类型（除了any）组成的联合类型都等于unknown类型
type type5 = unknown | string
type type6 = unknown | any

// 6、never类型是unknown的子类型
type type8 = never extends unknown ? true : false // true

// 7、keyof unknown 等于类型never
type type9 = keyof unknown

// 8、只能对unknown进行等或不等操作，不能进行其他操作
value1 === value2
value1 !== value2
// value1 += value2 //运算符“+=”不能应用于类型“unknown”和“unknown”

// 9、unknown类型的值不能访问他的属性，也不能作为函数调用和作为类创建实例
let value10:unknown
// value10.age //类型“unknown”上不存在属性“age”
// value10() //此表达式不可调用

// 10、使用映射类型时如果便利的是unknown类型，则不会映射任何属性
type Types1<T> = {
    [P in keyof T]: number
}
type type11 = Types1<any>
type type12 = Types1<unknown>

// 分布式条件类型
type Types2<T> = T extends string ? string : number
let index: Types2<false>

type Diff<T, U> = T extends U ? never : T
type Test2 = Diff<string| number | boolean, undefined | number>

// ************
type Type7<T> = {
    [P in keyof T]: T[P] extends Function ? P : never
}[keyof T]  // [keyof T] 获取所有属性中类型不为never的属性名
interface Part {
    id: number,
    name: string,
    subparts: Part[],
    updatePart(newName:string): void
}
type Test1 = Type7<Part>

// infer
type Type8<T> = T extends Array<infer U> ? U : T
type test3 = Type8<string[]>
type test4 = Type8<number>


// TS预定条件类型
// Exclude<T, U>
type Type9 = Exclude<'a' | 'b', 'a'> //'b'

// Extract<T, U>
type Type10 = Extract<'a' | 'b', 'b'> //'b'

// NonNullable<T>
type Type11 = NonNullable<string | number | null | undefined> // string | number

//ReturnType<T>
type Type12 = ReturnType<() => string> //string

//InstanceType<T>
class AClass {
    constructor() {}
}

type Type13 = InstanceType<typeof AClass>
type Type14 = InstanceType<any>
type Type15 = InstanceType<never>
