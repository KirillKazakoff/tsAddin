/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { selectSp } from '../../spsStore/select';
import tablesStore from '../tablesStore';
import { initAmount } from '../utils/initAmount';
import { setTable } from './setTable';

export const setCertificates = (table: any[][]) => {
    return setTable({
        table,
        type: 'certificatesT',
        headers: {
            blNo: 'BL',
            srSuffix: 'Приставка',
            srNo: '№SR',
            agreementNo: '№Доп',
            contractCode: 'Контракт',
            seller: 'Компания',
            consignee: 'Получатель',
            placesTotal: 'Количество',
            coNo: 'CO',
            hcNo: 'HC',
            iuuNo: 'IUU',
            date: 'Дата',
        },
        row: (r) => {
            const exportRow = _.cloneDeep(
                tablesStore.exportStorageT.find(
                    (eRow) => `${eRow.agreementNo}${eRow.contract.code}${eRow.blNo}`
                        === `${r.agreementNo}${r.contractCode}${r.blNo}`,
                ),
            );

            exportRow.amount = {
                places: initAmount(exportRow.amount.places.count, 0, 0),
                placesTotal: initAmount(r.placesTotal, 3, 4),
                price: initAmount(exportRow.amount.price.count, 2, 2),
                priceTotal: initAmount(exportRow.amount.priceTotal.count, 3, 4),
                placesGross: initAmount(exportRow.amount.placesTotal.count, 3, 4),
            };
            exportRow.id = `${exportRow.id}-${r.srSuffix}${r.srNo}`;
            exportRow.agreementNo = `${exportRow.agreementNo}-R${r.srNo}`;
            exportRow.date = r.date;

            return {
                ...exportRow,
                seller: selectSp.seller(r.seller),
                consignee: selectSp.consignee(r.consignee),
                date: r.date,
                hcNo: r.hcNo,
                coNo: r.coNo,
                iuuNo: r.iuuNo,
            };
        },
    });
};

export type CertificateRowT = ReturnType<typeof setCertificates>[number];
