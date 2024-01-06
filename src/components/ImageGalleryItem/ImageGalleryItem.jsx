import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ webformatURL, tags, getId, id }) {
  return (
    <li className={css.ImageGalleryItem} onClick={() => getId(id)} id={id}>
      <img
        className={css.ImageGalleryItem_image}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
}
