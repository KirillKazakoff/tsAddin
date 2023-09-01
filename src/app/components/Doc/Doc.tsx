import React from 'react';
import { useLoader } from './useLoader';

export type DocT = {
    title: string;
    onClick: () => Promise<void>;
    cls?: string;
    isPreventDefault?: boolean;
};
export type StatusT = 'loading' | 'error' | 'loaded' | 'init';

export const Doc = (props: DocT) => {
    const {
        title, onClick, cls, isPreventDefault,
    } = props;
    const { onLoad, status } = useLoader(onClick, isPreventDefault);

    let className = `doc-link ${cls}`;
    const clsSuffix = status === 'loading' ? 'doc--loading' : '';
    className = `${className} ${clsSuffix}`;

    return (
        <button
            type='submit' onClick={onLoad}
            className={className}
        >
            {title}
        </button>
    );
};

Doc.defaultProps = {
    cls: '',
    isPreventDefault: false,
};
