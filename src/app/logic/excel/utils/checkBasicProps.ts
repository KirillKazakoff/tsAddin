import { CommonRowT } from '../../../types/typesTables';

export const getNonObligatoryProps = (row: CommonRowT) => {
    const resProps = {
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
        mates: ['sort', 'periodCreation', 'reice', 'operation'],
        inner: ['sort', 'deliveryDate', 'paymentDate'],
    };

    if (row.terms === 'FCA') {
        resProps.export.push('blNo', 'portFrom');
    }
    return resProps;
};
