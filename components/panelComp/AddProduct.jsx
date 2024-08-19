"use client";
import { fetchCategories } from "@/redux/reducers/categoryReducer";
import { addProduct, fetchProducts, updateProduct, deleteProduct } from "@/redux/reducers/productsReducer";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);

    try {
      await dispatch(addProduct(formData)).unwrap();
      resetForm();
      Swal.fire({
        icon: 'success',
        title: 'Product Added!',
        text: 'The product has been successfully added.',
        timer: 1000,
        timerProgressBar: true,
        allowOutsideClick: false,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire({
        icon: 'error',
        title: 'Kaydedilemedi',
        text: 'Bir hata oluştu. Lütfen tekrar kontrol edin.',
        confirmButtonText: 'Tamam',
        allowOutsideClick: false,
      });
    }
  };


  const handleEditProduct = (product) => {
    setName(product.name);
    setPrice(product.price);
    setQuantity(product.quantity);
    setDescription(product.description);
    setCategory(product.category._id);
    setIsEditing(true);
    setSelectedProductId(product._id);
  };

  const handleUpdateProduct = async () => {
    const formData = new FormData();
    formData.append("id", selectedProductId);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);

    try {
      await dispatch(updateProduct({ productId: selectedProductId, productData: formData })).unwrap();
      resetForm();
      Swal.fire({
        icon: 'success',
        title: 'Ürün Kaydedildi',
        text: 'Sorunsuz bir şekilde kaydedildi',
        timer: 1000,
        timerProgressBar: true,
        allowOutsideClick: false,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        icon: 'error',
        title: 'Kaydedilemedi',
        text: 'Bir hata oluştu. Lütfen tekrar kontrol edin.',
        confirmButtonText: 'Tamam',
        allowOutsideClick: false,
      });
    }
  };

  const handleDeleteProduct = async (productId) => {

    try {
      await dispatch(deleteProduct(productId)).unwrap();
      Swal.fire({
        icon: 'success',
        title: 'Product Deleted!',
        text: 'The product has been successfully deleted.',
        timer: 1000,
        timerProgressBar: true,
        allowOutsideClick: false,
      });
    } catch (error) {
      console.error("Error deleting product:", error);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
      });
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setCategory("");
    setImage(null);
    setIsEditing(false);
    setSelectedProductId(null);
  };

  return (
    <div className="container p-4 text-black">
      <h1 className="text-2xl font-bold mb-4 text-white">Ürünlers</h1>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-white">
            {isEditing ? "Ürün Düzenle" : "Ürün Ekle"}
          </h2>
          <input
            type="text"
            placeholder="Ürün Adı"
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Fiyatı"
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Stok Sayısı"
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <textarea
            placeholder="Açıklama"
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
          >
            <option value="">Kategori Seç</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>

            ))}
          </select>
          <input
            type="file"
            className="mb-2 text-white"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="flex justify-end items-center">
            {isEditing ? (
              <button
                onClick={handleUpdateProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded-md w-full md:w-auto"
              >
                Ürün Güncelle
              </button>
            ) : (
              <button
                onClick={handleAddProduct}
                className="bg-green-500 text-white px-4 py-2 rounded-md w-full md:w-auto"
              >
                Ürün Ekle
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="text-white">
        <h2 className="text-xl font-bold mb-2">Ürün Listesi</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="text-[.9vmax]">
            <tr>
              <th className="border border-gray-300 px-[.4vmax] py-2">Ürün Adı</th>
              <th className="border border-gray-300 px-[.4vmax] py-2">Fiyat</th>
              <th className="border border-gray-300 px-[.4vmax] py-2">Stok</th>
              <th className="border border-gray-300 px-[.4vmax] py-2">Açıklama</th>
              <th className="border border-gray-300 px-[.4vmax] py-2">Kategori</th>
              <th className="border border-gray-300 px-[.4vmax] py-2">Resim</th>
              <th className="border border-gray-300 px-[.4vmax] py-2">Komutlar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="text-[.9vmax]">
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  {product.name}
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  {product.price}
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  {product.quantity}
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  {product.description}
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  {product.category.name}
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  <img
                    src={product.imageUrl}
                    className="h-16 w-16 object-cover"
                    alt="Product"
                  />
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-blue-500 mt-1 text-white px-[.5vmax] py-1 rounded-md"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-red-500 text-white mt-1 px-[.5vmax] py-1 rounded-md"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddProduct;