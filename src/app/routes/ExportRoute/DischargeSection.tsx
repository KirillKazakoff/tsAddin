import React from 'react';
import { observer } from 'mobx-react-lite';
import {
    DischargeInvoiceT,
    groupDischargeInvoiceByNo,
} from '../../logic/docs/dischargeInvoice/groupDischargeInvoiceByNo';
import { createDischargeInvoice } from '../../logic/docs/dischargeInvoice/createDischargeInvoice';
import { Doc } from '../../components/Doc';

export const DischargeSection = observer(() => {
    const invoicesGrouped = groupDischargeInvoiceByNo();
    const onLoad = async (invoice: DischargeInvoiceT) => {
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
