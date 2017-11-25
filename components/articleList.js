import * as React from 'react';
import Link from 'next/link';
import { Motion, spring } from 'react-motion';
import { inject, observer } from 'mobx-react';
import * as _ from 'lodash';

@inject('store')
@observer
class Article extends React.Component {
  render() {
    const { showSelectMenu } = this.props.store;
    const blurStyle = showSelectMenu
    ? {
        filter: `blur(5px)`,
        transition: `0.3s filter linear`
      }
    : {
      filter: `blur(0px)`,
      transition: `0.1s filter linear`
    };
    return (
      <nav className="content">
        <ul>
          <li>
            <Link href={{ pathname: '/article', query: { id: 0 } }}>
              <h3 className="title" style={blurStyle}>谈谈阿里的前端笔试题<span /></h3>
            </Link>
            <div className="introduction" style={blurStyle}>
              前几天做了阿里实习生的前端笔试题，和大家分享一下。
              前几天做了阿里实习生的前端笔试题，和大家分享一下。
              前几天做了阿里实习生的前端笔试题，和大家分享一下。
            </div>
            <div className="information" style={blurStyle}>
              <div className="like">
                <i className="iconfont">&#xe60b;</i>
              </div>
              <div className="date">2016-04-11</div>
            </div>
          </li>
          <li>
            <Link href={{ pathname: '/article', query: { id: 1 } }}>
              <h3 className="title" style={blurStyle}>搞怪的JavaScript数据类型<span /></h3>
            </Link>
            <div className="introduction" style={blurStyle}>
              js中数据类型方面应该注意的一些问题
              js中数据类型方面应该注意的一些问题
              js中数据类型方面应该注意的一些问题
            </div>
            <div className="information" style={blurStyle}>
              <div className="like">
                <i className="iconfont">&#xe60b;</i>
              </div>
              <div className="date">2016-04-11</div>
            </div>
          </li>
          <li>
            <Link href={{ pathname: '/article', query: { id: 2 } }}>
              <h3 className="title" style={blurStyle}>谈谈阿里的前端笔试题<span /></h3>
            </Link>
            <div className="introduction" style={blurStyle}>
              前几天做了阿里实习生的前端笔试题，和大家分享一下。
              前几天做了阿里实习生的前端笔试题，和大家分享一下。
              前几天做了阿里实习生的前端笔试题，和大家分享一下。
            </div>
            <div className="information" style={blurStyle}>
              <div className="like">
                <i className="iconfont">&#xe60b;</i>
              </div>
              <div className="date">2016-04-11</div>
            </div>
          </li>
          <li>
            <Link href={{ pathname: '/article', query: { id: 3 } }}>
              <h3 className="title" style={blurStyle}>搞怪的JavaScript数据类型<span /></h3>
            </Link>
            <div className="introduction" style={blurStyle}>
              js中数据类型方面应该注意的一些问题
              js中数据类型方面应该注意的一些问题
              js中数据类型方面应该注意的一些问题
            </div>
            <div className="information" style={blurStyle}>
              <div className="like">
                <i className="iconfont">&#xe60b;</i>
              </div>
              <div className="date">2016-04-11</div>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Article;
