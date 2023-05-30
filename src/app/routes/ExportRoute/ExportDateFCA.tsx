import React from 'react';
import { observer } from 'mobx-react-lite';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import InputText from '../../components/Form/InputText';

export const ExportDateFCA = observer(() => {
    const record = exportContractStore.exportRecord;
    const title = `ETA ${record?.portTo.eng.name}:`;

    if (record?.terms !== 'FCA') return null;

    return (
        <InputText
            name='dischargeDate'
            title={title}
            placeholder={title}
            wrapperCls='export__FCA'
        />
    );
});
