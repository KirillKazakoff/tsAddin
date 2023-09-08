import React from 'react';
import { observer } from 'mobx-react-lite';
import { useFormikContext } from 'formik';
import { SelectTerms } from '../../components/Select/SelectTerms';
import InputText from '../../components/Form/InputText';

export const LetterExportFields = observer(() => {
    const context = useFormikContext<{ port: string; isExport: boolean }>();
    if (!context.values.isExport) return null;

    return (
        <div className='fields-wrapper mt20'>
            <InputText
                title='ETA экспорт'
                placeholder={'Дата прибытия'}
                name={'arrivalForeign'}
            />
            <SelectTerms />
            <InputText
                title='Фишинг земля'
                placeholder='Fishing ground'
                name='ground'
            />
        </div>
    );
});
