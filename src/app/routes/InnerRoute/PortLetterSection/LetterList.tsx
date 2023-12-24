import React from 'react';
import { Doc } from '../../../components/Doc/Doc';
import type { InnerGroupT } from '../../../logic/docs/inner/groupByContractNo';

type Props = { contracts: InnerGroupT[]; onLoad: any };

export default function LetterList({ contracts, onLoad }: Props) {
    const letterList = contracts.map((contract) => {
        const { buyer, id: contractNo } = contract.record.row;
        const onClick = () => onLoad(contract);

        return (
            <Doc
                onClick={onClick}
                title={`${buyer.code}`}
                key={contractNo}
                cls='port-letter'
            />
        );
    });

    return <ul className='docs port-letter-docs'>{letterList}</ul>;
}
