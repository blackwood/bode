import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import './index.css'

{
  /*
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/manifest.json">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="theme-color" content="#ffffff">
*/
}

const Header = () => (
  <div>
    <h1 className="main-title center center-column">
      <Link
        to="/"
        style={{
          textDecoration: 'none',
        }}
      >
        Baze Blackwood
      </Link>
    </h1>
  </div>
)

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="BAZE BLACKWOOD"
      meta={[
        {
          name: 'description',
          content:
            'Baze makes internet arts and musics. Working on websites and tools for likeminded folx.',
        },
        { name: 'keywords', content: 'internet, music, art' },
      ]}
    />
    <Header />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
