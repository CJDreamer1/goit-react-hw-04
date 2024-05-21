import { useEffect, useState } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import { getArticles } from "../articles-api";
import SearchBar from "../SearchBar/SearchBar";
import ImageModal from "../ImageModal/ImageModal";
import { ProgressBar } from "react-loader-spinner";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import css from "../App/App.module.css";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // ================================ Modal State =============================
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  // ==========================================================================
  useEffect(() => {
    if (searchQuery.trim() === "") {
      return;
    }

    async function fetchArticles() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getArticles(searchQuery, page);
        if (data.length < 10) {
          setHasMore(false);
          setIsError(true);
        }
        if (data.length >= 1) {
          setIsError(false);
        }
        setArticles((prevState) => [...prevState, ...data]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticles();

    console.log(searchQuery, page);
  }, [searchQuery, page]);
  // =====================================================================================>

  const handleSearch = async (topic) => {
    setSearchQuery(topic);
    setHasMore(true);
    setPage(1);
    setArticles([]);
  };

  const handleLoadMore = async () => {
    try {
      setIsLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoadingMore(false);
    }
  };
  // ========================================= Modal Window ====================
  const openModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };
  // =================================== End Modal window ======================
  const bar = (
    <ProgressBar
      visible={true}
      height="80"
      width="500"
      color="#0056b3"
      borderColor="#0056b3"
      ariaLabel="progress-bar-loading"
      wrapperStyle={{}}
      wrapperClass=""
      className={css.progressBar}
    />
  );
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <div className={css.progressWrapper}>{bar}</div>}
      {isError && (
        <p>
          Ooops! There was an error, try reloading page or change search request
        </p>
      )}
      {articles.length > 0 && (
        <ImageGallery items={articles} onImageClick={openModal} />
      )}
      {isLoadingMore && <div className={css.progressWrapper}>{bar}</div>}
      {articles.length > 0 && !isLoading && (
        <LoadMoreBtn
          isLoadingMore={isLoadingMore}
          hasMore={hasMore}
          onClick={handleLoadMore}
          whileLoading={bar}
        />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
}
