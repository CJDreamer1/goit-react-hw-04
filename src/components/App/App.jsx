import { useEffect, useState } from "react";
import axios from "axios";
import ImageGallery from "../ImageGallery/ImageGallery";
import { getArticles } from "../articles-api";
import SearchBar from "../SearchBar/SearchBar";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div>
      <h1>HTTP ruquest in React</h1>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <p>Loading articles, please wait...</p>}
      {isError && <p>Ooops! There was an error, try reloading page!</p>}
      {articles.length > 0 && <ImageGallery items={articles} />}
      {articles.length > 0 && !isLoading && (
        <button onClick={handleLoadMore}>Load more</button>
      )}
    </div>
  );
}
