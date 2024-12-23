import FormToJSON from '@utils/form/FormToJSON';
import type User from '@datatypes/User';
import sendApolloRequest from '@pageUtils/sendApolloRequest';
import { updateUserMutation } from '@graphql/mutations/updateUser';
import styles from './UserCard.module.scss';

export default async function UserCard({ user }: { user: User }) {
  const UpdateUser = async (formData: FormData) => {
    'use server';
    const dataJSON = FormToJSON(formData);
    await sendApolloRequest({
      request: updateUserMutation,
      variables: {
        updateUserId: user.id,
        input: dataJSON,
      },
      revalidateCache: {
        path: '/users',
      },
    });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.subtitle}>USERNAME</h3>
      <p>{user.name}</p>
      <hr />
      <form action={UpdateUser}>
        <h3>Rename form</h3>
        <div>
          <label>New name</label>
          <input name="name" type="text"></input>
        </div>
        <button type="submit">{`Update ${user.name}`}</button>
      </form>
    </div>
  );
}
