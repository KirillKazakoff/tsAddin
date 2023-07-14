import React from 'react';
import { observer } from 'mobx-react-lite';
import _ from 'lodash';
import {
    DischargeInvoiceT,
    groupInvoiceByNo,
} from '../../logic/docs/dischargeInvoice/groupInvoiceByNo';
import { createDischargeInvoice } from '../../logic/docs/dischargeInvoice/createDischargeInvoice';
import { Doc } from '../../components/Doc';

export const DischargeSection = observer(() => {
    const onLoad = async (invoice: DischargeInvoiceT) => {
        await createDischargeInvoice(invoice);
    };

    // console.log(_.cloneDeep(groupInvoiceByNo()));

    const invoices = groupInvoiceByNo().map((invoice) => {
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

    return (
        <form className='docs__form kti-invoices-form'>
            <h2 className='title kti-invoices-title'>KTI Invoices</h2>
            <ul className='docs'>{invoices}</ul>
        </form>
    );
});
