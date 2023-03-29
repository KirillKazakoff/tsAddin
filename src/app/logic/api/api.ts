import { request } from './request';

// sendXls
type FetchXlsT = (file: FormData) => Promise<void>;
export const fetchSendXls: FetchXlsT = async (file) => {
    await request({
        settings: {
            method: 'POST',
            body: file,
        },
    });
};

export const fetchGetPdf = async (fileName: string) => {
    return request({ url: fileName });
};

// // UserFetches
// type FetchRegisterT = (user: UserT) => Promise<void>;
// export const fetchRegister: FetchRegisterT = async (user) => {
//     return request({
//         settings: {
//             method: 'POST',
//             body: JSON.stringify(user),
//         },
//     });
// };

// type FetchLoginT = (id: string) => Promise<UserT>;
// export const fetchLogin: FetchLoginT = async (id) => {
//     return request({ url: id });
// };

// // TodoFetches
// type FetchChangeTodoT = (idUser: string, idTodo: string) => Promise<void>;
// export const fetchDeleteTodo: FetchChangeTodoT = async (idUser, idTodo) => {
//     await request({
//         url: `${idUser}/${idTodo}`,
//         settings: {
//             method: 'DELETE',
//         },
//     });
// };

// export const fetchCheckTodo: FetchChangeTodoT = async (idUser, idTodo) => {
//     await request({
//         url: `${idUser}/${idTodo}`,
//         settings: {
//             method: 'PATCH',
//         },
//     });
// };

// type FetchAddTodoT = (idUser: string, todo: TodoT) => Promise<void>;
// export const fetchAddTodo: FetchAddTodoT = async (idUser, todo) => {
//     await request({
//         url: idUser,
//         settings: {
//             method: 'POST',
//             body: JSON.stringify(todo),
//         },
//     });
// };
