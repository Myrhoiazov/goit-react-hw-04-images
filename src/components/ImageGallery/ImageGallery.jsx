import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import style from './ImageGallery.module.css';
import Button from '../Button';

class ImageGallery extends Component {
  render() {
    const { gallery, onLoadMore, onOpen, total, page, perPage } = this.props;
    return (
      <>
        <ul className={style.gallery}>
          {gallery.map(item => (
            <ImageGalleryItem item={item} key={item.id} onOpen={onOpen} />
          ))}
        </ul>
        {page * perPage < total && <Button onclick={onLoadMore} />}
      </>
    );
  }
}

export default ImageGallery;
