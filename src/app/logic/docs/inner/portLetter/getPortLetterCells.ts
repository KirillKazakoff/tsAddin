import { CellObjT } from '../../../../types/typesExcelUtils';
import { CellDeclarationT } from '../../../../types/typesUtils';
import { getPortLetterNo } from './getPortLetterNo';
import spsStore from '../../../../stores/spsStore/spsStore';
import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import { getExcelDateNumeric } from '../../../excel/utils/getExcelDate';
import { InnerGroupT } from '../groupInnerContracts';

export const getPortLetterCells = (contract: InnerGroupT) => {
    const {
        record: { row: r },
    } = contract;
    const date = { delivery: getExcelDateNumeric(r.deliveryDate, 'ru') };

    const { confidentialPhones: phones } = spsStore;
    const { fields } = portLetterStore;

    const orgName = {
        seller: `ООО "${r.seller.ru.name}"`,
        buyer:
            r.type === 'innerT' ? `${r.buyer.req.org.form.code} "${r.buyer.name}"` : '',
    };

    const common = [
        { cell: 'Номер_письма', value: getPortLetterNo(contract) },
        { cell: 'Порт', value: `${fields.portRu.name}` },
        { cell: 'Порт_директор', value: `${fields.portRu.director}` },
        { cell: 'Порт_почта', value: `${fields.portRu.mail}` },
        { cell: 'Подписант_комментарий', value: fields.podpisant.ru.position },
        { cell: 'Подписант', value: fields.podpisant.ru.name },
        {
            cell: 'Контрольный_звонок',
            isEmptyCell: !fields.isControlPhone,
            value: `Передача продукции по контрольному звонку: т. ${phones?.['МСФ']?.phone}`,
        },
        {
            cell: 'Имя_представитель',
            value: phones?.['ДМА']?.fullName,
        },
        {
            cell: 'Телефон_представитель',
            value: `( контактный телефон: ${phones?.['ДМА']?.phone} )`,
        },
    ];

    // prettier-ignore
    const cells = r.type === 'innerT' ? {
        common,
        default: [
            {
                cell: 'Письмо_описание_шапка',
                value: `Просим вас рыбопродукцию, ${
                    fields.termsPort.includes('CFR')
                        ? `которая прибудет в п. Владивосток на ${r.transport.ru.name} в адрес ООО "${r.seller.ru.name}" по следующим коносаментам:`
                        : `находящуюся на хранении ${orgName.seller}`
                }`,
            },
            {
                cell: 'Письмо_описание_подвал',
                value: `передать с ${
                    fields.termsPort.includes('CFR') ? 'борта судна' : 'нашего хранения'
                } компании ${orgName.buyer}; ИНН ${r.buyer.inn}`,
                height: 30,
            },
            {
                cell: 'Покупатель_телефон',
                value: `Контактный телефон: ${r.buyer.phone}`,
                height: 15,
            },
            {
                cell: 'Грузовые_борт_склад',
                isEmptyCell: !fields.cargoToStorage,
                value: `Оплата грузовых работ (борт-склад) и хранения с момента закладки будет производиться за счет ${
                    fields.cargoToStorage === 'Покупатель' ? orgName.buyer : orgName.seller
                }`,
                height: 30,
            },
            {
                cell: 'Грузовые_склад_авто',
                isEmptyCell: !fields.cargoToAuto,
                value: `Оплата грузовых работ (склад-авто) будет производиться за счет ${
                    fields.cargoToAuto === 'Покупатель' ? orgName.buyer : orgName.seller
                }`,
                height: 30,
            },
            {
                cell: 'Хранение',
                isEmptyCell: fields.termsPort !== 'EXW',
                value: `Хранение стороной продавца осуществляется включительно до ${fields.storageTo}. Хранение покупателя осуществляется с ${fields.storageFrom}`,
                height: 32,
            },
            {
                cell: 'Исполнитель_информация',
                value: `Исполнитель: ${phones?.['МСФ']?.fullName}; телефон: ${phones?.['МСФ']?.phone}`,
                height: 25,
            },
            {
                cell: 'Имя_представитель',
                value: phones?.['ДМА']?.fullName,
            },
            {
                cell: 'Телефон_представитель',
                value: `( контактный телефон: ${phones?.['ДМА']?.phone} )`,
            },
        ],
        fca: [
            {
                cell: 'Письмо_описание_шапка',
                value: `Просим Вас рыбопродукцию, которая прибудет на ${r.vessel.code} ${date.delivery} (ориентировочно в 08:00 с уточнением) в адрес ${orgName.seller}`,
            },
            {
                cell: 'Письмо_описание_подвал',
                value: 'Выгрузить на АВТО',
                height: 20,
            },
            {
                cell: 'Расходы_компания',
                value: `Расходы по судозаходу и ПРР просьба выставлять на компанию ${orgName.seller}`,
                height: 30,
            },
            {
                cell: 'Выгрузка_ответственный',
                value: `При выгрузке ${r.vessel.code} ${date.delivery} расходы по диспетчеризации и подвозу технологического оборудования просим выставлять на ${fields.personDischarge}`,
                height: 40,
            },
        ],
    } satisfies CellDeclarationT<CellObjT> : {
        common,
        samples: [
            {
                cell: 'Письмо_описание_шапка',
                value: `Просим Вас рыбопродукцию, находящуюся на хранении ${orgName.seller} по следующим коносаментам:`,
            },
            {
                cell: 'Образцы_выдача',
                value: `Выдать представителю в г. Владивосток, ${phones?.['ИРК'].fullName} паспорт ${phones?.['ИРК'].passport}, выдан ${phones?.['ИРК'].passportInfo}`,
                height: 60,
            },
            {
                cell: 'Образцы_подвал',
                value: '- Заказчик предупрежден об ответственности за достоверность сведений, указанных в заявки.\n- Заказчик несет ответственность за все последствия неправильности, неточности или неполноты сведений, указанных им в Заявке',
                height: 60,
            },
        ],
    } satisfies CellDeclarationT<CellObjT>;

    const resArr = [...cells.common];

    if (r.type === 'innerT') {
        if (r.terms === 'FCA') {
            resArr.push(...cells.fca);
        } else {
            resArr.push(...cells.default);
        }
    } else {
        resArr.push(...cells.samples);
    }

    return resArr;
};
