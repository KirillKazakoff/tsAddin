import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInitRequestSection } from '../../logic/docs/innerContract/useInitRequestSection';
import { SelectPortRu } from '../../components/Select/SelectPortRu';
import { SelectPortTamozhnya } from '../../components/Select/SelectPortTamozhnya';
import DocsDownloadBtn from '../../components/DocsDownloadBtn';
import SelectTerms from '../../components/Select/SelectTerms';
import RequestList from './RequestList';

export const RequestSection = observer(() => {
    const initObj = useInitRequestSection();
    if (!initObj) return null;
    const {
        contracts, onLoad, onLoadAll, setField, portTamozhnya, portRu, terms,
    } = initObj;

    return (
        <form className='docs__form request-section-form'>
            <h2 className='title request-section-title'>Заявки на договора</h2>

            <h3 className='title request-title'>Заявка:</h3>

            <div className='fields-wrapper'>
                <SelectTerms
                    current={terms}
                    setter={setField.terms}
                    title={'Условия продажи'}
                />
                <SelectPortTamozhnya
                    current={portTamozhnya.codeName}
                    setter={setField.portTamozhnya}
                />
                <SelectPortRu current={portRu.codeName} setter={setField.portRu} />
            </div>

            <h3 className='title request-docs-title'>
                Загрузить заявки на договора:
            </h3>
            <RequestList contracts={contracts} onLoad={onLoad} />
            <DocsDownloadBtn onClick={onLoadAll} title='Загрузить все заявки' />
        </form>
    );
});
