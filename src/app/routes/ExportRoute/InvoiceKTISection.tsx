import React from 'react';
import { observer } from 'mobx-react-lite';
import { Doc } from '../../components/Doc/Doc';
import {
    InvoiceKTIGroupT,
    groupInvoiceKTIByNo,
} from '../../logic/docs/invoiceKTI/groupInvoiceKTIByNo';
import { createInvoiceKTI } from '../../logic/docs/invoiceKTI/createInvoiceKTI';
import { SectionErrorHOC } from '../../components/SectionErrorHOC';
import tablesStore from '../../stores/tablesStore/tablesStore';

export const SectionComponent = observer(() => {
    const invoicesGrouped = groupInvoiceKTIByNo();
    const onLoad = async (invoice: InvoiceKTIGroupT) => {
        await createInvoiceKTI(invoice);
    };

    const invoices = invoicesGrouped.map((invoice) => {
        const onClick = async () => onLoad(invoice);
        return (
            <Doc
                key={invoice.record.row.invoiceNo}
                onClick={onClick}
                title={`${invoice.record.exportRow.seller.code} ${invoice.record.row.invoiceNo}`}
                isPreventDefault
            />
        );
    });

    if (invoicesGrouped.length === 0) return null;

    return (
        <form className='docs__form kti-invoices-form'>
            <ul className='docs'>{invoices}</ul>
        </form>
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
