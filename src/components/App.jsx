import { Component, useEffect, useState } from 'react';
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
        setImages([...hits]);
        setStatus('resolved');
        // setIsMoreImages(page < Math.ceil(totalHits / 12));
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
      {status === 'pending' && (
        <div className={css.Loader}>
          <Loader />
        </div>
      )}
      {images.length > 0 && <ImageGallery getId={getImageId} images={images} />}
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

class oldApp extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    isMoreImages: false,
    randomId: 0,
    // error: null,
    status: 'idle',
    showModal: false,
    modalImage: null,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page, randomId } = this.state;
    if (
      prevState.searchQuery !== searchQuery ||
      prevState.page !== page ||
      prevState.randomId !== randomId
    ) {
      try {
        this.setState({
          status: 'pending',
        });

        const { hits, totalHits } = await pixabayAPI.getPixabayData(
          searchQuery,
          page
        );

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          isMoreImages: page < Math.ceil(totalHits / 12),
          status: 'resolved',
        }));
      } catch (error) {
        console.log(error);
        this.setState({
          // error: error.message,
          status: 'rejected',
        });
      }
    }
  }

  searchForm = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
      isMoreImages: false,
      randomId: Math.random(),
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  getImageId = id => {
    const modalImage = this.state.images.find(image => image.id === id);
    this.setState({ showModal: true, modalImage });
  };

  render() {
    const { searchQuery, images, isMoreImages, status, showModal, modalImage } =
      this.state;
    console.log('modalImage: ', modalImage);
    console.log(images);

    return (
      <div className={css.App}>
        {showModal && (
          <Modal closeModal={this.closeModal} modalImage={modalImage} />
        )}
        <Searchbar onSubmit={this.searchForm} />
        {status === 'pending' && (
          <div className={css.Loader}>
            <Loader />
          </div>
        )}
        {images.length > 0 && (
          <ImageGallery getId={this.getImageId} images={images} />
        )}
        {isMoreImages && <Button onLoad={this.handleLoadMore} />}
        {status === 'rejected' && <p>Sorry. Something went wrong! 😥</p>}
        {status === 'resolved' && images.length === 0 && (
          <p>
            Sorry. <b>'{searchQuery}'</b> not found...
          </p>
        )}
      </div>
    );
  }
}
