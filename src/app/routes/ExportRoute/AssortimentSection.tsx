import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useInitAssortimentSection } from '../../logic/docs/assortiment/useInitAssortimentSection';
import DocsDownloadBtn from '../../components/DocsDownloadBtn';
import { Doc } from '../../components/Doc';

export const AssortimentSection = observer(() => {
    const { onLoad, onLoadAll, samplesArr } = useInitAssortimentSection();
    const sampleDocs = samplesArr.map((sample) => {
        const consignee = sample.record.consignee.codeName;
        return (
            <Doc
                onClick={() => onLoad.sample(sample)}
                key={consignee}
                title={consignee}
            />
        );
    });

    useEffect(() => {
        // onLoad.assortiment();
    }, []);

    return (
        <form className='docs__form assortiment-form'>
            <h2>Ассортимент</h2>
            <DocsDownloadBtn
                onClick={onLoad.assortiment}
                title='Загрузить ассортимент'
            />

            <h2>Образцы</h2>
            <ul className='docs'>{sampleDocs}</ul>
            <DocsDownloadBtn onClick={onLoadAll} title='Загрузить все образцы' />
        </form>
    );
});
