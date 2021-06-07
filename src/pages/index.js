import React from "react"
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import Layout from '../components/Layout'
import SEO from '../components/Seo'
import Text from '../components/Text'
import CaseList from '../components/CaseList'

import Newsletter from '../components/Newsletter'

import {
  updateTime,
  siteHed,
  siteSubhed,
  seoHed,
  seoDescription,
  byline,
  intro,
  categories,
  footer
} from '../data/summary'


const bylineCss = css`
  font-size: 1.1.em;
  font-weight: bold;
`


const Index = ({ data }) => {
  const cases = data.cases.edges.map(d => d.node)

  return <div>
    <SEO title={seoHed} description={seoDescription} />
    <Layout updateTime={updateTime} siteHed={siteHed} siteSubhed={siteSubhed}>
      <div css={bylineCss}>{byline}</div>

      <Text paragraphs={intro} />

      {
        categories.map(cat => {
          return <CaseList key={cat.key}
            title={cat.title}
            description={cat.description}
            cases={cases.filter(d => d.category === cat.key)}
          />
        })
      }

      <Newsletter />

      <Text paragraphs={footer} />
    </Layout>
  </div>
}



export const query = graphql`
  query IndexPageQuery {
      cases: allLawsuitsJson {
        edges {
          node {
            name, status, number, category, description, bills, court, docket_url,
            plaintiffs, defendants, judge,
            filings {
              name, date, filedBy, description, pdfName
            }
            articles {
              title, date, link, author
            }
          }
        }
      }
  }
  
  
`

export default Index