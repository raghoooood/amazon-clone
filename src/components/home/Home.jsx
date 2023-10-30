import React from 'react'
import "./Home.css"
import Product from '../product/Product'
import { book, ipad , appleWatch, AmazonEchoSilver, serum, tv } from '../asssets';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { images } from '../../constants';

const galleryImages = [
  images.banner01,
  images.banner02,

];
const Home = () => {

  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;

    if (direction === 'left') {
      current.scrollLeft -= 1700;
    } else {
      current.scrollLeft += 1700;
    }
  }

  return (
    <div className="home">
        <div className="home__container">
            <div  className="home__image">
          <div className="app__gallery-images">

        <div className="app__gallery-images_container" ref={scrollRef}>
              
          {galleryImages.map((image, index) => (
            <div className="app__gallery-images_card" key={`gallery_image-${index + 1}`}>
              <img src={image} alt="gallery" />
            </div>
          ))}
        </div>
        <div className="app__gallery-images_arrows">
          <BsArrowLeftShort className="gallery__arrow-icon" onClick={() => scroll('left')} />
          <BsArrowRightShort className="gallery__arrow-icon" onClick={() => scroll('right')} />
        </div>
     </div>
 </div>

            <div className="home__row">
                <Product 
                title="Making memories family adventures book"
                price={29.99}
                image={book}
                rating={2}/> 
                 <Product 
                title="Apple 2021 10.2-inch iPad (Wi-Fi, 64GB) - Silver (9th Generation)"
                price={799.99}
                image={ipad}
                rating={5}/> 
            </div>
            

            <div className="home__row">
                <Product 
                title="Apple Watch Series 7 (GPS, 45mm) Midnight Regular (Renewed)"
                price={129.99}
                image={appleWatch}
                rating={3}/>  
                <Product 
                title="Certified Refurbished Echo Dot- Smart speaker with Alexa - Charcoal"
                price={229.99}
                image={AmazonEchoSilver}
                rating={5}/>  
                <Product 
                title="Tree of Life Vitamin C Serum,
                  for Brightening & Hydrating for Face"
                price={89.99}
                image={serum}
                rating={4}/>  

            </div>
            <div className="home__row">
                 <Product 
                title="Sceptre 24 Professional Thin 75Hz 1080p LED Monitor 2x HDMI VGA Build-in "
                price={969.99}
                image={tv}
                rating={5}/>  
               
            </div>
            </div>   
    </div>
  )
}

export default Home