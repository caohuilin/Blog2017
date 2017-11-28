前几天做了阿里实习生的前端笔试题，和大家分享 一下。

## 1.单项选择题

下列哪个函数可以合并相邻文字结点？</br>
A normalize();</br>
B merge();</br>
C mix();</br>
D combine();</br>
E append();</br>
F replace();</br>

### 解析：

- normalize()，这个方法唯一的作用就是处理文档树中的文本结点。当在某个节点上调用这个方法时，它就会
   在该结点的后代结点中查找，如果遇到空文本结点，直接删除；如果找到相邻的文本结点，将它们合并为一个文    本结点。
- merge()，这个方法JavaScript里没有，在原生JavaScript中合并两个数组使用concat()方法。Jquery中可以
   通过这个方法合并和两个数组。
这个题选A

## 2.单项选择题

下面这个div容器在文档流中实际占据的高度是多少？

```html
<style type='text/css'>
.box1{
    width:180px;
    height:180px;
    padding:5px 10px;
    border:5px 15px;
    box-sizing:border-box;
}
</style>
<div class="box1"></div>
```

A 宽180px 高180px </br>
B 宽230px 高200px </br>
C 宽200px 高190px </br>
D 宽190px 高210px </br>
E 宽190px 高230px </br>

### 解析

首先说明一个问题 这里的border属性写错了，大概是出题的程序猿哥哥太着急了吧。</br>
这个题目的考点是box-sizing属性。</br>
对于盒子模型来说，W3C标准盒子模型内边距和边框都会影响容器的大小。而设置元素box-sizing: border-box时，此元素的内边距和边框不再会增加它的宽度。</br>
所以实际占据的高度仍为180px，180px，选A

## 3.单项选择题

可以获取当前元素([HTML Element el])临近兄弟非文本元素的方法是：</br>
A el.siblings</br>
B el.getElementsByTagName("div")</br>
C el.nextSibling</br>
D el.nextElement</br>
E el.parentNode.children</br>

### 解析

- siblings() 是jquery方法，找到引用该方法元素的***所有***匹配对应选择器的兄弟元素。</br>
- getElementsByTagName(),该方法返回带有指定标签名的对象的集合。</br>
- nextSibling(),该方法返回某个元素之后紧跟的兄弟元素。</br>
- nextElement(),该方法不存在。</br>
- el.parentNode.children(),parentNode是指向它的父节点，children方法时找到所有对应的直接子结点，包括el本身。</br>

综上所述，应该选择C

## 4. 不定项选择题

以下哪些属于http请求的返回头（排除自定义http header因素）</br>
A Content-Type</br>
B Cookie</br>
C Host</br>
D Expires</br>
E Last-Modified</br>
F User-Agent</br>

### 解析

详情参考 HTTP Header 详解 http://kb.cnblogs.com/page/92320/ </br>
选择ADE

## 5.不定项选择题

以下哪些方法够选择到id值为foo的元素：</br>
A document.getElementById("foo")</br>
B document.querySelector("#foo")</br>
C document.querySelectorAll("#foo")[0]</br>
D this.foo</br>
E document.foo</br>
F foo</br>

### 解析

这个题目前三种大家应该都知道，平时也就是这样使用的。D重点应该是HTML中的id和全局的window之间的关系，可以这样理解，我们在HTML中书写的标签实际上是通过id的值这个变量挂在全局变量上的，当this值为window时，成立。document是window的另外一个变量属性，它和foo没有直接关系。F是为了兼容以前的浏览器而存在的。
所以，应该选A、B、C、D、F

## 6.不定项选择题

以下针对npm命令和包管理策略描述正确的是：</br>
A npm install babel@^6.5命令可以安装最新版的6.5.X版本的babel</br>
B npm install babel@>=5.6命令可以安装最新5.x.x版本的babel</br>
C npm publish 命令可以覆盖之前发布过的版本</br>
D 安装完A包后再安装B包，如果B包依赖A包，则A包不会多次安装</br>
E require("babel")时，优先查找当前目录下是否有babel这个包</br>
F npm run build 命令可以运行当前目录下的build.sh</br>

