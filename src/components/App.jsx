import { useState, useEffect, useCallback  } from 'react';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import axios from 'axios';
import Modal from './Modal';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [loader, setLoader] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [imgQuery, setImgQuery] = useState(null);
  const [totalImg, setTotalImg] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const serviceApi = useCallback(async () => {
    try {
      setLoader(true);

      const response = await axios.get(
        `?key=29332963-764ea3ce314f104536083404e&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=${perPage}`
      );

      setGallery(state =>
        page === 1 ? response.data.hits : [...state, ...response.data.hits]
      );
      setTotalImg(response.data.total);

      if (response.data.total === 0) {
        toast.error('По твоему запросу ничего не найдено');
      }
    } catch (error) {
      toast.error('Что то пошло не так :(');
    } finally {
      setLoader(false);
    }
  }, [page, perPage, query]);


  const handelSearcheValue = query => {
    setQuery(query);
    setPage(1);
  };

  const handelClickPage = () => {
    setPage(state => state + 1);
  };

  const isShowModal = crs => {
    setShowModal(state => !state);
    setImgQuery(crs);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    serviceApi();

  }, [page, query, serviceApi]);


  return (
    <div>
      <Searchbar onSubmit={handelSearcheValue} />
      {loader && <Loader />}
      <ImageGallery
        gallery={gallery}
        onLoadMore={handelClickPage}
        onOpen={isShowModal}
        total={totalImg}
        page={page}
        perPage={perPage}
      />
      {showModal && (
        <Modal onClose={isShowModal}>
          <img
            src={imgQuery}
            alt={query}
            style={{
              display: 'block',
              objectFit: 'cover',
              maxWidth: '100%',
              width: '100%',
              height: '100%',
            }}
          />
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

