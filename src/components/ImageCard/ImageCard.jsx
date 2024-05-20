import css from "../ImageCard/ImageCard.module.css";

export default function ImageCard({ item }) {
  return (
    <>
      <img
        className={css.image}
        src={item.urls.small}
        alt={item.alt_description}
      />
    </>
  );
}
