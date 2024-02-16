import { observer } from 'mobx-react-lite';
import React from 'react';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import { ExportContractSection } from './ExportContractSection';
import { ExportRadio } from './ExportRadio';
import { AssortimentSection } from './AssortimentSection';
import { InvoiceKTISection } from './InvoiceKTISection';
import { SectionErrorHOC } from '../../components/SectionErrorHOC';
import { BlNewSection } from './BlNewSection';

export const ExportRoute = observer(() => {
    if (excelSyncStore.isLoading) return null;

    let ExportSection = () => (
        <>
            {/* <BlSection /> */}
            <BlNewSection />
            <ExportContractSection />
            <AssortimentSection />
            <InvoiceKTISection />
        </>
    );
    if (exportContractStore.currentTable.length === 0) {
        ExportSection = () => (
            <div className='docs__form docs__form--empty'>
                {`Таблица ${exportContractStore.operation} пуста`}
            </div>
        );
    }
    if (exportContractStore.firstRowTerms === 'FCA') {
        exportContractStore.setOperation('export');
        ExportSection = ExportContractSection;
    }

    return (
        <div className='doc-links'>
            <ExportRadio />
            <SectionErrorHOC status={exportContractStore.sectionStatus} title=''>
                <ExportSection />
            </SectionErrorHOC>
        </div>
    );
});
