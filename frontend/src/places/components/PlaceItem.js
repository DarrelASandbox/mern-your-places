import { useState, useContext } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import Map from '../../shared/components/UIElements/Map';
import Modal from '../../shared/components/UIElements/Modal';
import './PlaceItem.css';
import AuthContext from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import useHttpClient from '../../shared/hooks/http-hook';

const PlaceItem = ({
  image,
  title,
  address,
  description,
  id,
  coordinates,
  onDelete,
  creator,
}) => {
  const { userId } = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showMap, setShowMap] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleMap = () => setShowMap((prevState) => !prevState);
  const toggleDeleteModal = () => setShowDeleteModal((prevState) => !prevState);
  const deleteHandler = async () => {
    toggleDeleteModal();
    await sendRequest(`/api/places/${id}`, 'DELETE');
    onDelete(id);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
          {isLoading && <LoadingSpinner asOverlay />}
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
            {userId === creator && <Button to={`/places/${id}`}>EDIT</Button>}
            {userId === creator && (
              <Button danger onClick={toggleDeleteModal}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
