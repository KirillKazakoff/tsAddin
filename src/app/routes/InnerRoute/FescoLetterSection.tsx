import React from 'react';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import { useInitFescoLetter } from '../../logic/docs/inner/fescoLetter/useInitFescoLetter';
import { Form } from '../../components/Form/Form';
import { SelectPodpisant } from '../../components/Select/SelectPodpisant';
import CheckBox from '../../components/CheckBox/CheckBox';
import { DocList } from '../../components/Doc/DocList';
import { SectionErrorHOC } from '../../components/SectionErrorHOC';
import tablesStore from '../../stores/tablesStore/tablesStore';
import InputText from '../../components/Form/InputText';

const SectionComponent = observer(() => {
    const { formik, initObj } = useInitFescoLetter();

    return (
        <Formik
            initialValues={formik.initialFields}
            validate={formik.validate}
            onSubmit={formik.onSubmit}
            innerRef={formik.formRef}
            validateOnMount
        >
            <Form className='docs__form fesco-letter-form'>
                <div className='fields-wrapper'>
                    <SelectPodpisant />
                    <InputText
                        name='reiceNo'
                        title='Номер рейса'
                        placeholder='Введите номер рейса'
                    />
                    <CheckBox title={'Включить картинки:'} name='isPictures' />
                </div>
                <h3 className='title port-letter-title'>Загрузить письма в порт</h3>
                <DocList
                    docs={initObj.docs}
                    docSettings={(doc) => {
                        return {
                            onClick: () => initObj.onLoad(doc),
                            title: `${doc.record.buyer.code}`,
                            key: `${doc.record.buyer.code}`,
                        };
                    }}
                />
            </Form>
        </Formik>
    );
});

export const FescoLetterSection = () => {
    return (
        <SectionErrorHOC status={tablesStore.status.fescos} title='Письма FESCO'>
            <SectionComponent />
        </SectionErrorHOC>
    );
};
