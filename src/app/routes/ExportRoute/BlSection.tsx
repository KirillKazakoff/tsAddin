import React from 'react';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import { useInitBlSection } from '../../logic/docs/bl/useInitBlSection';
import { Form } from '../../components/Form/Form';
import InputText from '../../components/Form/InputText';
import CheckBox from '../../components/CheckBox/CheckBox';
import DocsDownloadBtn from '../../components/Doc/DocsDownloadBtn';
import { SectionErrorHOC } from '../../components/SectionErrorHOC';
import tablesStore from '../../stores/tablesStore/tablesStore';
import exportContractStore from '../../stores/docsStores/exportContractStore';
import { DocList } from '../../components/Doc/DocList';

const SectionComponent = observer(() => {
    const { formik, initObj } = useInitBlSection();

    return (
        <Formik
            initialValues={formik.initialFields}
            validate={formik.validate}
            onSubmit={formik.onSubmit}
            innerRef={formik.formRef}
            validateOnMount
        >
            <Form className='docs__form'>
                <div className='fields-wrapper mt10'>
                    <CheckBox title='Разделять по сортам:' name='isSortable' />

                    {/* add vats input if live crab */}
                    {initObj.docs[0].record.terms === 'FCA' ? (
                        <InputText
                            name='vatsAmount'
                            title='Кол-во чанов:'
                            placeholder='Введите кол-во чанов'
                        />
                    ) : null}

                    <InputText
                        name='catchZone'
                        title='Район промысла:'
                        placeholder='Район промысла'
                    />
                </div>

                <h3 className='title bl-title'>Загрузить BL:</h3>
                <DocList
                    docs={initObj.docs}
                    docSettings={(doc) => {
                        return {
                            onClick: () => initObj.onLoad(doc),
                            title: doc.code,
                            key: doc.code,
                        };
                    }}
                />
                <DocsDownloadBtn onClick={initObj.onLoadAll} title='Загрузить все BL' />
            </Form>
        </Formik>
    );
});

export const BlSection = () => {
    const status = exportContractStore.operation === 'export'
        ? tablesStore.status.export
        : tablesStore.status.exportStorage;

    return (
        <SectionErrorHOC status={status} title='Заявки BL:'>
            <SectionComponent />
        </SectionErrorHOC>
    );
};
