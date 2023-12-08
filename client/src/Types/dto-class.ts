export class OwnerInformationBluePrint {
  fullName: string;
  email: string;
  phoneNumber: string;

  constructor(fullName: string, email: string, phoneNumber: string) {
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }
}

export class PropertyInformationBluePrint {
  propertyName: string;
  propertyType: string;
  featureType: string;
  price: number;
  buildYear: number;
  location: string;
  sqArea: number;
  description: string;
  status?: string;

  constructor(
    propertyName: string,
    propertyType: string,
    featureType: string,
    price: number,
    buildYear: number,
    location: string,
    sqArea: number,
    description: string,
    status?: string
  ) {
    this.propertyName = propertyName;
    this.propertyType = propertyType;
    this.featureType = featureType;
    this.price = price;
    this.buildYear = buildYear;
    this.location = location;
    this.sqArea = sqArea;
    this.description = description;
    this.status = status;
  }
}
