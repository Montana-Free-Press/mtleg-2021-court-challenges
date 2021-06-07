import React, { useState } from "react"
import { Link } from 'gatsby'
import { css } from '@emotion/react'

import { billUrl, dateFormat, dateFormatLong } from '../config/utils'

import { noteStyle, mobileOnlyCss, desktopOnlyCss } from '../config/styles'

const caseContainerCss = css`
    
    border: 1px solid var(--tan5);
    background-color: var(--tan1);
    margin-bottom: 0.5em;
    box-shadow: 1px 1px 3px #888;
    /* padding: 0.5em; */
`
const caseHeaderCss = css`
    padding: 0.5em;
    /* height: 1.1em; */
    cursor: pointer;
    position: relative;
    :hover {
        background-color: var(--tan3);
    }
`
const caseDetailCss = css`
    display: none;

    padding: 0.5em;
    background-color: white;
`
const displayAsBlockCss = css`
    display: block;
`
const caseIconCss = css`
    position: absolute;
    font-weight: bold;
    font-size: 1.2em;
    right: 0.6em;
    top: 0.3em;
    user-select: none;
`
const caseHeaderContent = css`
    margin-right: 1em;
`
const statusCss = css`
    display: inline-block;
    margin-right: 0.2em;
    border: 1px solid var(--gray5);
    background-color: #e8dc74;
    text-transform: uppercase;
    padding: 0.2em 0.5em;
    font-size: 0.9em;
    margin: 0.2em 0;
`
const categoryTitleCss = css`
    padding-bottom: 0.2em;
    border-bottom: 1px solid var(--tan4);
    margin-bottom: 0.5em;
`


const orderedCourts = [
    "Montana Supreme Court",
    "Lewis & Clark County District Court",
    "Silver Bow County District Court",
    "Yellowstone County District Court",
    "Gallatin County District Court",
    "U.S. District Court, District of Montana, Billings Division",
]
const orderCourts = (a, b) => orderedCourts.indexOf(a) - orderedCourts.indexOf(b)

const CaseList = ({ cases, title, description }) => {
    const courts = Array.from(new Set(cases.map(d => d.court)))
        .sort(orderCourts)
    // console.log(courts)

    const itemsByCourt = courts.map(court => {
        const items = cases
            .filter(d => d.court === court)
            .map(d => <Case key={d.name} {...d} />)
        return <div key={court}>
            <h4>{court}</h4>
            {items}
            {court.includes('U.S.') ? <div css={noteStyle}>*Link requires login</div> : null}
        </div>
    })

    // const items = cases
    //     // .sort((a,b) => b.overview.billsReferred - a.overview.billsReferred)
    //     .map((d, i) => <Case key={d.name} {...d} />)

    return <div>
        <h2 css={categoryTitleCss}>{title}</h2>
        <div>{description}</div>
        <div css={noteStyle}><span css={mobileOnlyCss}>Tap</span><span css={desktopOnlyCss}>Click</span> a case for more information.</div>
        <div>
            {itemsByCourt}
        </div>
    </div>
}

const actorsCss = css`
    display: flex;
    flex-wrap: wrap;

    margin: 0.5em -0.5em;
`
const actorCss = css`
    flex: 1 1 100px;
    margin: 0.5em;

`
const caseNameLine = css`
    margin-bottom: 0.2em;
`

const filingListCss = css`
    div:first-of-type {
        border-top: none;
    }
`
const filingCss = css`
    border-top: 1px solid var(--tan4);
    padding: 0.5em;  
`
const articleListCss = css`
    display: flex;
    flex-wrap: wrap;
    margin: -0.25em;
`
const articleCss = css`
    flex: 1 1 200px;
    border: 1px solid var(--tan4);
    /* background-color: var(--tan1); */
    padding: 0.5em;
    margin: 0.25em;

`

