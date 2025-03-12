import { observer } from 'mobx-react-lite';
import React from 'react';
import { Formik } from 'formik';
import { useInitOfferSection } from '../../logic/letter/useInitOfferSection';
import { LetterExportFields } from './OfferExportFields';
import { LetterMainFields } from './OfferMainFields';
import { Form } from '../../components/Form/Form';

export const LetterRoute = observer(() => {
    const { initObj, formik } = useInitOfferSection();

    return (
        <Formik
            initialValues={formik.initialFields}
            validate={formik.validate}
            onSubmit={initObj.onLoad as any}
            innerRef={formik.formRef}
            validateOnMount
        >
            <Form className='form letter__form'>
                <div className='letter__fields-wrapper'>
                    <LetterMainFields />
                    <LetterExportFields />
                </div>
                <button type='submit' className='btn letter__btn'>
                    Создать письмо
                </button>
            </Form>
        </Formik>
    );
});
