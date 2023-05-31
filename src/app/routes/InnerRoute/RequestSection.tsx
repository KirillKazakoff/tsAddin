import React from 'react';
import { observer } from 'mobx-react-lite';
import { Formik, Form } from 'formik';
import { useInitRequestSection } from '../../logic/docs/innerContract/useInitRequestSection';
import { SelectPortRuFormik } from '../../components/Select/SelectPortRu';
import { SelectPortTamozhnyaFormik } from '../../components/Select/SelectPortTamozhnya';
import DocsDownloadBtn from '../../components/DocsDownloadBtn';
import { SelectTermsFormik } from '../../components/Select/SelectTerms';
import RequestList from './RequestList';
import { useRequestFormik } from '../../logic/docs/innerContract/useRequestFormik';

export const RequestSection = observer(() => {
    const formik = useRequestFormik();
    const initObj = useInitRequestSection(formik.formRef);

    return (
        <Formik
            initialValues={formik.initialFields}
            validate={formik.validate}
            onSubmit={formik.onSubmit}
            innerRef={formik.formRef}
        >
            <Form className='docs__form request-section-form'>
                <h2 className='title request-section-title'>Заявки на договора</h2>

                <h3 className='title request-title'>Заявка:</h3>

                <div className='fields-wrapper'>
                    <SelectTermsFormik />
                    <SelectPortTamozhnyaFormik />
                    <SelectPortRuFormik />
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
