import React from 'react';

type InputT = {
    value: string;
    placeholder: string;
    title: string;
    setter: any;
};

export default function Input({
    value, placeholder, setter, title,
}: InputT) {
    const onChange = (e: any) => {
        setter(e.currentTarget.value);
    };

    return (
        <div className='input-wrapper'>
            <span className='input-title'>{title}</span>
            <input
                className='input'
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
