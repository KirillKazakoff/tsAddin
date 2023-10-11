/* eslint-disable no-param-reassign */
import ExcelJS from 'exceljs';
import { isNumber } from '../../utils/isNumber';

export const getAddress = (cell: ExcelJS.Cell) => {
    return cell.address.split('').reduce<{ col: string; row: string }>(
        (total, value) => {
            if (isNumber(+value)) {
                total.row += value;
            } else {
                total.col += value;
            }
            return total;
        },
        { col: '', row: '' },
    );
};

export type AddressT = ReturnType<typeof getAddress>;
type FormulaObjT = {
    formulaCb: (address: AddressT) => string;
    result: string | number;
    cell: ExcelJS.Cell;
};

export const createFormula = ({ cell, result, formulaCb }: FormulaObjT) => {
    // console.log(cell.row);
    const formula = formulaCb(getAddress(cell));

    return {
        formula,
        result,
        sharedFormula: formula,
        date1904: false,
    };
};
