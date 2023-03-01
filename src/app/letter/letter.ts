import { bodyToStrEng, bodyToStrRu } from './toString/bodyToStr';
import { footerToStrEng, footerToStrRu } from './toString/footerToStr';
import { headerToStrEng, headerToStrRu } from './toString/headerToStr';
import { subjectToStrEng, subjectToStrRu } from './toString/subjectToStr';

const ru = {
    getSubject: () => subjectToStrRu(),
    getHeader: () => headerToStrRu(),
    getBody: () => bodyToStrRu(),
    getFooter: () => footerToStrRu(),
};

const eng = {
    getSubject: () => subjectToStrEng(),
    getHeader: () => headerToStrEng(),
    getBody: () => bodyToStrEng(),
    getFooter: () => footerToStrEng(),
};

type LetterPartsT = typeof eng;

type LetterLangT = {
    [key: string]: LetterPartsT;
};

export const letter: LetterLangT = {
    ru,
    eng,
};
