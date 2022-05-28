import imgUpload from "../../image/uploadImage.png"

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function UploadImage ({setValueModal, valueModal}) {

  const handleChange = e => {
    const image = e.target.files[0];
    getBase64(image, imageUrl =>
        setValueModal({...valueModal, img: imageUrl})
    );
  };

  return (
    <div>
      <input type="file" onChange={handleChange} id="input_image" style={{display: "none"}}/>
      <label htmlFor="input_image">
        <img
          src={valueModal.img ? valueModal.img : imgUpload}
          alt="image"
          style={{ width: '120px', height: '120px' }}
        />
      </label>
    </div>
  );
}

export default UploadImage;