const func = Symbol('function');
export default class Point {
    // constructor(x, y) {
    //     this.x = x;
    //     this.y = y;
    // }
    static [func]() {
        console.log('this is a private function')
    }
}