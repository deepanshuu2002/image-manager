import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from './ui/button';
import { ImageEditor } from './ImageEditor';

export const ImageUploader = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setIsEditorOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      <div className="w-full p-8 border-2 border-dashed rounded-lg border-gray-300 hover:border-gray-400 transition-colors">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <Upload className="w-12 h-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Click or drag to upload an image</p>
        </label>
      </div>

      {isEditorOpen && selectedImage && (
        <ImageEditor
          imageSrc={selectedImage}
          onSave={(croppedImage) => {
            onImageUpload(croppedImage);
            setSelectedImage(null);
            setIsEditorOpen(false);
          }}
          onClose={() => {
            setSelectedImage(null);
            setIsEditorOpen(false);
          }}
        />
      )}
    </div>
  );
};
