import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, getId }) {
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
}
