import React from 'react'
import Link from 'gatsby-link'
import config from '../../../data/config'

import './index.scss';

const Footer = () => (
  <footer className="footer">
    <p className="copyright message">{config.copyright}</p>
  </footer>
)

export default Footer
