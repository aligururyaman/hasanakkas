import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddCategory from './AddCategory';
import AddProduct from './AddProduct';
import UserControl from './UserControl';
import Orders from './Orders';
import { Label } from '@radix-ui/react-label';

function Panel() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectChange = (value) => {
    setSelectedItem(value);
  };

  return (
    <div className=''>
      <div className='flex flex-col my-5 gap-2'>
        <Label className='font-bold text-xl'>İşlem Seçin</Label>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px] bg-background text-lg">
            <SelectValue placeholder="Yapılacak İşlemi Seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className='bg-background'>
              <SelectItem className='text-xl' value="category">Kategori Oluşturma</SelectItem>
              <SelectItem className='text-xl' value="product">Ürün Ekleme</SelectItem>
              <SelectItem className='text-xl' value="user">Kullanıcı Kontrolü</SelectItem>
              <SelectItem className='text-xl' value="order">Siparişleri Görüntüleme</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <div>
          {selectedItem === "category" && <AddCategory />}
          {selectedItem === "product" && <AddProduct />}
          {selectedItem === "user" && <UserControl />}
          {selectedItem === "order" && <Orders />}
        </div>
      </div>
    </div>
  );
}

export default Panel;
