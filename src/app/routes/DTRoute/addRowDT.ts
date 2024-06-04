import { xmlParse } from './xmlParse';

type SettignsT = {
    id: string;
    xml: any;
};

export const addRowsDT = async ({ id, xml }: SettignsT) => {
    const parsedXML = await xmlParse(xml);

    const rows = parsedXML.map((r) => {
        const { documents, product } = r.productDT;
        const { currency, incoterms } = r.terms;

        return [
            id,
            r.dtKind,
            r.preceedingDT,
            documents.passport,
            r.declarant,
            r.consignee,
            documents.blNo,
            documents.agreementNo,
            documents.invoiceNo,
            product.code,
            product.productNo,
            product.places,
            product.placesAmount.net,
            currency.rate,
            product.customsCost,
            currency.priceTotal,
            product.vessel,
            incoterms,
        ];
    });

    await Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getItem('DT');
        const tableExcel = sheet.tables.getItem('DT');

        tableExcel.rows.add(null, rows);

        // sheet.getUsedRange().format.autofitColumns();
        // sheet.getUsedRange().format.autofitRows();
        // sheet.getUsedRange().format.
    });
};
