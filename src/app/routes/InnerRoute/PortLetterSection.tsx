import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Formik } from 'formik';
import { useInitPortLetter } from '../../logic/docs/innerContract/useInitPortLetter';
import { SelectPortRuFormik } from '../../components/Select/SelectPortRu';
import { SelectPodpisantFormik } from '../../components/Select/SelectPodpisant';
import { SelectCargoFormik } from '../../components/Select/SelectCargo';
import DocsDownloadBtn from '../../components/DocsDownloadBtn';
import CheckBoxFormik from '../../components/CheckBoxFormik';
import InputText from '../../components/Form/InputText';
import LetterList from './LetterList';
import { usePortLetterFormik } from '../../logic/docs/innerContract/usePortLetterFormik';
import DischargeStorage from './DischargeStorage';

export const PortLetterSection = observer(() => {
    const formik = usePortLetterFormik();
    const initObj = useInitPortLetter(formik.formRef);

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
                    <SelectPortRuFormik />
                    <SelectPodpisantFormik />
                    <CheckBoxFormik title={'Включить картинки:'} name='pictures' />
                    <InputText
                        name='dateLetter'
                        title='Дата письма:'
                        placeholder='Дата письма'
                    />
                    <SelectCargoFormik
                        title='Грузовые работы склад-авто'
                        name='cargoToAuto'
                    />
                    <SelectCargoFormik
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
