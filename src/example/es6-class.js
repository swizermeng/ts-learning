// 私有属性
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
Point.z = 2 // z就作为私有属性
const p = new Point(1,3)
console.log(p.x)
// p.z访问不到，会返回undefined
console.log(Point.z)

// 私有方法
// 通过Symbol值的唯一性，在模块化的过程中，静态方法名不暴露给外界，实现私有方法
import PointPrivate from './privateFunc'
const point = new PointPrivate()
console.log(point)


// 类的静态方法，实例是不能继承的
class Parent {
    // z = 'a'
    constructor() {
        this.name = 'Parent';
        this.type = '1'
    }
    getName() {
        console.log(this.name)
        return this.name
    }
    static getType () {
        return this.type
    }
}
Parent.getType = () => {
    return 'is Parent'
}

class Child extends Parent {
    constructor() {
        // 子类继承父类必须在构造函数中使用super()才能够使用this
        super() // super 作为函数使用
        // this.name = 'child'
        console.log('constructor:' + super.getName())
    }
    childGetName() {
        super.getName()  //super作为对象使用    
    }
    getParentName() {
        console.log('getParentName:' + super.getName()) // 在普通方法中指向父类的原型对象
    }
    static getParentType() {
        console.log('getParentType:' + super.getType()) //在静态方法中指向父类
    }
}
const c = new Child()
console.log(c.childGetName())
console.log(c.getParentName())
console.log(Child.getParentType())
console.log(Child.__proto__ ===  Parent)    // 子类的__proto__指向父类本身
console.log(Child.prototype.__proto__ === Parent.prototype) // 子类的protoType属性的__proto__指向父类的protoType属性
console.log(c.__proto__.__proto__ === new Parent().__proto__)   // 实例的__proto__属性的__proto__指向父类实例的__proto__