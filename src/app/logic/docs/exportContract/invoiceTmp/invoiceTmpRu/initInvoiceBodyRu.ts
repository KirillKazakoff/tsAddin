/* eslint-disable no-param-reassign */
import { InitInvoicePartT } from '../../../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../../../excel/utils/getExcelDate';

export const initInvoiceBodyRu: InitInvoicePartT = (utils, invoice) => {
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
        cell: 'Инвойс_получатель_п',
        value: consignee.fullName,
    });
    setCell({
        cell: 'Инвойс_получатель_адрес_п',
        value: consignee.adress,
    });

    setCell({
        cell: 'Инвойс_покупатель_п',
        value: agentInfo.name,
    });
    setCell({
        cell: 'Инвойс_покупатель_адрес_п',
        value: agentInfo.adress,
    });
    setCell({
        cell: 'Инвойс_декларация_п',
        value: '',
    });

    const departureInfo = [
        setCell({
            cell: 'Инвойс_дата_п',
            value: getExcelDateStr(invoice.invoiceDate, 'en'),
        }),
        setCell({
            cell: 'Инвойс_транспорт_п',
            value: transport.name,
        }),
        setCell({
            cell: 'Инвойс_куда_п',
            value: `${portTo.name}, ${portTo.country}`,
        }),
        setCell({
            cell: 'Инвойс_откуда_п',
            value: portFrom.fullName,
        }),
    ];

    if (terms === 'EXW') {
        departureInfo.forEach((cell) => {
            cell.value = '';
            const titleCl = ws.getCell(+cell.row - 1, cell.col);
            titleCl.value = '';
        });
        setCell({
            cell: 'Инвойс_декларация_п',
            value: '№ временной декларации на товары',
        });
    }

    setCell({
        cell: 'Инвойс_соглашение_п',
        value: `AGREEMENT No.${agreementNo} from ${getExcelDateStr(
            agreementDate,
            'en',
        )}`,
    });
    setCell({
        cell: 'Инвойс_контракт_п',
        value: `to a contract of sale No. ${contract.contractNo}`,
    });
    setCell({
        cell: 'Инвойс_контракт_дата_п',
        value: `Magadan, dated from ${getExcelDateStr(contract.date, 'ru')}`,
    });
    setCell({
        cell: 'Инвойс_условия_п',
        value: `${terms}, ${portTo.country}`,
    });
};
