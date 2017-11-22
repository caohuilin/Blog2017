import Head from 'next/head'
import * as React from 'react'
import Link from './link'

export default ({ children, title = 'This is the default title' }: any) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <style jsx>{`
          .active:after {
            content: ' (current page)';
          }
          .nav-link {
            text-decoration: none;
            padding: 10px;
            display: block;
          }
          ul {
            border: solid 1px #333333;
            li {
              background: blue;
            }
          }
        `}</style>

        <ul>
          <li>
            <Link activeClassName="active" href="/">
              <a className="nav-link home-link">Home</a>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/about">
              <a className="nav-link">About</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>

    {children}

    <footer>{'I`m here to stay'}</footer>
  </div>
);
