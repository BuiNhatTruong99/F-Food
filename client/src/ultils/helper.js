export const generatePaginationRange = (start, end) => {
    const length = end + 1 - start;
    return Array.from({ length }, (_, idx) => idx + start);
};
