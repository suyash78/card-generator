import { action, Action } from "easy-peasy";

export interface UserData {
    id: number;
    name: string;
    age: number;
    gender: string;
}

export interface UserApp {
    userList: UserData[];
    editUserData?: UserData;
    addUser: Action<UserApp , UserData>;
    updateUser: Action<UserApp , UserData>;
    editUser: Action<UserApp , number>;
    deleteUser: Action<UserApp , number>;
    clear: Action<UserApp>;
}

export const userAppState : UserApp = {
    userList: [],
    addUser: action((state , payload) => {
        state.userList.push(payload);
    }),
    updateUser: action((state , payload) => {
        state.userList[payload.id] = payload;
        return state;
    }),
    editUser: action((state , payload) => {
        return {...state , editUserData: state.userList.find(user => user.id === payload)};
    }),
    deleteUser: action((state , payload) => {
        return {...state , userList: state.userList.filter((user) => user.id !== payload)};
    }),
    clear: action((state) => {
        return {...state , editUserData : undefined};
    })
}