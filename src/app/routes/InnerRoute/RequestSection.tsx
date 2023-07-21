import React from 'react';
import { observer } from 'mobx-react-lite';
import { Formik, Form } from 'formik';
import { useInitRequestSection } from '../../logic/docs/innerContract/useInitRequestSection';
import { SelectPortRu } from '../../components/Select/SelectPortRu';
import { SelectPortTamozhnya } from '../../components/Select/SelectPortTamozhnya';
import DocsDownloadBtn from '../../components/DocsDownloadBtn';
import { SelectTerms } from '../../components/Select/SelectTerms';
import RequestList from './RequestList';
import { ReiceNo } from './ReiceNo';
import CheckBoxFormik from '../../components/CheckBoxFormik';

export const RequestSection = observer(() => {
    const { initObj, formik } = useInitRequestSection();

    return (
        <Formik
            initialValues={formik.initialFields}
            validate={formik.validate}
            onSubmit={formik.onSubmit}
            innerRef={formik.formRef}
            validateOnMount
        >
            <Form className='docs__form request-section-form'>
                <h2 className='title request-section-title'>Заявки на договора</h2>

                <h3 className='title request-title'>Заявка:</h3>

                <div className='fields-wrapper'>
                    <CheckBoxFormik title={'Только счет:'} name='isInvoiceOnly' />
                    <ReiceNo />
                    <SelectTerms />
                    <SelectPortTamozhnya />
                    <SelectPortRu />
                </div>

                <h3 className='title request-docs-title'>
                    Загрузить заявки на договора:
                </h3>
                <RequestList contracts={initObj.contracts} onLoad={initObj.onLoad} />
                <DocsDownloadBtn
                    onClick={initObj.onLoadAll}
                    title='Загрузить все заявки'
                />
            </Form>
        </Formik>
    );
});
