import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInitExcel } from '../../logic/excel/useInitExcel';
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';

export const InnerRoute = observer(() => {
    useInitExcel();

    if (excelSyncStore.isLoading) return null;

    return <div className='doc-links'>hello</div>;
});
