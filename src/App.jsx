import React, { useRef, useState } from 'react';
import { ImageGallery } from './components/ImageGallery';
import { ImageEditor } from './components/ImageEditor';
import img from './assets/Group.png';

function App() {
  const [images, setImages] = useState([]);
  const [editorImage, setEditorImage] = useState(null);
  const [editorIndex, setEditorIndex] = useState(null);
  const [editAction, setEditAction] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditorImage(reader.result);
        setEditorIndex(images.length); // add as new
        setEditAction('crop');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = (editedImg) => {
    setImages((prev) => {
      const copy = [...prev];
      if (editorIndex < copy.length) {
        copy[editorIndex] = editedImg;
      } else {
        copy.push(editedImg);
      }
      return copy;
    });
  };

  const handleUpdateImage = (index, updatedImage) => {
    setImages((prev) => {
      const copy = [...prev];
      copy[index] = updatedImage;
      return copy;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto pt-24">

        {/* Conditional Top Section */}
        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-8">
            <img src={img} width={280} alt="Group" className="mb-4" />
            <p className="text-[#707683] text-2xl font-semibold mb-4">Add assets here</p>
            <div
              className="w-32 flex justify-center gap-2 text-white bg-[#334D6E] p-4 border rounded-lg cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <span className="text-lg font-bold">+</span>
              <span className="text-lg font-bold">Add</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-white shadow-md rounded-lg px-6 py-4 mb-8">
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full max-w-md border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div
              className="ml-4 w-32 flex justify-center gap-2 text-white bg-[#334D6E] p-3 border rounded-lg cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <span className="text-lg font-bold">+</span>
              <span className="text-lg font-bold">Add</span>
            </div>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* Image Gallery */}
        {images.length > 0 && (
          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Image Gallery</h2>
            <ImageGallery images={images} onUpdateImage={handleUpdateImage} />
          </div>
        )}

        {/* Image Editor */}
        {editorImage && (
          <ImageEditor
            imageSrc={editorImage}
            initialAction={editAction}
            onSave={(editedImg) => {
              handleSaveImage(editedImg);
              setEditorImage(null);
              setEditorIndex(null);
              setEditAction(null);
            }}
            onClose={() => {
              setEditorImage(null);
              setEditorIndex(null);
              setEditAction(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
