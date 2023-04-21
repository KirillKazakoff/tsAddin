import { observer } from 'mobx-react-lite';
import React from 'react';
import { useInitExcel } from '../../logic/excel/useInitExcel';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import BlSection from './BlSection';
import { ExportContractSection } from './ExportContractSection';

export const ExportRoute = observer(() => {
    useInitExcel();
    const table = exportContractStore.getCurrentTable();

    if (excelSyncStore.isLoading) return null;
    if (table.length === 0) return <div>Таблица пустая</div>;

    return (
        <div className='doc-links'>
            <BlSection />
            <ExportContractSection />
        </div>
    );
});
