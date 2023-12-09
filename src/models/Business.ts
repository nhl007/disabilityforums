import { Document, Schema, model, models } from "mongoose";

interface Business {
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
}

interface BusinessDocument extends Business, Document {}

const BusinessSchema = new Schema<BusinessDocument>({
  discourseId: {
    type: Number,
    required: [true, "The discourse id is required!"],
  },
  Abn: {
    type: String,
    required: [true, "The abn is required!"],
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
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

BusinessSchema.index({ location: "2dsphere" });

const Business =
  models.Business || model<BusinessDocument>("Business", BusinessSchema);

export default Business;
