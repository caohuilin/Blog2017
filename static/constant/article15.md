# 非文本元素的展开与收起

我们经常解决文本元素超出文本框时省略调超出元素的方式，你想过非文本元素如何处理超出部分进行省略吗？

我今天就拿一个展开与收起的例子来和大家分享怎么实现非文本元素如何省略超出部分以及实现其展开和收起的效果。

## 案例描述：

- 一个 div 中需要展示一大段文字内容，要求默认给用户展示四行，多出部分显示省略号。
- 段落下方添加展开或收起按钮，用户可通过按钮来决定多出内容是否展开和收起。
- 当文字内容小于四行时，按钮隐藏。

## 具体实现

### One

在介绍方法之前，先给大家介绍一个 css 属性，-webkit-line-clamp。

-webkit-line-clamp 可以限制文本内容的行数，超出的部分自动显示省略号，是不是很好用啊。

需要注意的是，-webkit-line-clamp 的使用必须和下面两个属性一起使用：

- display: -webkit-box // 必须满足弹性和模型
- -webkit-box-orient: vertical | horizontal // 必须设置或检索弹性盒模型的子元素的排列方式

这样第一个需求就解决了：

```css
 overflow: hidden;
 display: -webkit-box;
 -webkit-box-orient: vertical;
 -swebkit-line-clamp: 4;
```

### Two

添加展开收起按钮，需要定义一个 state 来记录当前文本所处的状态，这个自不必说，按钮上的文字内容以及按钮点击执行的操作也通过当前文本所处的状态决定。通过状态给 div 添加对应的样式，即可实现展开和收起的效果。

```js
this.state = {
    showDetail: false
}

setShowDetail = () => {
    this.setState({showDetail: !this.state.showDetail})
}
```

```html
<div style={{WebkitLineClamp: this.state.showDetail ? "inherit" : "4"}} />}
```

### Three

当文字内容过少时，收起展开的按钮就没有实质性的作用了，当然也没有必要展示给用户，所以需要根据文本的内容来决定按钮要不要显示给用户。

首先需要拿到真实文本内容的高度，判断是否大于 4 行的高度， 从而来决定展开收起按钮是否显示。

```html
<div ref={dom => this.dom = dom} style={{WebkitLineClamp: this.state.showDetailButton ? (this.state.showDetail ? 'inhert': '4') : 'inhert'}}>
```

```js
componentDidMount() {
 const height = this.dom.clientHeight
 this.setShowDetailButton(height> {lineHeight} * 4)
}
```

这里有两个要注意的地方：

- 初始一定要让文本都显示出来，不然那不多文本的真实高度，会造成判断有误，
- 只有等到 dom 渲染完之后，文本的 dom 才能被取到。

写到这里，需求就差不多实现了，但是代码运行起来会出现跳动现象。文本内容先全部显示，然后再跳动到只显示四行，这样给用户的体验不是太好。

怎么解决这个跳动的问题呢？

模拟展示

模拟展示就是写一个和原来的 div 一模一样的元素，渲染全部内容，用于判断文本内容的高度，当然，这个元素应该隐藏，并且不能影响当前页面的布局。

建一个 mock 的 div，将获取 dom 的方法定义在这个元素上，然后给这个元素加上隐藏的样式。

```css
.mock {
 position: absolute;
 visibility: hidden;
}
```

真正显示的 div 的样式判断就不需要根据是否展示 button 来决定了，回到之前的写法即可。

这样就大功告成了！

该样例源码：https://github.com/caohuilin/non-text-element-expands-and-closes_example