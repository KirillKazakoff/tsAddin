import React from 'react';
import { observer } from 'mobx-react-lite';
import { renderToString } from 'react-dom/server';
import { TableStatusT } from '../types/typesTables';
import {createRoot} from 'react-dom/client';


declare module "react-dom/client" {
    // typing module default export as `any` will allow you to access its members without compiler warning
    var createRoot: any;
    export {createRoot};
  }

type Props = { status: TableStatusT; children: React.ReactElement; title: string };

const isHtml = (c: React.ReactElement) => {
    const div = document.createElement('div');
    const root = 
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

    // if empty component children
    if (!isHtml(children)) return null;

    return (
        <>
            <h2>{title}</h2>
            {children}
        </>
    );
});
