import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInitPortLetter } from '../../logic/docs/innerContract/useInitPortLetter';
import { SelectPortRu } from '../../components/SelectPortRu';

export const PortLetterSection = observer(() => {
    const { contracts, getAllLetters, getLetter } = useInitPortLetter();
    const letterList = contracts.map((contract) => {
        const { buyer, contractNo } = contract.record;
        const onClick = () => getLetter(contract);

        return (
            <li
                className='doc-link port-letter' onClick={onClick}
                key={contractNo}
            >
                {`${buyer.codeName} №${contractNo}`}
            </li>
        );
    });

    return (
        <form className='docs__form port-letter-form'>
            <h2 className='title port-letter-title'>Port Letter Section</h2>
            <h3>Письмо:</h3>
            {/* <SelectPortRu current=''> */}
            <h3>Загрузить письма в порт</h3>
            <ul className='docs port-letter-docs'>{letterList}</ul>
            <button
                className='btn docs-all__btn'
                onClick={getAllLetters}
                type='button'
            >
                Загрузить все письма
            </button>
        </form>
    );
});
