/* eslint-disable no-param-reassign */
import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import { CellUtilsT } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { InnerGroupT } from '../groupInnerContracts';

export const initPortLetterRows = (contract: InnerGroupT, utils: CellUtilsT<''>) => {
    const { insertRows } = utils.initRowMaker({ cellName: 'Письмо_массив' });
    const { noGroup, portLetter } = contract.groupedBy;
    const { isGroupingKns } = portLetterStore.fields;

    let records = isGroupingKns ? portLetter : noGroup;
    if (contract.record.type === 'samplesInnerT') records = noGroup;

    insertRows({
        records,
        deleteStartAmount: 1,
        rowSettings: ({ record: { row: r, konosamentGroup }, total, additional }) => {
            if (!isGroupingKns) {
                konosamentGroup = additional.konosamentGroup;
            }

            const noPack = +r.pack === 1;
            // prettier-ignore
            const fields = {
                konosament: konosamentGroup.value,
                product: `${r.product.ru.name} ${r.sort ? r.sort : ''}`,
                vessel: r.vessel.ru.name,
                pack: noPack ? '-' : `1/${r.pack} кг `,
                places: noPack ? '-' : total.places.count,
                placesTotal: total.placesTotal.count,
            };

            if (portLetterStore.fields.termsPort === 'FCA') {
                fields.places = '-';
                fields.pack = '-';
            }

            return {
                fields,
                docType: 'inner',
                style: {
                    common: {
                        border: 'all',
                        alignment: 'center',
                        height: 20 + 15 * konosamentGroup.index,
                    },
                },
            };
        },
    });
};
