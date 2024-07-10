import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className=" py-8 bg-primary">
      <div className='h-0.5 bg-gray-200 w-full my-10' />
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-semibold mb-4">Hakkımızda</h2>
            <p className="text-gray-400">
              Şirketimiz hakkında bilgi, misyonumuz, vizyonumuz ve değerlerimiz hakkında bilgi edinin.
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-semibold mb-4">İletişim</h2>
            <p className="text-gray-400">Email: info@company.com</p>
            <p className="text-gray-400">Telefon: +90 123 456 7890</p>
            <p className="text-gray-400">Adres: 123 Şirket Sokak, İstanbul, Türkiye</p>
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-semibold mb-4">Sosyal Medya</h2>
            <ul className="flex space-x-4">
              <li>
                <Link href="https://facebook.com">
                  <p className="text-gray-400 hover:text-white">Facebook</p>
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com">
                  <p className="text-gray-400 hover:text-white">Twitter</p>
                </Link>
              </li>
              <li>
                <Link href="https://instagram.com">
                  <p className="text-gray-400 hover:text-white">Instagram</p>
                </Link>
              </li>
              <li>
                <Link href="https://linkedin.com">
                  <p className="text-gray-400 hover:text-white">LinkedIn</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-8">
          <p>&copy; {new Date().getFullYear()} Şirket Adı. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
