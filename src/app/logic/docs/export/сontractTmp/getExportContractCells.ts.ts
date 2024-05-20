/* eslint-disable max-len */
import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import tablesStore from '../../../../stores/tablesStore/tablesStore';
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
    const { currentTerms: terms, fields } = exportContractStore;
    const { cohc } = agreement.additional;
    const { departureDate: deliveryDate } = fields;

    const storageAgreementRow = tablesStore.exportStorageT.find((row) => {
        const storageID = row.idProduct.substring(3, 100);
        const currentID = agreement.record.idProduct.substring(3, 100);

        return storageID === currentID;
    });

    const date = {
        agreement: (locale: string) => getExcelDateStr(dateAgreement, locale),
        contract: (locale: string) => getExcelDateStr(contract.date, locale),
        delivery: (locale: string, time: 'day' | 'month') => {
            return getDeliveryDate(dateAgreement, locale, time);
        },
        storageAgreementDate: (locale: string) => {
            return getExcelDateStr(storageAgreementRow?.date, locale);
        },
    };

    const currency = getCostGoodsStr(agreement);

    // prettier-ignore
    const cells = {
        common: [
            // Header
            {
                name: 'Контракт_дата',
                eng: `Magadan, dated ${date.contract('eng')}`,
                ru: `Магадан от ${date.contract('ru')}`,
            },
            {
                name: 'Продавец',
                eng: `${seller.eng.name}`,
                ru: `${seller.ru.fullNameOrg}`,
            },
            {
                name: 'Продавец_представитель',
                eng: `${podpisant.eng.comment}\n${podpisant.eng.name}`,
                ru: `${podpisant.req.face}`,
            },
            {
                name: 'Покупатель',
                eng: `${agent.name}`,
                ru: `${agent.name}`,
            },
            {
                name: 'Покупатель_адрес',
                eng: agent.address,
                ru: agent.address,
            },
            {
                name: 'Покупатель_представитель',
                eng: `Represented by president ${agent.eng.signatory}`,
                ru: `В лице президента ${agent.eng.signatory}`,
            },
            // Addresses
            {
                name: 'Адреса_продавец',
                eng: `${seller.eng.name}`,
                ru: `${seller.ru.fullNameOrg}`,
            },
            {
                name: 'Адреса_продавец_адрес',
                eng: seller.eng.address,
                ru: seller.ru.address,
            },
            {
                name: 'Адреса_банк_получателя',
                eng: bankSeller.eng.name,
                ru: `Банк-получателя: ${bankSeller.eng.name}`,
            },
            {
                name: 'Адреса_банк_получателя_адрес',
                eng: bankSeller.address,
                ru: bankSeller.address,
            },
            {
                name: 'Адреса_банк_получателя_свифт',
                eng: `SWIFT: ${bankSeller.swift}`,
                ru: `SWIFT: ${bankSeller.swift}`,
            },
            {
                name: 'Адреса_получатель_в_пользу',
                eng: `in forward to ${seller.eng.name}`,
                ru: `в пользу ${seller.ru.fullNameOrg}`,
            },
            {
                name: 'Адреса_получатель_счет',
                eng: `Acc: ${bankSeller.accountNo}`,
                ru: `Счет № ${bankSeller.accountNo}`,
            },
            {
                name: 'Адреса_покупатель',
                eng: `${agent.name}`,
                ru: `${agent.name}`,
            },
            {
                name: 'Адреса_покупатель_адрес',
                eng: agent.address,
                ru: agent.address,
            },
            {
                name: 'Адреса_покупатель_банк',
                eng: `Bank Name: ${agent.beneficiaryBank}`,
                ru: `Bank Name: ${agent.beneficiaryBank}`,
            },
            {
                name: 'Адреса_покупатель_банк_ветвь',
                eng: agent.branch,
                ru: agent.branch,
            },
            {
                name: 'Адреса_покупатель_банк_адрес',
                eng: agent.bankAddress,
                ru: agent.bankAddress,
            },
            {
                name: 'Адреса_покупатель_банк_свифт',
                eng: `SWIFT: ${agent.swift}`,
                ru: `SWIFT: ${agent.swift}`,
            },
            {
                name: 'Адреса_покупатель_бенефициар',
                eng: `Beneficiary: ${agent.name}`,
                ru: `Beneficiary: ${agent.name}`,
            },
            {
                name: 'Адреса_покупатель_счет',
                eng: `A/C: ${agent.acNo}`,
                ru: `A/C: ${agent.acNo}`,
            },
        ],
        export: {
            common: [
                {
                    name: 'Соглашение',
                    eng: `AGREEMENT No. ${agreementNo} dated ${date.agreement('eng')}`,
                    ru: `Дополнение № ${agreementNo} от ${date.agreement('ru')}`,
                },
                {
                    name: 'Контракт',
                    eng: `to a contract of sale No. ${contract.contractNo}`,
                    ru: `к контракту купли-продажи № ${contract.contractNo}`,
                },
                {
                    name: 'Цена_всего',
                    eng: `${currency.eng}`,
                    ru: `${currency.ru}`,
                    height: 40,
                },
                {
                    name: 'Адреса_подпись',
                    eng: `Продавец/Seller ______________________________${podpisant.eng.name}`,
                    ru: `Покупатель/Buyer ______________________________${agent.eng.signatory}`,
                },
                {
                    height: terms === 'EXW' ? 1 : 27,
                    isEmptyCell: terms === 'EXW',
                    name: 'Сертификаты_обязательства',
                    eng: 'Seller is obligated to issue set of sertificates for consignees, mentioned in clause 1.',
                    ru: 'Покупатель обязуется выпустить комплект сертификатов на получателей, перечисленных в пункте 1.',
                },
            ],
            exw: [
                {
                    name: 'Доставка_условия',
                    eng: `3.1 The commodity should be delivered under terms of ${terms} ${portTo.eng.name}`,
                    ru: `3.1 Поставка осуществляется на условиях ${terms} ${portTo.ru.name}`,
                },
                {
                    name: 'Доставка_порт',
                    eng: `3.5 The delivery of goods to Buyer, mentioned in clause 1.1 of this Agreement should be carried in port of destination ${portTo.eng.name}, ${portTo.eng.country} at ${date.delivery('eng', 'day')}`,
                    ru: `3.5 Передача Покупателю Товара, оговоренного в п.1.1. настоящего Дополнения будет производиться в порту назначения ${portTo.ru.name}, ${portTo.ru.country}, ${date.delivery('ru', 'day')}`,
                },
            ],
            cfr: [
                {
                    name: 'Доставка_условия',
                    eng: `3.1 The commodity should be delivered under terms of ${terms} ${portTo.eng.name}`,
                    ru: `3.1 Поставка осуществляется на условиях ${terms} ${portTo.ru.name}`,
                },
                {
                    name: 'Доставка_порт',
                    eng: `3.5 The delivery of goods to Buyer, mentioned in clause 1.1 of this Agreement should be carried in port of destination ${portTo.eng.name}, ${portTo.eng.country} no later than ${date.delivery('eng', 'month')}`,
                    ru: `3.5 Передача Покупателю Товара, оговоренного в п.1.1. настоящего Дополнения будет производиться в порту назначения ${portTo.ru.name}, ${portTo.ru.country} не позднее чем ${date.delivery('ru', 'month')}`,
                },
            ],
            fca: {
                common: [],
                com: [
                    {
                        name: 'Цена_неком',
                        eng: `2.1 The final price agreed upon by the parties after the cargo discharging at the ${portTo.eng.name} port of destination is detailed in the table in Item 1 of this Agreement.`,
                        ru: `2.1 Окончательная цена, установленная сторонами по результатам выгрузки в порту назначения ${portTo.ru.name}, указана в таблице в п. 1 настоящего Дополнения.`,
                    },
                    {
                        name: 'Доставка_условия',
                        eng: `3.1 The delivery was carried out under conditions of the FCA ${portTo.eng.name} in accordance with Agreement ${storageAgreementRow.agreementNo} dated ${date.storageAgreementDate('eng')} to the Contract of Sales No.${storageAgreementRow.contract.contractNo} dated ${date.contract('eng')}. Acceptance and transfer of Goods in terms of quantity and quality was carried out on the territory of ${portTo.eng.countryFull} in the settlement of ${portTo.eng.name}.`,
                        ru: `3.1 Поставка осуществлялась на условиях FCA ${portTo.ru.name} в рамках Дополнения № ${storageAgreementRow.agreementNo} от ${date.storageAgreementDate('ru')} к контракту ${storageAgreementRow.contract.contractNo} от ${date.contract('ru')} Приемка-передача Товара по количеству и качеству производилась на территории: ${portTo.ru.countryFull} в п. ${portTo.ru.name}.`,
                        height: terms === 'FCA' ? 60 : 45,
                    },
                    {
                        name: 'Доставка_приемка',
                        eng: `3.4 The Parties have agreed that the acceptance and transfer of the batch of Goods in the settlement of ${portTo.eng.name} on behalf of the Buyer was carried out by: ${consignee.fullName} ${consignee.addres}`,
                        ru: `3.4 Стороны пришли к соглашению, что приемку-передачу партии Товара в п. ${portTo.ru.name} от имени покупателя осуществляла компания: ${consignee.fullName} ${consignee.addres}`,
                    },
                    {
                        name: 'Доставка_дата',
                        eng: `Delivery date: ${deliveryDate}`,
                        ru: `Дата поставки: ${deliveryDate}`,
                    },
                ],
                nonCom: [
                    {
                        name: 'Соглашение',
                        eng: `AGREEMENT No. ${agreementNo} dated ${date.agreement('eng')}`,
                        ru: `Дополнение № ${agreementNo} от ${date.agreement('ru')}`,
                    },
                    {
                        name: 'Контракт',
                        eng: `to a contract of sale No. ${contract.contractNo}`,
                        ru: `к контракту купли-продажи № ${contract.contractNo}`,
                    },
                    {
                        name: 'Цена_всего',
                        eng: `${currency.eng}`,
                        ru: `${currency.ru}`,
                        height: 40,
                    },
                    {
                        name: 'Цена_неком',
                        eng: '2.1 The price is approximate. The final price will be set by the parties after',
                        ru: '2.1  Цена является ориентировочной. Окончательная цена будет установлена.',
                        height: 20,
                    },
                    {
                        name: 'Доставка_условия',
                        eng: `3.1 Supply of products is carried out on FCA Terms.\nAcceptance- transfer of Goods by quantity and quality is made on the territory of: ${portTo.eng.countryFull} in ${portTo.eng.name}.`,
                        ru: `3.1 Поставка осуществляется на условиях FCA.\nПриемка-передача Товара по количеству и качеству производится на территории: ${portTo.ru.countryFull} в п. ${portTo.ru.name}`,
                    },
                    {
                        name: 'Доставка_приемка',
                        eng: `3.4 The Parties have agreed that the acceptance and transfer of the batch of Goods in the settlement of ${portTo.eng.name} on behalf of the Buyer will be carried out by: ${consignee.fullName} ${consignee.addres}`,
                        ru: `3.4 Стороны пришли к соглашению, что приемку-передачу партии Товара в п. ${portTo.ru.name} от имени покупателя будет осуществлять: ${consignee.fullName} ${consignee.addres}`,
                    },
                    {
                        name: 'Доставка_дата',
                        eng: `Expected delivery date: ${deliveryDate}`,
                        ru: `Дата поставки ориентировочно: ${deliveryDate}`,
                    },
                ],

            },
        },
        exportStorage: {
            common: [
                {
                    name: 'Соглашение',
                    eng: `AGREEMENT No. ${agreementNo} dated ${date.agreement('eng')}`,
                    ru: `Дополнение № ${agreementNo} от ${date.agreement('ru')}`,
                },
                {
                    name: 'Контракт',
                    eng: `to the Storage Services Contract No. ${contract.contractNo}`,
                    ru: `к контракту оказания услуг хранения № ${contract.contractNo}`,
                },
                {
                    name: 'Обязательство_хранение',
                    eng: `1. The Contractor shall undertake to accept for storage on the refrigerator, located in ${portTo.eng.name}, ${portTo.eng.country}, the batch of:`,
                    ru: `1. Исполнитель обязуется принять на хранение на холодильник расположенный в г. ${portTo.ru.name}, ${portTo.ru.country}, переданную Заказчиком партию:`,
                },
                {
                    name: 'Доставка_транспорт',
                    eng: `2. The Goods will be delivered to ${portTo.eng.name}, ${portTo.eng.country} by the transport vessel ${transport.eng.name} no later than ${date.delivery('eng', 'month')}`,
                    ru: `2. Товар будет доставлен в г. ${portTo.ru.name}, ${portTo.ru.country} транспортным судном ${transport.ru.name} не позднее чем ${date.delivery('ru', 'month')}`,
                    height: 40,
                },
                {
                    name: 'Остальное_контракт',
                    eng: `3. In all other matters not covered by this Agreement, the parties shall be governed by the terms and conditions of Storage Services Contract No. ${contract.contractNo}, dated ${date.contract('eng')}`,
                    ru: `3. Во всем остальном, что не предусмотрено настоящим дополнением, стороны руководствуются условиями контракта оказания услуг хранения ${contract.contractNo} от ${date.contract('ru')}`,
                },
                {
                    name: 'Соглашение_вступление',
                    eng: `4. The present Agreement shall come into force from the moment of its signing and is an integral part of the Storage Services Contract No. ${contract.contractNo} dated ${date.contract('eng')}`,
                    ru: `4. Настоящее дополнение вступает в силу с момента его подписания и является неотъемлемой частью контракта оказания услуг хранения № ${contract.contractNo} от ${date.contract('ru')}`,
                },
                {
                    name: 'Юридикция',
                    eng: '5. This Agreement has been drawn up and signed in two original duplicates of equal legal force.',
                    ru: '5. Настоящее дополнение составлено и подписано в двух подлинных экземплярах, имеющих одинаковую юридическую силу.',
                },
                {
                    name: 'Адреса_подпись',
                    eng: `Заказчик/Customer ______________________________${podpisant.eng.name}`,
                    ru: `Исполнитель/Contractor ______________________________${agent.eng.signatory}`,
                },
            ],
        },
        certificates: [
            {
                name: 'Обязательство_хранение',
                eng: `1. The Contractor shall undertake to accept for storage on the refrigerator, located in ${portTo.eng.name}, ${portTo.eng.country} the batch of the following quantity:`,
                ru: `1. Исполнитель обязуется принять на хранение на холодильник расположенный в г. ${portTo.ru.name}, ${portTo.ru.country} переданную Заказчиком партию:`,
            },
            {
                name: 'Доставка_транспорт',
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
            resArr.push(...cells.export.fca.com);
        }
    }

    if (type === 'exportStorageT') {
        resArr.push(...cells.exportStorage.common);

        if (terms === 'FCA') {
            resArr.push(...cells.export.fca.nonCom);
        }
    }

    if (type === 'certificatesT') {
        resArr.push(...cells.exportStorage.common);
        resArr.push(...cells.certificates);
    }

    return resArr;
};
