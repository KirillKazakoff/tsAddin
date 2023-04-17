/* eslint-disable no-param-reassign */
import { initAmount } from '../../../../stores/tablesStore/utils/initAmount';
import { formatCount } from '../../../utils/formatCount';
import { AgreementT } from './initAgreement';

export const groupByVesselExport = (agreement: AgreementT) => {
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
                total: initAmount(),
            };

            vesselGroup.subject[product.codeName] = subject;
        }
        subject.total.count += row.amount.placesTotal.count;
        subject.total.str = formatCount(subject.total.count, 3, 4);

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
