import css from "../ImageCard/ImageCard.module.css";

export default function ImageCard({ item }) {
  return (
    <div className={css.image}>
      <img
        className={css.internalImage}
        src={item.urls.small}
        alt={item.alt_description}
      />
      <div className={css.info}>
        <p>likes:{item.likes}</p>
        <p>author:{item.user.name}</p>
      </div>
    </div>
  );
}
