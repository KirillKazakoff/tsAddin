import React from 'react';
import { observer } from 'mobx-react-lite';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import InputText from '../../components/Form/InputText';

export const ExportDepartureDate = observer(() => {
    const { currentTerms: terms } = exportContractStore;
    const title = 'ETD порт:';

    const isCFRorFCA = terms && (terms.includes('CFR') || terms.includes('FCA'));
    if (!isCFRorFCA) return null;

    return (
        <InputText
            name='departureDate'
            title={title}
            placeholder={title}
            wrapperCls='export__date'
        />
    );
});