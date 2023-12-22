import { Schema, model, models } from "mongoose";

const BusinessSchema = new Schema({
  discourseId: {
    type: Number,
  },
  Abn: {
    type: String,
    unique: [true, "Already business registered with this Abn number!"],
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
  // paymentTypes: {
  //   type: [String],
  // },
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
  // providerSpecialSkills: {
  //   type: [String],
  // },
  // disabilitySpecialities: {
  //   type: [String],
  // },
  complexNeedsSupported: {
    type: [String],
  },
  languages: {
    type: [String],
  },
  genderOfAttendants: {
    type: [String],
  },
  // reviews: [
  //   {
  //     caption: {
  //       type: String,
  //     },
  //     description: {
  //       type: String,
  //     },
  //     rating: {
  //       type: Number,
  //     },
  //     date: {
  //       type: Date,
  //       default: Date.now(),
  //     },
  //     user: {
  //       type: Schema.Types.ObjectId,
  //       ref: "User",
  //     },
  //   },
  // ],
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
