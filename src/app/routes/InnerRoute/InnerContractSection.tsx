import React from 'react';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import { useInitInnerContract } from '../../logic/docs/inner/innerContract/useInitInnerContract';
import { Form } from '../../components/Form/Form';
import { SelectPodpisant } from '../../components/Select/SelectPodpisant';
import { SectionErrorHOC } from '../../components/SectionErrorHOC';
import tablesStore from '../../stores/tablesStore/tablesStore';
import { DocList } from '../../components/Doc/DocList';
import CheckBox from '../../components/CheckBox/CheckBox';
import DocsDownloadBtn from '../../components/Doc/DocsDownloadBtn';

const SectionComponent = observer(() => {
    const { initObj, formik, contracts } = useInitInnerContract();
    if (contracts.length === 0) return null;

    return (
        <Formik
            initialValues={formik.initialFields}
            validate={formik.validate}
            onSubmit={formik.onSubmit}
            innerRef={formik.formRef}
            validateOnMount
        >
            <Form className='docs__form inner-contract-form'>
                <h3 className='title request-docs-title'>Загрузить договора:</h3>
                <div className='fields-wrapper'>
                    <SelectPodpisant />
                    <CheckBox title='Включить картинки' name='isPictures' />
                </div>

                <DocList
                    docs={contracts}
                    docSettings={(doc) => {
                        const { row } = doc.record;
                        return {
                            title: `${row.buyer?.code}-${row.id}`,
                            onClick: () => initObj.onLoad(doc),
                            key: `${row.id}${row?.buyer?.code}`,
                            isNull: row.type !== 'innerT',
                        };
                    }}
                />

                <DocsDownloadBtn
                    title='Загрузить все договора'
                    onClick={initObj.onLoadAll}
                />
            </Form>
        </Formik>
    );
});

export const InnerContractSection = () => (
    <SectionErrorHOC status={tablesStore.status.inner} title='Договора Вн.Рынок:'>
        <SectionComponent />
    </SectionErrorHOC>
);
