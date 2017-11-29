# 搞怪的JavaScript数据类型

JavaScript中的五种基本数据类型：Number、String、Boolean、Null、Undefined。

## Number

### 1. 浮点数的问题

JavaScript中的浮点数并不像我们熟知的C，C++等语言，表现的那么明确，它中所有的数字都用Number来表示。它遵循二进制浮点数的算术标准（一个数字对应一个 64 位双精度二进制 IEEE754 值），但是确违背了基本的数学尝试。在代码中你会见到这样的现象

```js
0.1 + 0.2 === 0.3 //false
```

幸运的是，使用64位浮点数表示32位整数是精确的，所以我们可以近似理解为它的整数运算是精确的。

```js
1 + 2 === 3 //true
```

在使用过程中，特别是需要精确计算中一定要注意这个问题。

### 2. Number类型中存在几个特殊的值，一定要学会正确使用

#### NaN

NaN是一个特殊的数量值，它不表示一个数字，但是

```js
typeof NaN  //"number"
```

所以当使用typeof去判断一个变量是不是数字的时候可能会返回和你预期不一致的答案。
NaN可能会在试图将非数字形式的字符串转换为数字的时候产生。
如果NaN参与数学运算，任何运算数和它进行运算结果都是NaN。
NaN不等同于它自己，也就是说

```js
NaN == NaN   //false
NaN === NaN  //false
NaN != NaN   //true
NaN !== NaN  //true
```

JavaScript提供了专门的函数用来检测NaN的值

```js
isNaN(NaN) //true
```

#### Infinity

无穷大，当所表达的数值超出浮点数所能够表示的范围时，就用Infinity表示。负无穷大-Infinity。

### 3. Number类型的判断

a.  typeof 可以检测基本的数字，但是它认为NaN和正负Infinity也为数字。
b.  isFinite函数，它会筛除掉Nan和Infinity。但是，它会试图把运算数转换为一个数字，如果值不是一个数字，就不是一个有效的检测方式。
c.  自定义一个isNumber函数来解决这个问题

```js
var isNumber = function isNumber(value){
    return typeof(value) === 'number' && isFinite(value);
}
```

```js
//单元测试
console.assert(isNumber(NaN) === false);
console.assert(isNumber(Infinity) === false);
console.assert(isNumber('abc') === false);
console.assert(isNumber(undefined) === false);
```

### 4. parseInt的正确使用

parseInt 将字符串转换为数字(整数)的函数，它首先会检测第一个位置，如果该位置不是有效数字，直接返回NaN,否则接着向后查看，知道遇到非数字字符为止。

```js
parseInt("123abc") //123
parseInt("1.73")   //1
parseInt(".2")     //NaN
```

如果字符串第一个字符为0，该字符串将基于八进制求值，0X将基于十六进制求值。
下面这个错误就会在不注意的时候产生:

```js
parseInt("08") //0
parseInt("09") //0
```

所以在使用时，特别是解析日期和时间时要特殊注意。
当然，parseInt可以接受一个基数作为参数，这样就解决了这个问题

```js
parseInt("08",10)  //8
```

除了paraseInt ,别忘了还有parseFloat函数，如果你所需要的数字不是一个整数，用这个的精确度更高哦。

### 5. 特殊的数值常量

- Number.POSITIVE_INFINITY  //无穷大
- Number.NEGATIVE_INFINITY  //负无穷大
- Number.MAX_VALUE          //最大值
- Number.MIN_VALUE          //最小值

## String

### 1. 字符表示

在过去的JavaScript中，没有char这样的字符数据类型，表示单个字符也只能使用长度为1的字符串来表示。
不过，现代浏览器存在Uint8Array等这些类型，可以当做char类型来使用。

### 2. 字符串基本操作

字符串是非值操作，在操作字符串时，对于赋值和传递操作，只是对其引用进行操作，对其本身并没有影响，你会发现即使对于很长的字符串，这样的操作都会非常快；而修改操作则是对其副本进行修改，并存储到新的位置，把修改的字符串重新赋值给原来的变量是建立新的引用，原来的字符串在没有其他变量引用时会被回收。

### 3. 字符串的连接操作

安装上面2的说法，+、+=进行字符串连接运算在字符串很长的时候会非常慢。好消息是新版本的浏览器在这个方面做了很好的优化，使其复杂度保持在log(n)左右。
但是对于IE浏览器，特别是IE7及更早的浏览器，这种连接会很糟糕。这个时候使用join方法会有所改善。
而contact方法除了在Opear浏览器，别的浏览器上都相对慢一些甚至很多，不推荐使用。

## Boolean

### 1. 类型转换

- boolean => 其他
   在数值环境中 true => 1    false=> 0
   在字符串环境中 true => "true"  false => "false"
