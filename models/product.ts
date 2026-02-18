import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  series: string;
  description: string;
  slug: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  thumbnailImage: string;
  deliveryInfo: string;
  warrantyInfo: string;
  price?: number;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    series: {
      type: String,
      required: [true, 'Please provide a series'],
      ref: 'Series',
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    features: {
      type: [String],
      default: [],
    },
    specifications: {
      type: Map,
      of: String,
      default: new Map(),
    },
    images: {
      type: [String],
      default: [],
    },
    thumbnailImage: {
      type: String,
      default: '',
    },
    deliveryInfo: {
      type: String,
      default: '',
    },
    warrantyInfo: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: undefined,
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>('Product', ProductSchema);
