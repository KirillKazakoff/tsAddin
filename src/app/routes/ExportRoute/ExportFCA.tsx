import React from 'react';
import { observer } from 'mobx-react-lite';
import InputText from '../../components/Form/InputText';
import exportContractStore from '../../stores/docsStores/exportContractStore';

export const ExportFCAEXW = observer(() => {
    const { currentTerms: terms } = exportContractStore;
    const title = 'ETD порт:';

    const isFCA = terms && terms.includes('FCA');
    // adding EXW from 22.07.26
    if (!isFCA && terms !== 'EXW') return null;

    return (
        <InputText
            name='departureDate'
            title={title}
            placeholder={title}
            wrapperCls='export__date'
        />
    );
});
