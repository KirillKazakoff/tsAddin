/* eslint-disable no-param-reassign */
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { getNowDate } from '../../excel/utils/getExcelDate';
import { groupTotal } from '../../utils/groupify/groupTotal';
import { indexToStr } from '../../utils/indexToStr';
import portLetterStore from '../../../stores/docsStores/portLetterStore';

export const groupByContractNo = () => {
    const rows = tablesStore.innerT.map((row) => {
        const mateRow = tablesStore.matesT.find((r) => r.konosament === row.konosament);

        return {
            row,
            mateRow,
            type: row.type,
            amount: row.amount,
            id: row.id,
        };
    });

    const res = groupTotal({
        rows,
        input: ({ row, mateRow }) => ({
            code: row.id,
            groupedBy: {
                request: {
                    code:
                        row.product.codeName + row.vessel.codeName + row.sort + row.pack,
                },
            },
            additional: { portLetterNo: '' },
            groupModify: (group) => {
                const letterIndex = `${indexToStr(group.index)} от ${
                    portLetterStore.fields.dateLetter || getNowDate()
                }`;

                group.additional.portLetterNo = `Исх. № ${
                    mateRow?.reice ? `${mateRow.reice} - ` : ''
                }${letterIndex}`;

                return true;
            },
        }),
    });

    return res;
};

export type InnerGroupT = ReturnType<typeof groupByContractNo>[number];
export type InnerCombRowT = InnerGroupT['rows'][number];
