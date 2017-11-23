import React from 'react';
import { Provider } from 'mobx-react';
import Layout from '../components/layout';
import Select from '../components/select';
import { initStore } from '../store';
import style from '../styles/main.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.store = initStore(props.isServer, props.showSelectMenu, props.currentMenu);
  }

  getInitialProps({ req }) {
    const isServer = !!req;
    const store = initStore(isServer);
    return { isServer, showSelectMenu: store.showSelectMenu, currentMenu: store.currentMenu };
  }

  render() {
    return (
      <Provider store={this.store}>
        <Layout>
          <style dangerouslySetInnerHTML={{ __html: style }} />
          <Select />
          <nav className="content">
            <ul>
              <li>
                <h3 className="title">
                  谈谈阿里的前端笔试题<span />
                </h3>
                <div className="introduction">
                  前几天做了阿里实习生的前端笔试题，和大家分享一下。
                  前几天做了阿里实习生的前端笔试题，和大家分享一下。
                  前几天做了阿里实习生的前端笔试题，和大家分享一下。
                </div>
                <div className="information">
                  <div className="like">
                    <i className="iconfont">&#xe60b;</i>
                  </div>
                  <div className="date">2016-04-11</div>
                </div>
              </li>
              <li>
                <h3 className="title">
                  搞怪的JavaScript数据类型<span />
                </h3>
                <div className="introduction">
                  js中数据类型方面应该注意的一些问题
                  js中数据类型方面应该注意的一些问题
                  js中数据类型方面应该注意的一些问题
                </div>
                <div className="information">
                  <div className="like">
                    <i className="iconfont">&#xe60b;</i>
                  </div>
                  <div className="date">2016-04-11</div>
                </div>
              </li>
            </ul>
          </nav>
        </Layout>
      </Provider>
    );
  }
}
