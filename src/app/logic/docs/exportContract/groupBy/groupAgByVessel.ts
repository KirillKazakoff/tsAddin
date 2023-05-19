/* eslint-disable no-param-reassign */
import {
    addToAmount,
    initAmount,
} from '../../../../stores/tablesStore/utils/initAmount';
import { AgreementT } from './initAgreement';

export const groupAgByVessel = (agreement: AgreementT) => {
    const { vessels } = agreement.productsGroupedBy;

    // groupBy
    agreement.rows.forEach((row) => {
        const { vessel, product } = row;

        // getVesselGroup
        let vesselGroup = vessels.byVesselGroup[vessel.codeName];
        if (!vesselGroup) {
            vesselGroup = {
                subject: {},
                cost: {},
            };

            vessels.byVesselGroup[vessel.codeName] = vesselGroup;
        }

        // getSubject
        let subject = vesselGroup.subject[product.codeName];
        if (!subject) {
            subject = {
                record: row,
                total: initAmount(0, 3, 4),
            };

            vesselGroup.subject[product.codeName] = subject;
        }
        addToAmount(subject.total, row.amount.placesTotal.count);

        // getCost
        let cost = vesselGroup.cost[product.codeName];
        if (!cost) {
            cost = {
                record: row,
                prices: [],
            };

            vesselGroup.cost[product.codeName] = cost;
        }
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
