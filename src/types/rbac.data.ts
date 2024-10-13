import { RowDataPacket } from "mysql2";

export let RoleArray = ['admin', 'user'];

export let PermissionObject = {
    VIEW_BOOKS: 'view_books',
    ADD_BOOKS: 'add_books',
    EDIT_BOOKS: 'edit_books',
    DELETE_BOOKS: 'delete_books',
    MANAGE_USER: 'manage_users',
    MANAGE_ACCESS_CONTROL: 'manage_access_control',
};

export interface IRole extends RowDataPacket{
    RoleID: number;
    RoleName: string;
}

export interface IPermission extends RowDataPacket{
    PermissionID: number;
    PermissionName: string;
}

export interface IUserRole extends RowDataPacket{
    UserID: number;
    RoleID: number;
    RoleName: string;
}

export interface IRolePermission extends RowDataPacket{
    RoleID: number;
    PermissionID: number;
    PermissionName: string;
}