import React from 'react';
import { useLoader } from './useLoader';

type PropsT = {
    title: string;
    onClick: () => Promise<void>;
    isPreventDefault?: boolean;
    cls?: string;
};

export default function DocsDownloadBtn(props: PropsT) {
    const {
        title, onClick, isPreventDefault, cls,
    } = props;
    const { status, onLoad } = useLoader(onClick, isPreventDefault);

    let className = `btn docs-all__btn ${cls}`;
    className = status === 'loading' ? `${className} doc--loading` : className;

    return (
        <button
            onClick={onLoad} className={className}
            type='submit'
        >
            {title}
        </button>
    );
}

DocsDownloadBtn.defaultProps = {
    isPreventDefault: false,
    cls: '',
};
