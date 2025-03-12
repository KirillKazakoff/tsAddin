import { bodyToStrEng, bodyToStrRu } from './toString/bodyToStr';
import { footerToStrEng, footerToStrRu } from './toString/footerToStr';
import { headerToStrEng, headerToStrRu } from './toString/headerToStr';
import { subjectToStrEng, subjectToStrRu } from './toString/subjectToStr';

const ru = {
    mailTo: 'oved@sea-wolf.ru',
    getSubject: () => subjectToStrRu(),
    getHeader: () => headerToStrRu(),
    getBody: () => bodyToStrRu(),
    getFooter: () => footerToStrRu(),
};

const eng = {
    mailTo: 'mt.econom@gmail.com',
    getSubject: () => subjectToStrEng(),
    getHeader: () => headerToStrEng(),
    getBody: () => bodyToStrEng(),
    getFooter: () => footerToStrEng(),
};

export const offerDictionary = { ru, eng };
