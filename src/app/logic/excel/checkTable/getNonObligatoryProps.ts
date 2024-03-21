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
        'idProduct',
        'index',
        'declarationNo',
    ];

    const nonObligatoryProps = {
        exportT: exportProps,
        exportStorageT: exportProps,
        certificatesT: ['coNo', 'hcNo', 'iuuNo', 'date', 'placesRemain', ...exportProps],
        matesT: ['sort', 'periodCreation', 'reice', 'operation', 'index'],
        innerT: ['sort', 'deliveryDate', 'paymentDate', 'pack', 'packSp'],
        dischargeInvoicesT: ['i', 'invoiceDate', 'invoiceNo', 'dischargeDate'],
        storageInvoicesT: [
            'operation',
            'index',
            'dateStorageEnd',
            'dateInvoice',
            'dateAccountSent',
            'invoiceNo',
        ],
        salesT: ['blNo', 'isLive'],
        nordmileT: [''],
        customsT: [''],
        samplesInnerT: ['sort', 'id'],
    } satisfies Record<TableKeyT, string[]>;

    if (row.terms === 'FCA') {
        nonObligatoryProps.exportT.push('blNo', 'portFrom');
        nonObligatoryProps.salesT.push('blNo');
    }

    return nonObligatoryProps[tableName];
};
