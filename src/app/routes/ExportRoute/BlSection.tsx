import { observer } from 'mobx-react-lite';
import React from 'react';
import { initBlSection } from '../../logic/docs/bl/initBlSection';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import { OperationT } from '../../types/typesTables';
import { InputEventT } from '../../types/typesUtils';

const BlSection = observer(() => {
    const { operation } = exportContractStore;
    const { getBl, getAllBl, table } = initBlSection();

    const blList = table.map((row) => {
        const onClick = () => getBl(row);
        return (
            <li
                className='doc-link bl' onClick={onClick}
                key={row.blNo}
            >
                {row.blNo}
            </li>
        );
    });

    const onChange = (e: InputEventT) => {
        const value = e.currentTarget.value as OperationT;
        exportContractStore.setOperation(value);
    };

    return (
        <form className='docs__form bl-form'>
            <ul className='radio-list'>
                <div>
                    <input
                        type='radio'
                        id='export'
                        name='operation'
                        value='export'
                        onChange={onChange}
                        checked={operation === 'export'}
                    />
                    <label htmlFor='export'>Экспорт</label>
                </div>
                <div>
                    <input
                        type='radio'
                        id='export_storage'
                        name='operation'
                        value='export_storage'
                        onChange={onChange}
                        checked={operation === 'export_storage'}
                    />
                    <label htmlFor='export_storage'>Экспорт хранение</label>
                </div>
            </ul>
            <h2 className='title bl-title'>BL section</h2>
            <ul className='docs'>{blList}</ul>
            <button
                onClick={getAllBl} className='btn docs-all__btn'
                type='button'
            >
                get all bl
            </button>
        </form>
    );
});

export default BlSection;
