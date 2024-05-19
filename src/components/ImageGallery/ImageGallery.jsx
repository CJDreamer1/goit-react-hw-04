import ImageCard from "../ImageCard/ImageCard";

import css from "../ImageGallery/ImageGallery.module.css";

export default function ImageGallery({ items, onImageClick }) {
  return (
    <ul className={css.list}>
      {console.log(items)}
      {items.map((item) => (
        <li
          className={css.pictureContainer}
          key={item.id}
          onClick={() => onImageClick(item)}
        >
          <ImageCard item={item} />
        </li>
      ))}
    </ul>
  );
}
