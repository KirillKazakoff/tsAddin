import React from 'react';
import { observer } from 'mobx-react-lite';
import Input from '../../components/Input';
import exportContractStore from '../../stores/docsStores/exportContractStore';

export const ExportDateFCA = observer(() => {
    const record = exportContractStore.exportRecord;
    const title = `ETA ${record?.portTo.eng.name}:`;

    if (record?.terms !== 'FCA') return null;

    return (
        <div className='export__FCA'>
            <Input
                title={title}
                placeholder={title}
                setter={exportContractStore.setField.dischargeDate}
                value={exportContractStore.fields.dischargeDate}
            />
        </div>
    );
});
