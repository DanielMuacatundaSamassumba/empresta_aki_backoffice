import  { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

interface GalleryImage {
  largeURL: string;
  thumbnailURL: string;
  width: number;
  height: number;
  imageWidth:number,
  style:string,
}

interface SimpleGalleryProps {
  galleryID: string;
  images: GalleryImage[],
  style:string

  
}

export default function DocumentsImages({ galleryID, images,  style }: SimpleGalleryProps) {
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#' + galleryID,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, [galleryID]);

  return (
    <div className={`pswp-gallery ${style}`} id={galleryID} >
      {images?.map((image, index) => (
        <a
          href={image.largeURL}
          data-pswp-width={image.width}
          data-pswp-height={image.height}
          key={`${galleryID}-${index}`}
        >
          <img src={image.thumbnailURL}  width={images[index].imageWidth} className='ml-2 mt-2'/>
        </a>
      ))}
    </div>
  );
}
