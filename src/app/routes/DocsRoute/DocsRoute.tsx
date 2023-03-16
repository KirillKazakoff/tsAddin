import { observer } from 'mobx-react-lite';
import React from 'react';
import { useInitDocs } from '../../logic/docs/init/useInitDocs';

export const DocsRoute = observer(() => {
    const onClickBl = useInitDocs();

    return (
        <ul className='doc-links'>
            <img src='./assets/icon-64.png' alt='huh' />
            <li onClick={onClickBl} className='doc-link'>
                BL
            </li>
        </ul>
    );
});
