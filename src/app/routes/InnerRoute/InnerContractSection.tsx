import React from 'react';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import { useInitInnerContract } from '../../logic/docs/inner/innerContract/useInitInnerContract';
import { Form } from '../../components/Form/Form';
import { SelectPodpisant } from '../../components/Select/SelectPodpisant';
import { SectionErrorHOC } from '../../components/SectionErrorHOC';
import tablesStore from '../../stores/tablesStore/tablesStore';
import { DocList } from '../../components/Doc/DocList';

const SectionComponent = observer(() => {
    const { initObj, formik } = useInitInnerContract();

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
                </div>

                <DocList
                    docs={initObj.docs}
                    docSettings={(doc) => {
                        const { row } = doc.record;
                        return {
                            title: `${row.buyer?.code}-${row.id}`,
                            onClick: () => initObj.onLoad(doc),
                            key: row.id,
                        };
                    }}
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
