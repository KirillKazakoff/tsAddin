/* eslint-disable comma-spacing */
/* eslint-disable @typescript-eslint/comma-dangle */
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Doc } from './Doc';

type Props<D> = {
    docs: D[];
    docSettings: (doc: D) => {
        isNull?: boolean;
        title: string;
        key: string;
        onClick: () => Promise<void>;
        cls?: string;
    };
};

export type DocSettingsT<D> = Props<D>['docSettings'];

export const DocList = observer(<T,>({ docs, docSettings }: Props<T>) => {
    const docList = docs.map((doc) => {
        const {
            key, onClick, title, cls, isNull,
        } = docSettings(doc);

        if (isNull) return null;

        return (
            <Doc
                onClick={onClick} title={title}
                key={key} cls={cls}
            />
        );
    });

    return <ul className='docs port-letter-docs'>{docList}</ul>;
});
