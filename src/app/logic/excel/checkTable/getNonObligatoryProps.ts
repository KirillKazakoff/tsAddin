import { CommonRowT } from '../../../types/typesTables';

export const getNonObligatoryProps = (row: CommonRowT, tableName: string) => {
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
    };

    if (row.terms === 'FCA') {
        nonObligatoryProps.export.push('blNo', 'portFrom');
    }

    if (tableName.includes('Export')) return nonObligatoryProps.export;
    if (tableName.includes('Mates')) return nonObligatoryProps.mates;
    if (tableName.includes('Discharge')) {
        return nonObligatoryProps.dischargeInvoices;
    }
    if (tableName.includes('StorageInvoice')) {
        return nonObligatoryProps.storageInvoices;
    }
    return nonObligatoryProps.inner;
};
