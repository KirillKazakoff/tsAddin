import React from 'react';
import { observer } from 'mobx-react-lite';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import InputText from '../../components/Form/InputText';

export const ExportDate = observer(() => {
    const { exportRecord, terms } = exportContractStore;
    const title = `ETA ${exportRecord?.portTo?.eng?.name}:`;

    const isCFRorFCA = terms && (terms.includes('CFR') || terms.includes('FCA'));
    if (!isCFRorFCA) return null;

    return (
        <InputText
            name='departureDate'
            title={title}
            placeholder={title}
            wrapperCls='export__FCA'
        />
    );
});
