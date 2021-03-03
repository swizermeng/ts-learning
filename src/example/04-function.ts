 // 类型别名定义函数类型
 // 可选参数需要放在必选参数后面
 type AddFunc = (arg1: number, arg2: number, arg3?: number) => number;
 
//  const handleData = (arg1: number, ...args: number[]) => {
//     //  ... 
//  }
 

 // 函数重载
//  *************
 function handleData(x: string): string[]
 function handleData(x: number): number[]
// 这部分是函数重载
// 只能使用function来定义函数重载，不能使用类型别名 
//  *************

 function handleData(x: any): any {
     if(typeof x == 'string') {
         return x.split('')
     } else {
         return x.toString().split('').map(item => Number(item))
     }
 }
 console.log(handleData('abc'))
 console.log(handleData(123))