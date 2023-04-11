import { checkEmptyTable } from '../../logic/excel/utils/checkEmptyTable';
import { InnerRowT } from '../../types/typesTables';
import {
    selectBankProdavecSp,
    selectClientRuSp,
    selectProductSp,
    selectSellerSp,
    selectVesselSp,
} from '../spsStore/select';
import tablesStore from './tablesStore';
import { initAmount } from './utils/initAmount';

export const setInner = (table: any[][]) => {
    table.shift();
    if (checkEmptyTable(table)) return;

    const transformedTable = table.reduce<InnerRowT[]>((totalObj, row) => {
        const [
            clientCodeName,
            sellerCodeName,
            contractNo,
            contractDate,
            vessel,
            product,
            sort,
            pack,
            konosament,
            placesTotal,
            price,
            priceTotal,
            bank,
            deliveryDate,
            paymentDate,
        ] = row;

        // isPlacesNonInteger?

        const rowObj: InnerRowT = {
            buyer: selectClientRuSp(clientCodeName),
            seller: selectSellerSp(sellerCodeName),
            contractNo,
            contractDate,
            vessel: selectVesselSp(vessel),
            product: selectProductSp(product),
            sort,
            pack,
            konosament,
            amount: {
                places: initAmount(placesTotal / pack, 0, 0),
                placesTotal: initAmount(placesTotal, 1, 3),
                price: initAmount(price, 2, 2),
                priceTotal: initAmount(priceTotal, 2, 2),
            },
            bankSeller: selectBankProdavecSp(bank),
            deliveryDate,
            paymentDate,
        };

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    transformedTable.pop();

    tablesStore.setInner(transformedTable);
};
