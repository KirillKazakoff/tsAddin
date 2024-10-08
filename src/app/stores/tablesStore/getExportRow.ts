/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { CurrencyT, currenciesSp } from '../../logic/utils/currencyBuilder';
import { ExportInitRowT } from '../../types/typesTables';
import { selectSp } from '../spsStore/select';
import { initAmount } from './utils/initAmount';

export const getExportRow = (row: ExportInitRowT) => {
    const contractSp = selectSp.contract(row.contract);
    const consigneeSp = selectSp.consignee(row.consignee) || selectSp.consignee(row.agent);
    if (consigneeSp) {
        consigneeSp.fullName = consigneeSp.fullName.toUpperCase();
        consigneeSp.addres = consigneeSp.addres.toUpperCase();
    }

    const packSp = selectSp.package(
        `${row.vessel}${row.product}${row.pack.toString().replace('.', ',')}`,
    );

    const placesGross = packSp?.coefficient ? row.placesTotal * packSp.coefficient : 1;

    return {
        contract: contractSp,
        seller: selectSp.seller(row.seller),
        bankSeller: selectSp.bankProdavec(contractSp?.bankSeller),
        agent: selectSp.agent(row.agent),
        vessel: selectSp.vessel(row.vessel),
        transport: selectSp.transport(row.transport),
        portFrom: selectSp.portTamozhnya(row.portFrom),
        portTo: selectSp.portZarubezh(row.portTo),
        consignee: consigneeSp,
        product: _.cloneDeep(selectSp.product(row.product)),
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
        blNo: row.blNo,
        terms: row.terms,
        sort: row.sort,
        pack: row.pack,
        msc: row.msc,
        id: row.id,
        idProduct: row.idProduct,
        idContract: `${row.contract}-${row.agreementNo}`,
        currency: currenciesSp[row.currency] as CurrencyT,
    };
};
