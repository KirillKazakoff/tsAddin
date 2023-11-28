export const indexToStr = (index: number) => {
    if (index > 10) return index;
    return `0${index.toString()}`;
};
