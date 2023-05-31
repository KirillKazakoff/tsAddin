import React from 'react';
import { ContractT } from '../../logic/docs/innerContract/groupByContractNo';
import { Doc } from '../../components/Doc';

type Props = { contracts: ContractT[]; onLoad: any };

export default function RequestList({ contracts, onLoad }: Props) {
    const contractList = contracts.map((contract) => {
        const { contractNo } = contract.record;
        const onClick = async () => onLoad(contract);

        return (
            <Doc
                onClick={onClick}
                title={`${contract.record.buyer.codeName}`}
                key={contractNo}
                cls={'request'}
            />
        );
    });

    return <ul className='docs request-docs'>{contractList}</ul>;
}