- 其他 => boolean
   0或NaN  => false   其他数值 => true
   "" => false        非空字符串 => true
   空值(null)或者未定义的值(undefined) => false  非空对象(!null)、数组(包括空数组)、函数（包括空函数） => true  换言之：除null以外的对象类型转换都为true

## Null和Undefined

### 1. Null类型只有一个值null，Undefined类型也只有一个值undefined。

null表示为空或者不存在的对象引用。当定义了一个变量但没有给它赋值，它的值就是undefined。
### 2 .typeof的坑

```js
typeof null //'object'
typeof undefined //'undefined'
```

### 3. null 和 undefined 比较

```js
null == undefined //true
null === undefined //false
```

### 4. null的类型判断

```js
function type(o){
    return (o === null) ? "null" : (typeof o);
}
```

基本类型就这么多了，接下来说说复杂的类型吧

## 函数

### 1. 类型判断

```js
var fun = function(){}
typeod fun // "function"
fun.constructor //function
```

### 2. 不要使用Function构造函数

使用Function构造函数创建的函数有顶级作用域，可能会对代码的理解增加难度。
Function构造函数是使用表达式来创建的，很容易出现语法错误。
当然它也有一定的灵活性，但是考虑到正确性和易维护性，建议不要使用。

### 3. call和apply

call和apply方法的作用：临时把一个函数转换为方法传递给某个对象。
区别是：call可以同时传递多个值，apply则以数组的方式接受参数。

### 4. 闭包

闭包是JavaScript的一个难点，简单的理解为函数内部定义另一个函数变量，内部函数可以访问外部函数的属性值。
在函数调用完毕之后，闭包结构依然保存在系统中，不会被销毁。
闭包的核心是可以访问当其他函数变量的函数，实现方式一般为函数内部创建另外一个函数。

### 5. 执行上下文和this

JavaScript代码都是在某个执行上下文中运行的，在当前执行上下文中调用一个函数就会进入新的执行上下文，这个函数执行结束后就会返回上一层执行上下文。
this是代码运行时基于函数的运行环境，也就是执行上下文绑定的。在全局函数中，this就是window。
特别注意，如果一个函数不是作为某一个对象的属性去调用时，this的值是全局对象。

## 数组

### 1. 如何检测一个变量时数组类型

```js
var a = [1,2,3];
typeof a  //"object"
```

所以用typeof是不能检测一个数组的

```js
var isArray = function(value){
    return value && typeof value === "object" && value.constructor === Array;
}
```

这个函数可以简单的检测一个变量是否为数组。
但是如果要判断真正的数组，这个函数可能会有点麻烦。

```js
var a = [1,'a',2,'b'];
isArray(a) //true
```

这时候需要进一步的判断

```js
var isArray = function(value){
    return value &&
    typeof value === "object" &&
    value.constructor === Array &&
    typeof value.length === 'number' &&
    typeof value.splice === 'function'
    && !(value.propetyIsEnumerable('length'));
}
```

是不是有点复杂，这才是真正的数组判断，要同时满足这么多...条件。
当然有一个简单的办法咯

```js
var isArray = function(value){
    return Object.prototype.toString.apply(value) === '[object Array]';
}
```

### 2. 使用splice删除数组

删除数据的方式：
a. 直接改变数据的length属性，有点暴力，只能删除尾部元素。
b. delete，被删除元素原来的位置变为了undefined，需要通过移动元素。
c. splice，两个参数，第一个参数是删除开始的下标数，第二个是要删除的个数，删除之后后面的元素会自动向前覆盖掉已经删除的元素。
综合考虑三种方式，使用splice效率更高。

## 对象

### 1. 原型与原型链

每一个函数都有一个原型（prototype）属性，这个属性是一个指针，指向一个对象，这个对象中包含由该函数生成的所有实例共享的属性和方法。这样可以避免在每次创建对象时都重新定义一遍内部的属性和方法。
原型链是JavaScript实现继承的主要方法，思路是利用原型让一个引用类型继承另一个引用类型的属性和方法。在访问一个类的实例的属性时，如果该类不存在该属性，它会沿着原型链一直向上寻找，直到找到这个属性或者找到Object类。

### 2. 使用new创建的数据类型

```js
var n = new Number();
var s = new String();
var f = new Function();
var a = new Array();
var o = new Object();
console.assert(typeof n === 'object');
console.assert(toString.call(n)  === "[object Number]");
console.assert(typeof s === 'object');
console.assert(toString.call(s)  === "[object String]");
console.assert(typeof f === 'function');
console.assert(toString.call(f)  === "[object Function]");
console.assert(typeof a === 'object');
console.assert(toString.call(a)  === "[object Array]");
console.assert(typeof o === 'object');
console.assert(toString.call(o)  === "[object Object]");
```
