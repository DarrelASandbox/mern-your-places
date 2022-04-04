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
      {props.items.map(({ id, image, name, places }) => (
        <UserItem
          key={id}
          id={id}
          image={image}
          name={name}
          placeCount={places}
        />
      ))}
    </ul>
  );
};
export default UsersList;
