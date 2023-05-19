/* eslint-disable no-param-reassign */
import { ProductDescriptionT, SellerT, VesselT } from '../../../../types/typesSP';
import { AmountT, ExportRowT } from '../../../../types/typesTables';

export type AssortimentRowT = {
    sort: string;
    weight: string;
    places: AmountT;
    placesTotal: AmountT;
};

export type SampleRowT = { samplesQt: number } & AssortimentRowT;

export type AssortimentableT<RowT> = {
    rows: RowT[];
    vessel: VesselT;
    product: ProductDescriptionT;
    seller: SellerT;
    pack: number;
};
export type AssortimentT = AssortimentableT<AssortimentRowT>;
export type SampleT = AssortimentableT<SampleRowT>;
export type AssortimentsT = { [key: string]: AssortimentT };
export type SamplesT = { [key: string]: SampleT };

function getGroup<ReturnT>(
    total: any,
    initObj: any,
    code: string | number,
): ReturnT {
    let group = total[code];

    if (!group) {
        group = initObj;
        total[code] = group;
    }
    return group;
}

export const groupAssortiment = (rows: ExportRowT[]) => {
    const grouped = rows.reduce<AssortimentsT>((total, row) => {
        const initObj: AssortimentT = {
            seller: row.seller,
            pack: row.pack,
            product: row.product,
            vessel: row.vessel,
            rows: [],
        };
        const group = getGroup<AssortimentT>(total, initObj, row.blNo);

        const assortimentRow: AssortimentRowT = {
            places: row.amount.places,
            placesTotal: row.amount.placesTotal,
            sort: row.sort,
            weight: 'Mnogo',
        };
        group.rows.push(assortimentRow);

        return total;
    }, {});

    return grouped;
};
