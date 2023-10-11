/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { InvoiceT } from '../../../../types/typesContract';

export const initAgent = (invoice: InvoiceT) => {
    const agent = _.cloneDeep(invoice.agreement.record.agent);
    if (agent.code === invoice.consignee.codeName) {
        agent.name = '';
        agent.address = '';
    }

    return agent;
};
