import styles from './UsersList.module.scss';

import type User from '../../../../api/_types/User';
import UserCard from '../UserCard/UserCard';
import { getClient } from '../../../../api/_utils/apollo/ApolloClient';
import { usersQuery } from '../../../../api/_graphql/queries/users';

export default async function UsersList() {
  const users = await getClient().query({
    query: usersQuery,
  });
  return (
    <div className={styles.list_container}>
      {users.data.users.map((user: User, index: number) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
}
