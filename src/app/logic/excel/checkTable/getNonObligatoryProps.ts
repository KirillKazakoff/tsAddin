import type { TableKeyT } from '../../../stores/tablesStore/tablesStore';
import { CommonRowT } from '../../../types/typesTables';

export const getNonObligatoryProps = (row: CommonRowT, tableName: TableKeyT) => {
    const nonObligatoryProps = {
        export: [
            'terms',
            'sort',
            'msc',
            'consignee',
            'packSp',
            'sortSp',
            'datePusan',
            'placesLeft',
            'dateClose',
        ],
        mates: ['sort', 'periodCreation', 'reice', 'operation', 'index'],
        inner: ['sort', 'deliveryDate', 'paymentDate'],
        dischargeInvoices: ['i', 'invoiceDate', 'invoiceNo', 'dischargeDate'],
        storageInvoices: [
            'operation',
            'index',
            'dateStorageEnd',
            'dateInvoice',
            'dateAccountSent',
            'invoiceNo',
        ],
        certificates: ['coNo', 'hcNo', 'iuuNo', 'date', 'placesRemain'],
    };

    if (row.terms === 'FCA') {
        nonObligatoryProps.export.push('blNo', 'portFrom');
    }

    if (tableName.includes('export')) return nonObligatoryProps.export;
    if (tableName.includes('mates')) return nonObligatoryProps.mates;
    if (tableName.includes('discharge')) {
        return nonObligatoryProps.dischargeInvoices;
    }
    if (tableName.includes('storageInvoice')) {
        return nonObligatoryProps.storageInvoices;
    }
    if (tableName.includes('certificates')) {
        return nonObligatoryProps.certificates;
    }
    return nonObligatoryProps.inner;
};
