import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInitRequestSection } from '../../logic/docs/innerContract/useInitRequestSection';
import Input from '../../components/Input';
import { SelectPortRu } from '../../components/Select/SelectPortRu';
import { SelectPortTamozhnya } from '../../components/Select/SelectPortTamozhnya';
import { Doc } from '../../components/Doc';
import DocsDownloadBtn from '../../components/DocsDownloadBtn';

export const RequestSection = observer(() => {
    const {
        contracts, onLoad, onLoadAll, setField, portTamozhnya, portRu, terms,
    } = useInitRequestSection();

    const contractList = contracts.map((contract) => {
        const { contractNo } = contract.record;
        const onClick = async () => onLoad(contract);
        return (
            <Doc
                onClick={onClick}
                title={`№${contractNo}`}
                key={contractNo}
                cls={'request'}
            />
        );
    });

    return (
        <form className='docs__form request-section-form'>
            <h2 className='title request-section-title'>Заявки на договора</h2>

            <h3 className='title request-title'>Заявка:</h3>

            <div className='fields-wrapper'>
                <Input
                    title='Условия продажи:'
                    placeholder='Условия продажи'
                    setter={setField.terms}
                    value={terms}
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
            <ul className='docs request-docs'>{contractList}</ul>
            <DocsDownloadBtn onClick={onLoadAll} title='Загрузить все заявки' />
        </form>
    );
});
