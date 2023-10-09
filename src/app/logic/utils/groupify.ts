/* eslint-disable no-param-reassign */
export function groupify<ReturnT>(
    total: { [key: string]: ReturnT },
    initObj: ReturnT,
    code: string | number,
): ReturnT {
    let group = total[code];

    if (!group) {
        group = initObj;
        total[code] = group;
    }
    return group;
}
