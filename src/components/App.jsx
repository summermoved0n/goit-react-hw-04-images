import { useEffect, useState } from 'react';
import PixabayApiService from './helpers/helper-api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import css from './App.module.css';

const pixabayAPI = new PixabayApiService();

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isMoreImages, setIsMoreImages] = useState(false);
  const [randomId, setRandomId] = useState(0);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    try {
      if (searchQuery === '') {
        return;
      }
      setStatus('pending');
      pixabayAPI.getPixabayData(searchQuery, page).then(data => {
        const { hits, totalHits } = data;
        setImages(prevState => [...prevState, ...hits]);
        setStatus('resolved');
        setIsMoreImages(page < Math.ceil(totalHits / 12));
      });
    } catch (error) {
      setStatus('rejected');
    }
  }, [page, searchQuery, randomId]);

  const searchForm = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setIsMoreImages(false);
    setRandomId(Math.random());
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getImageId = id => {
    const modalImage = images.find(image => image.id === id);
    setShowModal(true);
    setModalImage(modalImage);
  };

  return (
    <div className={css.App}>
      {showModal && <Modal closeModal={closeModal} modalImage={modalImage} />}
      <Searchbar onSubmit={searchForm} />
      {images.length > 0 && <ImageGallery getId={getImageId} images={images} />}
      {status === 'pending' && (
        <div className={css.Loader}>
          <Loader />
        </div>
      )}
      {isMoreImages && <Button onLoad={handleLoadMore} />}
      {status === 'rejected' && <p>Sorry. Something went wrong! 😥</p>}
      {status === 'resolved' && images.length === 0 && (
        <p>
          Sorry. <b>'{searchQuery}'</b> not found...
        </p>
      )}
    </div>
  );
}
