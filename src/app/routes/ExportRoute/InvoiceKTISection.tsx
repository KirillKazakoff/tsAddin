import React from 'react';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import { useInitInvoiceKTI } from '../../logic/docs/invoiceKTI/useInitInvoiceKTI';
import { Form } from '../../components/Form/Form';
import { DocList } from '../../components/Doc/DocList';
import tablesStore from '../../stores/tablesStore/tablesStore';
import { SectionErrorHOC } from '../../components/SectionErrorHOC';
import Select from '../../components/Select/Select';

const SectionComponent = observer(() => {
    const { formik, initObj } = useInitInvoiceKTI();

    return (
        <Formik
            initialValues={formik.initialFields}
            validate={formik.validate}
            onSubmit={formik.onSubmit}
            innerRef={formik.formRef}
            validateOnMount
        >
            <Form className='docs__form kti-invoices-form'>
                <Select
                    name='translator'
                    title='Переводчик-исполнитель'
                    options={['КИА', 'ТНИ']}
                />
                <DocList
                    docs={initObj.docs}
                    docSettings={(invoice) => {
                        return {
                            key: invoice.code,
                            onClick: () => initObj.onLoad(invoice),
                            title: `${invoice.record.exportRow.seller.code} ${invoice.record.row.id}`,
                        };
                    }}
                />
            </Form>
        </Formik>
    );
});

export const InvoiceKTISection = () => {
    const {
        dischargeInvoices,
        storageInvoices,
        export: exportS,
        exportStorage,
    } = tablesStore.status;

    let status = dischargeInvoices.statusType !== 'ok' ? dischargeInvoices : storageInvoices;
    if (status.statusType === 'ok') {
        status = exportS.statusType !== 'ok' ? exportS : exportStorage;
    }

    return (
        <SectionErrorHOC status={status} title='KTI Инвойсы'>
            <SectionComponent />
        </SectionErrorHOC>
    );
};
