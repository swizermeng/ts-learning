const getIndex = () => {
    return 2
}
// 可以给定初始值，不必按照顺序，可以任意赋值。没有初始值的话从0递增
// 使用计算值或者常量的属性的下一个属性必须给定初始值 
enum Status {
    Success =3,
    Fail = getIndex(),
    Complete = 5
}
console.log(Status.Success)
console.log(Status.Fail)
console.log(Status.Complete)
console.log(Status[2])

// 字符串枚举
enum Message {
    Error = 'sorry, error',
    Success = 'haha, successed'
}
console.log(Message.Error)
console.log(Message.Success)

// 易构枚举
enum Result {
    Failed = 0,
    Success = 'successed'
}

// 枚举成员类型
// 满足以下条件
// 1、 enum E {} // 没有值
// 2、 enum E { A = 'a'} // 值为字面量
// 3、 enum E { A = -1 } // 值为数值字面量
enum Animals {
    Dog = 1,
    Cat = 2
}
interface Dog {
    type: Animals.Dog
}
const dog: Dog = {
    type: Animals.Dog
}

// 联合枚举类型
enum Status {
    Off,
    On
}
interface Light {
    status: Status
}
const light: Light = {
    status: Status.On
}
// const enum 不会被编译成对象
const enum Role {
    type = 1 
}