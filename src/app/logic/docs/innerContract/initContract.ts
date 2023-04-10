import { InnerRowT } from '../../../types/typesTables';

export const initContract = (contractNo: number) => {
    const contract = {
        contractNo,
        rows: [],
        priceTotal: 0,
    };
};
