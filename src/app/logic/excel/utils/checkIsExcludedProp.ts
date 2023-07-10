export const checkIsExcludedProp = (prop: string) => {
    const excludeProps = ['placesLeft', 'datePusan', 'dateClose'];
    const check = excludeProps.includes(prop);
    return check;
};
