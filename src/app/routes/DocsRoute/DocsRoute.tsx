import { observer } from 'mobx-react-lite';
import React from 'react';
import { useInitDocs } from '../../logic/docs/init/useInitDocs';
import tablesStore from '../../stores/tablesStore/tablesStore';

export const DocsRoute = observer(() => {
    const { getBl, getAllBl } = useInitDocs();

    const blList = tablesStore.export.map((row) => {
        const onClick = () => getBl(row);
        return (
            <li
                className='bl' onClick={onClick}
                key={row.blNo}
            >
                {row.blNo}
            </li>
        );
    });

    return (
        <section className='bl-section'>
            <ul className='doc-links'>
                <h2 className='title bl-title'>BL section</h2>
                <ul className='blList'>{blList}</ul>
                <button
                    onClick={getAllBl} className='doc-link'
                    type='button'
                >
                    get all bl
                </button>
            </ul>
        </section>
    );
});
