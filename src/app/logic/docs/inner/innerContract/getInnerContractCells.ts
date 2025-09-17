import innerContractStore from '../../../../stores/docsStores/innerContractStore';
import { CellDeclarationT, CellObjT } from '../../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../../excel/utils/getExcelDate';
import { formatCurrencyLong } from '../../../utils/formatCount';
import { InnerGroupT } from '../groupInnerContracts';

export const getInnerContractCells = (contract: InnerGroupT) => {
    const { row: r, mateRow: mr } = contract.record;
    const { podpisant } = innerContractStore.fields;
    const date = {
        contract: getExcelDateStr(r.contractDate, 'ru'),
        payment: getExcelDateStr(r.paymentDate, 'ru'),
        delivery: getExcelDateStr(r.deliveryDate, 'ru'),
    };

    let isPaymentMore = r.paymentDate > r.deliveryDate;
    if (!r.deliveryDate) isPaymentMore = false;

    const richText = ({ text, isBold }: { text: string; isBold?: boolean }) => ({
        font: { name: 'Times New Roman', size: 11, bold: isBold },
        text,
    });
    const isIP = r.buyer.req.org?.form.code === 'ИП';

    // prettier-ignore
    const commonObj = {
        hidden: [
            { name: 'Договор_передача_EXW', height: 1 },
            { name: 'Договор_приемка_EXW', height: 1 },
            { name: 'Договор_момент_приемки_EXW', height: 1 },
            { name: 'Договор_Меркурий_EXW', height: 1 },
            { name: 'Договор_подход_дата', height: 1 },
            { name: 'Договор_доставка', height: 1 },
            { name: 'Договор_приемка_товара', height: 1 },
            { name: 'Договор_приемка_товара_количество', height: 1 },
            { name: 'Договор_приемка_товара_качество', height: 1 },
            { name: 'Договор_момент_приемки', height: 1 },
            { name: 'Договор_приемка_товара_ВСД', height: 1 },
            { name: 'Договор_Меркурий', height: 1 },
            { name: 'Договор_доставка_FCA', height: 1 },
            { name: 'Договор_приемка_товара_FCA', height: 1 },
            { name: 'Договор_момент_приемки_FCA', height: 1 },
            { name: 'Договор_Меркурий_FCA', height: 1 },
            { name: 'Договор_право_собственности_FCA', height: 1 },
        ],
        common: [
            { name: 'Договор_номер', value: `ДОГОВОР ПОСТАВКИ №${r.id}` },
            { name: 'Договор_дата', value: date.contract },
            {
                name: 'Договор_стороны',
                value: {
                    richText: [
                        richText({ text: `Общество с ограниченной ответственностью «${r.seller.ru.name}» (ООО «${r.seller.ru.shortName}»), `, isBold: true }),
                        richText({ text: `именуемое в дальнейшем «Поставщик», ${podpisant.req.face}, действующ${podpisant.req.sex} ${podpisant.req.base[r.seller.code]}, с одной стороны, и ` }),
                        richText({ text: `${r.buyer.orgNameFull} (${r.buyer.orgNameShort}), `, isBold: true }),
                        richText({ text: `${isIP ? 'именуемый/ая' : 'именуемое'}  в дальнейшем «Покупатель», ${r.buyer.req.podpisant.face}, действущ${r.buyer.req.podpisant.sex} ${r.buyer.req.podpisant.base} с другой стороны, ` }),
                        richText({ text: 'заключили настоящий договор о нижеследующем:' }),
                    ],
                },
            },
            {
                name: 'Договор_цена_всего',
                value: {
                    richText: [
                        richText({ text: '2.2. Общая сумма настоящего договора составляет ориентировочно ' }),
                        richText({ text: `${contract.total.priceTotal.str} руб. `, isBold: true }),
                        richText({ text: `(${formatCurrencyLong(contract.total.priceTotal.count, 'ru', 'rub')}), ` }),
                        richText({ text: 'в том числе НДС. Окончательная общая сумма договора будет указана в УПД.' }),
                    ],
                },
            },
            {
                name: 'Договор_оплата_дата',
                value: {
                    richText: [
                        richText({ text: `4.1. Покупатель обязан внести ${isPaymentMore ? 'оплату' : 'предоплату'} в размере 100 % стоимости товара, указанной в п. 2.2 настоящего договора, путем перечисления денежных средств на расчетный счет Поставщика на основании счета ` }),
                        richText({ text: `до ${date.payment} `, isBold: true }),
                        richText({ text: 'Денежные обязательства Покупателя считаются исполненными с момента зачисления денежных средств на расчетный счет Поставщика.' }),
                    ],
                },
                height: 42,
            },
            {
                name: 'Нарушение_договор',
                value: `6.5. Нарушение договора Покупателем предполагается существенным в случаях:\n- невнесения ${isPaymentMore ? 'оплаты' : 'предоплаты'} в срок, установленный п. 4.1 договора;\n- внесения ${isPaymentMore ? 'оплаты' : 'предоплаты'} в неполном размере.`,
            },
        ],
        addresses: [
            {
                name: 'Договор_адреса_поставщик',
                value: `Поставщик: ООО «${r.seller.ru.shortName}»`,
            },
            {
                name: 'Договор_адреса_поставщик_адрес',
                value: `Адрес: ${r.seller.ru.address}`,
            },
            {
                name: 'Договор_адреса_поставщик_тел',
                value: `Тел/факс: ${r.seller.info.phoneFax}`,
            },
            {
                name: 'Договор_адреса_поставщик_почта',
                value: `Электронный адрес: ${r.seller.info.mail}`,
            },
            {
                name: 'Договор_адреса_поставщик_инн',
                value: `ИНН ${r.seller.info.inn}, КПП ${r.seller.info.kpp}`,
            },
            {
                name: 'Договор_адреса_поставщик_огрн',
                value: `ОГРН ${r.seller.info.ogrn}, ОКПО ${r.seller.info.okpo}`,
            },
            {
                name: 'Договор_адреса_поставщик_банк',
                value: `Наименование банка: ${r.bankSeller.inner.name}`,
            },
            {
                name: 'Договор_адреса_поставщик_бик',
                value: `БИК ${r.bankSeller.inner.bik}`,
            },
            {
                name: 'Договор_адреса_поставщик_кс',
                value: `к/c ${r.bankSeller.inner.ks}`,
            },
            {
                name: 'Договор_адреса_поставщик_рс',
                value: `р/с ${r.bankSeller.inner.rs}`,
            },
            {
                name: 'Договор_адреса_поставщик_должность',
                value: `${podpisant.ru.position}`,
            },
            {
                name: 'Договор_адреса_поставщик_фио',
                value: `_____________________________ ${podpisant.ru.name}`,
            },

            {
                name: 'Договор_адреса_покупатель',
                value: `Покупатель: ${r.buyer.req.org.form.code} ${isIP ? '' : '«'}${r.buyer.name}${isIP ? '' : '»'}`,
            },
            {
                name: 'Договор_адреса_покупатель_адрес',
                value: `Адрес: ${r.buyer.req.org.address}`,
            },
            {
                name: 'Договор_адреса_покупатель_тел',
                value: `Тел/факс: ${r.buyer.req.org.phoneFax}`,
            },
            {
                name: 'Договор_адреса_покупатель_почта',
                value: `Электронный адрес: ${r.buyer.req.org.mail}`,
            },
            {
                name: 'Договор_адреса_покупатель_инн',
                value: `ИНН ${r.buyer.inn}, КПП ${r.buyer.req.org.kpp}`,
            },
            {
                name: 'Договор_адреса_покупатель_огрн',
                value: `${r.buyer.req.org.ogrn ? `ОГРН ${r.buyer.req.org.ogrn}, ` : ''} ${
                    r.buyer.req.org.okpo ? `ОКПО ${r.buyer.req.org.okpo}` : ''
                }`,
            },
            {
                name: 'Договор_адреса_покупатель_банк',
                value: `Наименование банка: ${r.buyer.req.bank.name}`,
            },
            {
                name: 'Договор_адреса_покупатель_бик',
                value: `БИК ${r.buyer.req.bank.bik}`,
            },
            { name: 'Договор_адреса_покупатель_кс', value: `к/c ${r.buyer.req.bank.ks}` },
            { name: 'Договор_адреса_покупатель_рс', value: `р/с ${r.buyer.req.bank.rs}` },
            {
                name: 'Договор_адреса_покупатель_должность',
                value: `${r.buyer.req.podpisant.position}`,
            },
            {
                name: 'Договор_адреса_покупатель_фио',
                value: `_____________________________ ${r.buyer.req.podpisant.shortName}`,
            },
        ],
        cfr: [
            {
                name: 'Договор_приемка_товара',
                value: `4.4. Приемка товара по качеству и количеству осуществляется Покупателем или его уполномоченным представителем в порту ${r.port.code} в следующем порядке:`,
                height: 15,
            },
            {
                name: 'Договор_приемка_товара_количество',
                value: `▪ по количеству – в момент получения товара в порту ${r.port.code}`,
                height: 15,
            },
            {
                name: 'Договор_приемка_товара_качество',
                value: `▪ по качеству – в течение 3-х дней с момента с момента получения товара в порту ${r.port.code}.`,
                height: 15,
            },
            {
                name: 'Договор_момент_приемки',
                value: '4.5. С момента приемки товара по количеству и качеству, согласно п. 4.4 настоящего договора, в дальнейшем никакие претензии по количеству и качеству товара от Покупателя Поставщиком не принимаются.',
                height: 30,
            },
            {
                name: 'Договор_Меркурий',
                value: '4.7. Покупатель обязан подтвердить регистрацию в ГИС «Меркурий».',
                height: 15,
            },
        ],
    } satisfies CellDeclarationT<CellObjT>;

    // prettier-ignore
    const cells = {
        cfrDefault: [
            {
                name: 'Договор_подход_дата',
                value: {
                    richText: [
                        richText({
                            text: `4.2. Товар доставляется в порт ${r.port.code} морским транспортом `,
                        }),
                        richText({
                            text: `(${r.transport.ru.name}), `,
                            isBold: true,
                        }),
                        richText({
                            text: `зафрахтованным Поставщиком. Ориентировочная дата подхода судна в порт ${r.port.code} `,
                        }),
                        richText({ text: date.delivery, isBold: true }),
                    ],
                },
                height: 30,
            },
            {
                name: 'Договор_доставка',
                value: `4.3. Товар передается Покупателю на борту транспортного судна, доставившего товар в порт ${r.port.code}. Право собственности на товар переходит к Покупателю с момента оформления Продавцом ВСД.`,
                height: 30,
            },
            {
                name: 'Договор_приемка_товара_ВСД',
                value: '4.6. Ветеринарные сопроводительные документы (ВСД) необходимые для транспортировки товара до порта назначения оформляются Поставщиком. Дальнейшее оформление ВСД на товар осуществляет Покупатель своими силами и за свой счет.',
                height: 30,
            },
            ...commonObj.cfr,
        ],
        cfrRef: [
            {
                name: 'Договор_подход_дата',
                value: {
                    richText: [
                        richText({
                            text: `4.2. Товар доставляется в порт ${r.port.code} из порта Магадан в рефрижераторном(ых) контейнере(ах) морским транспортом `,
                        }),
                        richText({
                            text: `${r.transport.ru.name}, рейс ${mr.reice}, `,
                            isBold: true,
                        }),
                        richText({
                            text: `зафрахтованным Поставщиком. Ориентировочная дата подхода судна в порт ${r.port.code} `,
                        }),
                        richText({ text: date.delivery, isBold: true }),
                    ],
                },
                height: 30,
            },
            {
                name: 'Договор_доставка',
                value: `4.3. Товар передается Покупателю в рефрижераторном(ых) контейнере(ах) на контейнерном терминале в порту ${r.port.code}, расположенном по адресу: г. Владивосток, ул. Морозова, 7А, по товарной накладной после полной оплаты стоимости товара в соответствии с п. 4.1 договора. О точной дате передачи товара Поставщик дополнительно извещает Покупателя письмом. Со дня, следующего за указанным в письме Поставщика днем передачи товара, расходы по подключению и электропитанию контейнера(ов), а также риски, связанные с несвоевременным подключением контейнеров, несет Покупатель. Право собственности на товар переходит к Покупателю с момента оформления Поставщиком ВСД.`,
                height: 70,
            },
            {
                name: 'Договор_приемка_товара_ВСД',
                value: '4.6. Ветеринарные сопроводительные документы (ВСД) необходимые для транспортировки товара из г. Магадана до контейнерного терминала, указанного в п. 4.3, оформляются Поставщиком.  После прибытия товара в контейнерный терминал, указанного в пункте 4.3, товар передается Покупателю в ФГИС "Меркурий" на площадке МПП "Владивосток", адрес регистрации: Российская Федерация, Приморский край, г.Владивосток (номер площадки в ИС "Цербер": RU25:49263825). Дальнейшее оформление ВСД на товар осуществляет Покупатель своими силами и за свой счет.',
                height: 60,
            },
            ...commonObj.cfr,
        ],
        exw: [
            {
                name: 'Договор_передача_EXW',
                value: `4.2. Товар передается Покупателю с холодильника в порту ${r.port.code} ${
                    isPaymentMore ? date.delivery : 'после внесения предоплаты.'
                } Грузовые работы с холодильника в порту ${r.port.code} – за счет ${
                    r.cargo === 'Покупатель' ? 'Покупателя' : 'Поставщика'
                }.`,
                height: 30,
            },
            {
                name: 'Договор_приемка_EXW',
                value: `4.3. Приемка товара по качеству и количеству осуществляется Покупателем или его уполномоченным представителем на холодильнике в порту ${r.port.code} в момент получения товара.`,
                height: 30,
            },
            {
                name: 'Договор_момент_приемки_EXW',
                value: '4.4. С момента приемки товара по количеству и качеству, согласно п. 4.3 настоящего договора, в дальнейшем никакие претензии по количеству и качеству товара от Покупателя Поставщиком не принимаются.',
                height: 30,
            },
            {
                name: 'Договор_Меркурий_EXW',
                value: '4.5. Покупатель обязан подтвердить регистрацию в ГИС «Меркурий».',
                height: 30,
            },
        ],
        fca: [
            {
                name: 'Договор_доставка_FCA',
                value: `4.2. Товар передается Покупателю в порту ${
                    r.port.code
                } ориентировочно ${date.delivery}. Грузовые работы в порту ${
                    r.port.code
                } – за счет ${r.cargo === 'Покупатель' ? 'Покупателя' : 'Поставщика'}`,
                height: 25,
            },
            {
                name: 'Договор_приемка_товара_FCA',
                value: '4.3. Приемка товара по качеству и количеству осуществляется Покупателем или его уполномоченным представителем в порту в момент получения товара.',
                height: 30,
            },
            {
                name: 'Договор_момент_приемки_FCA',
                value: '4.4. С момента приемки товара по количеству и качеству, согласно п. 4.3 настоящего договора, в дальнейшем никакие претензии по количеству и качеству товара от Покупателя Поставщиком не принимаются.',
                height: 40,
            },
            {
                name: 'Договор_Меркурий_FCA',
                value: '4.5. Покупатель обязан подтвердить регистрацию в ГИС «Меркурий».',
                height: 20,
            },
            {
                name: 'Договор_право_собственности_FCA',
                value: '4.6. Право собственности на товар переходит к Покупателю с момента оформления Поставщиком ВСД.',
                height: 20,
            },
            { name: 'Поставщик_обязуется', height: 1 },
            { name: 'Транспортная_тара', height: 1 },
            { name: 'Дата_выпуска', height: 1 },
        ],
    } satisfies CellDeclarationT<CellObjT>;

    const resArr = [...commonObj.hidden, ...commonObj.common, ...commonObj.addresses];

    if (r.terms === 'CFR') {
        resArr.push(...cells.cfrDefault);
    }
    if (r.terms === 'CFR(Контейнер)') {
        resArr.push(...cells.cfrRef);
    }
    if (r.terms === 'EXW') {
        resArr.push(...cells.exw);
    }
    if (r.terms === 'FCA') {
        resArr.push(...cells.fca);
    }

    return resArr;
};
