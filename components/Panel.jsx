import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddCategory from './panelComp/AddCategory';
import AddProduct from './panelComp/AddProduct';
import UserControl from './panelComp/UserControl';
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
          <SelectTrigger className="w-[180px] bg-gray-100 text-lg">
            <SelectValue placeholder="Yapılacak İşlemi Seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="category">Kategori Oluşturma</SelectItem>
              <SelectItem value="product">Ürün Ekleme</SelectItem>
              <SelectItem value="user">Kullanıcı Kontrolü</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className='flex shadow-inner w-full h-full justify-center border-2 rounded-xl'>
        <div>
          {selectedItem === "category" && <AddCategory />}
          {selectedItem === "product" && <AddProduct />}
          {selectedItem === "user" && <UserControl />}
        </div>
      </div>
    </div>
  );
}

export default Panel;
