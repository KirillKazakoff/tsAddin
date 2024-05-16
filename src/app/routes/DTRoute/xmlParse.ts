// eslint-disable-next-line import/no-extraneous-dependencies
import xml2js from 'browser-xml2js';
// import xml2js from 'xml2js';
import { DTReportT } from '../../types/DTtype';

export const xmlParse = (xml: any) => {
    xml2js.parseString(
        xml,
        {
            tagNameProcessors: [xml2js.processors.stripPrefix],
            ignoreAttrs: true,
            explicitArray: false,
            mergeAttrs: false,
        },
        (err: any, json: DTReportT) => {
            console.log(json);
            const report = json.ED_Container.ContainerDoc.DocBody.ESADout_CU;
            console.log(report);

            const {
                ESADout_CUConsignee: consignee,
                ESADout_CUConsigment: consignment,
                ESADout_CUDeclarant: declarant,
                ESADout_CUMainContractTerms: terms,
                TotalGoodsNumber: productAmount,
                ESADout_CUGoods: products,
            } = report.ESADout_CUGoodsShipment;

            const parsed = products.map((product) => {
                const documents = product.ESADout_CUPresentedDocument.reduce(
                    (total, val) => {
                        const docName = val.PrDocumentName;
                        const docNumber = val.PrDocumentNumber;
                        const docTotal = {
                            bl: '',
                            agreement: '',
                            contract: '',
                            invoice: '',
                        };

                        if (docName === 'КОНОСАМЕНТ') {
                            docTotal.bl = docNumber;
                        }
                        if (docName === 'ДОГОВОР ХРАНЕНИЯ') {
                            docTotal.agreement = docNumber;
                        }
                        if (docName === 'НЕКОММЕРЧЕСКИЙ ИНВОЙС') {
                            docTotal.invoice === docNumber;
                        }
                        // if (docName === '')
                        // return {

                        // }
                        return total;
                    },
                    {},
                );
                const parsedProd = {
                    consignee: consignee.OrganizationName,
                    declarant: declarant.OrganizationName,
                    transport:
                        consignment.ESADout_CUBorderTransport.RUTransportMeans
                            .TransportIdentifier,
                    procedure: report.CustomsProcedure,
                    modeCode: report.CustomsModeCode,
                    docSign: report.ElectronicDocumentSign,
                    dtKind: report.DeclarationKind,

                    terms: {
                        incoterms: terms.CUESADDeliveryTerms.DeliveryTermsStringCode,
                        port: terms.CUESADDeliveryTerms.DeliveryPlace,
                        currency: {
                            code: terms.ContractCurrencyCode,
                            rate: terms.ContractCurrencyRate,
                            priceTotal: terms.TotalInvoiceAmount,
                        },
                    },
                    productDT: {
                        product: {
                            places: product.ESADGoodsPackaging.PakageQuantity,
                            description: product.GoodsDescription,
                            placesAmount: {
                                net: product.NetWeightQuantity,
                                gross: product.GrossWeightQuantity,
                            },
                        },
                        priceCustoms: product.CustomsCost,
                        document: {},
                    },
                };

                return parsedProd;
            });

            return parsed;
        },
    );
};
