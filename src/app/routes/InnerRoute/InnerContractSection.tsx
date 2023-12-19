import React from 'react';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import { useInitInnerContract } from '../../logic/docs/inner/innerContract/useInitInnerContract';
import { Form } from '../../components/Form/Form';
import { SelectPodpisant } from '../../components/Select/SelectPodpisant';
import { Doc } from '../../components/Doc/Doc';
import { SectionErrorHOC } from '../../components/SectionErrorHOC';
import tablesStore from '../../stores/tablesStore/tablesStore';

const SectionComponent = observer(() => {
    const { initObj, formik } = useInitInnerContract();
    const contracts = initObj.docs.map((doc) => {
        const { row } = doc.record;
        const onClick = () => initObj.onLoad(doc);

        return (
            <Doc
                onClick={onClick}
                title={`${row.buyer.codeName}-${row.id}`}
                key={row.id}
            />
        );
    });

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

                <ul className='docs request-docs'>{contracts}</ul>
            </Form>
        </Formik>
    );
});

export const InnerContractSection = () => (
    <SectionErrorHOC status={tablesStore.status.inner} title='Договора Вн.Рынок:'>
        <SectionComponent />
    </SectionErrorHOC>
);
