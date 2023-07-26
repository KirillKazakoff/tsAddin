import React from 'react';
import { observer } from 'mobx-react-lite';
import {
    StorageInvoiceT,
    groupStorageInvoiceByNo,
} from '../../logic/docs/storageInvoiceKTI/groupStorageInvoiceByNo';
import { createStorageInvoice } from '../../logic/docs/storageInvoiceKTI/createStorageInvoice';
import { Doc } from '../../components/Doc';

export const StorageSectionKTI = observer(() => {
    const invoicesGrouped = groupStorageInvoiceByNo();
    const onLoad = async (invoice: StorageInvoiceT) => {
        await createStorageInvoice(invoice);
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
            <h2 className='title kti-invoices-title'>KTI Storage Invoices</h2>
            <ul className='docs'>{invoices}</ul>
        </form>
    );
});
