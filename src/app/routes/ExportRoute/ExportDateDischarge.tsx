import React from 'react';
import { observer } from 'mobx-react-lite';
import Input from '../../components/Input';
import exportContractStore from '../../stores/docsStores/exportContractStore';

export const ExportDateDischarge = observer(() => {
    const portName = exportContractStore.getCurrentTable()[0].portTo.eng.name;
    const title = `ETA ${portName}:`;

    return (
        <div className='export-section__date'>
            <h2 className='title'>Дата прибытия:</h2>

            <Input
                title={title}
                placeholder={title}
                setter={exportContractStore.setField.dischargeDate}
                value={exportContractStore.dischargeDate}
            />
        </div>
    );
});
