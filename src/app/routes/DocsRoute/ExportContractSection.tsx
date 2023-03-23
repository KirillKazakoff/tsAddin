import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { createExportContract } from '../../logic/docs/createDoc';
import tablesStore from '../../stores/tablesStore/tablesStore';

export const ExportContractSection = observer(() => {
    const { exportT } = tablesStore;
    const getContract = () => createExportContract(exportT[0]);

    useEffect(() => {
        if (exportT.length === 0) return;
        getContract();
    });

    return (
        <section className='export-contract'>
            <h2>Export Contract Section</h2>
            <button
                onClick={getContract} className='doc-link'
                type='button'
            >
                get all bl
            </button>
        </section>
    );
});
