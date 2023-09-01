import React from 'react';
import { observer } from 'mobx-react-lite';
import pageStatusStore from '../stores/pageStatusStore.ts/pageStatusStore';

export const CheckBoxValidation = observer(() => {
    const onChange = () => {
        pageStatusStore.setIsValidation(!pageStatusStore.isValidation);
    };

    return (
        <div className={'form__control select-wrapper checkbox-validation'}>
            <span className='input-title'>{'Проверка формы:'}</span>
            <input
                name='isValidation'
                type='checkbox'
                className='input-checkbox'
                checked={pageStatusStore.isValidation}
                onChange={onChange}
            />
        </div>
    );
});
