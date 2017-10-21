import React from 'react'
import Helmet from 'react-helmet'
import Header from '../containers/header'
import Footer from '../containers/footer'
import config from '../../data/config'

import '../stylesheets/elements.scss'
import './index.scss'

const Layout = ({ children }) => (
  <main className="main layout">
    <Helmet>
      <title>{config.siteTitle}</title>
      <meta name="description" content={config.siteDescription} />
    </Helmet>
    <Header />
    <main className="main content">
      { children() }
    </main>
    <Footer />
  </main>
)

export default Layout
