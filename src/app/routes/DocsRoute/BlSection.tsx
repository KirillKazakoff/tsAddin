import { observer } from 'mobx-react-lite';
import React from 'react';
import { initBlSection } from '../../logic/docs/init/initBlSection';
import blStore, { OperationT } from '../../stores/docsStores/blStore';
import tablesStore from '../../stores/tablesStore/tablesStore';
import { InputEventT } from '../../types/typesUtils';

const BlSection = observer(() => {
    const { getBl, getAllBl } = initBlSection();
    const { exportT, exportStorageT } = tablesStore;

    const table = blStore.operation === 'export' ? exportT : exportStorageT;

    const blList = table.map((row) => {
        const onClick = () => getBl(row);
        return (
            <li
                className='bl' onClick={onClick}
                key={row.blNo}
            >
                {row.blNo}
            </li>
        );
    });

    const onChange = (e: InputEventT) => {
        const value = e.currentTarget.value as OperationT;
        blStore.setOperation(value);
    };

    return (
        <section className='bl-section'>
            <ul className='radio-list'>
                <div>
                    <input
                        type='radio'
                        id='export'
                        name='operation'
                        value='export'
                        onChange={onChange}
                        checked={blStore.operation === 'export'}
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
                        checked={blStore.operation === 'export_storage'}
                    />
                    <label htmlFor='export_storage'>Экспорт хранение</label>
                </div>
            </ul>
            <h2 className='title bl-title'>BL section</h2>
            <ul className='blList'>{blList}</ul>
            <button
                onClick={getAllBl} className='doc-link'
                type='button'
            >
                get all bl
            </button>
        </section>
    );
});

export default BlSection;
