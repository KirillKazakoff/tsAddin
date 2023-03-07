import { observer } from 'mobx-react-lite';
import React from 'react';
import { createBL } from '../../docs/createBL';

export const DocsRoute = observer(() => {
    return (
        <ul className='doc-links'>
            <li onClick={() => createBL()} className='doc-link'>
                BL
            </li>
        </ul>
    );
});
