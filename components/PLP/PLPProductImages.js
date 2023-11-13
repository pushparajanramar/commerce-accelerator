import Image from 'next/image'
import { useSelector } from 'react-redux';
import { selectLocale } from '/store/slices/langSlice';

export default function PLPProductImages({ product }) {
    const siteLang = useSelector(selectLocale);
    return (
    <div className="product-item">
    <a href={product.url}>
    <Image
        src={product.thumb_image}
        alt={product.title}
        width="404"
        height="509"
        blurDataURL="{product.thumb_image.blurUrl}"
        placeholder="blur"
        quality={64}
        
        />
    </a>
    <div className="product-details">
        <div className='product-name'>
            {product.title}
        </div>
        <div className='product-price'>
        {siteLang == 'en-US' ? <h3>${product.price}</h3> : <h3>C${product.price}</h3>} 
        </div>        
    </div>
</div>)
}
