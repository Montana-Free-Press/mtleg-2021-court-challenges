import React from "react"
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/Seo'
import CaseList from '../components/CaseList'
import BillTable from '../components/BillTable'
import InfoPopup from '../components/InfoPopup'
import Newsletter from '../components/Newsletter'
import ContactUs from '../components/ContactUs'

// import BillStatusOverview from '../components/overview/BillStatuses'
// import BillLookup from '../components/input/BillLookup'
// import LawmakerLookup from '../components/input/LawmakerLookup'
// import DistrictLookup from '../components/input/DistrictLookup'

import { dateFormatLong } from '../config/utils'

// import { summary, mostRecentActionDate, infoPopups } from '../data/summary.json'

const Index = ({ data }) => {
  const cases = data.cases.edges.map(d => d.node)

  // const keyBillCategories = Array.from(new Set(keyBills.map(d => d.majorBillCategory)))
  return <div>
    <SEO title="Overview" />
    <Layout>
      <div>TK Lede-in. Lorem ipsum and more and more and more and more and then a little bit extra.</div>

      <CaseList cases={cases} />

      <Newsletter />

      <ContactUs />
    </Layout>
  </div>
}



export const query = graphql`
  query IndexPageQuery {
      cases: allLawsuitsJson {
        edges {
          node {
            title,
            number
          }
        }
      }
  }
  
  
`

export default Index