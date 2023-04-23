import { observer } from 'mobx-react-lite';
import React from 'react';
import { Doc } from '../../components/Doc';
import DocsDownloadBtn from '../../components/DocsDownloadBtn';
import { useInitBlSection } from '../../logic/docs/bl/useInitBlSection';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import { OperationT } from '../../types/typesTables';
import { InputEventT } from '../../types/typesUtils';

const BlSection = observer(() => {
    const { operation } = exportContractStore;
    const { onLoad, onLoadAll, table } = useInitBlSection();

    const blList = table.map((row) => {
        const onClick = async () => onLoad(row);
        return (
            <Doc
                onClick={onClick} title={row.blNo}
                key={row.blNo}
            />
        );
    });

    const onChange = (e: InputEventT) => {
        const value = e.currentTarget.value as OperationT;
        exportContractStore.setField.operation(value);
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
            <h2 className='title bl-title'>BL</h2>
            <ul className='docs'>{blList}</ul>
            <DocsDownloadBtn onClick={onLoadAll} title='Загрузить все BL' />
        </form>
    );
});

export default BlSection;
