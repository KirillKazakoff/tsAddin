/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import _ from 'lodash';
import DocsDownloadBtn from '../../components/DocsDownloadBtn';
import { createRequestNordmile } from '../../logic/docs/innerContract/createRequestNordmile';
import tablesStore from '../../stores/tablesStore/tablesStore';

export const NordmileRoute = observer(() => {
    // const { nordmileT } = tablesStore;
    const onLoad = {
        nordmile: async () => {
            createRequestNordmile(tablesStore.nordmileT[0]);
        },
    };

    // useEffect(() => {
    //     if (tablesStore.nordmileT.length === 0) return;
    //     onLoad();
    // }, [nordmileT]);

    return (
        <form className='docs__form bl-form'>
            <h2 className='title bl-title'>Заявка Nordmile</h2>

            <DocsDownloadBtn
                onClick={onLoad.nordmile}
                title='Загрузить заявку'
                isPreventDefault
            />
        </form>
    );
});
