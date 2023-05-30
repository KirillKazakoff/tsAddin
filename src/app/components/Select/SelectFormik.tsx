import { Field, FieldHookConfig, useField } from 'formik';
import React from 'react';
import Feedback from '../Form/Feedback';

type Props = FieldHookConfig<string> & { title: string; options: string[] };

export default function SelectFormik(props: Props) {
    const [field, meta, helpers] = useField(props);
    const invalidCls = meta.error && meta.touched ? 'form__control--invalid' : '';

    const optionsList = props.options.map((option) => (
        <option key={option} value={option}>
            {option}
        </option>
    ));

    return (
        <div className={`form__control select-wrapper ${invalidCls}`}>
            <span className='select-title'>{props.title}</span>
            <Field
                as='select' className='select'
                name={props.name}
            >
                <option className='option--disabled'>{''}</option>
                {optionsList}
            </Field>

            <Feedback name={props.name} />
        </div>
    );
}
