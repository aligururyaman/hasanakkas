'use client';
import React, { useEffect } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '../ui/select';
import { CiFilter } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSortOrder } from '@/redux/reducers/productsReducer';

const FilterCategory = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filtreProducts = (value) => {
    dispatch(setSortOrder(value));
  };

  return (
    <div>
      <div className='w-full flex justify-end items-center'>
        <Select onValueChange={filtreProducts}>
          <SelectTrigger className="w-[200px] text-lg">
            <CiFilter size={25} />
            <SelectValue className='text-lg' placeholder="Filtrele" />
          </SelectTrigger>
          <SelectContent className="bg-primary">
            <SelectGroup className='text-3xl'>
              <SelectItem className='text-lg' value="fArtan">Fiyat Artan</SelectItem>
              <SelectSeparator className=" w-full h-0.5 bg-gray-200" />
              <SelectItem className='text-lg' value="fAzalan">Fiyat Azalan</SelectItem>
              <SelectSeparator className="w-full h-0.5 bg-gray-200" />
              <SelectItem className='text-lg' value="alfabetik">Alfabetik</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterCategory;
