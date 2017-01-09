/**
 * Created by Administrator on 2017/1/9.
 */
/*ES6新增的let命令，用来生命变量。它的用法类似于var，但是所生命的变量，只在let命令所在的代码块内有效*/
{
    let a = 10;
    var  b = 1;
}
//console.log(a)    let定义的变量在函数块外部访问不到，这样执行起来是会报错的
console.log(b);

for (let i = 0; i<10; i++) {
    console.log(i)
}
//console.log(i);   let定义的变量在函数块外部访问不到，这样执行起来是会报错的

/*如果下面的代码使用var来声明变量，最后输出的是10*/
var a = [];
for (var i = 0; i<10; i++ ){
    a[i] = function () {
        console.log(i)
    }
}
a[6]();
/*如果使用let  那么输出的是自己想要的数*/
var a = [];
for (let i = 0; i<10; i++ ){
    a[i] = function () {
        console.log(i)
    }
}
a[6]();

/*不存在变量提升*/
console.log(foo);
var foo = 2; /*这个时候存在变量提升，会console出一个undefined*/

//console.log(bar);
let bar = 10;  /*这个时候就会报错*/

/*暂时性死区  =》只要块级作用域内存在let命令，它声明的变量就“绑定在”这个区域内，不再受到外部的影响*/
var tmp = 123;

if (true) {
    tmp = 'abc';
    //let tmp;    //在let声明变量只前对变量进行赋值会报错
}
/*ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

 总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。*/
if (true) {
    // TDZ开始
    //tmp = 'abc'; // ReferenceError
    //console.log(tmp); // ReferenceError

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}
/*上面代码中可以看出,在let命令声明tmp变量之前，都属于tmp变量的死区*/
/*暂时性死区  也就意味着typeof不再是一个百分之百安全的操作*/
/*
typeof x;
let x;*/
/*总之，作者这样设计的目的是为了让大家养成更好的编程习惯，变量一定要在声明之后使用，否则就会报错*/

/*有些死区比较隐蔽  不太容易被发现*/
function bar2(x = y, y = 2) {
    return [x, y]
}
//bar2();
/*错误显而易见，让x = y的时候，y并没有被赋值，so会报ReferenceError: y is not defined*/
function bar3(x = 2, y = x) {
    return [x, y]
}
console.log(bar3()); /*在将x赋值给y之前，x已经被赋值了，so  这样是不会报错的*/

/*总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到变量声明的那一行代码出现，才可以获取和使用该变量*/

/*不允许重复声明
* let不允许在相同的作用域内，重复声明同一个变量
*
* */
/*
function () {
    let a = 10;
    var a = 20;
}
都会报错
function () {
    let a = 10;
    let a = 20;
}*/

/*这样处理之后就不能在函数内部重新声明参数*/
function func(args) {
    //let args;
}
function func(args) {
    {
        let args;   //在这个括号里就不是一个作用域了
    }
}

/*块级作用域
* 为什么需要块级作用域
* ES5只有全局作用域和函数作用域，没有块级作用域，这样带来了很多不合理的场景。
* 第一种场景，内层变量可能会覆盖外层变量*/
 var tmp = new Date();
 function f(){
   console.log(tmp);
   if (false) {
       var tmp = 'hello, world';
   }
 }
 f();//undefined   原因是在于变量提升，导致内层的变量tmp覆盖了外层的变量tmp

/* 第二种场景，用来计数的循环变量泄露为全局变量*/

 var s = 'hello';
 for (var i = 0; i<s.length; i++){
   console.log(s[i])
 }
 console.log(i); // 5
 /*本来这个i变量是用来控制循环的，但是循环结束之后却并没有消失，泄露成了全局变量 */
//ES6允许块级作用域的任意嵌套   还有一个要注意的地方就是ES6的块级作用域允许声明函数的规则，只在使用大括号的情况下成立，如果没有大括号就会报错。


/*do表达式
* 本质上，块级作用域是一个语句，将多个操作封装在一起，没有返回值
*
* */
{
    let t = f();
    t = t * t + 1;
}
/*上面代码中，块级作用域将两个语句封装在一起。但是，在块级作用域以外，没有办法得到t的值，因为块级作用域不返回值，除非t是全局变量。*/
/*let x = do{
    let t = f();
    t = t * t + 1;
};*/   //目前编译器还不支持这个语句   还只是一个提案

/*顶层对象的属性*/
/*顶层对象，在浏览器环境下指的是window对象，在Node指的是global对象。ES5中，顶层对象的属性和全局变量是等价的*/
/*
window.a = 1;
console.log(a);


*/
/*ES6中
* var a = 1;
 // 如果在Node的REPL环境，可以写成global.a
 // 或者采用通用方法，写成this.a
 window.a // 1

 let b = 1;
 window.b // undefined
* */