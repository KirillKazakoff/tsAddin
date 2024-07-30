/* eslint-disable no-param-reassign */
import { EADocumentT, GTD } from '../../types/DTtype';
import { DTReportT, ESADoutCUGoodsT } from '../../types/typesDT';

const parseDateToDt = (date: string) => {
    const splitDate = date.split('-');
    return splitDate[0].substring(2, 10) + splitDate[1] + splitDate[2];
};

export const parseESA = (err: Error, json: DTReportT) => {
    console.log(json);
    const report = json.ED_Container.ContainerDoc[0].DocBody.Signature.Object.ESADout_CU;

    const gtdContainer = json.ED_Container.ContainerDoc[1].DocBody.Signature
        .Object as any as GTD;
    const { CustomsCode, GTDNumber, RegistrationDate } = gtdContainer.DTSout.GTDNumber;
    const gtdStr = `${CustomsCode}/${parseDateToDt(RegistrationDate)}/${GTDNumber}`;

    const {
        ESADout_CUConsignee: consignee,
        ESADout_CUConsigment: consignment,
        ESADout_CUDeclarant: declarant,
        ESADout_CUMainContractTerms: terms,
        ESADout_CUGoods: productsOut,
    } = report.ESADout_CUGoodsShipment;

    const products = productsOut.length
        ? productsOut
        : ([productsOut] as unknown as ESADoutCUGoodsT[]);

    const initDocBundle = () => ({
        blNo: '',
        contractNo: '',
        contractDocs: <EADocumentT[]>[],
        invoiceNo: '',
        date: '',
        passport: '-',
    });

    console.log(products);

    const parsedRes = products.map((product) => {
        const documents = product.ESADout_CUPresentedDocument.reduce<
        ReturnType<typeof initDocBundle>
        >((total, val) => {
            const docName = val.PrDocumentName;
            const docNumber = val.PrDocumentNumber;
            const docDate = val.PrDocumentDate;

            if (docName === 'КОНОСАМЕНТ') {
                total.blNo = docNumber;
            }
            // prettier-ignore
            if (docName.includes('ДОГОВОР') && !docName.includes('ТРУДОВОЙ') && !docName.includes('К ДОГОВОРУ')) {
                total.contractNo = docNumber;
            }

            if (docName === 'ДОКУМЕНТ ПО ВАЛЮТНОМУ КОНТРОЛЮ') {
                total.passport = docNumber;
            }

            if (docName.includes('ИНВОЙС')) {
                total.invoiceNo = docNumber;
                total.date = docDate.toString();
            }
            // prettier-ignore
            const docNameStr = 'ДОКУМЕНТЫ, ВНОСЯЩИЕ ИЗМЕНЕНИЯ И (ИЛИ) ДОПОЛНЕНИЯ К ДОКУМЕНТУ, СВЕДЕНИЯ О КОТОРОМ УКАЗАНЫ ПОД КОДОМ 03011';
            if (docName.includes(docNameStr)) {
                total.contractDocs.push(val);
            }

            return total;
        }, initDocBundle());

        const agreementNo = documents.contractDocs.find(
            (doc) => doc.PrDocumentDate.toString() === documents.date.toString(),
        )?.PrDocumentNumber;

        let preceedingDT = '-';
        if (report.DeclarationKind === 'ПВД') {
            const {
                PrecedingDocumentCustomsCode: pCode,
                PrecedingDocumentDate: pDate,
                PrecedingDocumentGoodsNumeric: pGoodsNumeric,
                PrecedingDocumentNumber: pNumber,
            } = product.ESADout_CUPrecedingDocument;
            const parsedDate = parseDateToDt(pDate);

            preceedingDT = `${pCode}/${parsedDate}/${pNumber}/${pGoodsNumeric}`;
        }

        // prettier-ignore
        const vesselName = product.GoodsGroupDescription.GoodsGroupInformation.Manufacturer.split('"', 2).join(' ');
        const [customsSbor, customsPayment] = product.ESADout_CUCustomsPaymentCalculation;

        const parsedProd = {
            id: gtdStr,
            consignee: consignee.OrganizationName,
            declarant: declarant.OrganizationName,
            transport:
                consignment.ESADout_CUBorderTransport.RUTransportMeans
                    .TransportIdentifier,
            procedure: report.CustomsProcedure,
            modeCode: report.CustomsModeCode,
            docSign: report.ElectronicDocumentSign,
            dtKind: report.DeclarationKind,
            preceedingDT,
            terms: {
                incoterms: terms.CUESADDeliveryTerms.DeliveryTermsStringCode,
                port: terms.CUESADDeliveryTerms.DeliveryPlace,
                currency: {
                    rate: terms.ContractCurrencyRate,
                    priceTotal: terms.TotalInvoiceAmount,
                },
            },
            productDT: {
                product: {
                    productNo: product.GoodsNumeric,
                    vessel: vesselName,
                    places: product.ESADGoodsPackaging.PakageQuantity,
                    description: product.GoodsDescription,
                    code: product.GoodsTNVEDCode,
                    placesAmount: {
                        net: product.NetWeightQuantity,
                        gross: product.GrossWeightQuantity,
                    },
                    customs: {
                        customsCost: product.CustomsCost,
                        customsSbor: customsSbor.PaymentAmount,
                        payment: customsPayment.PaymentAmount,
                        rate: +customsPayment.Rate / 100,
                    },
                },
                priceCustoms: product.CustomsCost,
                documents: { ...documents, agreementNo },
            },
        };

        return parsedProd;
    });
    return parsedRes;
};

export const parseKDT = (err: Error, json: DTReportT) => {
    const report = json.ED_Container.ContainerDoc[0].DocBody.Signature.Object.KDTout_CU;
    console.log(report);
};
