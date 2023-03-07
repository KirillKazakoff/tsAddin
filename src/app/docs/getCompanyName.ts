export const getCompanyName = (exportStorageWs: any, blIdCell: any) => {
    const headers = exportStorageWs.getRow(1);

    let blNoHeaderCell: any;
    let prodavecHeaderCell: any;
    headers.eachCell((cell: any) => {
        if (cell.value === 'BL No') blNoHeaderCell = cell;
        if (cell.value === 'Продавец') prodavecHeaderCell = cell;
    });

    const blCol = exportStorageWs.getColumn(blNoHeaderCell.col);

    let foundBlCell: any;
    blCol.eachCell((cell: any) => {
        if (cell.value === blIdCell.value) {
            foundBlCell = cell;
        }
    });

    const companyName = exportStorageWs.getCell(foundBlCell.row, prodavecHeaderCell.col);

    return companyName.value;
};
