import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { Button } from './ui/button';
import { X, RotateCw, FlipHorizontal, FlipVertical, Replace ,  ArrowUp } from 'lucide-react';


const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

const rotateSize = (width, height, rotation) => {
  const rotRad = (rotation * Math.PI) / 180;
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
};

const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0, flip = { horizontal: false, vertical: false }) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const rotRad = (rotation * Math.PI) / 180;
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(pixelCrop.width, pixelCrop.height, rotation);
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-pixelCrop.width / 2, -pixelCrop.height / 2);

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL('image/jpeg');
};

export const ImageEditor = ({ imageSrc, initialAction, onSave, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [flippedH, setFlippedH] = useState(false);
  const [flippedV, setFlippedV] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [aspect, setAspect] = useState(16 / 9);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  useEffect(() => {
    if (initialAction === 'rotate') {
      setRotation((prev) => (prev + 90) % 360);
    } else if (initialAction === 'flipH') {
      setFlippedH((prev) => !prev);
    } else if (initialAction === 'flipV') {
      setFlippedV((prev) => !prev);
    }
  }, [initialAction]);

  const handleSave = async () => {
    if (imageSrc && croppedAreaPixels) {
      const result = await getCroppedImg(imageSrc, croppedAreaPixels, rotation, {
        horizontal: flippedH,
        vertical: flippedV,
      });
      if (result) {
        onSave(result);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-96 h-full bg-white shadow-lg p-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-semibold">Edit Image</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative h-64 mt-4 mb-4 bg-gray-100 rounded-lg overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            rotation={rotation}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="rect"
            style={{
              containerStyle: {
                transform: `scaleX(${flippedH ? -1 : 1}) scaleY(${flippedV ? -1 : 1})`,
              },
            }}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-center space-x-2">
            <Button onClick={() => setRotation((prev) => (prev + 90) % 360)} variant="outline" size="icon" title="Rotate">
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button onClick={() => setFlippedH((prev) => !prev)} variant="outline" size="icon" title="Flip Horizontal">
              <FlipHorizontal className="h-4 w-4" />
            </Button>
            <Button onClick={() => setFlippedV((prev) => !prev)} variant="outline" size="icon" title="Flip Vertical">
              <FlipVertical className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zoom</label>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aspect Ratio</label>
            <select
              value={aspect}
              onChange={(e) => setAspect(Number(e.target.value))}
              className="w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value={1}>Square (1:1)</option>
              <option value={16 / 9}>Landscape (16:9)</option>
              <option value={4 / 3}>Standard (4:3)</option>
              <option value={3 / 4}>Portrait (3:4)</option>
              <option value={2 / 3}>Portrait (2:3)</option>
            </select>
          </div>

          <Button onClick={handleSave} className="w-full text-white font-semibold bg-[#334D6E] flex items-center justify-gap-2">
            <ArrowUp size={18} />
            Upload Image
          </Button>

        </div>
      </div>
    </div>
  );
};
