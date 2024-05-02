import {
    Field,
    FieldHookConfig,
    FieldInputProps,
    useField,
    useFormikContext,
} from 'formik';
import React from 'react';
import Feedback from '../Form/Feedback';

type Props = FieldHookConfig<string> & {
    title: string;
    wrapperCls?: string;
};

const CheckBoxComponent = ({
    field,
    checked,
}: {
    field: FieldInputProps<string>;
    checked: boolean;
}) => {
    return (
        <input
            {...field} type='checkbox'
            className='input-checkbox' checked={checked}
        />
    );
};

export default function CheckBox(props: Props) {
    const [field, meta] = useField(props);
    const { values } = useFormikContext() as any;
    const invalidCls = meta.error && meta.touched ? 'form__control--invalid' : '';

    return (
        <div className={`form__control select-wrapper ${invalidCls} ${props.wrapperCls}`}>
            <span className='input-title'>{props.title}</span>
            <Field
                type='checkbox'
                name={field.name}
                checked={values[field.name]}
                component={CheckBoxComponent}
            />
            <Feedback name={props.name} />
        </div>
    );
}

CheckBox.defaultProps = {
    wrapperCls: '',
};
