export type AbnLookupResult = {
  Abn: string;
  AbnStatus: string;
  AbnStatusEffectiveFrom: string;
  Acn: string;
  AddressDate: string;
  AddressPostcode: string;
  AddressState: string;
  BusinessName: string[];
  EntityName: string;
  EntityTypeCode: string;
  EntityTypeName: string;
  Gst: string;
  location: { coordinates: number[] };
};

export type serviceAgeNames =
  | "Early Childhood (0-7 years)"
  | "Children (7-17 years)"
  | "Young People (18-21 years)"
  | "Adults (22-59 years)"
  | "Mature Age (60+ years)";

export type serviceLocationsType = { state: string; suburbs: string[] }[];

export type BusinessPersonalInfo = {
  about: string;
  services: string[];
  deliveryOptions: string[];
  paymentTypes: string[];
  languages: string[];
  genderOfAttendants: string[];
  agesSupported: Array<serviceAgeNames>;
  disabilitySpecialities: string[];
  providerSpecialSkills: string[];
  contact: {
    email: string;
    website: string;
    phone: string;
  };
  serviceLocations: serviceLocationsType;
};

export type BusinessReviews = {
  tag: string;
  description: string;
  rating: number;
  date: string;
  user: {
    name: string;
  };
}[];

export type BusinessDatabaseModel = AbnLookupResult &
  BusinessPersonalInfo & { _id: string };
