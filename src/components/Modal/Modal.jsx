import { useEffect } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ closeModal, modalImage }) {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [closeModal]);

  const onBackDropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const { largeImageURL, tags } = modalImage;

  return createPortal(
    <div onClick={onBackDropClick} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}
