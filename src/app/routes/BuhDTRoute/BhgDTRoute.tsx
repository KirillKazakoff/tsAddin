import React from 'react';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import { Form } from '../../components/Form/Form';
import { useInitBhgDTSection } from './useInitBhgDTSection';
import Select from '../../components/Select/Select';

export const BhgDTRoute = observer(() => {
    const { formik, initObj } = useInitBhgDTSection();

    return (
        <Formik
            initialValues={formik.initialFields}
            validate={formik.validate}
            onSubmit={initObj.onLoad as any}
            innerRef={formik.formRef}
            validateOnMount
        >
            <Form className='form buh__form'>
                <h2>Отправить письмо ДТ в бухгалтерию</h2>
                <Select
                    name='dt' options={['ВТД', 'ПВД', '']}
                    title='Тип ДТ'
                />
                <button type='submit' className='btn letter__btn'>
                    Создать письмо
                </button>
            </Form>
        </Formik>
    );
});
