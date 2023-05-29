import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInitAssortimentSection } from '../../logic/docs/assortiment/useInitAssortimentSection';
import DocsDownloadBtn from '../../components/DocsDownloadBtn';
import { Doc } from '../../components/Doc';
import exportContractStore from '../../stores/docsStores/exportContractStore';

export const AssortimentSection = observer(() => {
    const initObj = useInitAssortimentSection();
    if (!initObj) return null;
    const { onLoad, onLoadAll, samplesArr } = initObj;

    if (exportContractStore.terms === 'FCA') return null;

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

    return (
        <form className='docs__form assortiment-form'>
            <h2>Ассортимент и Образцы</h2>

            <div className='assortiment__wrapper'>
                <div className='assortiment__body'>
                    <h3>Ассортимент:</h3>
                    <DocsDownloadBtn
                        onClick={onLoad.assortiment}
                        title='Загрузить ассортимент'
                    />

                    <h3>Образцы:</h3>
                    <ul className='docs'>{sampleDocs}</ul>
                    <DocsDownloadBtn
                        onClick={onLoadAll}
                        title='Загрузить все образцы'
                    />
                </div>
            </div>
        </form>
    );
});
