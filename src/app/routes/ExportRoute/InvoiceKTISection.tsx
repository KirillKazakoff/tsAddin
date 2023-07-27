import React from 'react';
import { observer } from 'mobx-react-lite';
import { Doc } from '../../components/Doc';
import {
    groupInvoiceKTIByNo,
    InvoiceKTIT,
} from '../../logic/docs/invoiceKTI/groupInvoiceKTIByNo';
import { createInvoiceKTI } from '../../logic/docs/invoiceKTI/createInvoiceKTI';

export const InvoiceKTISection = observer(() => {
    const invoicesGrouped = groupInvoiceKTIByNo();
    const onLoad = async (invoice: InvoiceKTIT) => {
        await createInvoiceKTI(invoice);
    };

    const invoices = invoicesGrouped.map((invoice) => {
        const onClick = async () => onLoad(invoice);
        return (
            <Doc
                key={invoice.record.invoiceNo}
                onClick={onClick}
                title={`${invoice.exportRecord.seller.codeName} ${invoice.record.invoiceNo}`}
                isPreventDefault
            />
        );
    });

    if (invoicesGrouped.length === 0) return null;

    return (
        <form className='docs__form kti-invoices-form'>
            <h2 className='title kti-invoices-title'>KTI Invoices</h2>
            <ul className='docs'>{invoices}</ul>
        </form>
    );
});
