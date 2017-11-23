import Head from 'next/head'
import React from 'react'
import Link from './link'
import stylesheet from './layout.css'

export default ({ children, title = 'This is the default title' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <nav>
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
