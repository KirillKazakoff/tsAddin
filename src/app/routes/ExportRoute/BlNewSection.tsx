import { observer } from 'mobx-react-lite';
import React from 'react';
import { Doc } from '../../components/Doc/Doc';
import DocsDownloadBtn from '../../components/Doc/DocsDownloadBtn';
import { useInitNewBlSection } from '../../logic/docs/bl/newBl/useInitNewBlSection';

export const BlNewSection = observer(() => {
    const initObj = useInitNewBlSection();
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
            <h2 className='title bl-title'>BL NEW SECTION</h2>
            <ul className='docs'>{blDocs}</ul>
            <DocsDownloadBtn
                onClick={onLoadAll}
                title='Загрузить все BL'
                isPreventDefault
            />
        </form>
    );
});
