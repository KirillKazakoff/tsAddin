import { observer } from 'mobx-react-lite';
import React from 'react';
import { useInitExcel } from '../../logic/excel/useInitExcel';
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import BlSection from './BlSection';
import { ExportContractSection } from './ExportContractSection';

export const DocsRoute = observer(() => {
    useInitExcel();

    console.log(excelSyncStore.isLoading);
    if (excelSyncStore.isLoading) return null;

    return (
        <div className='doc-links'>
            <BlSection />
            <ExportContractSection />
        </div>
    );
});
