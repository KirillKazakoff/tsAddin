import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInitRequestSection } from '../../logic/docs/innerContract/useInitRequestSection';
import Input from '../../components/Input';
import { SelectPortTamozhnya } from '../../components/SelectPortTamozhnya';

export const RequestSection = observer(() => {
    const {
        contracts, getRequest, getAllRequests, setPort, setTerms, port, terms,
    } = useInitRequestSection();

    const contractList = Object.values(contracts).map((contract) => {
        const { contractNo } = contract.record;
        const onClick = () => getRequest(contract);
        return (
            <li
                className='doc-link request' onClick={onClick}
                key={contractNo}
            >
                {contractNo}
            </li>
        );
    });

    return (
        <form className='docs__form request-section-form'>
            <h2 className='title request-section-title'>
                Request for contract section
            </h2>

            <h3 className='title request-title'>Заявка:</h3>

            <div className='fields-wrapper'>
                <Input
                    title='Условия продажи:'
                    placeholder='Условия продажи'
                    setter={setTerms}
                    value={terms}
                />
                <SelectPortTamozhnya current={port.ru.name} setter={setPort} />
            </div>

            <h3 className='title request-docs-title'>Загрузить номера заявок</h3>
            <ul className='docs request-docs'>{contractList}</ul>
        </form>
    );
});
