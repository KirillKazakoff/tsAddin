import { observer } from 'mobx-react-lite';
import React from 'react';
import { Doc } from '../../components/Doc';
import DocsDownloadBtn from '../../components/DocsDownloadBtn';
import { useInitBlSection } from '../../logic/docs/bl/useInitBlSection';

const BlSection = observer(() => {
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

    return (
        <form className='docs__form bl-form'>
            <h2 className='title bl-title'>BL</h2>
            <ul className='docs'>{blList}</ul>
            <DocsDownloadBtn onClick={onLoadAll} title='Загрузить все BL' />
        </form>
    );
});

export default BlSection;
