import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { CellObjDoubleT as CellObjT } from '../../../../types/typesExcelUtils';
import { CellDeclarationT } from '../../../../types/typesUtils';
import { getDeliveryDate, getExcelDateStr } from '../../../excel/utils/getExcelDate';
import { ExportGroupT } from '../groupAgByNo';
import { matchCOHCLanguage } from '../setCOHCStatus';
import { getCostGoodsStr } from './getCostGoodsStr';

export const getExportContractCells = (agreement: ExportGroupT) => {
    const {
        date: dateAgreement,
        agreementNo,
        contract,
        seller,
        agent,
        bankSeller,
        portTo,
        transport,
        consignee,
        type,
    } = agreement.record;
    const { podpisant } = exportContractStore.fields;
    const { currentTerms: terms } = exportContractStore;
    const { cohc } = agreement.additional;

    const date = {
        agreement: (locale: string) => getExcelDateStr(dateAgreement, locale),
        contract: (locale: string) => getExcelDateStr(contract.date, locale),
        delivery: (locale: string, time: 'day' | 'month') => {
            return getDeliveryDate(dateAgreement, locale, time);
        },
    };

    const currency = getCostGoodsStr(agreement);

    // prettier-ignore
    const cells = {
        common: [
            // Header
            {
                cell: 'Контракт_дата',
                eng: `Magadan, dated ${date.contract('eng')}`,
                ru: `Магадан от ${date.contract('ru')}`,
            },
            {
                cell: 'Продавец',
                eng: `${seller.eng.name}`,
                ru: `${seller.ru.fullNameOrg}`,
            },
            {
                cell: 'Продавец_представитель',
                eng: `${podpisant.eng.comment}\n${podpisant.eng.name}`,
                ru: `${podpisant.req.face}`,
            },
            {
                cell: 'Покупатель',
                eng: `${agent.name}`,
                ru: `${agent.name}`,
            },
            {
                cell: 'Покупатель_адрес',
                eng: agent.address,
                ru: agent.address,
            },
            {
                cell: 'Покупатель_представитель',
                eng: `Represented by president ${agent.eng.signatory}`,
                ru: `В лице президента ${agent.eng.signatory}`,
            },
            // Addresses
            {
                cell: 'Адреса_продавец',
                eng: `${seller.eng.name}`,
                ru: `${seller.ru.fullNameOrg}`,
            },
            {
                cell: 'Адреса_продавец_адрес',
                eng: seller.eng.address,
                ru: seller.ru.address,
            },
            {
                cell: 'Адреса_банк_получателя',
                eng: bankSeller.eng.name,
                ru: `Банк-получателя: ${bankSeller.eng.name}`,
            },
            {
                cell: 'Адреса_банк_получателя_адрес',
                eng: bankSeller.address,
                ru: bankSeller.address,
            },
            {
                cell: 'Адреса_банк_получателя_свифт',
                eng: `SWIFT: ${bankSeller.swift}`,
                ru: `SWIFT: ${bankSeller.swift}`,
            },
            {
                cell: 'Адреса_получатель_в_пользу',
                eng: `in forward to ${seller.eng.name}`,
                ru: `в пользу ${seller.ru.fullNameOrg}`,
            },
            {
                cell: 'Адреса_получатель_счет',
                eng: `Acc: ${bankSeller.accountNo}`,
                ru: `Счет № ${bankSeller.accountNo}`,
            },
            {
                cell: 'Адреса_покупатель',
                eng: `${agent.name}`,
                ru: `${agent.name}`,
            },
            {
                cell: 'Адреса_покупатель_адрес',
                eng: agent.address,
                ru: agent.address,
            },
            {
                cell: 'Адреса_покупатель_банк',
                eng: `Bank Name: ${agent.beneficiaryBank}`,
                ru: `Bank Name: ${agent.beneficiaryBank}`,
            },
            {
                cell: 'Адреса_покупатель_банк_ветвь',
                eng: agent.branch,
                ru: agent.branch,
            },
            {
                cell: 'Адреса_покупатель_банк_адрес',
                eng: agent.bankAddress,
                ru: agent.bankAddress,
            },
            {
                cell: 'Адреса_покупатель_банк_свифт',
                eng: `SWIFT: ${agent.swift}`,
                ru: `SWIFT: ${agent.swift}`,
            },
            {
                cell: 'Адреса_покупатель_бенефициар',
                eng: `Beneficiary: ${agent.name}`,
                ru: `Beneficiary: ${agent.name}`,
            },
            {
                cell: 'Адреса_покупатель_счет',
                eng: `A/C: ${agent.acNo}`,
                ru: `A/C: ${agent.acNo}`,
            },
        ],
        export: {
            common: [
                {
                    cell: 'Соглашение',
                    eng: `AGREEMENT No. ${agreementNo} dated ${date.agreement('eng')}`,
                    ru: `Дополнение № ${agreementNo} от ${date.agreement('ru')}`,
                },
                {
                    cell: 'Контракт',
                    eng: `to a contract of sale No. ${contract.contractNo}`,
                    ru: `к контракту купли-продажи № ${contract.contractNo}`,
                },
                {
                    cell: 'Цена_всего',
                    eng: `${currency.eng}`,
                    ru: `${currency.ru}`,
                    height: 40,
                },
                {
                    cell: 'Адреса_подпись',
                    eng: `Продавец/Seller ______________________________${podpisant.eng.name}`,
                    ru: `Покупатель/Buyer ______________________________${agent.eng.signatory}`,
                },
                {
                    height: terms === 'EXW' ? 1 : 27,
                    isEmptyCell: terms === 'EXW',
                    cell: 'Сертификаты_обязательства',
                    eng: 'Seller is obligated to issue set of sertificates for consignees, mentioned in clause 1.',
                    ru: 'Покупатель обязуется выпустить комплект сертификатов на получателей, перечисленных в пункте 1.',
                },
            ],
            exw: [
                {
                    cell: 'Доставка_условия',
                    eng: `3.1 The commodity should be delivered under terms of ${terms} ${portTo.eng.name}`,
                    ru: `3.1 Поставка осуществляется на условиях ${terms} ${portTo.ru.name}`,
                },
                {
                    cell: 'Доставка_порт',
                    eng: `3.5 The delivery of goods to Buyer, mentioned in clause 1.1 of this Agreement should be carried in port of destination ${portTo.eng.name}, ${portTo.eng.country} at ${date.delivery('eng', 'day')}`,
                    ru: `3.5 Передача Покупателю Товара, оговоренного в п.1.1. настоящего Дополнения будет производиться в порту назначения ${portTo.ru.name}, ${portTo.ru.country}, ${date.delivery('ru', 'day')}`,
                },
            ],
            cfr: [
                {
                    cell: 'Доставка_условия',
                    eng: `3.1 The commodity should be delivered under terms of ${terms} ${portTo.eng.name}`,
                    ru: `3.1 Поставка осуществляется на условиях ${terms} ${portTo.ru.name}`,
                },
                {
                    cell: 'Доставка_порт',
                    eng: `3.5 The delivery of goods to Buyer, mentioned in clause 1.1 of this Agreement should be carried in port of destination ${portTo.eng.name}, ${portTo.eng.country} no later than ${date.delivery('eng', 'month')}`,
                    ru: `3.5 Передача Покупателю Товара, оговоренного в п.1.1. настоящего Дополнения будет производиться в порту назначения ${portTo.ru.name}, ${portTo.ru.country} не позднее чем ${date.delivery('ru', 'month')}`,
                },
            ],
            fca: [
                {
                    cell: 'Доставка_условия',
                    eng: `3.1 Supply of products is carried out on FCA Terms.\nAcceptance- transfer of Goods by quantity and quality is made on the territory of: ${portTo.eng.countryFull} in ${portTo.eng.name}.`,
                    ru: `3.1 Поставка осуществляется на условиях FCA.\nПриемка-передача Товара по количеству и качеству производится на территории: ${portTo.ru.countryFull} в п. ${portTo.ru.name}`,
                },
                {
                    cell: 'Доставка_приемка',
                    eng: `3.4 The Parties have agreed that the acceptance and transfer of the batch of Goods in the settlement of ${portTo.eng.name} on behalf of the Buyer will be carried out by: ${consignee.fullName} ${consignee.addres}`,
                    ru: `3.4 Стороны пришли к соглашению, что приемку-передачу партии Товара в п. ${portTo.ru.name} от имени покупателя будет осуществлять: ${consignee.fullName} ${consignee.addres}`,
                },
                {
                    cell: 'Доставка_дата',
                    eng: `Expected delivery date: ${exportContractStore.fields.departureDate}`,
                    ru: `Дата поставки ориентировочно: ${exportContractStore.fields.departureDate}`,
                },
            ],
        },
        exportStorage: {
            common: [
                {
                    cell: 'Соглашение',
                    eng: `AGREEMENT No. ${agreementNo} dated ${date.agreement('eng')}`,
                    ru: `Дополнение № ${agreementNo} от ${date.agreement('ru')}`,
                },
                {
                    cell: 'Контракт',
                    eng: `to the Storage Services Contract No. ${contract.contractNo}`,
                    ru: `к контракту оказания услуг хранения № ${contract.contractNo}`,
                },
                {
                    cell: 'Обязательство_хранение',
                    eng: `1. The Contractor shall undertake to accept for storage on the refrigerator, located in ${portTo.eng.name}, ${portTo.eng.country}, the batch of:`,
                    ru: `1. Исполнитель обязуется принять на хранение на холодильник расположенный в г. ${portTo.ru.name}, ${portTo.ru.country}, переданную Заказчиком партию:`,
                },
                {
                    cell: 'Доставка_транспорт',
                    eng: `2. The Goods will be delivered to ${portTo.eng.name}, ${portTo.eng.country} by the transport vessel ${transport.eng.name} no later than ${date.delivery('eng', 'month')}`,
                    ru: `2. Товар будет доставлен в г. ${portTo.ru.name}, ${portTo.ru.country} транспортным судном ${transport.ru.name} не позднее чем ${date.delivery('ru', 'month')}`,
                    height: 40,
                },
                {
                    cell: 'Остальное_контракт',
                    eng: `3. In all other matters not covered by this Agreement, the parties shall be governed by the terms and conditions of Storage Services Contract No. ${contract.contractNo}, dated ${date.contract('eng')}`,
                    ru: `3. Во всем остальном, что не предусмотрено настоящим дополнением, стороны руководствуются условиями контракта оказания услуг хранения ${contract.contractNo} от ${date.contract('ru')}`,
                },
                {
                    cell: 'Соглашение_вступление',
                    eng: `4. The present Agreement shall come into force from the moment of its signing and is an integral part of the Storage Services Contract No. ${contract.contractNo} dated ${date.contract('eng')}`,
                    ru: `4. Настоящее дополнение вступает в силу с момента его подписания и является неотъемлемой частью контракта оказания услуг хранения № ${contract.contractNo} от ${date.contract('ru')}`,
                },
                {
                    cell: 'Юридикция',
                    eng: '5. This Agreement has been drawn up and signed in two original duplicates of equal legal force.',
                    ru: '5. Настоящее дополнение составлено и подписано в двух подлинных экземплярах, имеющих одинаковую юридическую силу.',
                },
                {
                    cell: 'Адреса_подпись',
                    eng: `Заказчик/Customer ______________________________${podpisant.eng.name}`,
                    ru: `Исполнитель/Contractor ______________________________${agent.eng.signatory}`,
                },
            ],
        },
        certificates: [
            {
                cell: 'Обязательство_хранение',
                eng: `1. The Contractor shall undertake to accept for storage on the refrigerator, located in ${portTo.eng.name}, ${portTo.eng.country} the batch of the following quantity:`,
                ru: `1. Исполнитель обязуется принять на хранение на холодильник расположенный в г. ${portTo.ru.name}, ${portTo.ru.country} переданную Заказчиком партию:`,
            },
            {
                cell: 'Доставка_транспорт',
                eng: `2. The Goods will be delivered to ${portTo.eng.name}, ${portTo.eng.country} by the transport vessel ${transport.eng.name} no later than ${date.delivery('eng', 'month')}. Customer is obligated to issue the ${matchCOHCLanguage(cohc, 'eng')} for Consignees from pt 1.`,
                ru: `2. Товар будет доставлен в г. ${portTo.ru.name}, ${portTo.ru.country} транспортным судном ${transport.ru.name} не позднее чем ${date.delivery('ru', 'month')}. Заказчик обязуется выпустить ${matchCOHCLanguage(cohc, 'ru')} на получателей перечисленных в п. 1`,
                height: 55,
            },
        ],
    } satisfies CellDeclarationT<CellObjT>;

    const resArr = [...cells.common];

    if (type === 'exportT') {
        resArr.push(...cells.export.common);

        if (terms === 'EXW') {
            resArr.push(...cells.export.exw);
        }
        if (terms === 'CFR') {
            resArr.push(...cells.export.cfr);
        }
        if (terms === 'FCA') {
            resArr.push(...cells.export.fca);
        }
    }

    if (type === 'exportStorageT') {
        resArr.push(...cells.exportStorage.common);
    }

    if (type === 'certificatesT') {
        resArr.push(...cells.exportStorage.common);
        resArr.push(...cells.certificates);
    }

    return resArr;
};
