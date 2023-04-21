import React from 'react';

type InputT = {
    value: string;
    placeholder: string;
    title: string;
    setter: any;
    type?: string;
    required?: boolean;
};

export default function Input({
    value,
    placeholder,
    setter,
    title,
    type,
    required,
}: InputT) {
    const onChange = (e: any) => {
        setter(e.currentTarget.value);
    };

    return (
        <div className='input-wrapper'>
            <span className='input-title'>{title}</span>
            <input
                required={required}
                checked={!!value}
                className='input'
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                type={type}
            />
        </div>
    );
}

Input.defaultProps = {
    type: 'text',
    required: false,
};
