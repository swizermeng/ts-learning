// 用TS定义一个简单的类
// 属性和方法都需要给定修饰符

//public 公共修饰符
//static 修饰符修饰的属性或者方法，实例是无法访问和继承的。该属性或方法只能通过类本身调用。

class Point {
    public x: number
    public y: number
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y
    }
    public getPosition(x,y) {
        return `(${this.x},${this.y})`
    }
}
const point = new Point(1,2)
console.log(point)
// 类的继承
class Parent {
    public name: string 
    constructor(name: string) {
        this.name = name
    }
}
class Child extends Parent {
    constructor(name: string) {
        super(name)
    }
}

// private 私有修饰符
class Fruits {
    private color: string
    constructor(color: string) {
        this.color = color
    }
}
const fruit = new Fruits('red')
//console.log(fruit.color) // 无法访问 属性“color”为私有属性，只能在类“Fruits”中访问。
//console.log(Fruits.color) //类型“typeof Fruits”上不存在属性“color”。 
class Apple extends Fruits {
    constructor(color: string) {
        super(color)
        //console.log(super.color) //无法继承  通过 "super" 关键字只能访问基类的公共方法和受保护方法。
    }
}

// protected 受保护修饰符
// 子类可以访问protected修饰的方法，但不可以访问属性
// 可以修饰constructor，constructor被修饰后，这个类不能再创造实例，只能被子类继承 

// readonly 只读修饰符 修饰属性后  该属性只读不可写
class UserInfo {
    public readonly name: string;
    constructor(name: string) {
        this.name = name
    }
}  
const userinfo = new UserInfo('yangmeng')
console.log(userinfo)
//userinfo.name = 'swizer' //无法分配到 "name" ，因为它是只读属性。

//参数属性   在参数前加上修饰符  可以规定参数类型并将属性放到实例上
class A {
    constructor(public name: string) {}
}
const a1 = new A('swizer')
console.log(a1)

//可选属性
// 存取器
class Info {
    public name: string
    public age ?: Number
    private _infoStr:string
    constructor(name: string, age ?: number, public sex ?: string) {
        this.name = name
        this.age = age
    }
    get infoStr() {
        return this._infoStr
    }
    set infoStr(val) {
        console.log(`setter: ${val}`)
        this._infoStr = val
    }
}
const info1 = new Info('yangmeng', 20, 'man')
console.log(info1)
info1.infoStr = 'yangmeng: 30'
console.log(info1.infoStr)

// 抽象类  abstract  可以定义类中的属性、方法和存取器
// 无法创建实例，只能继承
abstract class People {
    constructor(public name: string) {}
    public abstract printName() :void
}
//const p1 = new People() //无法创建抽象类的实例。
class Man extends People {
    constructor(name: string) {
        super(name)
        this.name = name
    }
    // 非抽象类“Man”不会实现继承自“People”类的抽象成员“printName”
    public printName() {
        console.log(this.name)
    }
}
const m1 = new Man('yangmeng')
console.log(m1)
m1.printName()

// 类类型接口
interface FolldInterface {
    type: string
    name: string
}
class FoodClass implements FolldInterface {
    constructor(public type: string, public name: string) {

    }
}
class B {
    protected name: string
}
interface I extends B {}
class D extends B implements I {
    public name: string
    constructor(name: string) {
        super()
        this.name = name
    }
}
const  d = new D('a')
console.log(d.name)

// 泛型
const create = <T>(c: new() => T) :T => {
    return new c()
}
class Color {
    public name: string
    constructor() {
        this.name = 'red'
    }
}
console.log(create<Color>(Color).name)
