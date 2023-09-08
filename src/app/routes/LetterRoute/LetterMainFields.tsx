import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { SelectPortRu } from '../../components/Select/SelectPortRu';
import { SelectPortZarubezh } from '../../components/Select/SelectPortZarubezh';
import InputText from '../../components/Form/InputText';
import CheckBox from '../../components/CheckBox';

export const LetterMainFields = observer(() => {
    const context = useFormikContext<{ port: string; isExport: boolean }>();
    const SelectPort = context.values.isExport ? SelectPortZarubezh : SelectPortRu;

    useEffect(() => {
        context.setFieldValue('port', '');
    }, [context.values.isExport]);

    return (
        <div className='fields-wrapper'>
            <CheckBox
                wrapperCls='letter__checkbox'
                title='Предложение на экспорт:'
                name='isExport'
            />
            <InputText
                title={
                    context.values.isExport ? 'ETD Владивосток' : 'ETA Владивосток'
                }
                placeholder={
                    context.values.isExport ? 'Дата отбытия' : 'Дата прибытия'
                }
                name='arrivalVld'
            />
            <SelectPort name='port' />
            <InputText
                title='Дата оплаты'
                placeholder='Дата оплаты'
                name='payment'
            />
        </div>
    );
});
