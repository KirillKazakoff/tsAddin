import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useInitExcel } from '../../logic/excel/useInitExcel';
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import BlSection from './BlSection';
import { ExportContractSection } from './ExportContractSection';

export const DocsRoute = observer(() => {
    useInitExcel();

    // useEffect(() => {
    //     const test = async () => {
    //         const baseUrl = 'http://localhost:9092/pdf';
    //         const res = await (await fetch(baseUrl)).json();
    //         console.log(res);
    //     };

    //     test();
    // }, []);

    if (excelSyncStore.isLoading) return null;

    return (
        <div className='doc-links'>
            <BlSection />
            <ExportContractSection />
        </div>
    );
});
