/* eslint-disable no-param-reassign */
import { InitInvoicePartT } from '../../../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../../../excel/utils/getExcelDate';

export const initInvoiceBodyEng: InitInvoicePartT = (utils, invoice) => {
    const { setCell, ws } = utils;
    const {
        agentInfo,
        transport,
        portFrom,
        portTo,
        terms,
        agreementNo,
        contract,
        agreementDate,
    } = invoice.agreement;
    const { consignee } = invoice;

    setCell({
        cell: 'Инвойс_получатель',
        value: consignee.fullName,
    });
    setCell({
        cell: 'Инвойс_получатель_адрес',
        value: consignee.adress,
    });

    setCell({
        cell: 'Инвойс_покупатель',
        value: agentInfo.name,
    });
    setCell({
        cell: 'Инвойс_покупатель_адрес',
        value: agentInfo.adress,
    });
    setCell({
        cell: 'Инвойс_декларация',
        value: '',
    });

    const departureInfo = [
        setCell({
            cell: 'Инвойс_дата',
            value: getExcelDateStr(invoice.invoiceDate, 'en'),
        }),
        setCell({
            cell: 'Инвойс_транспорт',
            value: transport.name,
        }),
        setCell({
            cell: 'Инвойс_куда',
            value: `${portTo.nameEng}, ${portTo.countryEng}`,
        }),
        setCell({
            cell: 'Инвойс_откуда',
            value: portFrom.nameEng,
        }),
    ];

    if (terms === 'EXW') {
        departureInfo.forEach((cell) => {
            cell.value = '';
            const titleCl = ws.getCell(+cell.row - 1, cell.col);
            titleCl.value = '';
        });
        setCell({
            cell: 'Инвойс_декларация',
            value: 'Temporary Customs Declaration',
        });
    }

    setCell({
        cell: 'Инвойс_соглашение',
        value: `AGREEMENT No.${agreementNo} from ${getExcelDateStr(
            agreementDate,
            'en',
        )}`,
    });
    setCell({
        cell: 'Инвойс_контракт',
        value: `to a contract of sale No. ${contract.contractNo}`,
    });
    setCell({
        cell: 'Инвойс_контракт_дата',
        value: `Magadan, dated from ${getExcelDateStr(contract.date, 'en')}`,
    });
    setCell({
        cell: 'Инвойс_условия',
        value: `${terms}, ${portTo.countryEng}`,
    });
};
