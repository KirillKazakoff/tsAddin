import { useEffect } from 'react';
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { createExportContractDoc } from './createExportContractDoc';
import { groupAgByNo } from './groupBy/groupAgByNo';
import { AgreementT } from './groupBy/initAgreement';

export const useInitContractSection = () => {
    const agreementObj = groupAgByNo();
    const agreements = Object.values(agreementObj);
    const { setField } = exportContractStore;

    const onLoad = async (agreement: AgreementT) => createExportContractDoc(agreement);
    const title = exportContractStore.terms === 'FCA'
        ? 'Экспорт Контракт(FCA)'
        : 'Экспорт Контракт';

    useEffect(() => {
        exportContractStore.setField.podpisant('Котов Н.М.');
    }, []);

    return {
        onLoad,
        setField,
        agreements,
        title,
    };
};

export type InitContractObjT = ReturnType<typeof useInitContractSection>;
