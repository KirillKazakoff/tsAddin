import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useInitAssortimentSection } from '../../logic/docs/assortiment/useInitAssortimentSection';
import DocsDownloadBtn from '../../components/DocsDownloadBtn';
import { Doc } from '../../components/Doc';
import Input from '../../components/Input';
import exportContractStore from '../../stores/docsStores/exportContractStore';

export const AssortimentSection = observer(() => {
    const { setField } = exportContractStore;
    const initObj = useInitAssortimentSection();
    if (!initObj) return null;
    const { onLoad, onLoadAll, samplesArr } = initObj;

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

    const dateTitle = `ETA ${samplesArr[0].record.portTo.eng.name}:`;

    return (
        <form className='docs__form assortiment-form'>
            <h2>Ассортимент и Образцы</h2>
            <div className='assortiment__wrapper'>
                <Input
                    title={dateTitle}
                    placeholder={dateTitle}
                    setter={setField.dischargeDate}
                    value={exportContractStore.dischargeDate}
                />

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
