import { useState } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import Modal from '../../shared/components/UIElements/Modal';
import './PlaceItem.css';

const PlaceItem = ({ image, title, address, description, id }) => {
  const [showMap, setShowMap] = useState(false);

  const toggleMap = () => setShowMap((prevState) => !prevState);

  return (
    <>
      <Modal
        show={showMap}
        onCancel={toggleMap}
        header={address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={toggleMap}>CLOSE</Button>}>
        <div className='map-container'>
          <h2>THE MAP</h2>
        </div>
      </Modal>

      <li className='place-item'>
        <Card className='place-item__content'>
          <div className='place-item__image'>
            <img src={image} alt={title} />
          </div>
          <div className='place-item__info'>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={toggleMap}>
              VIEW ON MAP
            </Button>
            <Button to={`/places/${id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
