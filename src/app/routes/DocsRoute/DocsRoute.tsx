import { observer } from 'mobx-react-lite';
import React from 'react';
import { createBL } from '../../docs/createBL';
import { useInitDocs } from '../../docs/init/useInitDocs';
import { read } from '../../docs/readBL';

export const DocsRoute = observer(() => {
    const initDocs = useInitDocs();

    const onBlClick = async () => {
        try {
            await initDocs();
            const book = await read();
            await createBL(book);
        } catch (e) {
            console.log(e);
        }
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
