# BFC的秘密

听到BFC这个名字，你可能觉得陌生，但是作为天天写前端布局的程序猿来说，其实你无意中已经用了无数次了。今天我给大家介绍介绍，BFC到底是个什么玩意。

## BFC的概念

BFC，块格式化上下文（Block Formatting Context）。

格式化上下文是CSS2.1规范中的一个概念，它是指元素所处的环境和初始化，它决定了其子元素将如何定位以及和其他元素的关系及相互作用。

格式化上下文分为块格式化上下文和行内格式化上下文。我们今天要讲的就是块格式化上下文。

## BFC的特点

- 在一个块格式化上下文中，块框会朝着垂直方向一个接一个的排列，从包含块的顶部开始，如果两个及以上的框在同一个块格式化上下文中，它们相邻垂直方向的margin会合并成一个。
- 在一个块格式化上下文中，盒子从包含块的最左边摆放，即使存在浮动也还是靠在最左边。如果该元素建立了一个新的块格式化上下文，那么该盒子自身的宽度会因为浮动而变窄，变窄的宽度正好是浮动元素的宽度。
- 在一个块格式化上下文中，包含块里面的所有元素，但不包含创建新块格式化上下文元素。
- 当一个框创建了一个块格式化上下文时，它将包括浮动元素。

## 创建BFC的方式

- 根元素。
- float不为none的元素。
- position为absolute和fixed的元素。
- display不为block的元素。
- 表格单元格display为table-cell的元素。
- 表格标题display为table-caption的元素。
- overflow不为visible的元素。
- display为flex、inline-flex的元素。

## 外边距的折叠(BFC现象)

知道了BFC的特点和创建的方式，我们来讲讲CSS中神奇的外边距折叠问题。

- 根元素html的外边距不折叠。

<iframe
  style="width: 100%; height: 300px"
  src="https://jsfiddle.net/dhmuq6mn/embedded/css,html,result">
</iframe>

- 不用必须是兄弟元素，子元素和父元素垂直方向的外边距也会折叠。

<iframe
  style="width: 100%; height: 300px"
  src="https://jsfiddle.net/mbptsd11/embedded/css,html,result">
</iframe>

- 水平外边距不会合并。

- 当有多个子元素时，只有第一个元素的margin-top及最后一个元素的margin-bottom会和父元素外边距折叠。

<iframe
  style="width: 100%; height: 300px"
  src="https://jsfiddle.net/ctbvLheg/embedded/css,html,result">
</iframe>

- 如果子元素同时是另外一个元素的父元素，同样会出现外边距折叠的情况。
- 相邻边距中若有一个为负值，则结果为折叠边距之和。

<iframe
  style="width: 100%; height: 300px"
  src="https://jsfiddle.net/bc405Ltz/embedded/css,html,result">
</iframe>
<iframe
  style="width: 100%; height: 300px"
  src="https://jsfiddle.net/bc405Ltz/1/embedded/css,html,result">
</iframe>

- 创建新的格式上下文环境后将不会出现边距折叠现象。