/* eslint-disable no-param-reassign */
import {
    addToAmount,
    initAmount,
} from '../../../../stores/tablesStore/utils/initAmount';
import { CostT, SubjectT, VesselGroupT } from '../../../../types/typesContract';
import { groupify } from '../../../utils/groupify';
import { AgreementT } from './initAgreement';

export const groupAgByVessel = (agreement: AgreementT) => {
    const { vessels } = agreement.productsGroupedBy;

    // groupBy
    agreement.rows.forEach((row) => {
        const { vessel, product } = row;

        // getVesselGroup
        const initVesselGroupObj = { subject: {}, cost: {} };
        const vesselGroup = groupify<VesselGroupT>(
            vessels.byVesselGroup,
            initVesselGroupObj,
            vessel.codeName,
        );

        // getSubject
        const initSubjectObj = { record: row, total: initAmount(0, 3, 4) };
        const subject = groupify<SubjectT>(
            vesselGroup.subject,
            initSubjectObj,
            product.codeName,
        );
        addToAmount(subject.total, row.amount.placesTotal.count);

        // getCost
        const initCostObj = { record: row, prices: [] };
        const cost = groupify<CostT>(
            vesselGroup.cost,
            initCostObj,
            product.codeName,
        );

        const isSamePrice = cost.prices.some(
            (price) => price.count === row.amount.price.count,
        );
        if (!isSamePrice) cost.prices.push(row.amount.price);
    });

    // generalize
    Object.values(vessels.byVesselGroup).forEach((group) => {
        Object.values(group.subject).forEach((subject) => {
            vessels.all.subject.push(subject);
        });
        Object.values(group.cost).forEach((cost) => {
            vessels.all.cost.push(cost);
        });
    });

    return agreement;
};
