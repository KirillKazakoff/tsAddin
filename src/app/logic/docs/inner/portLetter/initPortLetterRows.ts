/* eslint-disable no-param-reassign */
import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import pageStatusStore from '../../../../stores/pageStatusStore.ts/pageStatusStore';
import { CellUtilsT } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { InnerGroupT } from '../groupByContractNo';

export const initPortLetterRows = (contract: InnerGroupT, utils: CellUtilsT<''>) => {
    const { insertRows } = utils.initRowMaker({ cellName: 'Письмо_массив' });
    const { noGroup, portLetter } = contract.groupedBy;
    const { isGroupingKns } = portLetterStore.fields;

    insertRows({
        records: isGroupingKns ? portLetter : noGroup,
        deleteStartAmount: 1,
        rowSettings: ({
            record: { mateRow, row: r, konosamentGroup },
            total,
            additional,
        }) => {
            const date = mateRow?.date;
            if (!date) {
                pageStatusStore.setPageStatus('mismatchKonosamentId', r.konosament);
                return null;
            }
            if (!isGroupingKns) {
                konosamentGroup = additional.konosamentGroup;
            }

            const noPack = +r.pack === 1;
            // prettier-ignore
            const fields = {
                konosament: konosamentGroup.value,
                product: `${r.product.ru.name} ${r.sort}`,
                vessel: r.vessel.ru.name,
                pack: noPack ? '-' : `1/${r.pack} кг `,
                places: noPack ? '-' : total.places.count,
                placesTotal: total.placesTotal.count,
            };

            if (portLetterStore.fields.termsPort === 'FCA') {
                delete fields.places;
                delete fields.pack;
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
                    // special: {
                    //     konosament: { style: { alignment: { vertical: 'top' } } },
                    // },
                },
            };
        },
    });
};
