import { observer } from 'mobx-react-lite';
import React from 'react';
import { useInitExcel } from '../../logic/excel/useInitExcel';
import BlSection from './BlSection';
import { ExportContractSection } from './ExportContractSection';

export const DocsRoute = observer(() => {
    useInitExcel();

    return (
        <div className='doc-links'>
            <BlSection />
            <ExportContractSection />
        </div>
    );
});
