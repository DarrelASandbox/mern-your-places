import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';
import Button from '../../shared/components/FormElements/Button';

const PlaceList = ({ items }) => {
  if (items.length === 0)
    return (
      <div className='place-list center'>
        <Card>
          <h2>No places found. Maybe add one?</h2>
          <Button to='/places/new'>Add Place</Button>
        </Card>
      </div>
    );

  return (
    <ul className='place-list'>
      {items.map(
        ({ _id, image, title, description, address, creator, location }) => (
          <PlaceItem
            key={_id}
            id={_id}
            image={image}
            title={title}
            description={description}
            address={address}
            creator={creator}
            coordinates={location}
          />
        )
      )}
    </ul>
  );
};
export default PlaceList;
