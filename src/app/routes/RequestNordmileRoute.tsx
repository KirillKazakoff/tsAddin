/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { observer } from 'mobx-react-lite';
import { createRequestNordmile } from '../logic/docs/inner/request/createRequestNordmile';
import tablesStore from '../stores/tablesStore/tablesStore';
import { RequestSection } from './InnerRoute/RequestSection';
import { Doc } from '../components/Doc/Doc';

export const RequestNordmileRoute = observer(() => {
    const docs = tablesStore.nordmileT.map((row) => {
        return (
            <ul className='docs'>
                <Doc
                    title={row.buyer}
                    key={row.buyer}
                    onClick={() => createRequestNordmile(row)}
                    isPreventDefault
                />
            </ul>
        );
    });

    return (
        <>
            <form className='docs__form bl-form'>
                <h2 className='title'>Заявки Nordmile</h2>
                {docs}
            </form>
            <RequestSection />
        </>
    );
});
