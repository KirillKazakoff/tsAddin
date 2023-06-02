import { observer } from 'mobx-react-lite';
import React from 'react';
import { Form, Formik } from 'formik';
import { useInitLetter } from '../../logic/letter/useInitLetter';
import { LetterExportFields } from './LetterExportFields';
import { LetterMainFields } from './LetterMainFields';

export const LetterRoute = observer(() => {
    const { onSubmit, formik } = useInitLetter();

    return (
        <Formik
            initialValues={formik.initialFields}
            validate={formik.validate}
            onSubmit={onSubmit}
            innerRef={formik.formRef}
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
