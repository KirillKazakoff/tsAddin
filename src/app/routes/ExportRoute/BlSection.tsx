import { observer } from 'mobx-react-lite';
import React from 'react';
import { Doc } from '../../components/Doc/Doc';
import DocsDownloadBtn from '../../components/Doc/DocsDownloadBtn';
import { useInitBlSection } from '../../logic/docs/bl/useInitBlSection';

export const BlSection = observer(() => {
    const initObj = useInitBlSection();
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
            <DocsDownloadBtn
                onClick={onLoadAll}
                title='Загрузить все BL'
                isPreventDefault
            />
        </form>
    );
});
