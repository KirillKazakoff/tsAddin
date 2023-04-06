import { getExcelDateStr } from '../../../logic/excel/utils/getExcelDate';
import { ContractT } from '../../../types/typesSP';

export const initRowToStr = (
    contract: ContractT,
    agreementNo: number,
    date: string,
    invoiceNo: string,
) => {
    const toStr = {
        invoice: {
            eng: `${invoiceNo} from ${getExcelDateStr(date, 'en')}`,
            ru: `${invoiceNo} от ${getExcelDateStr(date, 'ru')}`,
        },
        contract: {
            title: {
                eng: `to a contract of sale No. ${contract.contractNo}`,
                ru: `к контракту купли-продажи № ${contract.contractNo}`,
            },
            date: {
                eng: `Magadan, dated from ${getExcelDateStr(contract.date, 'en')}`,
                ru: `Магадан, от ${getExcelDateStr(contract.date, 'ru')}`,
            },
        },
        agreement: {
            eng: `AGREEMENT No.${agreementNo} from ${getExcelDateStr(date, 'en')}`,
            ru: `Дополнение No.${agreementNo} от ${getExcelDateStr(date, 'ru')}`,
        },
    };

    return toStr;
};
