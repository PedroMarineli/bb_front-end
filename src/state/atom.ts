import { atom } from "recoil";

export const menuState = atom({
    key: 'menuState',
    default: false,
})

export const deleteState = atom({
    key: 'deleteState',
    default: false,
})

export const itemToDeleteState = atom<number | null>({
    key: 'itemToDeleteState',
    default: null
});