# Logbook开发总结（1）

## 引言：

21世纪，科技的飞速发展大家有目共睹，IT也随之应运而生，成为了脍炙人口的新词。所谓的程序猿，也就是这个被归为人类祖先的职业也成为了这个时代的新宠。
前端，在七八十年代技术人的口中就是所谓的用标签拼起来的一个界面，没有任何技术含量的东西，如今也风靡全球。在这个不仅仅满足用户功能的时代，美，成为了人们对一个作品的新追求，也成为了吸引用户的新的竞争优势。
半年前，在学长的悉心带领下，我也踏上了这条“不归路”。

## 项目背景

logbook是项目管理过程中不可或缺的交流工具，boos通过它了解员工的项目进度和完成情况，员工通过它更好的规划自己的工作计划等等。该项目就是仿照七牛公司的logbook实现基本界面和功能。

## 编写目的

对自己在学习前端这条路上的检验，第一次独立完成的实际项目。

## 实现

jQuery是一个高效、精简并且功能丰富的 JavaScript 工具库。它提供的 API易于使用且兼容众多浏览器，这让诸如 HTML 文档遍历和操作、事件处理、动画和 Ajax 操作更加简单。

### 开发工具

atom编辑器

### 浏览器

chrome浏览器

### 开发前准备

1. API访问：安装fehelper插件。

2. 分析页面结构，建立基本框架。
    页面分为两个部分，顶部导航栏和内容栏。内容栏分左右两块，左边由日历栏和项目分组成员列表组成，右边由日期所对应的项目及当天日志列表组成。

3. 建立项目文件，下载JQuery引入项目。

### 开发过程

1. 根据页面结构分析，搭建主要的HTML标签。

2. 实现顶部导航栏的细节

- logo居中显示

- 添加日志的弹出层实现

- 个人信息显示的模块实现

获取API的方式：

```js
$.get("地址",回调函数function(获取的信息){
    对信息进行操作;
});
```

3. 右边区域列表的实现

- 通过上面方法获取部门信息，通过li标签相加拼接成一个html。

- 获取用户信息，将用户分类，同一类别的用户拼接到对应的部门标签之下。

- 将html整体添加到右边区域。

拼接用户信息:

```js
$.each(users.data,function(i,us){
    us_ht[us.department] += "<li><div class='name'>姓名："+us.real_name+"</div><div class='mood'>心情：</div><div class='note'>日志:</div></li>";
}
```

拼接部门信息:

```js
$.each(departments.data,function(i,dep){
    html += '<li>'+dep+'<div class="num">共'+depart[dep]+'人</div></li><ul class="gs">'+us_ht[dep]+'</ul>';
}
```

将html整体添加到右边区域

```js
$(".departments").html(html);
```

4. 左边区域的日历和列表的实现

- 通过bootstrap插件实现日历功能。

- 根据上面获取的部门信息和个人信息拼接实现左边列表。

日历插件的实现

```js
$('.date div').datepicker({
    format:'yyyy-mm-dd',
    todayHighlight:true
});
```

个人信息的拼接

```js
name_ht[us.department] += "<li>"+us.real_name+"</li>";
```

部门信息的拼接

```js
html2 += '<li>'+dep+'('+depart[dep]+'/'+depart[dep]+'人)</div></li><ul class="gd">'+name_ht[dep]+'</ul>';
```

将html整体添加到左边列表区域

```js
$(".c_de").html(html2);
```

5.点击事件的实现

- 个人信息的点击事件

```js
var flag = 1;
$("#inf").on('click',function(){
    if(flag){
        $("#user").show();
        flag = 0;
    }else{
        $("#user").hide();
        flag = 1;
    }
});
```

- 添加日志的点击事件

```js
//点击我的日志
$("#note").on('click',function(){
    $("#mask").show();
    $("#popup").show();
});
//点击关闭按钮
$(".icon").on('click',function(){
    $("#mask").hide();
    $("#popup").hide();
});
//点击确定按钮
$(".certern").on("click",function(){
    $("#mask").hide();
    $("#popup").hide();
});
//点击除弹出框意外的区域
$("#mask").on("click",function(){
    $("#mask").hide();
    $("#popup").hide();
});
```

- 点击部门显示成员及日志事件

```js
var show = -1;
var flag = 1;
var de = $(".departments >li");
var us = $(".gs");
$.each(de,function(i,d){
    de.eq(i).on("click", function(){
        if(show != -1){
            us.eq(show).css("display","none");
        }
        if(show == i){
            if(flag){
                us.eq(show).css("display","none");
                flag = 0;
            }
            else{
                us.eq(show).css("display","block");
                flag = 1;
            }
        }else{
            show = i;
            us.eq(i).css("display","block");
            flag = 1;
        }
    });
});
```

<i class="icon-cloud"></i> 其他细节的实现见[源码](https://github.com/caohuilin/Logbook_JQuery)

### 个人感想与收获

学以致用一直是大家对学习追求的最高境界，很开心自己讲这半年多学到的东西用起来，实现了一个简单的实例。希望我能在这条追求美的路上能走的更远、更踏实。
