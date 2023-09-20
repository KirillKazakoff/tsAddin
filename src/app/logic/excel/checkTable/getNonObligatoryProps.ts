import type { TableKeyT } from '../../../stores/tablesStore/tablesStore';
import { CommonRowT } from '../../../types/typesTables';

export const getNonObligatoryProps = (row: CommonRowT, tableName: TableKeyT) => {
    const exportProps = [
        'terms',
        'sort',
        'msc',
        'consignee',
        'packSp',
        'sortSp',
        'datePusan',
        'placesLeft',
        'dateClose',
    ];

    const nonObligatoryProps = {
        export: exportProps,
        exportStorage: exportProps,
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
        sales: ['blNo'],
    };

    if (row.terms === 'FCA') {
        nonObligatoryProps.export.push('blNo', 'portFrom');
        nonObligatoryProps.sales.push('blNo');
    }

    return nonObligatoryProps[tableName];
};
