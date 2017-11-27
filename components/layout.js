import Head from 'next/head';
import React from 'react';
import { inject, observer } from 'mobx-react';
import Link from './link';
import reset from '../styles/reset.css';
import layout from '../styles/layout.css';

@inject('store')
@observer
export default class Layout extends React.Component {
  handleWheel = (e) => {
    if (this.props.store.disableScroll) {
      e.preventDefault()
    }
  }

  handleKeyDown = (e) => {
    if (this.props.store.disableScroll) {
      e.preventDefault()
    }
  }

  componentDidMount() {
    document.body.addEventListener('wheel', this.handleWheel)
    document.body.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.body.removeEventListener('wheel', this.handleWheel);
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { title, children } = this.props;
    const { showSelectMenu } = this.props.store;
    const blurStyle = showSelectMenu
    ? {
        filter: `blur(10px)`,
        transition: `0.3s filter linear`
      }
    : {
      filter: `blur(0px)`,
      transition: `0.3s filter linear`
    };
    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="body">
          <style dangerouslySetInnerHTML={{ __html: reset }} />
          <style dangerouslySetInnerHTML={{ __html: layout }} />
          <div className="page">
            <header>
              <div id="logo" style={blurStyle}>=CHL</div>
              <nav>
                <ul>
                  <li style={blurStyle}>
                    <Link href="/">
                      <a className="nav-link home-link">Home</a>
                    </Link>
                  </li>
                  <li style={blurStyle}>
                    <Link href="https://hi-hi.cn/chlresume/">
                      <a className="nav-link">Resume</a>
                    </Link>
                  </li>
                  <li style={blurStyle}>
                    <Link href="https://github.com/caohuilin">
                      <a className="nav-link">GitHub</a>
                    </Link>
                  </li>
                </ul>
              </nav>
            </header>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
