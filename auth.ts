import NextAuth, { CredentialsSignin } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@datalib/_prisma/client';
import Credentials from '@auth/core/providers/credentials';
import bcrypt from 'bcrypt';
import {
  emailSchema,
  passwordSchema,
  phoneNumberSchema,
  zipCodeSchema,
} from '@utils/InputValidation';

/**
 * Interface definition for required credentials.
 *
 * Only email and password are required for login.
 * Everything is required for sign-up.
 */
interface Credentials {
  firstName?: string;
  lastName?: string;
  email: string; // Required for login only.
  password: string; // Required for login only.
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: number;
}

function validateCredentials(credentials: Credentials) {
  const emailValidation = emailSchema.safeParse(credentials.email);
  const passwordValidation = passwordSchema.safeParse(credentials.password);
  const phoneValidation = phoneNumberSchema.safeParse(credentials.phone);
  const zipValidation = zipCodeSchema.safeParse(credentials.zip);

  if (credentials.email && !emailValidation.success)
    throw new InvalidLoginError(emailValidation.error.message);

  if (credentials.password && !passwordValidation.success)
    throw new InvalidLoginError(passwordValidation.error.message);

  if (credentials.phone && !phoneValidation.success)
    throw new InvalidLoginError(phoneValidation.error.message);

  if (credentials.zip && !zipValidation.success)
    throw new InvalidLoginError(zipValidation.error.message);
}

class InvalidLoginError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
    this.code = message;
  }
}

async function credentialsSignUp(credentials: Credentials) {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    addressLine1,
    addressLine2, // Not required for sign up.
    city,
    state, // Not required for sign up.
    country,
    zip,
  } = credentials;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phone ||
    !addressLine1 ||
    !city ||
    !country ||
    !zip
  ) {
    throw new InvalidLoginError('Missing fields for sign up');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  return prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: hashedPassword,
      phone: phone,
      shipping_address_line_1: addressLine1,
      shipping_address_line_2: addressLine2,
      shipping_city: city,
      shipping_state: state,
      shipping_country: country,
      shipping_zip: parseInt(zip), // TODO: For some reason it thinks this is a string.
    },
  });
}

async function credentialsLogIn(credentials: Credentials) {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    country,
    zip,
  } = credentials;

  // This may be redundant.
  if (
    firstName ||
    lastName ||
    phone ||
    addressLine1 ||
    addressLine2 ||
    city ||
    state ||
    country ||
    zip
  ) {
    throw new InvalidLoginError('Too many fields. Did you mean to sign up?');
  }

  if (!email || !password)
    throw new InvalidLoginError('Email and password are required');

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) throw new InvalidLoginError('User not found');

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) throw new InvalidLoginError('Invalid password');

  return user;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // http://localhost:3000/api/auth/signin
      credentials: {
        firstName: { label: 'First Name', type: 'text' },
        lastName: { label: 'Last Name', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        phone: { label: 'Phone', type: 'text' },
        addressLine1: { label: 'Address Line 1', type: 'text' },
        addressLine2: {
          label: 'Address Line 2',
          type: 'text',
          required: false,
        },
        city: { label: 'City', type: 'text' },
        state: { label: 'State', type: 'text' },
        country: { label: 'Country', type: 'text' },
        zip: { label: 'ZIP Code', type: 'number' },
      },
      async authorize(credentials: Credentials) {
        validateCredentials(credentials);

        const totalUsers = await prisma.user.count();
        if (totalUsers === 0) return credentialsSignUp(credentials); // Sign up logic. Return signed-up user.
        return credentialsLogIn(credentials); // Login logic. Return logged-in user.
      },
    }),
  ],
});
