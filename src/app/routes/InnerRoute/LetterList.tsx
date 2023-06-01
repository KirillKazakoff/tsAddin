import React from 'react';
import { Doc } from '../../components/Doc';
import { ContractT } from '../../logic/docs/innerContract/groupByContractNo';

type Props = { contracts: ContractT[]; onLoad: any };

export default function LetterList({ contracts, onLoad }: Props) {
    const letterList = contracts.map((contract) => {
        const { buyer, contractNo } = contract.record;
        const onClick = () => onLoad(contract);

        return (
            <Doc
                onClick={onClick}
                title={`${buyer.codeName}`}
                key={contractNo}
                cls='port-letter'
            />
        );
    });

    return <ul className='docs port-letter-docs'>{letterList}</ul>;
}
