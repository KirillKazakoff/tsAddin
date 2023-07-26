import React from 'react';
import { observer } from 'mobx-react-lite';
import { createDischargeInvoice } from '../../logic/docs/invoiceKTI/dischargeInvoice/createDischargeInvoice';
import { Doc } from '../../components/Doc';
import {
    InvoiceKTIT,
    groupInvoiceKTIByNo,
} from '../../logic/docs/invoiceKTI/groupInvoiceKTIByNo';

export const DischargeSection = observer(() => {
    // const invoicesGrouped = groupDischargeInvoiceByNo();
    const invoicesGrouped = groupInvoiceKTIByNo('discharge');
    const onLoad = async (invoice: InvoiceKTIT) => {
        await createDischargeInvoice(invoice);
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
