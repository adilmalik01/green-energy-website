import mongoose, { Schema, Document } from 'mongoose';

export interface ISeries extends Document {
  name: string;
  description: string;
  slug: string;
  image: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SeriesSchema = new Schema<ISeries>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a series name'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a series description'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Series ||
  mongoose.model<ISeries>('Series', SeriesSchema);
