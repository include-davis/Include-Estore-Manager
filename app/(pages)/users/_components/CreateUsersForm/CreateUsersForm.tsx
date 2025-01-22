import FormToJSON from '@utils/form/FormToJSON';
import sendApolloRequest from '@pageUtils/sendApolloRequest';
import { createUserMutation } from '@graphql/mutations/createUser';
import styles from './CreateUsersForm.module.scss';

export default async function CreateUserForm() {
  const CreateUser = async (formData: FormData) => {
    'use server';
    const dataJSON = FormToJSON(formData);
    await sendApolloRequest({
      request: createUserMutation,
      variables: {
        input: dataJSON,
      },
    });
  };

  return (
    <div className={styles.form_container}>
      <h3>Create User</h3>
      <form action={CreateUser}>
        <div>
          <label>name</label>
          <input name="name" type="text"></input>
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
