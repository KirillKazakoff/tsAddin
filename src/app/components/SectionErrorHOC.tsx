import React from 'react';
import { observer } from 'mobx-react-lite';
import { renderToString } from 'react-dom/server';
import { TableStatusT } from '../types/typesTables';

type Props = { status: TableStatusT; children: React.ReactElement; title: string };

const getHtml = (c: React.ReactElement) => {
    const res = renderToString(c);
    return res;
};

export const SectionErrorHOC = observer(({ status, children, title }: Props) => {
    if (status.statusType !== 'ok') {
        return (
            <div className='error-route'>
                <div>hdssd</div>
                <h2>{title}</h2>
                <h3 className='error-title mb0'>{status.title}</h3>
                <div className='error-desc'>{status.desc}</div>
            </div>
        );
    }

    const html = getHtml(children);
    if (!html) return null;

    return (
        <>
            <h2>{title}</h2>
            {children}
        </>
    );
});
