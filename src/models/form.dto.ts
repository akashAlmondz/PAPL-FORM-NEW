export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface FromDto {
    outletName: string;
    address: string;
    phoneNumber: string;
    latitude: number;
    longitude: number;
    couponCode: string;
}

export interface FromDtoResponse extends BaseEntity {
    message: string;
    status: number;
}

export enum ILanguage {
    english = 'english',
    hindi = 'hindi'
}