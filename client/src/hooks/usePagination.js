import { useMemo } from 'react';
import { generatePaginationRange } from '~/ultils/helper';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

function usePagination(totalProductCount, currentPage, siblingCount = 1) {
    const paginationArray = useMemo(() => {
        const pageSize = process.env.REACT_APP_PAGE_SIZE || 10;
        const paginationCount = Math.ceil(totalProductCount / pageSize);
        const totalPaginationCount = siblingCount + 5;

        if (paginationCount <= totalPaginationCount) {
            return generatePaginationRange(1, paginationCount);
        }

        const leftSiblingIndex = currentPage - siblingCount > 2;
        const rightSiblingIndex = currentPage + siblingCount < paginationCount - 2;

        if (leftSiblingIndex && !rightSiblingIndex) {
            const rightStart = paginationCount - 4;
            const rightRange = generatePaginationRange(rightStart, paginationCount);
            return [1, <BiDotsHorizontalRounded />, ...rightRange];
        }

        if (!leftSiblingIndex && rightSiblingIndex) {
            const leftEnd = generatePaginationRange(1, 5);
            return [...leftEnd, <BiDotsHorizontalRounded />, paginationCount];
        }

        const siblingLeft = Math.max(currentPage - siblingCount, 1);
        const siblingRight = Math.min(currentPage + siblingCount, paginationCount);

        if (leftSiblingIndex && rightSiblingIndex) {
            const middleRange = generatePaginationRange(siblingLeft, siblingRight);
            return [1, <BiDotsHorizontalRounded />, ...middleRange, <BiDotsHorizontalRounded />, paginationCount];
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalProductCount, currentPage, siblingCount]);

    return paginationArray;
}

export default usePagination;
