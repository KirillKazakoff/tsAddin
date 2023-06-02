import React from 'react';
import { observer } from 'mobx-react-lite';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import { OperationT } from '../../types/typesTables';
import { InputEventT } from '../../types/typesUtils';

export const ExportRadio = observer(() => {
    const { operation } = exportContractStore;

    const onChange = (e: InputEventT) => {
        const value = e.currentTarget.value as OperationT;
        exportContractStore.setOperation(value);
    };

    return (
        <div className='export-radio'>
            <h2 className='export-radio__title'>Выберите таблицу</h2>
            <ul className='radio-list'>
                <li className='radio-wrapper'>
                    <input
                        type='radio'
                        id='export'
                        name='operation'
                        value='export'
                        onChange={onChange}
                        checked={operation === 'export'}
                    />
                    <label htmlFor='export'>Экспорт</label>
                </li>
                <li className='radio-wrapper'>
                    <input
                        type='radio'
                        id='export_storage'
                        name='operation'
                        value='export_storage'
                        onChange={onChange}
                        checked={operation === 'export_storage'}
                    />
                    <label htmlFor='export_storage'>Экспорт хранение</label>
                </li>
            </ul>
        </div>
    );
});
