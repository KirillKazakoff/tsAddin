/* eslint-disable no-param-reassign */
import { nanoid } from 'nanoid';
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { getExcelDateShort, getNowDate } from '../../excel/utils/getExcelDate';
import { groupTotal } from '../../utils/groupify/groupTotal';
import { indexToStr } from '../../utils/indexToStr';
import portLetterStore from '../../../stores/docsStores/portLetterStore';
import { groupMates } from './groupMates';
import { InnerRowT } from '../../../stores/tablesStore/set/setInner';
import { InnerSampleRowT } from '../../../stores/tablesStore/set/setSamplesInner';

export const groupInnerContracts = () => {
    const matesGrouped = groupMates();

    const rows = [...tablesStore.innerT, ...tablesStore.samplesInnerT].map((row) => {
        const mateRow = tablesStore.matesT.find((r) => r.konosament === row.knsNo);

        const konosamentGroup = matesGrouped
            .find((mGroup) => mGroup.kns.includes(mateRow))
            ?.kns.reduce<{ value: string; index: number }>(
            // prettier-ignore
            (total, r, i, source) => {
                const isLast = source.length === i + 1;

                total.value += `${r.konosament} от ${getExcelDateShort(r.date, 'ru')} ${isLast ? '' : '\n'}`;
                total.index += 1;
                return total;
            },
            { value: '', index: 0 },
        );

        return {
            row: row as InnerRowT & InnerSampleRowT,
            mateRow,
            konosamentGroup,
            type: row.type,
            amount: row.amount,
            id: row.id,
        };
    });

    // prettier-ignore
    const contracts = groupTotal({
        rows,
        input: ({ row, mateRow }) => ({
            init: () => !!row.id,
            code: row.type === 'innerT' ? `${row.id}${row.buyer.code}` : `${row.id}`,
            groupedBy: {
                noGroup: {
                    code: nanoid(),
                    additional: { konosamentGroup: { value: '', index: 0 } },
                    groupModify: (group) => {
                        const { konosamentGroup } = group.additional;
                        const { konosament, date } = group.record.mateRow;
                        // prettier-ignore
                        konosamentGroup.value = `${konosament} от ${getExcelDateShort(date, 'ru')}`;
                        konosamentGroup.index = 1;
                        return true;
                    },
                },
                sortPack: {
                    code: `${row.product.code + row.vessel.code + row.sort + row.pack}`,
                },
                request: {
                    code: `${row.product.code + row.vessel.code + row.sort + row.pack}`,
                },
                portLetter: {
                    code: `${row.product.code + row.vessel.code + row.sort + row.pack + row.knsNo}`,
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

    return contracts;
};

export type InnerGroupT = ReturnType<typeof groupInnerContracts>[number];
