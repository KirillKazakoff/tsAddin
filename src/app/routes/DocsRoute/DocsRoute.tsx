import { observer } from 'mobx-react-lite';
import React from 'react';
// import { createBL } from '../../docs/createBL';
import { useInitDocs } from '../../docs/init/useInitDocs';

export const DocsRoute = observer(() => {
    const initDocs = useInitDocs();
    console.log('he');

    const onBlClick = async () => {
        // await initDocs();
        // await createBL();
    };

    return (
        <ul className='doc-links'>
            <img src='./assets/icon-64.png' alt='huh' />
            <li onClick={onBlClick} className='doc-link'>
                BL
            </li>
        </ul>
    );
});
