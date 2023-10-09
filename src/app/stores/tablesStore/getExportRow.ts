import { ExportInitRowT, ExportRowT } from '../../types/typesTables';
import { selectSp } from '../spsStore/select';
import { initAmount } from './utils/initAmount';

export const getExportRow = (row: ExportInitRowT): ExportRowT => {
    const contractSp = selectSp.contract(row.contract);
    const consigneeSp = selectSp.consignee(row.consignee) || selectSp.consignee(row.agent);
    const packSp = selectSp.package(
        `${row.vessel}${row.product}${row.pack.toString().replace('.', ',')}`,
    );
    const placesGross = packSp.coefficient
        ? row.placesTotal * packSp.coefficient
        : 1;

    return {
        type: 'export',
        contract: contractSp,
        seller: selectSp.seller(row.seller),
        bankSeller: selectSp.bankProdavec(contractSp?.bankSeller),
        agent: selectSp.agent(row.agent),
        vessel: selectSp.vessel(row.vessel),
        transport: selectSp.transport(row.transport),
        portFrom: selectSp.portTamozhnya(row.portFrom),
        portTo: selectSp.portZarubezh(row.portTo),
        consignee: consigneeSp,
        product: selectSp.product(row.product),
        packSp,
        sortSp: selectSp.sortAssortiment(`${row.sort}${row.product}`),
        amount: {
            places: initAmount(row.places, 0, 0),
            placesTotal: initAmount(row.placesTotal, 3, 4),
            price: initAmount(row.price, 2, 2),
            priceTotal: initAmount(row.priceTotal, 3, 4),
            placesGross: initAmount(placesGross, 3, 4),
        },
        agreementNo: row.agreementNo,
        invoice: row.invoice,
        date: row.date,
        blNo: row.terms !== 'FCA' ? row.blNo : '',
        terms: row.terms,
        sort: row.sort,
        pack: row.pack,
        msc: row.msc,
        id: row.id,
        index: row.index.toString(),
        placesLeft: row.placesLeft,
        dateClose: row.dateClose,
        datePusan: row.datePusan,
    };
};
