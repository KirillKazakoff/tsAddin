import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useInitAssortimentSection } from '../../logic/docs/assortiment/useInitAssortimentSection';
import DocsDownloadBtn from '../../components/DocsDownloadBtn';
import { Doc } from '../../components/Doc';

export const AssortimentSection = observer(() => {
    const initObj = useInitAssortimentSection();
    const { onLoad, onLoadAll, samplesArr } = initObj;

    const sampleDocs = samplesArr.map((sample) => {
        const consignee = sample.record.consignee.codeName;
        return (
            <Doc
                isPreventDefault
                onClick={() => onLoad.sample(sample)}
                key={consignee}
                title={consignee}
            />
        );
    });

    // useEffect(() => {
    //     initObj.onLoad.assortiment();
    // });

    return (
        <form className='docs__form assortiment-form'>
            <h2>Ассортимент и Образцы</h2>

            <div className='assortiment__wrapper'>
                <div className='assortiment__body'>
                    <h3>Ассортимент:</h3>
                    <DocsDownloadBtn
                        isPreventDefault
                        onClick={onLoad.assortiment}
                        title='Загрузить ассортимент'
                    />

                    <h3>Образцы:</h3>
                    <ul className='docs'>{sampleDocs}</ul>
                    <DocsDownloadBtn
                        isPreventDefault
                        onClick={onLoadAll}
                        title='Загрузить все образцы'
                    />
                </div>
            </div>
        </form>
    );
});
