import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link';
import config from '../../data/config'

const NotFoundPage = () => (
  <div className="error page">
    <Helmet title={`404 | ${config.siteTitle}`} />
    <section className="redirect section">
      <figure className="message figue">
        <p className="message">
          Find your way <Link className="link" to="/">home</Link>!
        </p>
      </figure>
    </section>
  </div>
)

export default NotFoundPage
