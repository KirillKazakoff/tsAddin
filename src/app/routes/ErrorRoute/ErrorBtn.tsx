import React from 'react';

type Props = { onClick: () => void; desc: string };

export default function ErrorBtn({ onClick, desc }: Props) {
    return (
        <button
            type='button' className='btn btn-back'
            onClick={onClick}
        >
            {desc}
        </button>
    );
}
