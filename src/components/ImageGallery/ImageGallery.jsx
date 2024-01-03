import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, getId }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          getId={getId}
          webformatURL={webformatURL}
          tags={tags}
        />
      ))}
    </ul>
  );
};
