import React from 'react';

type InputT = {
    value: string;
    placeholder: string;
    setter: any;
};

export default function Input({ value, placeholder, setter }: InputT) {
    const onChange = (e: any) => {
        setter(e.currentTarget.value);
    };

    return (
        <div className='input-wrapper'>
            <input
                className='input'
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
