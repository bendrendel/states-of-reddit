import React from 'react';
import ReactMarkdown from 'react-markdown';
import RemarkGFM from 'remark-gfm';
import { unescape } from '../../util/formatting';
import './Markdown.css';

function Markdown({ content }) {
    const formattedContent = unescape(content)
        .replace(/^#+/gm, match => `${match} `);

    return (
        <ReactMarkdown className='markdown' plugins={[RemarkGFM]} linkTarget={'_blank'} children={formattedContent} />
    );
}

export default Markdown;