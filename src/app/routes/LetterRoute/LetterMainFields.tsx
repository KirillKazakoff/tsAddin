import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { SelectPortRuFormik } from '../../components/Select/SelectPortRu';
import { SelectPortZarubezhFormik } from '../../components/Select/SelectPortZarubezh';
import InputText from '../../components/Form/InputText';
import CheckBoxFormik from '../../components/CheckBoxFormik';

export const LetterMainFields = observer(() => {
    const context = useFormikContext<{ port: string; isExport: boolean }>();
    const SelectPort = context.values.isExport
        ? SelectPortZarubezhFormik
        : SelectPortRuFormik;

    useEffect(() => {
        context.setFieldValue('port', '');
    }, [context.values.isExport]);

    return (
        <div className='letter__fields'>
            <InputText
                title='ETA Владивосток'
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
            <CheckBoxFormik title='Предложение на экспорт' name='isExport' />
        </div>
    );
});
