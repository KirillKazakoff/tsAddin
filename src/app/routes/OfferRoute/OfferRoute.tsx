import { observer } from 'mobx-react-lite';
import React from 'react';
import { Formik } from 'formik';
import { useInitOfferSection } from '../../logic/letter/useInitOfferSection';
import { OfferExportFields } from './OfferExportFields';
import { OfferMainFields } from './OfferMainFields';
import { Form } from '../../components/Form/Form';

export const OfferRoute = observer(() => {
    const { initObj, formik } = useInitOfferSection();

    return (
        <Formik
            initialValues={formik.initialFields}
            validate={formik.validate}
            onSubmit={initObj.onLoad as any}
            innerRef={formik.formRef}
            validateOnMount
        >
            <Form className='form offer__form'>
                <div className='letter__fields-wrapper'>
                    <OfferMainFields />
                    <OfferExportFields />
                </div>
                <button type='submit' className='btn letter__btn'>
                    Создать письмо
                </button>
            </Form>
        </Formik>
    );
});
