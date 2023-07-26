import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInitInvoiceKTISection } from '../../logic/docs/invoiceKTI/useInitInvoicesKTI';

export const InvoiceKTISection = observer(() => {
    const initObj = useInitInvoiceKTISection();
    return <div>hello</div>;
});
