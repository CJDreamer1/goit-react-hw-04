import css from "../LoadMoreBtn/LoadMoreBtn.module.css";

export default function LoadMoreBtn({
  isLoadingMore,
  hasMore,
  onClick,
  whileLoading,
}) {
  return (
    <div>
      {hasMore && (
        <button className={css.loadMoreBtn} onClick={onClick}>
          Load more
        </button>
      )}
      {isLoadingMore && (
        <div className={css.progressWrapper}>{whileLoading}</div>
      )}
    </div>
  );
}
