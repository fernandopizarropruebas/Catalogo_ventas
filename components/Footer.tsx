import React from 'react';
import { CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 bg-maybel-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">Maybel</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Tu tienda de confianza en Cuba. Ofrecemos una amplia variedad de productos de calidad con la mejor atención.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-maybel-400 transition-colors">Inicio</a></li>
              <li><a href="#/categorias" className="hover:text-maybel-400 transition-colors">Categorías</a></li>
              <li><a href="#" className="hover:text-maybel-400 transition-colors">Términos y Condiciones</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                 <svg className="w-5 h-5 text-maybel-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                 <span>{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                 <svg className="w-5 h-5 text-maybel-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-start gap-3">
                 <svg className="w-5 h-5 text-maybel-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 <span>Lun - Sáb: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Plataforma Maybel. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;