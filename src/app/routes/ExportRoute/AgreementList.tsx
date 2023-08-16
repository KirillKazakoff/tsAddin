import React from 'react';
import { observer } from 'mobx-react-lite';
import { AgreementT } from '../../logic/docs/exportContract/groupBy/initAgreement';
import exportContractStore from '../../stores/docsStores/exportContractStore';

type PropsT = { agreements: AgreementT[] };

export const AgreementList = observer(({ agreements }: PropsT) => {
    const agreementsList = agreements.map((agreement) => {
        const isActiveTab = agreement.record.agreementNo === exportContractStore.agreementNo;
        const { id } = agreement.record;
        const onClick = async () => {
            exportContractStore.setCurrentAgreementNo(agreement.record.agreementNo);
        };
        let className = 'doc-link doc-tab';
        isActiveTab ? (className = `${className} doc-tab--active`) : className;

        return (
            <button
                type='button' onClick={onClick}
                key={id} className={className}
            >
                {`№ ${id}`}
            </button>
        );
    });

    return <ul className='docs'>{agreementsList}</ul>;
});
