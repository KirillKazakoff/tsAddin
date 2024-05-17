/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import xml2js from 'browser-xml2js';
// import xml2js from 'xml2js';
import { DTReportT, EADocumentT } from '../../types/DTtype';

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

            const initDocBundle = () => ({
                blNo: '',
                contractNo: '',
                contractDocs: <EADocumentT[]>[],
                invoiceNo: '',
                date: '',
            });

            console.log(products);

            const parsed = products.map((product) => {
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
                    if (docName.includes('ИНВОЙС')) {
                        total.invoiceNo = docNumber;
                        total.date = docDate.toString();
                    }
                    // prettier-ignore
                    if (docName.includes('ДОКУМЕНТЫ, ВНОСЯЩИЕ ИЗМЕНЕНИЯ И (ИЛИ) ДОПОЛНЕНИЯ К ДОКУМЕНТУ, СВЕДЕНИЯ О КОТОРОМ УКАЗАНЫ ПОД КОДОМ 03011')) {
                        total.contractDocs.push(val);
                        // if (docDate.toString() === total.date) {
                        //     total.agreementNo = docNumber;
                        // }
                    }

                    return total;
                }, initDocBundle());

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
                        documents,
                    },
                };

                return parsedProd;
            });

            console.log(parsed);
        },
    );
};
