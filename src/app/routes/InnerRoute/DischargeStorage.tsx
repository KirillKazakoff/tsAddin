import React from 'react';
import { useFormikContext } from 'formik';
import CheckBoxFormik from '../../components/CheckBoxFormik';
import InputText from '../../components/Form/InputText';

export default function DischargeStorage() {
    const context = useFormikContext<{ isCFR: boolean }>();

    return (
        <div className='port-letter__discharge'>
            <CheckBoxFormik name='isCFR' title='Передача с борта' />
            {!context.values.isCFR ? (
                <>
                    <InputText
                        name='storageFrom'
                        title='Хранение продавца с:'
                        placeholder='Хранение с'
                    />
                    <InputText
                        name='storageTo'
                        title='Хранение продавца до:'
                        placeholder='Хранение до'
                    />
                </>
            ) : null}
        </div>
    );
}
