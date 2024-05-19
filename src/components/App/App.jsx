import { useEffect, useState } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import { getArticles } from "../articles-api";
import SearchBar from "../SearchBar/SearchBar";
import ImageModal from "../ImageModal/ImageModal";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearch = async (topic) => {
    setSearchQuery(topic);

    setPage(1);
    setArticles([]);
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
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
  return (
    <div>
      <h1>HTTP request in React</h1>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <p>Loading articles, please wait...</p>}
      {isError && <p>Ooops! There was an error, try reloading page!</p>}
      {articles.length > 0 && (
        <ImageGallery items={articles} onImageClick={openModal} />
      )}
      {articles.length > 0 && !isLoading && (
        <button onClick={handleLoadMore}>Load more</button>
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
}
