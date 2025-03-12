import { observer } from 'mobx-react-lite';
import React from 'react';
import { Doc } from '../../components/Doc/Doc';
import DocsDownloadBtn from '../../components/Doc/DocsDownloadBtn';
import { initBlSection } from '../../logic/docs/bl/initBlSection';
import { CheckBoxComponent } from '../../components/CheckBox/CheckBoxComponent';
import blStore from '../../stores/docsStores/blStore';
import { InputTextNoFormik } from '../../components/Form/InputText';

export const BlSection = observer(() => {
    const initObj = initBlSection();
    const { blGroupsArr, onLoad, onLoadAll } = initObj;

    const blDocs = blGroupsArr.map((group) => {
        const onClick = async () => onLoad(group);
        return (
            <Doc
                onClick={onClick}
                title={group.record.blNo}
                key={group.record.blNo}
                isPreventDefault
            />
        );
    });

    return (
        <form className='docs__form bl-form'>
            <h2 className='title bl-title'>BL</h2>
            <ul className='docs'>{blDocs}</ul>

            <InputTextNoFormik
                input={{
                    name: 'sea',
                    title: 'Море Район:',
                    placeholder: 'Охотское по умолчанию',
                }}
                value={blStore.catchZone}
                setter={blStore.setCatchZone()}
            />
            <CheckBoxComponent
                cls='checkbox-bl'
                state={blStore.isSortable}
                name='isSortable'
                title='Разделять по сортам'
                setState={() => blStore.setSortable(!blStore.isSortable)}
            />
            <DocsDownloadBtn
                onClick={onLoadAll}
                title='Загрузить все BL'
                isPreventDefault
            />
        </form>
    );
});
