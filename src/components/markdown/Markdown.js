import React from 'react';
import ReactMarkdown from 'react-markdown';
import RemarkGFM from 'remark-gfm';
import { unescape } from '../../util/formatting';
import './Markdown.css';

function Markdown({ content }) {
    const formattedContent = unescape(content)
        .replace(/^#+/gm, match => `${match} `)
        .replace(/\|/g, match => `${match} `);

    return (
        <ReactMarkdown className='markdown' remarkPlugins={[RemarkGFM]} linkTarget={'_blank'} children={formattedContent} />
    );
}

export default Markdown;