import React from "react"
import PropTypes from "prop-types"
import { css } from '@emotion/react'
// import { Link } from 'gatsby'
// import Nav from './Nav'

import Footer from './Footer'
import MTFPLogo from './MTFPLogo'

import { headerDonateUrl } from '../config/config'

import { formatTimeLong } from '../config/utils'

import "../config/base.css"

const bodyStyles = css`
    position: relative;
`
const headerStyle = css`  
  background-color: var(--tan7);
  margin-bottom: 10px;
  padding: 1em;
`
const contentStyle = css`
    padding: 10px;
    padding-top: 0;
    max-width: 800px;
    margin: auto;
`
const titleStyle = css`
  color: var(--tan4);
  font-size: 3em;
  margin-bottom: 5px;
  margin-top: 0;
  text-transform: uppercase;
  text-align: center;

  a {
    color: var(--tan4);
  }
  a:hover {
    color: var(--link);
    text-decoration: none;
  }

  @media screen and (max-width: 468px) {
    font-size: 2em;
  }
`
const subtitleStyle = css`
  color: var(--tan4);
  font-size: 1.15em;
  font-weight: normal;
  
  text-align: center;
  /* margin-left: 5px; */
  /* margin-right: 5px; */
  margin: 5px auto;


  max-width: 500px;
`
const mtfpBlurbCss = css`
  text-align: center;
  color: var(--gray1);
  font-style: italic;
`
const updateCss = css`
  color: var(--gray5);
  font-size: 0.9em;
  margin-bottom: 0.5em;
  text-align: right;
`
// const navCss = css`
//   position: sticky;
//   top: 0px;
//   background-color: white;
//   margin: -10px;
//   padding: 10px;
//   margin-bottom: 0;
//   padding-bottom: 0;
//   z-index: 1000;
// `

const Layout = ({ children, updateTime, siteHed, siteSubhed }) => {
  return (
    <div css={bodyStyles}>
      <div css={contentStyle}>
        <div css={headerStyle}>
          {/* <h1 css={titleStyle}><Link to="/">{siteHed}</Link></h1> */}
          <h1 css={titleStyle}>{siteHed}</h1>
          <h2 css={subtitleStyle}>{siteSubhed}</h2>
          <div css={mtfpBlurbCss}>
            A digital guide by <MTFPLogo />| <a href={headerDonateUrl}>Support this work</a>
          </div>
        </div>

        {/* <div css={navCss}>
          <Nav />
        </div> */}

        {updateTime && <div css={updateCss}>
          Last updated {formatTimeLong(new Date(updateTime))}
        </div>}
        <main>{children}</main>
      </div>
      <Footer />

    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
