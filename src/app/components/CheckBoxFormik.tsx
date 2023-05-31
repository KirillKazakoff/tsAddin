import { Field, FieldHookConfig, useField } from 'formik';
import React, { useEffect } from 'react';
import Feedback from './Form/Feedback';

type Props = FieldHookConfig<string> & {
    title: string;
    wrapperCls?: string;
};

export default function CheckBoxFormik(props: Props) {
    const [field, meta] = useField(props);
    const invalidCls = meta.error && meta.touched ? 'form__control--invalid' : '';

    useEffect(() => {
        console.log(field.value);
    });

    return (
        <div
            className={`form__control select-wrapper ${invalidCls} ${props.wrapperCls}`}
        >
            <span className='input-title'>{props.title}</span>
            <Field
                type='checkbox'
                value={props.value}
                name={props.name}
                className='input-checkbox'
            />
            <Feedback name={props.name} />
        </div>
    );
}

CheckBoxFormik.defaultProps = {
    wrapperCls: '',
};
