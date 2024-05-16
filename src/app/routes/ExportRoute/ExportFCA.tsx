import React from 'react';
import { observer } from 'mobx-react-lite';
import InputText from '../../components/Form/InputText';
import exportContractStore from '../../stores/docsStores/exportContractStore';

export const ExportFCA = observer(() => {
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
