import { CellDeclarationT, CellObjT } from '../../../../types/typesExcelUtils';
import { getPortLetterNo } from './getPortLetterNo';
import spsStore from '../../../../stores/spsStore/spsStore';
import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import { getExcelDateShort } from '../../../excel/utils/getExcelDate';
import { InnerGroupT } from '../groupInnerContracts';

export const getPortLetterCells = (doc: InnerGroupT) => {
    const {
        record: { row: r },
    } = doc;
    const date = { delivery: getExcelDateShort(r.deliveryDate, 'ru') };

    const { confidentialPhones: phones } = spsStore;
    const { fields } = portLetterStore;

    // prettier-ignore
    const orgName = {
        seller: `ООО "${r.seller.ru.name}"`,
        buyer: r.type === 'innerT' ? `${r.buyer.req.org.form.code} "${r.buyer.name}"` : '',
    };

    const commonObj = {
        common: [
            { name: 'Номер_письма', value: getPortLetterNo(doc) },
            { name: 'Порт', value: `${fields.portRu.name}` },
            { name: 'Порт_директор', value: `${fields.portRu.director}` },
            { name: 'Порт_почта', value: `${fields.portRu.mail}` },
            { name: 'Подписант_комментарий', value: fields.podpisant.ru.position },
            { name: 'Подписант', value: fields.podpisant.ru.name },
            {
                name: 'Контрольный_звонок',
                isEmptyCell: !fields.isControlPhone,
                value: `Передача продукции по контрольному звонку: т. ${phones?.['МСФ']?.phone}`,
            },
            {
                name: 'Имя_представитель',
                value: `Дополнительно сообщаем контактные данные нашего представителя во Владивостоке:\n${phones?.['ДМА']?.fullName}`,
                height: 30,
            },
            {
                name: 'Телефон_представитель',
                value: `( контактный телефон: ${phones?.['ДМА']?.phone} )`,
            },
        ],
        hidden: [
            { name: 'Хранение', height: 1 },
            { name: 'Письмо_описание_шапка', height: 1 },
            { name: 'Образцы_выдача', height: 1 },
            { name: 'Образцы_подвал', height: 1 },
            { name: 'Расходы_компания', height: 1 },
            { name: 'Выгрузка_ответственный', height: 1 },
            { name: 'Письмо_описание_подвал', height: 1 },
            { name: 'Покупатель_телефон', height: 1 },
            { name: 'Грузовые_борт_склад', height: 1 },
            { name: 'Грузовые_склад_авто', height: 1 },
            { name: 'Исполнитель_информация', height: 1 },
        ],
    } satisfies CellDeclarationT<CellObjT>;

    // prettier-ignore
    const cells = r.type === 'innerT' ? {
        common: commonObj.common,
        default: [
            {
                name: 'Письмо_описание_шапка',
                value: `Просим вас рыбопродукцию, ${
                    fields.termsPort.includes('CFR')
                        ? `которая прибудет в п. Владивосток на ${r.transport.ru.name} в адрес ООО "${r.seller.ru.name}" по следующим коносаментам:`
                        : `находящуюся на хранении ${orgName.seller}`
                }`,
                height: 30,
            },
            {
                name: 'Письмо_описание_подвал',
                value: `передать с ${
                    fields.termsPort.includes('CFR') ? 'борта судна' : 'нашего хранения'
                } компании ${orgName.buyer}; ИНН ${r.buyer.inn}`,
                height: 30,
            },
            {
                name: 'Покупатель_телефон',
                value: `Контактный телефон: ${r.buyer.phone}`,
                height: 15,
            },
            {
                name: 'Грузовые_борт_склад',
                isEmptyCell: !fields.cargoToStorage,
                value: `Оплата грузовых работ (борт-склад) и хранения с момента закладки будет производиться за счет ${
                    fields.cargoToStorage === 'Покупатель' ? orgName.buyer : orgName.seller
                }`,
                height: 30,
            },
            {
                name: 'Грузовые_склад_авто',
                isEmptyCell: !fields.cargoToAuto,
                value: `Оплата грузовых работ (склад-авто) будет производиться за счет ${
                    fields.cargoToAuto === 'Покупатель' ? orgName.buyer : orgName.seller
                }`,
                height: 30,
            },
            {
                name: 'Хранение',
                isEmptyCell: fields.termsPort !== 'EXW',
                value: `Хранение стороной продавца осуществляется включительно до ${fields.storageTo}. Хранение покупателя осуществляется с ${fields.storageFrom}`,
                height: 32,
            },
            {
                name: 'Исполнитель_информация',
                value: `Исполнитель: ${phones?.[fields.executive]?.fullName}; телефон: ${phones?.[fields.executive]?.phone}`,
                height: 25,
            },
            {
                name: 'Телефон_представитель',
                value: `( контактный телефон: ${phones?.['ДМА']?.phone} )`,
                height: 20,
            },
        ],
        fca: [
            {
                name: 'Письмо_описание_шапка',
                value: `Просим Вас рыбопродукцию, которая прибудет на ${r.vessel.code} ${date.delivery} (ориентировочно в 08:00 с уточнением) в адрес ${orgName.seller}`,
                height: 40,
            },
            {
                name: 'Письмо_описание_подвал',
                value: 'Выгрузить на АВТО',
                height: 20,
            },
            {
                name: 'Расходы_компания',
                value: `Расходы по судозаходу и ПРР просьба выставлять на компанию ${orgName.seller}`,
                height: 30,
            },
            {
                name: 'Выгрузка_ответственный',
                value: `При выгрузке ${r.vessel.code} ${date.delivery} расходы по диспетчеризации и подвозу технологического оборудования просим выставлять на ${fields.personDischarge}`,
                height: 40,
            },
        ],
    } satisfies CellDeclarationT<CellObjT> : {
        common: commonObj.common,
        storage: [
            {
                name: 'Письмо_описание_шапка',
                value: `Просим Вас рыбопродукцию, находящуюся на хранении ${orgName.seller} по следующим коносаментам:`,
                height: 25,
            },
            {
                name: 'Образцы_выдача',
                value: `Выдать представителю в г. Владивосток, ${phones?.['ИРК'].fullName} паспорт ${phones?.['ИРК'].passport}, выдан ${phones?.['ИРК'].passportInfo}`,
                height: 60,
            },
            {
                name: 'Образцы_подвал',
                value: '- Заказчик предупрежден об ответственности за достоверность сведений, указанных в заявки.\n- Заказчик несет ответственность за все последствия неправильности, неточности или неполноты сведений, указанных им в Заявке',
                height: 60,
            },
        ],
    } satisfies CellDeclarationT<CellObjT>;

    const resArr = [...commonObj.hidden, ...cells.common];

    if (r.type === 'innerT') {
        if (r.terms === 'FCA') {
            resArr.push(...cells.fca);
        } else {
            resArr.push(...cells.default);
        }
    } else {
        resArr.push(...cells.storage);
    }

    return resArr;
};
