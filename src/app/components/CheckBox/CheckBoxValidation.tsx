import React from 'react';
import { observer } from 'mobx-react-lite';
import pageStatusStore from '../../stores/pageStatusStore.ts/pageStatusStore';
import { CheckBoxComponent } from './CheckBoxComponent';

export const CheckBoxValidation = observer(() => {
    const onChange = () => {
        pageStatusStore.setIsValidation(!pageStatusStore.isValidation);
    };

    return (
        <CheckBoxComponent
            state={pageStatusStore.isValidation}
            setState={onChange}
            title='Проверка формы:'
            name='isValidation'
        />
    );
});
