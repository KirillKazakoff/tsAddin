import innerContractStore from '../../../../stores/docsStores/innerContractStore';
import { CellObjT } from '../../../../types/typesExcelUtils';
import { CellDeclarationT } from '../../../../types/typesUtils';
import { getExcelDateStr } from '../../../excel/utils/getExcelDate';
import { formatCurrencyLong } from '../../../utils/formatCount';
import { InnerGroupT } from '../groupByContractNo';

export const getInnerContractCells = (contract: InnerGroupT) => {
    const { row: r } = contract.record;
    const { podpisant } = innerContractStore.fields;
    const date = {
        contract: getExcelDateStr(r.contractDate, 'ru'),
        payment: getExcelDateStr(r.paymentDate, 'ru'),
        delivery: r.deliveryDate,
    };

    const richText = ({ text, isBold }: { text: string; isBold?: boolean }) => ({
        font: { name: 'Times New Roman', size: 10, bold: isBold },
        text,
    });

    // prettier-ignore
    const cells = {
        addresses: [
            { cell: 'Договор_адреса_поставщик', value: `Поставщик: ${r.seller.ru.name}` },
            { cell: 'Договор_адреса_поставщик_адрес', value: `Адрес: ${r.seller.ru.address}` },
            { cell: 'Договор_адреса_поставщик_тел', value: `Тел/факс: ${r.seller.info.phoneFax}` },
            { cell: 'Договор_адреса_поставщик_почта', value: `Электронный адрес: ${r.seller.info.mail}` },
            { cell: 'Договор_адреса_поставщик_инн', value: `ИНН ${r.seller.info.inn}, КПП ${r.seller.info.kpp}` },
            { cell: 'Договор_адреса_поставщик_огрн', value: `ОГРН ${r.seller.info.ogrn}, ОКПО ${r.seller.info.okpo}` },
            { cell: 'Договор_адреса_поставщик_банк', value: `Наименование банка: ${r.bankSeller.inner.name}` },
            { cell: 'Договор_адреса_поставщик_бик', value: `БИК ${r.bankSeller.inner.bik}` },
            { cell: 'Договор_адреса_поставщик_кс', value: `к/c ${r.bankSeller.inner.ks}` },
            { cell: 'Договор_адреса_поставщик_рс', value: `р/с ${r.bankSeller.inner.rs}` },
            { cell: 'Договор_адреса_поставщик_должность', value: `${podpisant.ru.position}` },
            { cell: 'Договор_адреса_поставщик_фио', value: `_____________________________ ${podpisant.ru.name}` },

            { cell: 'Договор_адреса_покупатель', value: `Покупатель: ${r.buyer.name}` },
            { cell: 'Договор_адреса_покупатель_адрес', value: `Адрес: ${r.buyer.req.org.address}` },
            { cell: 'Договор_адреса_покупатель_тел', value: `Тел/факс: ${r.buyer.req.org.phoneFax}` },
            { cell: 'Договор_адреса_покупатель_почта', value: `Электронный адрес: ${r.buyer.req.org.mail}` },
            { cell: 'Договор_адреса_покупатель_инн', value: `ИНН ${r.buyer.inn}, КПП ${r.buyer.req.org.kpp}` },
            { cell: 'Договор_адреса_покупатель_огрн', value: `${r.buyer.req.org.ogrn ? `ОГРН ${r.buyer.req.org.ogrn}, ` : ''} ${r.buyer.req.org.okpo ? `ОКПО ${r.buyer.req.org.okpo}` : ''}` },
            { cell: 'Договор_адреса_покупатель_банк', value: `Наименование банка: ${r.buyer.req.bank.name}` },
            { cell: 'Договор_адреса_покупатель_бик', value: `БИК ${r.buyer.req.bank.bik}` },
            { cell: 'Договор_адреса_покупатель_рс', value: `р/с ${r.buyer.req.bank.rs}` },
            { cell: 'Договор_адреса_покупатель_должность', value: `${r.buyer.req.podpisant.position}` },
            { cell: 'Договор_адреса_покупатель_фио', value: `${r.buyer.req.podpisant.shortName}` },
        ],
        common: [
            { cell: 'Договор_номер', value: `ДОГОВОР ПОСТАВКИ №${r.id}` },
            { cell: 'Договор_дата', value: date.contract },
            {
                cell: 'Договор_стороны',
                value: {
                    richText: [
                        richText({ text: `${r.seller.ru.name} ("${r.seller.code}"), `, isBold: true }),
                        richText({ text: `именуемое в дальнейшем "Поставщик", ${podpisant.ru.comment} ${podpisant.ru.name}, действущего на основании DOCUMENT BASIS HERE от DATE DOCUMENT HERE, с одной стороны, и ` }),
                        richText({ text: `${r.buyer.name} (${r.buyer.req.org.formName} "${r.buyer.req.org.shortName}"), ` }),
                        richText({ text: `именуемое в дальнейшем "Покупатель", ${r.buyer.req.podpisant.face} ${r.buyer.req.podpisant.shortName}` }),
                        richText({ text: 'заключили настоящий договор о нижеследующем:' }),
                    ],
                },
            },
            {
                cell: 'Договор_оплата_дата',
                value: {
                    richText: [
                        richText({ text: '3.1. Покупатель обязан внести предоплату в размере 100 % стоимости товара, указанной в п. 2.2 настоящего договора, путем перечисления денежных средств на расчетный счет Поставщика на основании счета ' }),
                        richText({ text: `до ${date.payment}.`, isBold: true }),
                        richText({ text: 'Денежные обязательства Покупателя считаются исполненными с момента зачисления денежных средств на расчетный счет Поставщика.' }),
                    ],
                },
            },
            {
                cell: 'Договор_цена_всего',
                value: {
                    richText: [
                        richText({ text: '2.2. Общая сумма настоящего договора составляет ориентировочно ' }),
                        richText({ text: `${contract.total.priceTotal.str} руб. `, isBold: true }),
                        richText({ text: `(${formatCurrencyLong(contract.total.priceTotal.count, 'ru', 'rub')}), ` }),
                        richText({ text: 'в том числе НДС. Окончательная общая сумма договора будет указана в товарной накладной.' }),
                    ],
                },
            },
            {
                cell: 'Договор_подход_дата',
                value: {
                    richText: [
                        richText({ text: '3.2. Товар доставляется в порт Владивосток морским транспортом ' }),
                        richText({ text: `(${r.transport.ru.name}), `, isBold: true }),
                        richText({ text: 'зафрахтованным Поставщиком. Ориентировочная дата подхода судна в порт PORT NAME ' }),
                        richText({ text: date.delivery, isBold: true }),
                    ],
                },
            },
            {
                cell: 'Договор_доставка',
                value: '3.3. Товар передается Покупателю на борту транспортного судна, доставившего товар в порт PORT NAME. Право собственности на товар переходит к Покупателю с момента оформления Продавцом ВСЭ.',
            },
            {
                cell: 'Договор_приемка_товара',
                value: '3.4. Приемка товара по качеству и количеству осуществляется Покупателем или его уполномоченным представителем в порту PORT NAME в следующем порядке:',
            },
            {
                cell: 'Договор_приемка_товара_количество',
                value: '▪ по количеству – в момент получения товара в порту PORT NAME',
            },
            {
                cell: 'Договор_приемка_товара_качество',
                value: '▪ по качеству – в течение 3-х дней с момента с момента получения товара в порту PORT NAME.',
            },
        ],
    } satisfies CellDeclarationT<CellObjT>;

    return [...cells.common, ...cells.addresses];
};
