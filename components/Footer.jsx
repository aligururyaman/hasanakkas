import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaWhatsapp } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="flex flex-col sm:w-full bg-primary sm:my-10 rounded-xl shadow-md py-10">
      <div className='h-0.5 bg-gray-200 sm:w-full my-10' />
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-semibold mb-4">Hakkımızda</h2>
            <p className="text-gray-400">
              1900 Yılından beri şehrin ileri gelen ismi olarak hizmet vermekteyiz
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-semibold mb-4">İletişim</h2>
            <p className="text-gray-400">Email: info@company.com</p>
            <p className="text-gray-400">Telefon: +90 123 456 7890</p>
            <p className="text-gray-400">Adres: Atatürk Caddesi, Osmaniye, Kadirli</p>
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-semibold mb-4">Sosyal Medya</h2>
            <ul className="flex space-x-10">
              <li>
                <Link href="https://instagram.com" className='flex flex-col justify-center items-center'>
                  <FaInstagram size={40} />
                  <p className="text-gray-400 hover:text-white font-bold text-xl">Instagram</p>
                </Link>
              </li>
              <li>
                <Link href="https://instagram.com" className='flex flex-col justify-center items-center'>
                  <FaWhatsapp size={40} />
                  <p className="text-gray-400 hover:text-white font-bold text-xl">Whatsapp</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-8">
          <p>&copy; {new Date().getFullYear()} Hasan Akkaş Tic. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
