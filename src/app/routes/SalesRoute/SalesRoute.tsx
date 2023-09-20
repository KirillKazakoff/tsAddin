import React from 'react';
import { observer } from 'mobx-react-lite';
import { SectionErrorHOC } from '../../components/SectionErrorHOC';
import tablesStore from '../../stores/tablesStore/tablesStore';
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import { SalesContractSection } from './SalesContractSection';

export const SalesRoute = observer(() => {
    if (excelSyncStore.isLoading) return null;

    return (
        <SectionErrorHOC status={tablesStore.status.sales} title='Продажи'>
            <SalesContractSection />
        </SectionErrorHOC>
    );
});
