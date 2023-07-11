/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { observer } from 'mobx-react-lite';
import DocsDownloadBtn from '../../components/DocsDownloadBtn';
import { createRequestNordmile } from '../../logic/docs/innerContract/createRequestNordmile';
import tablesStore from '../../stores/tablesStore/tablesStore';
import { RequestSection } from '../InnerRoute/RequestSection';

export const RequestRoute = observer(() => {
    const requestNordmile = {
        onLoad: async () => {
            createRequestNordmile(tablesStore.nordmileT[0]);
        },
    };

    return (
        <>
            <form className='docs__form bl-form'>
                <h2 className='title'>Заявка Nordmile</h2>

                <DocsDownloadBtn
                    onClick={requestNordmile.onLoad}
                    title='Загрузить заявку'
                    isPreventDefault
                />
            </form>
            <RequestSection />
        </>
    );
});
