import React from 'react';
import type { InnerGroupT } from '../../logic/docs/innerContract/groupByContractNo';
import { Doc } from '../../components/Doc/Doc';

type Props = { contracts: InnerGroupT[]; onLoad: any };

export default function RequestList({ contracts, onLoad }: Props) {
    const contractList = contracts.map((contract) => {
        const { row } = contract.record;
        const onClick = async () => onLoad(contract);

        return (
            <Doc
                onClick={onClick}
                title={`${row.buyer.codeName}`}
                key={row.id}
                cls={'request'}
            />
        );
    });

    return <ul className='docs request-docs'>{contractList}</ul>;
}
