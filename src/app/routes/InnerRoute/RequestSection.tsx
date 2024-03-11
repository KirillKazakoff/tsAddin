import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInitRequestNew } from '../../logic/docs/inner/request/useInitRequestNew';
import { DocList } from '../../components/Doc/DocList';
import { SectionErrorHOC } from '../../components/SectionErrorHOC';
import tablesStore from '../../stores/tablesStore/tablesStore';

const SectionComponent = observer(() => {
    const { docs, onLoad } = useInitRequestNew();

    return (
        <DocList
            docs={docs}
            docSettings={(doc) => {
                const { row } = doc.record;
                return {
                    title: `Cчет ${row?.buyer?.code}`,
                    onClick: () => onLoad(doc),
                    key: `${row.id}${row?.buyer?.code}`,
                    isNull: row.type !== 'innerT',
                };
            }}
        />
    );
});

export const RequestSection = () => (
    <SectionErrorHOC status={tablesStore.status.inner} title='Счета Вн.Рынок'>
        <SectionComponent />
    </SectionErrorHOC>
);
