import React from 'react';
import { observer } from 'mobx-react-lite';
import { TableStatusT } from '../types/typesTables';

type Props = { status: TableStatusT; children: React.ReactElement };

export const SectionErrorHOC = observer(({ status, children }: Props) => {
    console.log(status.statusType);
    if (status.statusType !== 'ok') {
        return (
            <div className='error-route'>
                <h2 className='error-title'>{status.title}</h2>
                <div className='error-desc'>{status.desc}</div>
            </div>
        );
    }
    return <div>{children}</div>;
});
