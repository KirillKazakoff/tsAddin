import React from 'react';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import { Form } from '../components/Form/Form';
import { SectionErrorHOC } from '../components/SectionErrorHOC';
import tablesStore from '../stores/tablesStore/tablesStore';
import excelSyncStore from '../stores/excelSyncStore.ts/excelSyncStore';
import { useInitSalesSection } from '../logic/docs/sales/useInitSalesSection';
import CheckBox from '../components/CheckBox/CheckBox';
import { DocListActive } from '../components/Doc/DocListActive';
import DocsDownloadBtn from '../components/Doc/DocsDownloadBtn';
import salesContractStore from '../stores/docsStores/salesContractStore';

export const SalesRoute = observer(() => {
    const { formik, initObj } = useInitSalesSection();
    if (excelSyncStore.isLoading) return null;

    return (
        <SectionErrorHOC status={tablesStore.status.sales} title='Продажи'>
            <div className='form-section'>
                <div className='form-section__choose'>
                    <h2 className='mb0'>Выберите контракт:</h2>
                    <DocListActive docs={initObj.docs} store={salesContractStore} />
                </div>
                {initObj.currentDoc ? (
                    <Formik
                        initialValues={formik.initialFields}
                        validate={formik.validate}
                        onSubmit={formik.onSubmit}
                        innerRef={formik.formRef}
                        validateOnMount
                    >
                        <Form className='docs__form'>
                            <h3>{initObj.title}</h3>
                            <div className='fields-wrapper'>
                                <CheckBox
                                    title='Группировка инвойсы'
                                    name='isSortGroup'
                                />
                                <DocsDownloadBtn
                                    title='Загрузить контракт'
                                    onClick={initObj.onLoad}
                                    cls='docs-download--export'
                                />
                            </div>
                        </Form>
                    </Formik>
                ) : null}
            </div>
        </SectionErrorHOC>
    );
});
