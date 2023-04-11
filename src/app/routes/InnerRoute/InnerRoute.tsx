import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInitExcel } from '../../logic/excel/useInitExcel';
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import { RequestSection } from './RequestSection';

export const InnerRoute = observer(() => {
    useInitExcel();

    if (excelSyncStore.isLoading) return null;

    return (
        <div className='doc-links'>
            <RequestSection />
        </div>
    );
});
