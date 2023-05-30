import React from 'react';
import { AgreementT } from '../../logic/docs/exportContract/groupBy/initAgreement';
import { Doc } from '../../components/Doc';

type PropsT = { agreements: AgreementT[]; onLoad: any };

export default function AgreementList({ agreements, onLoad }: PropsT) {
    const agreementsList = agreements.map((agreement) => {
        const { id } = agreement.record;
        const onClick = async () => onLoad(agreement);

        return (
            <Doc
                onClick={onClick}
                title={`№ ${id}`}
                key={id}
                cls={'export-contract'}
            />
        );
    });

    return <ul className='docs'>{agreementsList}</ul>;
}
