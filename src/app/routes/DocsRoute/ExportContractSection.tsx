import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import tablesStore from '../../stores/tablesStore/tablesStore';
import { createExportContract } from '../../logic/docs/exportContract/createExportContract';
import { groupByAggrementNo } from '../../logic/docs/exportContract/groupByAggrementNo';

export const ExportContractSection = observer(() => {
    const agreementObj = groupByAggrementNo();
    const agreementFirst = Object.values(agreementObj)[0];

    const getContract = () => createExportContract(agreementFirst);

    // useEffect(() => {
    //     if (exportT.length === 0) return;
    //     getContract();
    // });

    return (
        <section className='export-contract'>
            <h2>Export Contract Section</h2>
            <button
                onClick={getContract} className='doc-link'
                type='button'
            >
                get all export contracts
            </button>
        </section>
    );
});
