import React from 'react';
import { Doc } from '../../components/Doc/Doc';
import type { InnerGroupT } from '../../logic/docs/innerContract/groupByContractNo';

type Props = { contracts: InnerGroupT[]; onLoad: any };

export default function LetterList({ contracts, onLoad }: Props) {
    const letterList = contracts.map((contract, i) => {
        const { buyer, id: contractNo } = contract.record.row;
        const onClick = () => onLoad(contract);

        return (
            <Doc
                onClick={onClick}
                title={`${buyer.codeName}-${contract.index}`}
                key={contractNo}
                cls='port-letter'
            />
        );
    });

    return <ul className='docs port-letter-docs'>{letterList}</ul>;
}
