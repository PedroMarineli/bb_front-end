import { atom } from "recoil";

export const menuState = atom({
    key: 'menuState',
    default: false,
});

export const permissionState = atom({
    key: 'permissionState',
    default: false,
});

export const actionPermissionState = atom({
    key: 'actionPermissionState',
    default: false,
});