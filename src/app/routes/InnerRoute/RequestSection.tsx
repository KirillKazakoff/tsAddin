import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInitRequestSection } from '../../logic/docs/innerContract/useInitRequestSection';
import Input from '../../components/Input';
import { SelectPortTamozhnya } from '../../components/SelectPortTamozhnya';
import { SelectPortRu } from '../../components/SelectPortRu';

export const RequestSection = observer(() => {
    const {
        contracts,
        getRequest,
        getAllRequests,
        setField,
        portTamozhnya,
        portRu,
        terms,
    } = useInitRequestSection();

    const contractList = contracts.map((contract) => {
        const { contractNo } = contract.record;
        const onClick = () => getRequest(contract);
        return (
            <li
                className='doc-link request' onClick={onClick}
                key={contractNo}
            >
                {`№${contractNo}`}
            </li>
        );
    });

    return (
        <form className='docs__form request-section-form'>
            <h2 className='title request-section-title'>
                Request For Contract Section
            </h2>

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
            <button
                className='btn docs-all__btn'
                onClick={getAllRequests}
                type='button'
            >
                Загрузить все заявки
            </button>
        </form>
    );
});
