import * as React from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Motion, spring } from 'react-motion';
import { inject, observer } from 'mobx-react';
import * as _ from 'lodash';
import selects from '../static/constant/selects';
import articleList from '../static/constant/articleList';

@inject('store')
@observer
class Article extends React.Component {
  render() {
    const { currentMenu, showSelectMenu } = this.props.store;
    const blurClass = classnames({
      blur: showSelectMenu,
      unblur: !showSelectMenu
    });
    return (
      <nav className="content">
        <ul>
          {articleList
            .filter(item => currentMenu === 2 || item.tag === currentMenu)
            .map((item, i) => {
              return (
                <li key={i}>
                  <Link href={{ pathname: '/article', query: { id: item.id } }}>
                    <h3 className={`title ${blurClass}`}>
                      {item.title}
                      <span />
                    </h3>
                  </Link>
                  <div className={`introduction ${blurClass}`}>
                    {item.description}
                  </div>
                  <div className={`information ${blurClass}`}>
                    <div className="like">
                      <i className="iconfont">&#xe60b;</i>
                    </div>
                    <div className="date">{item.date}</div>
                  </div>
                </li>
              );
            })}
        </ul>
      </nav>
    );
  }
}

export default Article;
