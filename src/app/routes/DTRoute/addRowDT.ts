import { xmlParse } from './xmlParse';

type SettignsT = {
    xml: any;
};

export const addRowsDT = async ({ xml }: SettignsT) => {
    const parsedXML = await xmlParse(xml);

    const rows = parsedXML.map((r) => {
        const { documents, product } = r.productDT;
        const { currency, incoterms } = r.terms;

        return [
            r.id,
            r.dtKind,
            r.preceedingDT,
            documents.passport,
            r.declarant,
            r.consignee,
            documents.blNo,
            documents.contractNo,
            documents.agreementNo,
            documents.invoiceNo,
            product.description,
            product.productNo,
            product.places,
            product.placesAmount.net,
            currency.rate,
            currency.priceTotal,
            product.customs.customsCost,
            product.customs.customsSbor,
            product.customs.rate,
            product.customs.payment,
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
