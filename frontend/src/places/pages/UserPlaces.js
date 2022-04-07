import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import useHttpClient from '../../shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { userId } = useParams();

  useEffect(() => {
    const callSendRequest = async () => {
      const response = await sendRequest(`/api/places/user/${userId}`);
      setLoadedPlaces(response.userPlaces);
    };

    callSendRequest();
  }, [sendRequest, userId]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div>
          <LoadingSpinner asOverlay />
        </div>
      )}

      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
    </>
  );
};

export default UserPlaces;
