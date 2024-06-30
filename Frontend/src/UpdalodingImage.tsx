import React, { useState } from 'react';
import { Image, CloudinaryContext, Transformation } from '@cloudinary/react';

const UploadComponent: React.FC = () => {
  const [image, setImage] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // Upload the image to Cloudinary
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setImage(data.secure_url);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {image && (
        <CloudinaryContext cloudName="dac6y9jq6">
          <Image publicId={image}>
            <Transformation width="300" height="200" crop="fill" />
          </Image>
        </CloudinaryContext>
      )}
    </div>
  );
};

export default UploadComponent;
