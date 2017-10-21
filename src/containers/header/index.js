import React from 'react'
import Link from 'gatsby-link'
import config from '../../../data/config'

import './index.scss';

const Header = () => (
  <header className="header">
    <Link className="link"
          to="/">
      <h1 className="logo">{config.siteTitle}</h1>
    </Link>
  </header>
)

export default Header
