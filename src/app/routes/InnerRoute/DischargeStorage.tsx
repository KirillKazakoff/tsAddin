import React from 'react';
import { useFormikContext } from 'formik';
import InputText from '../../components/Form/InputText';
import { TermsT } from '../../types/typesTables';

export default function DischargeStorage() {
    const context = useFormikContext<{ termsPort: TermsT }>();

    return (
        <div className='port-letter__discharge'>
            {!context.values.termsPort.includes('CFR') ? (
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
