import Article0 from './article0.md';
import Article1 from './article1';
import Article2 from './article2';
import Article3 from './article3';
import Article4 from './article4';
import Article5 from './article5';
import Article6 from './article6';
import Article7 from './article7';
import Article8 from './article8';
/**
 * @type {[{id:number,title:string,tag:number,date:string,path:string,description:string,content:string}]}
 */
 const articleList =  [
  {
    id: 0,
    title: 'Linux内核编译',
    tag: 6,
    date: '2015-04-21',
    path: 'linux-kernel-compiler',
    description:
      'Linux内核是操作系统的核心，也是操作系统最基本的部分。 Linux内核的体积结构是单内核的、但是他充分采用了微内核的设计思想、使得虽然是单内核、但工作在模块化的方式下、并且这个模块可以动态装载或卸载；Linux负责管理系统的进程、内存、设备驱动程序、文件和网络系统，决定着系统的性能和稳定性。如是我们在了解Linux内核的基础上根据自己的需要、量身定制一个更高效，更稳定的内核，就需要我们手动去编译和配置内核里的各项相关的参数和信息了。',
    content: Article0
  },
  {
    id: 1,
    title: 'Logbook开发总结（1）',
    tag: 7,
    date: '2016-02-21',
    path: 'logbook-development-summary',
    description:
      '21世纪，科技的飞速发展大家有目共睹，IT也随之应运而生，成为了脍炙人口的新词。所谓的程序猿，也就是这个被归为人类祖先的职业也成为了这个时代的新宠。 前端，在七八十年代技术人的口中就是所谓的用标签拼起来的一个界面，没有任何技术含量的东西，如今也风靡全球。在这个不仅仅满足用户功能的时代，美，成为了人们对一个作品的新追求，也成为了吸引用户的新的竞争优势。 半年前，在学长的悉心带领下，我也踏上了这条“不归路”。',
    content: Article1
  },
  {
    id: 2,
    title: ' 随笔  ----前端路的酸甜苦辣',
    tag: 6,
    date: '2016-03-25',
    path: 'essay-front-road-ups-and-downs',
    description:
      '每一只被关在“笼子”里的小鸟都渴望飞翔，总想寻找属于自己的那片蓝天。其实，期盼的这一刻终究会来到，它在你努力的时候慢慢靠近你，在你累了的时候悄悄鼓励你，直到有一天你翻过那座让你精疲力尽的高山，它就站在你的面前嘲笑着你狼狈的身影。',
    content: Article2
  },
  {
    id: 3,
    title: '让人欢喜让人忧的CSS居中问题',
    tag: 1,
    date: '2016-03-26',
    path: 'make-people-happy-and-worry-about-css-problem',
    description: '这两天遇到了很多居中方面的问题，趁此机会在这里做个总结。',
    content: Article3
  },
  {
    id: 4,
    title: '对React的一些理解',
    tag: 5,
    date: '2016-04-11',
    path: 'some-understanding-of-react',
    description:
      '接触到React也有一段时间了，对于没有接触过其他类似js框架而直接接触React的伙伴们可能会觉得一下子入不了门，在这里我来谈谈我的看法，或许能帮上你什么忙。',
    content: Article4
  },
  {
    id: 5,
    title: '搞怪的JavaScript数据类型',
    tag: 3,
    date: '2016-04-18',
    path: 'funny-javascript-data-types',
    description:
      'JavaScript中的五种基本数据类型：Number、String、Boolean、Null、Undefined',
    content: Article5
  },
  {
    id: 6,
    title: '谈谈阿里的前端笔试题',
    tag: 6,
    date: '2016-04-21',
    path: 'talk-about-ali-front-end-pen-test',
    description:
      '前几天做了阿里实习生的前端笔试题，涉及到很多以前没有注意到的知识点，和大家分享一下。',
    content: Article6
  },
  {
    id: 7,
    title: '贪吃蛇小游戏开发总结（1）',
    tag: 7,
    date: '2016-05-11',
    path: 'snake-game-development-summary',
    description:
      '一个基于React实现的贪吃蛇消灭怪物的游戏。这个游戏是仿照传统的贪吃蛇游戏实现的，并添加了发射子弹消灭怪物的功能。它可以支持多种平台，在PC上可通过键盘操作，在移动设备可通过触屏操作。',
    content: Article7
  },
  {
    id: 8,
    title: 'HTTP状态码汇总',
    tag: 4,
    date: '2016-07-20',
    path: 'http-status-code-summary',
    description:
      'HTTP状态码（HTTP Status Code）在前后端合作中发挥着重要的作用，前端通过HTTP状态码可以获取到服务器处理相关请求的信息，从而向用户显示对应的提示或者操作。最近在项目中对状态码进行了前后端的重构，在这里做个汇总，方便以后查阅',
    content: Article8
  }
];

export default articleList.reverse()
