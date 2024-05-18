import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function ImageModal({ isOpen, onRequestClose, image }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Image Modal"
    >
      {image && (
        <div>
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            style={{ width: "100%" }}
          />
          <button onClick={onRequestClose}>Close</button>
        </div>
      )}
    </Modal>
  );
}
