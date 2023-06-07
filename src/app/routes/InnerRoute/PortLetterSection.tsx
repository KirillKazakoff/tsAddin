import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Formik } from 'formik';
import { SelectPortRu } from '../../components/Select/SelectPortRu';
import { SelectPodpisant } from '../../components/Select/SelectPodpisant';
import DocsDownloadBtn from '../../components/DocsDownloadBtn';
import CheckBoxFormik from '../../components/CheckBoxFormik';
import InputText from '../../components/Form/InputText';
import LetterList from './LetterList';
import DischargeTerms from './DischargeTerms';
import { useInitPortLetter } from '../../logic/docs/innerContract/useInitPortLetter';
import { SelectTerms } from '../../components/Select/SelectTerms';

export const PortLetterSection = observer(() => {
    const { formik, initObj } = useInitPortLetter();

    return (
        <Formik
            initialValues={formik.initialFields}
            validate={formik.validate}
            onSubmit={formik.onSubmit}
            innerRef={formik.formRef}
        >
            <Form className='docs__form port-letter-form'>
                <h2 className='title port-letter-title'>Письма в порт</h2>
                <h3>Письмо:</h3>
                <div className='fields-wrapper'>
                    <InputText
                        name='dateLetter'
                        title='Дата письма:'
                        placeholder='Дата письма'
                    />
                    <SelectPortRu />
                    <SelectPodpisant />
                    <SelectTerms name='termsPort' />
                    <DischargeTerms />
                    <CheckBoxFormik title={'Включить картинки:'} name='isPictures' />
                </div>

                <h3 className='title port-letter-title'>Загрузить письма в порт</h3>
                <LetterList contracts={initObj.contracts} onLoad={initObj.onLoad} />
                <DocsDownloadBtn
                    title='Загрузить все письма'
                    onClick={initObj.onLoadAll}
                />
            </Form>
        </Formik>
    );
});
