import fescoLetterStore from '../../../../stores/docsStores/fescoLetterStore';
import { CellObjT } from '../../../../types/typesExcelUtils';
import { CellDeclarationT } from '../../../../types/typesUtils';
import { getExcelDateStr, getNowDate } from '../../../excel/utils/getExcelDate';
import { FescoGroupT } from './groupFesco';

export const getFescoLetterCells = (doc: FescoGroupT) => {
    const { record: r } = doc;
    const { fields } = fescoLetterStore;

    const orgName = {
        seller: `ООО "${r.seller.ru.name}"`,
        buyer: `${r.buyer.req.org.form.code} "${r.buyer.name}"`,
    };

    const richText = ({ text, isBold }: { text: string; isBold?: boolean }) => ({
        font: { name: 'Calibri', size: 11, bold: isBold },
        text,
    });

    const date = { delivery: getExcelDateStr(r.etaDate, 'ru') };

    // prettier-ignore
    const cells = {
        common: [
            { name: 'Номер_письма', value: getNowDate() },
            { name: 'Подписант_комментарий', value: fields.podpisant.ru.position },
            { name: 'Подписант', value: fields.podpisant.ru.name },
            {
                name: 'Письмо_описание_шапка',
                value: {
                    richText: [
                        richText({ text: `             Просим Вас следующие контейнеры, отгруженные на транспорт ${r.transport.ru.name} ` }),
                        richText({ text: `рейс № ${fields.reiceNo} `, isBold: true }),
                        richText({ text: `(ETA ВВО ${date.delivery})\n` }),
                        richText({ text: `в адрес ${orgName.seller} ` }),
                        richText({ text: `выдать ${orgName.buyer}, ИНН ${r.buyer.inn} ${r.buyer.phone ? `(контактный телефон ${r.buyer.phone})` : ''} ` }),
                    ],
                },
            },
            { name: 'Письмо_электропитание', value: 'Просим Вас подключить контейнеры к электропитанию' },
            { name: 'Письмо_температура', value: 'Также просим установить температурный режим в рефрижераторном контейнере (-25 С°)' },
        ],
    } satisfies CellDeclarationT<CellObjT>;

    return cells.common;
};
