import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInitAssortimentSection } from '../../logic/docs/assortiment/useInitAssortimentSection';
import { Doc } from '../../components/Doc/Doc';
import DocsDownloadBtn from '../../components/Doc/DocsDownloadBtn';
import tablesStore from '../../stores/tablesStore/tablesStore';
import { SectionErrorHOC } from '../../components/SectionErrorHOC';

export const SectionComponent = observer(() => {
    const initObj = useInitAssortimentSection();
    const { onLoad, onLoadAll, samples } = initObj;

    const sampleDocs = samples.map((sample) => {
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

    if (samples.length === 0) return null;

    return (
        <form className='docs__form assortiment-form'>
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

export const AssortimentSection = () => {
    const { export: exportS, exportStorage } = tablesStore.status;
    const status = exportS.statusType !== 'ok' ? exportS : exportStorage;

    return (
        <SectionErrorHOC status={status} title='Ассортимент и Образцы'>
            <SectionComponent />
        </SectionErrorHOC>
    );
};
