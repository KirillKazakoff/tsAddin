import React from 'react';

type InputT = {
    placeholder: string;
    title: string;
    setter: any;
    type: string;
    checked: boolean;
};

export default function CheckBox(props: InputT) {
    const {
        placeholder, title, setter, type, checked,
    } = props;

    const onChange = (e: any) => {
        setter(e.currentTarget.checked);
    };

    return (
        <div className='input-wrapper'>
            <span className='input-title'>{title}</span>
            <input
                checked={checked}
                className='input-checkbox'
                placeholder={placeholder}
                onChange={onChange}
                type={type}
            />
        </div>
    );
}
