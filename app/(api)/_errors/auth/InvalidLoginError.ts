import { CredentialsSignin } from 'next-auth';

export default class InvalidLoginError extends CredentialsSignin {
  constructor(message: string) {
    super();
    this.code = message;
  }
}
