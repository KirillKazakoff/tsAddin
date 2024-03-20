import React from 'react';
import { observer } from 'mobx-react-lite';

type Props = {
    state: boolean;
    setState: () => void;
    title: string;
    name: string;
    cls?: string;
};

export const CheckBoxComponent = observer((props: Props) => {
    return (
        <div className={`form__control select-wrapper checkbox-validation ${props.cls}`}>
            <span className='input-title'>{props.title}</span>
            <input
                name={props.name}
                type='checkbox'
                className='input-checkbox'
                checked={props.state}
                onChange={props.setState}
            />
        </div>
    );
});

//
// isValidation
