"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PiSignInBold } from "react-icons/pi";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { fetchCategories } from "@/redux/reducers/categoryReducer";
import { Button } from "@/components/ui/button";
import { fetchOther } from "@/redux/reducers/otherReducer";
import { signOut } from "@/redux/reducers/userReducer";
import { useRouter } from "next/navigation";
import { FaBasketShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgPushChevronRight } from "react-icons/cg";
import { fetchProductsByCategory } from "@/redux/reducers/productsReducer";



function Nav() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { categories, loading, error } = useSelector((state) => state.categories);
  const { other } = useSelector((state) => state.other);
  const { user } = useSelector((state) => state.user);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchOther());
    setIsUserLoaded(true);
  }, [dispatch]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const handleLogout = () => {
    router.push('/')
    dispatch(signOut());
  };

  const handleProfile = () => {
    router.push(`/profile/${user._id}`)
  };

  const handleCategoryClick = (id) => {
    const categoryId = `${id}`;
    router.push(`/category/${id}?categoryId=${categoryId}`);
    setMenuOpen(false);
    dispatch(fetchProductsByCategory(categoryId))
  };


  // Kullanıcı durumu yüklenene kadar boş bir render yap
  if (!isUserLoaded) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-between text-white">
      <div className="flex md:hidden">
        <div onClick={toggleMenu}>
          <GiHamburgerMenu size={33} />
        </div>
        {menuOpen && (
          <ul className='flex flex-col gap-4 absolute z-30 bg-background mt-10 w-96 px-5'>
            {categories.map(category => (
              <li key={category._id} className='flex flex-row  text-lg hover:cursor-pointer items-center gap-4 hover:scale-105' onClick={() => handleCategoryClick(category._id)}>
                <p className="text-xl font-bold">{category.name}</p>
                <div className='flex justify-end items-center gap-2 w-full'>
                  <p>Git</p>
                  <CgPushChevronRight />
                </div>
              </li>

            ))}
          </ul>
        )}
      </div>
      <div className="md:flex hidden relative z-30">
        <div className="flex flex-row gap-2">
          {categories.map((category) => (
            <Button
              variant="link"
              className=" hover:bg-slate-200 hover:hover:scale-110 hover:text-black"
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

      </div>
      <div className="flex relative z-30 items-center gap-10 text-white hover:text-black">
        {!user ? (
          <Button
            variant="link"
            className="hover:text-black flex gap-2"
            onClick={() => router.push("/login")}
          >
            <PiSignInBold size={15} />
            Giriş Yap
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="link" onClick={handleProfile} className="hover:bg-slate-200 hover:hover:scale-110 hover:text-black">
              <span className="">{user.firstName} {user.lastName}</span>
            </Button>
            <Button variant="link" className="flex flex-row gap-2 justify-center items-center hover:text-black hover:bg-slate-200 hover:hover:scale-110 " onClick={() => router.push('/basket')}>
              <FaBasketShopping size={14} className=" hover:text-black hover:bg-slate-200 hover:hover:scale-110" />
              <span className="">Sepet</span>
            </Button>
            <Button
              variant="link"
              className=" hover:bg-slate-200 hover:hover:scale-110 hover:text-black"
              onClick={handleLogout}
            >
              Çıkış Yap
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
