import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Product, Variant } from '../types';
import { IMAGE_BASE_URL, CONTACT_INFO, PLACEHOLDER_IMAGE } from '../constants';
import PriceDisplay from '../components/PriceDisplay';

const ProductDetail: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [mainImage, setMainImage] = useState<string>('');
  
  // Logic to determine display stock based on variant selection
  const currentStock = selectedVariant ? selectedVariant.stock : product?.total_stock || 0;
  const isAvailable = currentStock > 0;

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      if (!productId) return;
      try {
        const data = await api.getProductDetail(productId);
        setProduct(data);
        
        // Initialize state
        if (data.main_image) {
            setMainImage(data.main_image.startsWith('http') ? data.main_image : `${IMAGE_BASE_URL}${data.main_image}`);
        } else {
            setMainImage(PLACEHOLDER_IMAGE);
        }

        // Auto-select first available variant if exists
        if (data.variants && data.variants.length > 0) {
            const available = data.variants.find(v => v.stock > 0) || data.variants[0];
            setSelectedVariant(available);
        }
      } catch (error) {
        console.error("Error loading product", error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maybel-600"></div></div>;
  if (!product) return <div className="text-center py-20">Producto no encontrado</div>;

  const images = product.images && product.images.length > 0 
    ? product.images.map(img => img.url.startsWith('http') ? img.url : `${IMAGE_BASE_URL}${img.url}`)
    : [product.main_image?.startsWith('http') ? product.main_image : `${IMAGE_BASE_URL}${product.main_image}`].filter(Boolean) as string[];

  // Ensure main image is in the list for thumbnails if it's not empty
  const allImages = Array.from(new Set([mainImage, ...images]));

  const whatsappMessage = encodeURIComponent(`Hola, me interesa el producto: ${product.name}${selectedVariant ? ` (${selectedVariant.color})` : ''}. ¿Tienen disponibilidad?`);

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 mb-6 border-b border-gray-100">
         <div className="container mx-auto px-4 text-sm text-gray-500">
            <Link to="/" className="hover:text-maybel-600">Inicio</Link> 
            <span className="mx-2">/</span>
            <Link to={`/categoria/${product.category.id}`} className="hover:text-maybel-600">{product.category.name}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium truncate">{product.name}</span>
         </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Column: Gallery */}
          <div className="space-y-4">
             <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                <img src={mainImage} alt={product.name} className="w-full h-full object-contain" />
             </div>
             {/* Thumbnails */}
             <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
               {allImages.map((img, idx) => (
                 <button 
                   key={idx}
                   onClick={() => setMainImage(img)}
                   className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${mainImage === img ? 'border-maybel-500' : 'border-transparent'}`}
                 >
                   <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                 </button>
               ))}
             </div>
          </div>

          {/* Right Column: Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-6 leading-relaxed">{product.description}</p>
            
            {/* Price Component */}
            <div className="mb-8">
              <PriceDisplay prices={product.prices} />
            </div>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Selecciona Variante:</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      disabled={v.stock === 0}
                      className={`px-4 py-2 rounded-md text-sm font-medium border transition-all
                        ${selectedVariant?.id === v.id 
                          ? 'bg-white border-maybel-500 text-maybel-700 shadow-sm ring-1 ring-maybel-500' 
                          : v.stock === 0 
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                        }
                      `}
                    >
                      {v.color}
                    </button>
                  ))}
                </div>
                {selectedVariant && (
                  <p className="mt-2 text-sm text-gray-500">
                    Stock variante: <span className="font-semibold">{selectedVariant.stock}</span> unidades
                  </p>
                )}
              </div>
            )}

            {/* Total Stock Indicator */}
            <div className="flex items-center gap-2 mb-8">
               <span className={`w-3 h-3 rounded-full ${isAvailable ? (currentStock > 5 ? 'bg-green-500' : 'bg-yellow-500') : 'bg-red-500'}`}></span>
               <span className={`font-medium ${isAvailable ? (currentStock > 5 ? 'text-green-700' : 'text-yellow-700') : 'text-red-700'}`}>
                 {isAvailable 
                   ? (currentStock > 5 ? 'Disponible en inventario' : `¡Solo quedan ${currentStock} unidades!`) 
                   : 'Agotado temporalmente'}
               </span>
            </div>

            {/* Action Buttons - Sticky on mobile bottom via fixed positioning if needed, but here simple layout */}
            <div className="flex flex-col gap-3">
               <a 
                 href={`https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}?text=${whatsappMessage}`}
                 target="_blank"
                 rel="noreferrer"
                 className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg hover:shadow-xl"
               >
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.68-2.031-9.67-.272-.099-.47-.149-.669-.149-.198 0-.42.001-.643.001-.223 0-.585.085-.891.42-.306.334-1.169 1.142-1.169 2.785 0 1.643 1.2 3.232 1.366 3.481.166.249 2.364 3.612 5.728 5.065 2.228.963 2.68 7.71 3.659.71.979 0 .546-.386 2.502-1.285.57-.348 2.031-1.285 2.308-.277.272.248.335.845.335z"/></svg>
                 Comprar por WhatsApp
               </a>
               
               <a 
                 href={`https://t.me/${CONTACT_INFO.telegram}`}
                 target="_blank"
                 rel="noreferrer"
                 className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-colors"
               >
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                 Consultar por Telegram
               </a>

               <a 
                 href={`tel:${CONTACT_INFO.phone}`}
                 className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-colors"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                 Llamar ahora
               </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;