import Card from '../../shared/components/UIElements/Card';
import UserItem from './UserItem';
import './UsersList.css';

const UsersList = (props) => {
  if (props.items.length === 0)
    return (
      <div className='center'>
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );

  return (
    <ul className='users-list'>
      {props.items.map(({ _id, avatar, name, places }) => (
        <UserItem
          key={_id}
          id={_id}
          image={avatar}
          name={name}
          placeCount={places.length}
        />
      ))}
    </ul>
  );
};
export default UsersList;
