import React, { useState, useCallback, FC } from 'react'
import { useDropzone } from 'react-dropzone'

type ImagePropType = {
  setImages: React.Dispatch<any>
  images: any
}

const ImageUploader: FC<ImagePropType> = ({ setImages, images }) => {
  // const [images, setImages] = useState<any>([])   use this localily if needed

  const onDrop = useCallback((acceptedFiles: any) => {
    const newImages = acceptedFiles.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    )
    setImages((prevImages: any) => [...prevImages, ...newImages])
  }, [])

  const removeImage = (index: number) => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    setImages(updatedImages)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
  })

  return (
    <div className={`${images.length > 0 ? 'flex' : ''}`}>
      <div
        {...getRootProps()}
        className={` ${
          images.length > 0 && 'w-[150px]'
        } border-2 border-dashed cursor-pointer border-gray-300 p-4 rounded h-[120px] flex  items-center justify-center ${
          isDragActive ? 'border-blue-500' : ''
        }`}
      >
        <input {...getInputProps()} />
        <p
          className={`text-brand-white text-center ${
            images.length > 0 && 'text-[14px]'
          }`}
        >
          Drag & drop images here, or click to select files
        </p>
      </div>
      <div className="flex relative  ">
        {images.slice(0, 4).map((image: any, index: number) => (
          <div
            key={index}
            className="relative flex items-center justify-center  h-[120px]"
          >
            <img
              src={image.preview}
              alt={`preview-${index}`}
              className=" w-[150px]  h-[120px] rounded"
            />

            <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-white text-orange-300 border-none p-2 rounded-full cursor-pointer opacity-0 transition-opacity duration-300 hover:opacity-100"
              onClick={() => removeImage(index)}
            >
              Remove
            </button>
          </div>
        ))}
        {images.length > 4 && (
          <div className="absolute text-brand-gold font-bold text-[1.5rem] bg-brand-white right-5 p-2 w-[55px] flex items-center justify-center rounded-[50%] top-9">
            {images.length}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageUploader
