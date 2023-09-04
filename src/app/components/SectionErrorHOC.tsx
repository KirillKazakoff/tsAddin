import React from 'react';
import { observer } from 'mobx-react-lite';
import { TableStatusT } from '../types/typesTables';

// declare module "react-dom/client" {
//     var createRoot: any;
//     export {createRoot};
//   }

type Props = { status: TableStatusT; children: React.ReactElement; title: string };

// const isHtml = (c: React.ReactElement) => {
//     const div = document.createElement('div');
//     const root =
// };

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

    // if empty component children
    // if (!isHtml(children)) return null;

    return (
        <>
            <h2>{title}</h2>
            {children}
        </>
    );
});
