import React from 'react';
import { observer } from 'mobx-react-lite';
import InputText from '../../components/Form/InputText';

export const SalesCrabFilling = observer(() => {
    const title = 'Процент наполнения:';

    return (
        <InputText
            name='filling' title={title}
            placeholder={title}
        />
    );
});
