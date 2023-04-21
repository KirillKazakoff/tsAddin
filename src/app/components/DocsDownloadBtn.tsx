import React from 'react';
import { useLoader } from './useLoader';

type PropsT = { title: string; onClick: () => Promise<void> };

export default function DocsDownloadBtn({ title, onClick }: PropsT) {
    const { status, onLoad } = useLoader(onClick);

    let className = 'btn docs-all__btn';
    className = status === 'loading' ? `${className} doc--loading` : className;

    return (
        <button
            onClick={onLoad} className={className}
            type='button'
        >
            {title}
        </button>
    );
}