### 解析

A选项参考  <a>https://docs.npmjs.com/misc/semver</a> ^应该是安装6.x.y版本,x大于等于5</br>
B选项中的>=不存在</br>
C npm publish 不能覆盖之前的版本，只能发布一个新的版本</br>
D 在新版的npm中如果版本号一致是对的，在旧版的npm中不管什么条件都要重新安装</br>
E require是优先在当前目录下查找，是对的</br>
F npm run是运行当前目录下的package.json下的scripts下的内容</br>
综合，应该是选E或者DE

## 7.填空

请在空白处填写代码，要求输出step1()中的1：

```js
function* step1(){
    yield 1;
}
function *step2(){
    yield step1();
}
console.log(step2()__________________________);
```

### 解析

这个题目考察的是yield语句，遇到yeild语句会暂停后面的操作，并将紧跟着yeild后面的那个表达式的值返回，next方法时继续执行，直到 遇到下一个yeild。所以这里应该是:

```js
step2().next().value.next().value;
```

## 8.填空

请完成一下填空，使得id为loading的div每1秒转1圈并无限循环：

```html
<html>
    <head>
        <style>
        #loading{
            width:100px;
            height:100px;
            position:absolute;
            animation:circling _____ linear 0s ______;
        }
        @______ circling{
            from {
                transform:_____________;
            }
            to{
                transform:_____________;
            }
        }
        </style>
    </head>
    <body>
        <div id="loading"></div>
    </body>
</html>
```

### 解析

这个题目重点考察animation动画的实现。</br>
自定义动画的实现

```css
@keyframes 动画名{
    from{
        初始状态
    }
    to{
        结束状态
    }
}
```

transform属性的使用</br>
这里是旋转一周，从0度到359度，所以初始状态应该是0度，结束状态应该是359度，即：

```css
from{
    transform:rotate(0deg);
}
to{
    transform:rotate(359deg);
}
```

animation属性</br>
animation：动画名 持续时间 速度 延时 重复次数</br>
这里应该为：

```css
animation:circling 1s linear 0s infinite;
```

## 9.问答题

请实现add函数，是的add(100)(200)(300)(400) == 1000

### 解析

这个题目考察函数，在JavaScript中函数也是一个值，它是可以通过return返回的，具体实现如下：

```js
var add = function(a){
    return function(b){
        return function(c){
            return function(d){
                return a+b+c+d;
            }
        }
    }
}
```

## 10.问答题

请用JavaScript实现一个输入框，可以根据用户的输入来实时向服务器请求，并给出搜索结果；</br>
给出完整的HTML结构和JavaScript代码，css可不做要求</br>
需要考虑性能优化</br>
尽量使用原生JavaScript</br>

### 解析

这个题目是对整体原生js的考察，有一定难度,这里是我的简单实现，仅作参考

```html
<input id="search"></input>
<div id="ans"></div>
<script type="text/javascript">
function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result;
  var later = function() {
    var last = new Date().getTime() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };
  return function() {
    context = this;
    args = arguments;
    timestamp = new Date().getTime();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
};
var debug = console.log.bind(console);
var $search = document.getElementById('search');
var $ans = document.getElementById('ans');
var getSearchResult = function(keyword){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      var data = ['11', '12', '22'].filter(function(value){
        return value.indexOf(keyword)>-1;
      });
      resolve(data);
    }, 1000)
})};
function searchIt(value){
  getSearchResult(value).then(function(data){
    var ul = document.createElement('ul');
    data.map(function(value){
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(value));
      ul.appendChild(li);
    })
    ans.innerHTML='';
    ans.appendChild(ul)
  })
}
$search.addEventListener('input', debounce(function(event){searchIt(event.target.value)}, 1000));
searchIt('');
</script>
```

分享快乐
