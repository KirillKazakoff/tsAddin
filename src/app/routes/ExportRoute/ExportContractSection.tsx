import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Formik } from 'formik';
import { SelectPodpisant } from '../../components/Select/SelectPodpisant';
import { AgreementList } from './AgreementList';
import { ExportDate } from './ExportDate';
import { useInitContractSection } from '../../logic/docs/exportContract/useInitContractSection';
import { ExportDeclarationEXW } from './ExportDeclarationEXW';
import DocsDownloadBtn from '../../components/Doc/DocsDownloadBtn';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import { SectionErrorHOC } from '../../components/SectionErrorHOC';

const SectionComponent = observer(() => {
    const { formik, initObj } = useInitContractSection();
    return (
        <div className='export-section'>
            <div className='export-sectioin__choose'>
                <h3>Выберите контракт:</h3>
                <AgreementList agreements={initObj.agreements} />
            </div>
            {initObj.currentAgreement ? (
                <Formik
                    initialValues={formik.initialFields}
                    validate={formik.validate}
                    onSubmit={formik.onSubmit}
                    innerRef={formik.formRef}
                    validateOnMount
                >
                    <Form className='docs__form export-contract-form'>
                        <h3>{initObj.title}</h3>
                        <SelectPodpisant />
                        <ExportDate />
                        <ExportDeclarationEXW />
                        <DocsDownloadBtn
                            title='Загрузить контракт'
                            onClick={initObj.onLoad}
                            cls='docs-download--export'
                        />
                    </Form>
                </Formik>
            ) : null}
        </div>
    );
});

export const ExportContractSection = observer(() => {
    return (
        <>
            <h2>Контракт</h2>
            <SectionErrorHOC status={exportContractStore.sectionStatus}>
                <SectionComponent />
            </SectionErrorHOC>
        </>
    );
});
