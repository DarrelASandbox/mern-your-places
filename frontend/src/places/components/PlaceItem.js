import { useState } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import Map from '../../shared/components/UIElements/Map';
import Modal from '../../shared/components/UIElements/Modal';
import './PlaceItem.css';

const PlaceItem = ({ image, title, address, description, id, coordinates }) => {
  const [showMap, setShowMap] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleMap = () => setShowMap((prevState) => !prevState);
  const toggleDeleteModal = () => setShowDeleteModal((prevState) => !prevState);
  const deleteHandler = () => {
    toggleDeleteModal();
    console.log('Deleting..');
  };

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
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showDeleteModal}
        onCancel={toggleDeleteModal}
        header='Are you sure?'
        footerClass='place-item__modal-actions'
        footer={
          <>
            <Button inverse onClick={toggleDeleteModal}>
              CANCEL
            </Button>
            <Button danger onClick={deleteHandler}>
              DELETE
            </Button>
          </>
        }>
        <p>Delete action cannot be undone.</p>
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
              VIEW IN MAP
            </Button>
            <Button to={`/places/${id}`}>EDIT</Button>
            <Button danger onClick={toggleDeleteModal}>
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
