import React from 'react';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import { useInitRequestSection } from '../../logic/docs/innerContract/useInitRequestSection';
import { SelectPortRu } from '../../components/Select/SelectPortRu';
import { SelectPortTamozhnya } from '../../components/Select/SelectPortTamozhnya';
import { SelectTerms } from '../../components/Select/SelectTerms';
import RequestList from './RequestList';
import { ReiceNo } from './ReiceNo';
import CheckBox from '../../components/CheckBox';
import DocsDownloadBtn from '../../components/Doc/DocsDownloadBtn';
import { SectionErrorHOC } from '../../components/SectionErrorHOC';
import tablesStore from '../../stores/tablesStore/tablesStore';
import { Form } from '../../components/Form/Form';

const SectionComponent = observer(() => {
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
                <h3 className='title request-title'>Заявка:</h3>
                <div className='fields-wrapper'>
                    <CheckBox title={'Только счет:'} name='isInvoiceOnly' />
                    <ReiceNo />
                    <SelectTerms />
                    <SelectPortTamozhnya />
                    <SelectPortRu />
                </div>

                <h3 className='title request-docs-title'>
                    Загрузить заявки на договора:
                </h3>
                <RequestList contracts={initObj.docs} onLoad={initObj.onLoad} />
                <DocsDownloadBtn
                    onClick={initObj.onLoadAll}
                    title='Загрузить все заявки'
                />
            </Form>
        </Formik>
    );
});

export const RequestSection = observer(() => {
    return (
        <SectionErrorHOC
            status={tablesStore.status.inner}
            title='Заявки на договора:'
        >
            <SectionComponent />
        </SectionErrorHOC>
    );
});
