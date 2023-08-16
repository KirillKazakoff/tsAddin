import React from 'react';
import { observer } from 'mobx-react-lite';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import InputText from '../../components/Form/InputText';

export const ExportDeclarationEXW = observer(() => {
    if (exportContractStore.operation !== 'export') return null;
    if (exportContractStore.currentTerms !== 'EXW') return null;

    return (
        <InputText
            name='declaration'
            title='Введите номер ВТД'
            placeholder='Введите номер'
        />
    );
});
