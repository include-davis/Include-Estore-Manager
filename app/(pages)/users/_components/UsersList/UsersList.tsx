import type User from '@datatypes/User';
import UserCard from '../UserCard/UserCard';
import sendApolloRequest from '@pageUtils/sendApolloRequest';
import { usersQuery } from '@graphql/queries/users';
import styles from './UsersList.module.scss';

export default async function UsersList() {
  const users = await sendApolloRequest({ request: usersQuery });

  return (
    <div className={styles.list_container}>
      {users?.data.users.map((user: User, index: number) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
}
