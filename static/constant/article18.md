# 探索 lodash 的一个安全漏洞

近期打算准备重构我17年写的博客项目，打开项目看到了下图的一条安全漏洞的提示。

![lodash-1](../../static/lodash-1.png)
![lodash-2](../../static/lodash-2.png)

使用 lodash 这么多年，居然有高危漏洞，好奇心驱使我继续探索。

## 探索过程

### What

在项目下执行：

```
- npm audit
```
![lodash-3](../../static/lodash-3.png)

图中网站地址： https://www.npmjs.com/advisories/577![lodash-4]


![lodash-4](../../static/lodash-4.png)

图中 HackerOneReport 地址：https://hackerone.com/reports/310443

原来是原型污染。npm 网站上已经描述的很清楚了，是  'defaultsDeep'、'merge'、 'mergeWith' 三个函数在使用中可能会造成原型污染。

### Why

尝试一把：

![lodash-5](../../static/lodash-5.png)
![lodash-6](../../static/lodash-6.png)

使用 ES6 assign 实现:

![lodash-7](../../static/lodash-7.png)

果然是有问题的。

### How

相关补丁 commit： https://github.com/lodash/lodash/commit/d8e069cc3410082e44eb18fcf8e7f3d08ebe1d4a

核心代码：

![lodash-8](../../static/lodash-8.png)

结论： 实现了一个 safeGet 的函数来避免获取原型上的值。

## 相关知识点

- npm audit https://docs.npmjs.com/cli/audit

- __proto__ vs prototype: https://github.com/creeperyang/blog/issues/9

## 最佳实践

- 尽量避免使用 for...in... 遍历对象

- 遍历对象时先使用 Object.keys() 获取对象的所有 key，再进行遍历

- 不要直接将一个未知变量作为对象的 key 使用

- 在读取一个对象未知属性时，一定要使用 hasOwnProperty 判断之后再去读取
