import { observer } from 'mobx-react-lite';
import React from 'react';
import { useInitExcel } from '../../logic/excel/useInitExcel';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import BlSection from './BlSection';
import { ExportContractSection } from './ExportContractSection';
import { ExportRadio } from './ExportRadio';

export const ExportRoute = observer(() => {
    useInitExcel();
    const table = exportContractStore.getCurrentTable();

    if (excelSyncStore.isLoading) return null;

    let ExportSection = () => (
        <>
            <BlSection />
            <ExportContractSection />
        </>
    );
    if (table.length === 0) {
        ExportSection = () => (
            <div className='docs__form docs__form--empty'>
                {`Таблица ${exportContractStore.operation} пуста`}
            </div>
        );
    }

    return (
        <div className='doc-links'>
            <ExportRadio />
            <ExportSection />
        </div>
    );
});