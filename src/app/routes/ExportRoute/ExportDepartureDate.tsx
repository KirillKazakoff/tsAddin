import React from 'react';
import { observer } from 'mobx-react-lite';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import InputText from '../../components/Form/InputText';

export const ExportDepartureDate = observer(() => {
    const { currentTerms: terms } = exportContractStore;
    const title = 'ETD порт:';

    const isFCA = terms && terms.includes('FCA');
    if (!isFCA) return null;

    return (
        <InputText
            name='departureDate'
            title={title}
            placeholder={title}
            wrapperCls='export__date'
        />
    );
});
