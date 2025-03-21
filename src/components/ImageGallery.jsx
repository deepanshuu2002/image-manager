import React, { useRef, useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { MoreVertical } from 'lucide-react';
import { ImageEditor } from './ImageEditor';

export const ImageGallery = ({ images, onUpdateImage }) => {
  const [menuIndex, setMenuIndex] = useState(null);
  const [editorImage, setEditorImage] = useState(null);
  const [editorIndex, setEditorIndex] = useState(null);
  const [editAction, setEditAction] = useState(null);

  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (index) => {
    setMenuIndex(menuIndex === index ? null : index);
  };

  const handleReplace = (index) => {
    if (fileInputRef.current) {
      fileInputRef.current.dataset.index = index;
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    const index = parseInt(e.target.dataset.index);
    if (file && index >= 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditorImage(reader.result);
        setEditorIndex(index);
        setEditAction('crop'); // optional: always crop on replace
        setMenuIndex(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {images.map((image, index) => (
          <div key={index} className="relative mb-4 break-inside-avoid">
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            />

            <button
              onClick={() => toggleMenu(index)}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {menuIndex === index && (
              <div
                ref={menuRef}
                className="absolute top-10 right-2 z-10 w-40 bg-white rounded shadow-md text-sm text-gray-700"
              >
                <ul className="py-1">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                    setEditorImage(image);
                    setEditorIndex(index);
                    setEditAction('crop');
                    setMenuIndex(null);
                  }}>Crop</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                    setEditorImage(image);
                    setEditorIndex(index);
                    setEditAction('rotate');
                    setMenuIndex(null);
                  }}>Rotate</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                    setEditorImage(image);
                    setEditorIndex(index);
                    setEditAction('flipH');
                    setMenuIndex(null);
                  }}>Flip Right</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                    setEditorImage(image);
                    setEditorIndex(index);
                    setEditAction('flipV');
                    setMenuIndex(null);
                  }}>Flip Left</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleReplace(index)}>Replace</li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </Masonry>

      {/* Hidden input for Replace */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {editorImage && (
        <ImageEditor
          imageSrc={editorImage}
          initialAction={editAction}
          onSave={(editedImg) => {
            if (onUpdateImage && editorIndex !== null) {
              onUpdateImage(editorIndex, editedImg);
            }
          }}
          onClose={() => {
            setEditorImage(null);
            setEditorIndex(null);
            setEditAction(null);
          }}
        />
      )}
    </>
  );
};
