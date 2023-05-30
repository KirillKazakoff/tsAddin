import { Field, FieldHookConfig, useField } from 'formik';
import React from 'react';
import Feedback from './Feedback';

type Props = FieldHookConfig<string> & { wrapperCls?: string; title: string };

export default function InputText(props: Props) {
    const [field, meta] = useField(props);
    const invalidCls = meta.error && meta.touched ? 'form__control--invalid' : '';

    return (
        <div
            className={`form__control input-wrapper ${props.wrapperCls} ${invalidCls}`}
        >
            <span className='input-title'>{props.title}</span>
            <Field
                autoComplete='off'
                autoFocus={props.autoFocus}
                name={props.name}
                className='input-text'
                type={props.type || 'text'}
                placeholder={props.placeholder}
            />

            <Feedback name={props.name} />
        </div>
    );
}

InputText.defaultProps = {
    wrapperCls: '',
};
