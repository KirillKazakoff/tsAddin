import { observer } from 'mobx-react-lite';
import React from 'react';
// import { createBL } from '../../docs/createBL';
import { useInitDocs } from '../../docs/init/useInitDocs';

export const DocsRoute = observer(() => {
    const initDocs = useInitDocs();

    const onBlClick = async () => {
        await initDocs();
        // await createBL();
    };

    return (
        <ul className='doc-links'>
            <li onClick={onBlClick} className='doc-link'>
                BL
            </li>
        </ul>
    );
});
