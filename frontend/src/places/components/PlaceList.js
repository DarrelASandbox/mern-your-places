import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';

const PlaceList = ({ items }) => {
  if (items.length === 0)
    return (
      <div className='place-list center'>
        <Card>
          <h2>No places found.</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );

  return (
    <ul className='place-list'>
      {items.map(
        ({ id, imageURL, title, description, address, creator, location }) => (
          <PlaceItem
            key={id}
            id={id}
            image={imageURL}
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