const Case = ({ name, status, number, description, bills, court, plaintiffs, defendants, judge, docket_url, filings, articles }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const billsInvolved = bills.map((identifier, i) => {
        const key = billUrl(identifier)
        const url = `https://apps.montanafreepress.org/capitol-tracker-2021/bills/${key}`
        const sep = i > 0 ? ', ' : ''
        return <span key={identifier}>{sep}<a href={url} target="_blank" rel="noopener noreferrer">{identifier}</a></span>
    })
    const s = billsInvolved.length === 1 ? '' : 's'


    let caseNumber = null
    if (docket_url === '') caseNumber = <span>{number}</span>
    if ((docket_url || '').includes('uscourts.gov')) {
        caseNumber = <span><a href={docket_url} target="_blank" rel="noopener noreferrer">{number}</a>*</span>
    }
    if ((docket_url || '').includes('dataportal.mt.gov/t/DOASITSDIBMDBA')) {
        // MT Supreme Court
        caseNumber = <span><a href={docket_url} target="_blank" rel="noopener noreferrer">{number}</a></span>
    }

    const filingList = filings.map(f => <Filing key={`${number}-${f.pdfName}`} caseNumber={number} {...f} />)
    const filingsPlural = filings.length === 1 ? '' : 's'
    const lastFiling = filings.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-1)[0]
    const lastFilingDate = lastFiling && lastFiling.date

    const coverageList = articles
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((a, i) => <Article key={`${number}-${i}`} {...a} />)

    const statusItem = <span css={statusCss}>{status}</span>

    const legalFilingCountLine = <span>— <strong>{filings.length}</strong> major legal filing{filingsPlural}{filings.length > 0 ? `, last on ${dateFormatLong(new Date(lastFilingDate))}` : ''}.</span>

    return <div css={caseContainerCss}>
        <div css={caseHeaderCss} onClick={() => setIsExpanded(!isExpanded)}>
            <div css={caseIconCss}>{isExpanded ? '–' : '+'}</div>
            <div css={caseHeaderContent}>
                <div css={caseNameLine}><strong>{name}</strong> ({caseNumber})</div>
                <div>{description} {legalFilingCountLine}</div>
                <div>{statusItem}</div>
            </div>
        </div>
        <div css={isExpanded ? [caseDetailCss, displayAsBlockCss] : [caseDetailCss]}>

            {/* {caseName} */}
            {billsInvolved.length > 0 ? <div>Bill{s} challenged: {billsInvolved}</div> : null}
            <div css={actorsCss}>
                <div css={actorCss}>
                    <div><strong>Plaintiffs</strong></div>
                    <div>{plaintiffs}</div>
                </div>
                <div css={actorCss}>
                    <div><strong>Defendants</strong></div>
                    <div>{defendants}</div>
                </div>
                <div css={actorCss}>
                    <div><strong>Judge</strong></div>
                    <div>{judge}</div>
                </div>

            </div>

            {
                (coverageList.length > 0) && <div>
                    <h4>Related coverage</h4>
                    <div css={articleListCss}>
                        {coverageList}
                    </div>
                </div>
            }

            <h4>Major legal filings</h4>
            <div css={filingListCss}>
                {filingList}
            </div>
        </div>
    </div>
}



const Filing = ({ caseNumber, name, date, filedBy, description, pdfName }) => {
    const filingName = pdfName ?
        <a href={`filings/${caseNumber}/${pdfName}`}>{name}</a>
        : <span>{name}</span>

    return <div css={filingCss}>
        <div>{dateFormat(new Date(date))} – <strong>{filingName}</strong> filed by <strong>{filedBy}</strong></div>
        <div css={noteStyle}>{description}</div>
    </div >
}

const articleOutletCss = css`
    text-transform: uppercase;
    color: var(--tan5);
    font-size: 0.8em;

`

const Article = ({ title, date, link }) => {
    return <div css={articleCss}>
        <div css={articleOutletCss}>Montana Free Press</div>
        <div><a href={link} target="_blank" rel="noopener noreferrer">{title}</a></div>
        <div>{dateFormat(new Date(date))}</div>
    </div>
}

export default CaseList