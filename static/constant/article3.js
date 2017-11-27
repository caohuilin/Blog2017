export default `
这两天遇到了很多居中方面的问题，趁此机会在这里做个总结。
### 容器的居中
#### 一个容器的水平居中
\`\`\`
#contain{
    margin: 0 auto;
}
\`\`\`
这个方法需要注意的几点：
 1. 容器一定要有固定的宽度，不然div的宽度默认的宽度是100%，不会有效果的。
 2. 第一个参数 要根据实际情况去写，它实际的含义就是上下的margin值。
#### 一个容器的水平垂直居中
##### 绝对定位
\`\`\`
#contain{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
}
\`\`\`
这个方法肯定是用于在一个已知大小的父容器中,父容器记得要设置position:relative。
##### 弹性布局
\`\`\`
#father{
    display:flex;
    justify-content:center;//子元素水平居中
    align-items:center;//子元素垂直居中
}
\`\`\`
弹性布局的学习推荐大家通过 http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html 学习
可以实现所有子元素水平垂直等布局。
### 文本元素的居中
#### 文本元素的水平居中
\`\`\`
#text{
    text-align:center;
}
\`\`\`
这个应该大家都会，不需要解释了。
#### 文本元素的垂直居中
\`\`\`
#text{
    Sheight：30px;
    line-height:30px;
}
\`\`\`
当line-height的属性值和height的属性值相等时，文字就自动垂直居中了。
`
