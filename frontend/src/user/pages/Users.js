import UsersList from '../components/UsersList';

const USERS = [
  {
    id: 'u1',
    name: 'Boss Pug',
    image:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80',
    places: 3,
  },
  {
    id: 'u2',
    name: 'Employee Tiger',
    image:
      'https://images.unsplash.com/photo-1593483316242-efb5420596ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    places: 1,
  },
];

const Users = () => <UsersList items={USERS} />;

export default Users;
