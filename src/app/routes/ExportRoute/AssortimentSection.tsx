import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInitAssortimentSection } from '../../logic/docs/assortiment/useInitAssortimentSection';
import DocsDownloadBtn from '../../components/DocsDownloadBtn';

export const AssortimentSection = observer(() => {
    const onLoad = useInitAssortimentSection();
    return (
        <form className='docs__form assortiment-form'>
            <h2>Ассортимент</h2>
            <DocsDownloadBtn onClick={onLoad} title='Загрузить ассортимент' />
        </form>
    );
});
