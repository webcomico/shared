import { Types } from 'mongoose';

export interface IncCountersPayload {
  target: string | Types.ObjectId;
  group: string;
  value?: number;
}
