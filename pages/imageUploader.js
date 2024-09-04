import React, { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ImageCropper = () => {
  const cropperRef = useRef(null);
  const [cropData, setCropData] = useState('');

  const handleCrop = () => {
    if (typeof cropperRef.current.getCroppedCanvas() === 'undefined') {
      return;
    }

    setCropData(cropperRef.current.getCroppedCanvas().toDataURL());
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setCropData(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }} />
      <Cropper
        ref={cropperRef}
        src={cropData}
        style={{ height: 400, width: '100%' }}
        aspectRatio={1}
        guides={true}
      />
      <button onClick={handleCrop}>Crop Image</button>
      {cropData && <img src={cropData} alt="Crop" />}
    </div>
  );
};

export default ImageCropper;
