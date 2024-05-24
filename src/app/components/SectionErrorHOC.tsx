import React from 'react';
import { observer } from 'mobx-react-lite';
import { renderToString } from 'react-dom/server';
import { TableStatusT } from '../types/typesTables';
import popupStore from '../stores/popupStore.ts/popupStore';

type Props = { status: TableStatusT; children: React.ReactElement; title: string };

const getHtml = (c: React.ReactElement) => {
    try {
        const res = renderToString(c);
        return res;
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        popupStore.pushStatus({ title: 'Программная ошибка', desc: e.message });
        return '';
    }
};

export const SectionErrorHOC = observer(({ status, children, title }: Props) => {
    if (status.statusType !== 'ok') {
        return (
            <div className='error-route'>
                <h2>{title}</h2>
                <h3 className='error-title mb0'>{status.title}</h3>
                <div className='error-desc'>{status.desc}</div>
            </div>
        );
    }

    const html = getHtml(children);

    if (!html) return null;

    return (
        <div className='section__wrapper'>
            <h2 className='section__title'>{title}</h2>
            {children}
        </div>
    );
});
