import React from 'react';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import { SelectPortRu } from '../../components/Select/SelectPortRu';
import { SelectPodpisant } from '../../components/Select/SelectPodpisant';
import CheckBox from '../../components/CheckBox';
import InputText from '../../components/Form/InputText';
import DischargeTerms from './DischargeTerms';
import { useInitPortLetter } from '../../logic/docs/inner/portLetter/useInitPortLetter';
import { SelectTerms } from '../../components/Select/SelectTerms';
import DocsDownloadBtn from '../../components/Doc/DocsDownloadBtn';
import { SectionErrorHOC } from '../../components/SectionErrorHOC';
import tablesStore from '../../stores/tablesStore/tablesStore';
import { Form } from '../../components/Form/Form';
import { DocList } from '../../components/Doc/DocList';

const SectionComponent = observer(() => {
    const { formik, initObj } = useInitPortLetter();

    return (
        <Formik
            initialValues={formik.initialFields}
            validate={formik.validate}
            onSubmit={formik.onSubmit}
            innerRef={formik.formRef}
            validateOnMount
        >
            <Form className='docs__form port-letter-form'>
                <h3>Письмо:</h3>
                <div className='fields-wrapper'>
                    <SelectPortRu />
                    <SelectPodpisant />
                    <SelectTerms name='termsPort' />
                    <DischargeTerms />
                    <InputText
                        name='dateLetter'
                        title='Дата письма:'
                        placeholder='Дата письма'
                    />
                    <InputText
                        name='correctedNo'
                        title='Коррект номер:'
                        placeholder='Введите номер'
                    />
                    <CheckBox title={'Включить картинки:'} name='isPictures' />
                    <CheckBox title={'Контрольный звонок'} name='isControlPhone' />
                    <CheckBox title={'Группировка коносаменты'} name='isGroupingKns' />
                </div>

                <h3 className='title port-letter-title'>Загрузить письма в порт</h3>
                <DocList
                    docs={initObj.docs}
                    docSettings={(doc) => {
                        const { buyer, id: contractNo } = doc.record.row;
                        return {
                            onClick: () => initObj.onLoad(doc),
                            title: `${doc.code}-${buyer?.code}`,
                            key: contractNo,
                            isNull: doc.record.type !== 'innerT',
                        };
                    }}
                />
                <DocsDownloadBtn
                    title='Загрузить все письма'
                    onClick={initObj.onLoadAll}
                />

                <h3 className='title port-letter-title'>Загрузить образцы</h3>
                <DocList
                    docs={initObj.docs}
                    docSettings={(doc) => {
                        const { id, product } = doc.record.row;

                        return {
                            onClick: () => initObj.onLoad(doc as any),
                            title: `${id}-${product.code}`,
                            key: id,
                            isNull: doc.record.type !== 'samplesInnerT',
                        };
                    }}
                />
            </Form>
        </Formik>
    );
});

export const PortLetterSection = () => {
    return (
        <SectionErrorHOC status={tablesStore.status.inner} title='Письма в порт:'>
            <SectionComponent />
        </SectionErrorHOC>
    );
};
