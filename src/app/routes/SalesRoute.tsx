import React from 'react';
import { observer } from 'mobx-react-lite';
import { groupSalesContract } from '../logic/docs/sales/groupBy/groupSalesContract';

export const SalesRoute = observer(() => {
    groupSalesContract();
    return <div>Sales Route</div>;
});
