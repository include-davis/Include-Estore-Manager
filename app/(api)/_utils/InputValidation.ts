import { z } from 'zod';
import validator from 'validator';

const emailSchema = z.string().email('Invalid email address');

const passwordSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters long' })
  .max(20, { message: 'Password cannot be longer than 20 characters' });

const phoneNumberSchema = z.string().refine(validator.isMobilePhone, {
  message: 'Invalid phone number format',
});

const zipCodeSchema = z.string().regex(/^\d{5}(-\d{4})?$/, {
  message:
    'Invalid ZIP code format. Must be 5 digits or 5 digits followed by a hyphen and 4 digits',
});

export { emailSchema, passwordSchema, phoneNumberSchema, zipCodeSchema };
