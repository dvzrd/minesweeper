import React from 'react'
import Helmet from 'react-helmet'
import Game from '../containers/game'
import config from '../../data/config'

const IndexPage = () => (
  <div className="index page">
    <Helmet title={`${config.siteTitle} | ${config.siteDescription}`} />
    <Game options={config.gameOptions} />
  </div>
)

export default IndexPage
