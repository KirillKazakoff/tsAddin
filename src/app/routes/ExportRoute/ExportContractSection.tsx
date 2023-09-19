import React from 'react';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import { SelectPodpisant } from '../../components/Select/SelectPodpisant';
import { ExportDepartureDate } from './ExportDepartureDate';
import { useInitContractSection } from '../../logic/docs/exportContract/useInitContractSection';
import { ExportDeclarationEXW } from './ExportDeclarationEXW';
import DocsDownloadBtn from '../../components/Doc/DocsDownloadBtn';
import { Form } from '../../components/Form/Form';
import { DocList } from '../../components/Doc/DocList';
import exportContractStore from '../../stores/docsStores/exportContractStore';

export const ExportContractSection = observer(() => {
    const { formik, initObj } = useInitContractSection();
    return (
        <div className='export-section'>
            <div className='export-section__choose'>
                <h2 className='mb0'>Выберите контракт:</h2>
                <DocList docs={initObj.agreements} store={exportContractStore} />
            </div>
            {initObj.currentDoc ? (
                <Formik
                    initialValues={formik.initialFields}
                    validate={formik.validate}
                    onSubmit={formik.onSubmit}
                    innerRef={formik.formRef}
                    validateOnMount
                >
                    <Form className='docs__form export-contract-form'>
                        <h3>{initObj.title}</h3>
                        <div className='fields-wrapper'>
                            <SelectPodpisant />
                            <ExportDepartureDate />
                            <ExportDeclarationEXW />
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
    );
});
