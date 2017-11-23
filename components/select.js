import * as React from 'react';
import Link from 'next/link';
import { Motion, spring } from 'react-motion';
import { inject, observer } from 'mobx-react';

const selects = [
  {
    id: 0,
    value: "HTML"
  },
  {
    id: 1,
    value: "CSS"
  },
  {
    id: 2,
    value: "ALL"
  },
  {
    id: 3,
    value: "JavaScript"
  },
  {
    id: 4,
    value: "HTTP"
  },
  {
    id: 5,
    value: "React"
  },
  {
    id: 6,
    value: "其他"
  },
]
@inject('store')
@observer
class Select extends React.Component {
  getPosition = (id) => {
    switch(id) {
      case 0: return 0
      case 1: return -40
      case 2: return -70
      case 3: return -90
      case 4: return -100
      case 5: return -100
    }
  }
  showMenu = () => {
    this.props.store.showMenu()
  }

  hideMenu = () => {
    this.props.store.hideMenu()
  }
  render() {
    const { showSelectMenu, currentMenu} = this.props.store;
    const position = this.getPosition(currentMenu);
    const show = showSelectMenu ? 'block' : 'none';
    const style = {
      top: position,
      display: show
    }
    return (
      <div className="menu">
        <div className="selected">
          <label onClick={this.showMenu}>{selects[currentMenu].value} <i className="iconfont">&#xe605;</i></label>
          <ul style={style} onClick={this.hideMenu}>
          {
            selects.map(item => {
              const k = item.id - currentMenu
              const height = 50 - Math.abs(k) * 10
              const visibility = height > 20 ? 'visible' : 'hidden'
              const fontSize = 30 - Math.abs(k) * 5
              const opacity = 1 - Math.abs(k) * 0.2
              const style = {
                height: height,
                lineHeight:  `${height}px`,
                visibility: visibility,
                fontSize: fontSize,
                opacity: opacity
              }
              return (
                <li key={item.id} style={style}>{item.value}</li>
              )
            })
          }
        </ul>
        </div>
        <span />
      </div>
    );
  }
}

export default Select;
