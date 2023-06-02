import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Formik } from 'formik';
import { SelectPortRu } from '../../components/Select/SelectPortRu';
import { SelectPodpisant } from '../../components/Select/SelectPodpisant';
import { SelectCargo } from '../../components/Select/SelectCargo';
import DocsDownloadBtn from '../../components/DocsDownloadBtn';
import CheckBoxFormik from '../../components/CheckBoxFormik';
import InputText from '../../components/Form/InputText';
import LetterList from './LetterList';
import DischargeStorage from './DischargeStorage';
import { useInitPortLetter } from '../../logic/docs/innerContract/useInitPortLetter';

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
                    <SelectPortRu />
                    <SelectPodpisant />
                    <CheckBoxFormik title={'Включить картинки:'} name='isPictures' />
                    <InputText
                        name='dateLetter'
                        title='Дата письма:'
                        placeholder='Дата письма'
                    />
                    <SelectCargo
                        title='Грузовые работы склад-авто'
                        name='cargoToAuto'
                    />
                    <SelectCargo
                        title='Грузовые работы борт-склад'
                        name='cargoToStorage'
                    />
                    <DischargeStorage />
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
