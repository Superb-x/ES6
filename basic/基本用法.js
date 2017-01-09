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
