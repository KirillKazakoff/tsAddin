import React from 'react';

type InputT = {
    title: string;
    setter: any;
    checked: boolean;
};

export default function CheckBox(props: InputT) {
    const { title, setter, checked } = props;

    const onChange = (e: any) => {
        setter(e.currentTarget.checked);
    };

    return (
        <div className='input-wrapper'>
            <span className='input-title'>{title}</span>
            <input
                checked={checked}
                className='input-checkbox'
                onChange={onChange}
                type='checkbox'
            />
        </div>
    );
}
