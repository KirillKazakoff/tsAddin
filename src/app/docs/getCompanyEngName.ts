export const getCompanyEngName = (dictionaryBook: any, companyName: any) => {
    const prodavecWs = dictionaryBook.getWorksheet('Prodavec');
    const headers = prodavecWs.getRow(1);

    let companyNameHeaderCell: any;
    let companyNameEngHeaderCell: any;
    headers.eachCell((cell: any) => {
        if (cell.value === 'Компания') companyNameHeaderCell = cell;
        if (cell.value === 'Company Name') companyNameEngHeaderCell = cell;
    });

    const companyNameCol = prodavecWs.getColumn(companyNameHeaderCell.col);

    let foundCompanyNameCell: any;
    companyNameCol.eachCell((cell: any) => {
        if (cell.value === companyName) {
            foundCompanyNameCell = cell;
        }
    });

    const companyNameEng = prodavecWs.getCell(
        foundCompanyNameCell.row,
        companyNameEngHeaderCell.col
    );

    return companyNameEng.value;
};
