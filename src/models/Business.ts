import { Document, Schema, model, models } from "mongoose";

type serviceAgeNames =
  | "Early Childhood (0-7 years)"
  | "Children (7-17 years)"
  | "Young People (18-21 years)"
  | "Adults (22-59 years)"
  | "Mature Age (60+ years)";

interface BusinessPersonalInfo {
  contact: {
    email: string;
    website: string;
    phone: string;
  };
  serviceLocations: { state: string; suburbs: string[] }[];
  deliveryOptions: string[];
  paymentTypes: string[];
  agesSupported: Array<serviceAgeNames>;
  about: string;
  providerSpecialSkills: string[];
  disabilitySpecialities: string[];
  languages: string[];
  genderOfAttendants: string[];
  services: string[];
}

type BusinessReviews = {
  tag: string;
  description: string;
  rating: number;
  date: string;
  user: {
    id: Schema.Types.ObjectId | string;
  };
}[];

interface Business extends BusinessPersonalInfo {
  discourseId: number;
  Abn: string;
  AbnStatus?: string;
  AbnStatusEffectiveFrom?: string;
  Acn?: string;
  AddressDate?: string;
  AddressPostcode?: string;
  AddressState?: string;
  BusinessName: string[];
  EntityName?: string;
  EntityTypeCode?: string;
  EntityTypeName?: string;
  Gst?: string;
  location: {
    type: string;
    coordinates: number[];
  };
  created_at?: Date;
  user: Schema.Types.ObjectId | string;
  reviews: BusinessReviews;
  rank: number;
}

interface BusinessDocument extends Business, Document {}

const BusinessSchema = new Schema({
  discourseId: {
    type: Number,
    required: [true, "The discourse id is required!"],
  },
  Abn: {
    type: String,
    required: [true, "The abn number is required!"],
  },
  AbnStatus: {
    type: String,
  },
  AbnStatusEffectiveFrom: {
    type: String,
  },
  Acn: {
    type: String,
  },
  AddressDate: {
    type: String,
  },
  AddressPostcode: {
    type: String,
  },
  AddressState: {
    type: String,
  },
  BusinessName: [
    {
      type: String,
    },
  ],
  EntityName: {
    type: String,
  },
  EntityTypeCode: {
    type: String,
  },
  EntityTypeName: {
    type: String,
  },
  Gst: {
    type: String,
  },
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contact: {
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  serviceLocations: [
    {
      state: {
        type: String,
      },
      suburbs: {
        type: [String],
      },
    },
  ],
  deliveryOptions: {
    type: [String],
  },
  paymentTypes: {
    type: [String],
  },
  agesSupported: {
    type: [String],
  },
  about: {
    type: String,
    default: "",
  },
  services: {
    type: [String],
  },
  providerSpecialSkills: {
    type: [String],
  },
  disabilitySpecialities: {
    type: [String],
  },
  languages: {
    type: [String],
  },
  genderOfAttendants: {
    type: [String],
  },
  reviews: [
    {
      caption: {
        type: String,
      },
      description: {
        type: String,
      },
      rating: {
        type: Number,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  rank: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

BusinessSchema.index({ location: "2dsphere" });

const Business = models.Business || model("Business", BusinessSchema);

export default Business;
