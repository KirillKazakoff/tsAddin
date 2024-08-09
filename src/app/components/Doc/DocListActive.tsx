import React from 'react';
import { observer } from 'mobx-react-lite';

type DocT = { record: { id: string; idContract: string } } & unknown;
type StoreT = { currentId: string; setCurrentId: (id: string) => void } & unknown;

type Props = { docs: DocT[]; store: StoreT };

export const DocListActive = observer(({ docs, store }: Props) => {
    const docList = docs.map((doc) => {
        const { id, idContract } = doc.record;
        const onClick = async () => {
            store.setCurrentId(id);
        };

        const isActiveTab = doc.record.id === store.currentId;
        let className = 'doc-link doc-tab';
        isActiveTab ? (className = `${className} doc-tab--active`) : className;

        return (
            <button
                type='button' onClick={onClick}
                key={id} className={className}
            >
                {`№ ${idContract}`}
            </button>
        );
    });

    return <ul className='docs'>{docList}</ul>;
});
