import { InnerGroupT } from '../groupByContractNo';
import { CellObjT } from '../../../../types/typesExcelUtils';
import { CellDeclarationT } from '../../../../types/typesUtils';
import { getPortLetterNo } from './getPortLetterNo';
import spsStore from '../../../../stores/spsStore/spsStore';
import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import { getExcelDateNumeric } from '../../../excel/utils/getExcelDate';

export const getPortLetterCells = (contract: InnerGroupT) => {
    const {
        record: { row: r },
    } = contract;
    const date = { delivery: getExcelDateNumeric(r.deliveryDate, 'ru') };

    const { confidentialPhones: phones } = spsStore;
    const { fields } = portLetterStore;

    const orgName = {
        seller: `ООО "${r.seller.ru.name}"`,
        buyer: `${r.buyer.req.org.form.code} "${r.buyer.name}"`,
    };

    // prettier-ignore
    const cells = {
        common: [
            { cell: 'Номер_письма', value: getPortLetterNo(contract) },
            { cell: 'Порт', value: `${fields.portRu.name}` },
            { cell: 'Порт_директор', value: `${fields.portRu.director}` },
            { cell: 'Порт_почта', value: `${fields.portRu.mail}` },
            { cell: 'Подписант_комментарий', value: fields.podpisant.ru.position },
            { cell: 'Подписант', value: fields.podpisant.ru.name },
            {
                cell: 'Контрольный_звонок',
                isEmptyCell: !fields.isControlPhone,
                value: `Передача продукции по контрольному звонку: т. ${phones?.['КНФ']?.phone}, ${phones?.['МСФ']?.phone}`,
            },
        ],
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
            },
            {
                cell: 'Покупатель_телефон',
                value: `Контактный телефон: ${r.buyer.phone}`,
            },
            {
                cell: 'Грузовые_борт_склад',
                isEmptyCell: !fields.cargoToStorage,
                value: `Оплата грузовых работ (борт-склад) и хранения с момента закладки будет производиться за счет ${
                    fields.cargoToStorage === 'Покупатель' ? orgName.buyer : orgName.seller
                }`,
            },
            {
                cell: 'Грузовые_склад_авто',
                isEmptyCell: !fields.cargoToAuto,
                value: `Оплата грузовых работ (склад-авто) будет производиться за счет ${
                    fields.cargoToAuto === 'Покупатель' ? orgName.buyer : orgName.seller
                }`,
            },
            {
                cell: 'Хранение',
                isEmptyCell: fields.termsPort !== 'EXW',
                value: `Хранение стороной продавца осуществляется включительно до ${fields.storageTo}. Хранение покупателя осуществляется с ${fields.storageFrom}`,
            },
            {
                cell: 'Исполнитель_информация',
                value: `Исполнитель: ${phones?.['МСФ']?.fullName}; телефон: ${phones?.['МСФ']?.phone}`,
            },
            { cell: 'Имя_представитель', value: phones?.['ДМА']?.fullName },
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
            },
            {
                cell: 'Расходы_компания',
                value: `Расходы по судозаходу и ПРР просьба выставлять на компанию ${orgName.seller}`,
            },
            {
                cell: 'Выгрузка_ответственный1',
                value: `При выгрузке ${r.vessel.code} ${date.delivery} расходы по диспетчеризации и подвозу`,
            },
            {
                cell: 'Выгрузка_ответственный2',
                value: `технологического оборудования просим выставлять на ${fields.personDischarge}`,
            },
        ],
    } satisfies CellDeclarationT<CellObjT>;

    const resArr = [...cells.common];

    if (r.terms === 'FCA') {
        resArr.push(...cells.fca);
    } else {
        resArr.push(...cells.default);
    }

    return resArr;
};
