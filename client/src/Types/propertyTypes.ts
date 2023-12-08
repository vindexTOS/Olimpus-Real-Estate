export interface TPropertyTypes {
  location: string;
  featureType: string;
  propertyType: string;
  price: number;
  sqArea: number;
  buildYear: number;
  propertyName: string;
  description: string;
}

export interface TOwnerTypes {
  fullName: string;
  phoneNumber: string;
  email: string;
}

export interface TpropertyAndOwner {
  OwnerInformation: TOwnerTypes;
  propertyInformation: TPropertyTypes;
  pictures: File[];
}

export interface PhotoPayLoadForRedux {
  pictures: File[];
  propertyId: string;
}

export interface RecivedPropertyTypes extends TPropertyTypes {
  id: string;
  ownerId: string;
  status: string;
  propertyName: string;
  propertyType: string;
  uploadetAt: string;
}
