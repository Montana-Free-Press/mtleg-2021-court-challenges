import React, { useState } from "react"
import { Link } from 'gatsby'
import { css } from '@emotion/react'

import { numberFormat } from '../config/utils'

import { noteStyle, mobileOnlyCss, desktopOnlyCss } from '../config/styles'

const caseContainerCss = css`
    
    border: 1px solid var(--tan5);
    background-color: var(--tan1);
    margin-bottom: 1em;
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
    right: 1em;
    top: 25%;
`
const caseHeaderContent = css`
    margin-right: 1em;
`


const CaseList = ({ cases }) => {
    const items = cases
        // .sort((a,b) => b.overview.billsReferred - a.overview.billsReferred)
        .map(d => <Case key={d.name} {...d} />)
    return <div>
        <h3>Cases challenging 2021 laws</h3>
        <div css={noteStyle}><span css={mobileOnlyCss}>Tap</span><span css={desktopOnlyCss}>Click</span> a case for more information.</div>
        <div>
            {items}
        </div>
    </div>
}

const Case = ({ title, number }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return <div css={caseContainerCss}>
        <div css={caseHeaderCss} onClick={() => setIsExpanded(!isExpanded)}>
            <div css={caseIconCss}>{isExpanded ? '–' : '+'}</div>
            <div css={caseHeaderContent}>
                <div><strong>{title}</strong></div>
                <div>TK Summary. challenges law that does XXXX.</div>
            </div>
        </div>
        <div css={isExpanded ? [caseDetailCss, displayAsBlockCss] : [caseDetailCss]}>
            <p>Lorem ipsum and then some and more some.</p>
            <div>Docket: {number}, XXXCourt.</div>
        </div>

    </div>
}

export default CaseList