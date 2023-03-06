import React from 'react';

type Props = { title: string; desc: string; children: React.ReactNode };

export default function Error({ title, desc, children }: Props) {
    return (
        <div className='error-route'>
            <h2 className='error-title'>{title}</h2>
            <div className='error-desc'>{desc}</div>
            <div className='error-pic-container'>
                <div className='error-pic'>
                    <div className='absolute-loader'>
                        <div className='lds-spinner'>
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                        </div>
                    </div>
                </div>
            </div>

            {children}
        </div>
    );
}
