import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ item, onOpen }) => {
  console.log(item);

  return (
    <>
      <li className={style.galleryItem} key={item.id}>
        <img
          src={item.webformatURL}
          alt={item.tags}
          width="300"
          className={style.image}
          onClick={() => onOpen(item.largeImageURL)}
        />
      </li>
    </>
  );
};

export default ImageGalleryItem;
