export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface FromDto {
    outletName: string;
    area: string;
    phoneNumber: string;
    latitude: number;
    longitude: number;
    couponCode: string;
    value:string[];
}

export interface FromDtoResponse extends BaseEntity {
    value: any;
    message: string;
    status: number;
}

export enum ILanguage {
    english = 'english',
    hindi = 'hindi'
}