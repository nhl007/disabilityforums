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
  Message: string;
  location: { coordinates: number[] };
};

type serviceAgeNames =
  | "Mature Age (60+ years)"
  | "Adults (22-59 years)"
  | "Young People (18-21 years)";

export type BusinessPersonalInfo = {
  contact: {
    email: string;
    website: string;
    phone: string;
  };
  serviceLocations: string[];
  agesSupported: Array<serviceAgeNames>;
  about: string;
  services: {
    name: string;
    description: string[];
  }[];
  disabilitySpecialities: string[];
  languages: string[];
  genderOfAttendants: string[];
};
