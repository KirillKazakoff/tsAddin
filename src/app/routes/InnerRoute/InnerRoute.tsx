import React from 'react';
import { observer } from 'mobx-react-lite';
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';
import { PortLetterSection } from './PortLetterSection';
import tablesStore from '../../stores/tablesStore/tablesStore';
import { InnerContractSection } from './InnerContractSection';
import { RequestSection } from './RequestSection';
import { FescoLetterSection } from './FescoLetterSection';

export const InnerRoute = observer(() => {
    if (excelSyncStore.isLoading) return null;

    if (tablesStore.innerT.length === 0) {
        return (
            <div className='docs__form docs__form--empty'>
                {'Таблица Inner Market пуста'}
            </div>
        );
    }

    return (
        <div className='doc-links'>
            <InnerContractSection />
            {tablesStore.fescoContainers.length === 0 ? (
                <>
                    <RequestSection />
                    <PortLetterSection />
                </>
            ) : (
                <>
                    <RequestSection />
                    <FescoLetterSection />
                </>
            )}
        </div>
    );
});
