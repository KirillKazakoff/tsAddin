import { initPicturesExcel } from '../../excel/pictures/initPictureExcel';
import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { SalesContractT } from './groupBy/initSalesContract';
import { initSalesContractTmp } from './initSalesContractTmp';

export const createSalesContract = async (contract: SalesContractT) => {
    const { contractNo, product, seller } = contract.record;

    const isLive = product.codeName.toLowerCase().includes('live');
    const path = isLive ? pathObj.salesContractLive : pathObj.salesContract;
    const book = await readTmp(path);
    const ws = book.getWorksheet('Sales_Contract');

    initSalesContractTmp(book, contract);
    await initPicturesExcel(
        [
            {
                key: seller.code,
                rangeObj: {
                    start: 'Sign_seller_start',
                    end: 'Sign_seller_end',
                },
                ws,
            },
        ],
        true,
    );

    const fileName = `${contract.record.buyer.codeName} ${contractNo}`;
    await saveFile(book, fileName);
};
