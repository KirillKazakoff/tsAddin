import { observer } from 'mobx-react-lite';
import React from 'react';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import { ExportContractSection } from './ExportContractSection';
import { ExportRadio } from './ExportRadio';
import { AssortimentSection } from './AssortimentSection';
import { SectionErrorHOC } from '../../components/SectionErrorHOC';
import { BlSection } from './BlSection';
import { InvoiceKTISection } from './InvoiceKTISection';

export const ExportRoute = observer(() => {
    if (excelSyncStore.isLoading) return null;

    let ExportSection = () => (
        <>
            <BlSection />
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
    // if live crab section
    if (exportContractStore.firstRowTerms === 'FCA') {
        ExportSection = () => (
            <>
                <BlSection />
                <ExportContractSection />
            </>
        );
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
