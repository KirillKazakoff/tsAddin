// import { Paths } from '../../../../types/typesUtils';

// type CellT = { name: string; value: number };
// type AssociativeArrayT = {
//     [key: string]: CellT[] | AssociativeArrayT;
// };

// const myObject = {
//     key1: {
//         subKey1: [
//             { name: 'SomeName1', value: 100 },
//             { name: 'SomeName2', value: 100 },
//         ],
//     },
//     key2: [
//         { name: 'SomeName3', value: 300 },
//         { name: 'SomeName4', value: 400 },
//     ],
// };

// type AssociativeG<T> = {
//     [key in Paths<T>]: CellT[] | AssociativeG<T>;
// }

// type PathOmited<K> = { [P in Exclude<keyof Paths<K>, 'name'>]: Paths<K>[P] };

// export const aggregateCells = <T extends AssociativeArrayT>(associative: T) => {
//     return associative as AssociativeG<T>;
// };

// type PathsT2 = Paths<typeof myObject>;

// const cells2 = aggregateCells(myObject);

// cells2.key2.
