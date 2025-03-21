
# 🖼️ Image Asset Manager

A sleek and user-friendly **Image Asset Manager** built with React and Tailwind CSS, featuring powerful image editing tools such as **uploading**, **cropping**, **rotating**, **flipping**, and **replacing** images. Ideal for managing image assets in a gallery format with a modern UI.

## live link
**[https://image-manager-website.netlify.app/](https://image-manager-website.netlify.app/)**

## ✨ Features

- 📤 Upload images from your local device
- ✂️ Crop images with adjustable aspect ratios
- 🔄 Rotate images in 90° increments
- ↔️ Flip images horizontally and vertically
- ♻️ Replace existing images with new uploads
- 🖼️ Responsive, masonry-style image gallery
- ⚙️ Interactive 3-dot dropdown menu for image actions
- 🔍 Search bar UI for future filtering capability
- 💡 Intuitive and modern UI design
- ⚡ Built using React, Tailwind CSS, Lucide Icons, and React Easy Crop


## 🚀 Getting Started

Follow these instructions to get the project up and running locally.

### 📦 Clone the Repository

```bash
git clone https://github.com/deepanshuu2002/image-manager.git
cd image-asset-manager
```

### 📥 Install Dependencies

```bash
npm install
```

### ▶️ Start the Development Server

```bash
npm run dev
```

Visit **[http://localhost:5173](http://localhost:5173)** in your browser to view the app.

---

## 🧱 Project Structure

```
src/
├── components/
│   ├── ImageUploader.jsx       # Image upload & input
│   ├── ImageGallery.jsx        # Gallery layout with 3-dot menu
│   ├── ImageEditor.jsx         # Crop/rotate/flip UI drawer
│   └── ui/
│       └── button.jsx          # Reusable Button component
├── App.jsx                     # Main layout & state
├── main.jsx                    # Entry point
├── index.css                   # Tailwind CSS setup
└── assets/
    └── Group.png               # Add-asset hero image
```

---

## 📂 Assets

- The `Group.png` hero image is stored in `/assets`.
- You can replace it with your own branding or graphic.

---

## 🧰 Built With

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [React Easy Crop](https://github.com/ValentinH/react-easy-crop)
- [Vite](https://vitejs.dev/)

---

