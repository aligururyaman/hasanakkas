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

const ListItem = React.forwardRef(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            href={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

function Nav() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { categories } = useSelector((state) => state.categories);
  const { other } = useSelector((state) => state.other);
  const { user } = useSelector((state) => state.user);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchOther());
    setIsUserLoaded(true);
  }, [dispatch]);

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
  };

  // Kullanıcı durumu yüklenene kadar boş bir render yap
  if (!isUserLoaded) {
    return null;
  }

  return (
    <div className="flex justify-between">
      <div className="flex relative z-30">
        <div className="flex flex-row gap-2">
          {categories.map((category) => (
            <Button
              variant="link"
              className="text-black"
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <div className="flex flex-row justify-center relative z-30">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-black items-center justify-center">
                  Diğer Ürünler
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[100px] p-4 md:w-[200px] md:grid-cols-2 lg:w-[300px] bg-primary">
                    {other &&
                      other.map((others) => (
                        <ListItem
                          key={others._id}
                          title={others.name}
                          href={`/category/${others._id}`}
                        />
                      ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="flex relative z-30 items-center gap-10">
        {!user ? (
          <Button
            variant="link"
            className="text-black flex gap-2"
            onClick={() => router.push("/login")}
          >
            <PiSignInBold size={15} />
            Giriş Yap
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="link" onClick={handleProfile}>
              <span className="text-black">{user.firstName}</span>

              <span className="text-black">{user.lastName}</span>
            </Button>
            <Button variant="link" className="flex flex-row gap-2 justify-center items-center" onClick={() => router.push('/basket')}>
              <FaBasketShopping size={14} className="text-black" />
              <span className="text-black">Sepet</span>
            </Button>
            <Button
              variant="link"
              className="text-black"
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
