// import React, { useState } from "react";
// import { FaPaintRoller, FaBox, FaTshirt, FaImages } from "react-icons/fa";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { useForm } from "react-hook-form";
// import ConfirmationPopup from "../components/ConfirmationPopup";
// import Papa from "papaparse";
// import {
//     getColors,
//     createColor,
//     updateColor,
//     deleteColor,
// } from "../services/colorService";
// import {
//     getProducts,
//     createProduct,
//     updateProduct,
//     deleteProduct,
// } from "../services/productService";
// import {
//     getVariants,
//     createVariant,
//     updateVariant,
//     deleteVariant,
// } from "../services/variantService";
// import {
//     getVariantImages,
//     createVariantImages,
//     updateVariantImages,
//     deleteVariantImages,
// } from "../services/variantImageService";

// const ProductManagement = () => {
//     const queryClient = useQueryClient();
//     const [colorModal, setColorModal] = useState({ open: false, mode: "create", data: null });
//     const [productModal, setProductModal] = useState({ open: false, mode: "create", data: null });
//     const [variantModal, setVariantModal] = useState({ open: false, mode: "create", data: null });
//     const [variantImagesModal, setVariantImagesModal] = useState({ open: false, mode: "create", data: null });
//     const [deleteConfirm, setDeleteConfirm] = useState({ open: false, type: "", id: null });
//     const [variantFilters, setVariantFilters] = useState({ productId: "", color: "", size: "", minPrice: "", maxPrice: "", search: "" });
//     const [variantPage, setVariantPage] = useState(1);
//     const limit = 10;

//     const colorForm = useForm();
//     const productForm = useForm();
//     const variantForm = useForm({
//         defaultValues: { sizeM: "", sizeL: "", sizeXL: "", sizeXXL: "", price: "", productId: "", colorId: "", image: null }
//     });
//     const variantImagesForm = useForm();

//     const { data: colorsData, isLoading: colorsLoading, error: colorsError } = useQuery({
//         queryKey: ["colors"],
//         queryFn: () => getColors(),
//     });

//     const { data: productsData, isLoading: productsLoading, error: productsError } = useQuery({
//         queryKey: ["products"],
//         queryFn: () => getProducts({}),
//     });

//     const { data: variantsData, isLoading: variantsLoading, error: variantsError } = useQuery({
//         queryKey: ["variants", variantFilters, variantPage],
//         queryFn: () => getVariants({ ...variantFilters, limit, page: variantPage }),
//     });

//     const createColorMutation = useMutation({
//         mutationFn: (data) => createColor(data),
//         onSuccess: () => {
//             toast.success("Color created successfully");
//             queryClient.invalidateQueries(["colors"]);
//             setColorModal({ open: false, mode: "create", data: null });
//             colorForm.reset();
//         },
//         onError: (err) => toast.error(err.message),
//     });

//     const updateColorMutation = useMutation({
//         mutationFn: (data) => updateColor(data.id, data),
//         onSuccess: () => {
//             toast.success("Color updated successfully");
//             queryClient.invalidateQueries(["colors"]);
//             setColorModal({ open: false, mode: "create", data: null });
//             colorForm.reset();
//         },
//         onError: (err) => toast.error(err.message),
//     });

//     const deleteColorMutation = useMutation({
//         mutationFn: (id) => deleteColor(id),
//         onSuccess: () => {
//             toast.success("Color deleted successfully");
//             queryClient.invalidateQueries(["colors"]);
//             setDeleteConfirm({ open: false, type: "", id: null });
//         },
//         onError: (err) => toast.error(err.message),
//     });

//     const createProductMutation = useMutation({
//         mutationFn: (data) => createProduct(data),
//         onSuccess: () => {
//             toast.success("Product created successfully");
//             queryClient.invalidateQueries(["products", "variants"]);
//             setProductModal({ open: false, mode: "create", data: null });
//             productForm.reset();
//         },
//         onError: (err) => toast.error(err.message),
//     });

//     const updateProductMutation = useMutation({
//         mutationFn: (data) => updateProduct(data.id, data),
//         onSuccess: () => {
//             toast.success("Product updated successfully");
//             queryClient.invalidateQueries(["products", "variants"]);
//             setProductModal({ open: false, mode: "create", data: null });
//             productForm.reset();
//         },
//         onError: (err) => toast.error(err.message),
//     });

//     const deleteProductMutation = useMutation({
//         mutationFn: (id) => deleteProduct(id),
//         onSuccess: () => {
//             toast.success("Product deleted successfully");
//             queryClient.invalidateQueries(["products", "variants"]);
//             setDeleteConfirm({ open: false, type: "", id: null });
//         },
//         onError: (err) => toast.error(err.message),
//     });

//     const createVariantMutation = useMutation({
//         mutationFn: (data) => createVariant(data),
//         onSuccess: () => {
//             toast.success("Variant created successfully");
//             queryClient.invalidateQueries(["variants"]);
//             setVariantModal({ open: false, mode: "create", data: null });
//             variantForm.reset();
//         },
//         onError: (err) => toast.error(err.message),
//     });

//     const updateVariantMutation = useMutation({
//         mutationFn: (data) => updateVariant(data.id, data),
//         onSuccess: () => {
//             toast.success("Variant updated successfully");
//             queryClient.invalidateQueries(["variants"]);
//             setVariantModal({ open: false, mode: "create", data: null });
//             variantForm.reset();
//         },
//         onError: (err) => toast.error(err.message),
//     });

//     const deleteVariantMutation = useMutation({
//         mutationFn: (id) => deleteVariant(id),
//         onSuccess: () => {
//             toast.success("Variant deleted successfully");
//             queryClient.invalidateQueries(["variants"]);
//             setDeleteConfirm({ open: false, type: "", id: null });
//         },
//         onError: (err) => toast.error(err.message),
//     });

//     const createVariantImagesMutation = useMutation({
//         mutationFn: (data) => createVariantImages(data),
//         onSuccess: () => {
//             toast.success("Variant images created successfully");
//             queryClient.invalidateQueries(["variantImages"]);
//             setVariantImagesModal({ open: false, mode: "create", data: null });
//             variantImagesForm.reset();
//         },
//         onError: (err) => toast.error(err.message),
//     });

//     const updateVariantImagesMutation = useMutation({
//         mutationFn: (data) => updateVariantImages(data.id, data),
//         onSuccess: () => {
//             toast.success("Variant images updated successfully");
//             queryClient.invalidateQueries(["variantImages"]);
//             setVariantImagesModal({ open: false, mode: "create", data: null });
//             variantImagesForm.reset();
//         },
//         onError: (err) => toast.error(err.message),
//     });

//     const deleteVariantImagesMutation = useMutation({
//         mutationFn: (id) => deleteVariantImages(id),
//         onSuccess: () => {
//             toast.success("Variant images deleted successfully");
//             queryClient.invalidateQueries(["variantImages"]);
//             setDeleteConfirm({ open: false, type: "", id: null });
//         },
//         onError: (err) => toast.error(err.message),
//     });

//     const downloadCSV = (data, filename) => {
//         const flatData = data.map((variant) => ({
//             "Product Name": variant.product.name,
//             "Color": variant.color.name,
//             "Price": variant.price,
//             "Quantity": JSON.stringify(variant.quantity),
//             "SKU": variant.sku,
//             "Image URL": variant.image.url,
//         }));
//         const csv = Papa.unparse(flatData, { header: true });
//         const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//         const link = document.createElement("a");
//         link.href = URL.createObjectURL(blob);
//         link.download = `${filename}.csv`;
//         link.click();
//     };

//     const handleDelete = (type, id) => {
//         setDeleteConfirm({ open: true, type, id });
//     };

//     const confirmDelete = () => {
//         const { type, id } = deleteConfirm;
//         if (type === "color") deleteColorMutation.mutate(id);
//         else if (type === "product") deleteProductMutation.mutate(id);
//         else if (type === "variant") deleteVariantMutation.mutate(id);
//         else if (type === "variantImages") deleteVariantImagesMutation.mutate(id);
//     };

//     const openVariantImagesModal = async (variantId) => {
//         try {
//             const variantImages = await getVariantImages({ variantId });
//             if (variantImages?.images?.length > 0) {
//                 setVariantImagesModal({ open: true, mode: "update", data: { variantId, _id: variantImages._id } });
//             } else {
//                 setVariantImagesModal({ open: true, mode: "create", data: { variantId } });
//             }
//         } catch (err) {
//             toast.error(err.message);
//         }
//     };

//     return (
//         <div className="min-h-screen mt-30 p-6 py-24">
//             <header className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold text-primary">Product Management</h1>
//             </header>

//             {/* Colors */}
//             <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-2xl font-bold">Colors</h2>
//                     <button
//                         onClick={() => setColorModal({ open: true, mode: "create", data: null })}
//                         className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover transition"
//                     >
//                         Add Color
//                     </button>
//                 </div>
//                 {colorsLoading ? (
//                     <p className="text-gray-500">Loading colors...</p>
//                 ) : colorsError ? (
//                     <p className="text-red-500">Error: {colorsError.message}</p>
//                 ) : !colorsData?.length ? (
//                     <div className="text-center py-10 text-gray-500">
//                         <p className="text-lg">No colors found.</p>
//                     </div>
//                 ) : (
//                     <div className="overflow-x-auto">
//                         <table className="w-full border-collapse">
//                             <thead>
//                                 <tr className="bg-gray-100 text-gray-700">
//                                     <th className="border-b p-3 text-left">Name</th>
//                                     <th className="border-b p-3 text-left">Hex</th>
//                                     <th className="border-b p-3 text-center">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {colorsData.map((color) => (
//                                     <tr key={color._id} className="hover:bg-gray-50 transition-colors duration-150">
//                                         <td className="border-b p-3">{color.name}</td>
//                                         <td className="border-b p-3">
//                                             <div className="flex items-center">
//                                                 <div
//                                                     className="w-6 h-6 rounded-full mr-2"
//                                                     style={{ backgroundColor: color.hex }}
//                                                 ></div>
//                                                 {color.hex}
//                                             </div>
//                                         </td>
//                                         <td className="border-b p-3 text-center">
//                                             <button
//                                                 onClick={() => setColorModal({ open: true, mode: "update", data: color })}
//                                                 className="text-primary hover:underline mr-2"
//                                             >
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 onClick={() => handleDelete("color", color._id)}
//                                                 className="text-red-500 hover:underline"
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>

//             <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-2xl font-bold">Products</h2>
//                     <button
//                         onClick={() => setProductModal({ open: true, mode: "create", data: null })}
//                         className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover transition"
//                     >
//                         Add Product
//                     </button>
//                 </div>
//                 {productsLoading ? (
//                     <p className="text-gray-500">Loading products...</p>
//                 ) : productsError ? (
//                     <p className="text-red-500">Error: {productsError.message}</p>
//                 ) : !productsData?.products?.length ? (
//                     <div className="text-center py-10 text-gray-500">
//                         <p className="text-lg">No products found.</p>
//                     </div>
//                 ) : (
//                     <div className="overflow-x-auto">
//                         <table className="w-full border-collapse">
//                             <thead>
//                                 <tr className="bg-gray-100 text-gray-700">
//                                     <th className="border-b p-3 text-left">Name</th>
//                                     <th className="border-b p-3 text-left">Description</th>
//                                     <th className="border-b p-3 text-left">Story</th>
//                                     <th className="border-b p-3 text-center">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {productsData.products.map((product) => (
//                                     <tr key={product._id} className="hover:bg-gray-50 transition-colors duration-150">
//                                         <td className="border-b p-3">{product.name}</td>
//                                         <td className="border-b p-3">{product.description}</td>
//                                         <td className="border-b p-3">{product.story}</td>
//                                         <td className="border-b p-3 text-center">
//                                             <button
//                                                 onClick={() => setProductModal({ open: true, mode: "update", data: product })}
//                                                 className="text-primary hover:underline mr-2"
//                                             >
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 onClick={() => handleDelete("product", product._id)}
//                                                 className="text-red-500 hover:underline"
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>

//             <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-2xl font-bold">Variants</h2>
//                     <div className="flex gap-4">
//                         <select
//                             value={variantFilters.productId}
//                             onChange={(e) => setVariantFilters((prev) => ({ ...prev, productId: e.target.value }))}
//                             className="border border-gray-300 rounded-lg p-2"
//                         >
//                             <option value="">All Products</option>
//                             {productsData?.products?.map((product) => (
//                                 <option key={product._id} value={product._id}>{product.name}</option>
//                             ))}
//                         </select>
//                         <select
//                             value={variantFilters.color}
//                             onChange={(e) => setVariantFilters((prev) => ({ ...prev, color: e.target.value }))}
//                             className="border border-gray-300 rounded-lg p-2"
//                         >
//                             <option value="">All Colors</option>
//                             {colorsData?.map((color) => (
//                                 <option key={color._id} value={color.name}>{color.name}</option>
//                             ))}
//                         </select>
//                         <input
//                             type="text"
//                             value={variantFilters.search}
//                             onChange={(e) => setVariantFilters((prev) => ({ ...prev, search: e.target.value }))}
//                             placeholder="Search..."
//                             className="border border-gray-300 rounded-lg p-2"
//                         />
//                         <button
//                             onClick={() => setVariantModal({ open: true, mode: "create", data: null })}
//                             className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover transition"
//                         >
//                             Add Variant
//                         </button>
//                         <button
//                             onClick={() => downloadCSV(variantsData?.variants || [], "variants")}
//                             className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover transition"
//                         >
//                             Download CSV
//                         </button>
//                     </div>
//                 </div>
//                 {variantsLoading ? (
//                     <p className="text-gray-500">Loading variants...</p>
//                 ) : variantsError ? (
//                     <p className="text-red-500">Error: {variantsError.message}</p>
//                 ) : !variantsData?.variants?.length ? (
//                     <div className="text-center py-10 text-gray-500">
//                         <p className="text-lg">No variants found.</p>
//                     </div>
//                 ) : (
//                     <>
//                         <div className="overflow-x-auto">
//                             <table className="w-full border-collapse">
//                                 <thead>
//                                     <tr className="bg-gray-100 text-gray-700">
//                                         <th className="border-b p-3 text-left">Image</th>
//                                         <th className="border-b p-3 text-left">Product</th>
//                                         <th className="border-b p-3 text-left">Color</th>
//                                         <th className="border-b p-3 text-right">Price</th>
//                                         <th className="border-b p-3 text-left">Quantity</th>
//                                         <th className="border-b p-3 text-left">SKU</th>
//                                         <th className="border-b p-3 text-center">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {variantsData.variants.map((variant) => (
//                                         <tr key={variant._id} className="hover:bg-gray-50 transition-colors duration-150">
//                                             <td className="border-b p-3">
//                                                 <img src={variant.image.url} alt={variant.product.name} className="h-10 w-10 object-cover rounded" />
//                                             </td>
//                                             <td className="border-b p-3">{variant.product.name}</td>
//                                             <td className="border-b p-3">{variant.color.name}</td>
//                                             <td className="border-b p-3 text-right">₹{variant.price.toLocaleString("en-IN")}</td>
//                                             <td className="border-b p-3">{Object.entries(variant.quantity).map(([size, stock]) => `${size}: ${stock}`).join(", ")}</td>
//                                             <td className="border-b p-3">{variant.sku}</td>
//                                             <td className="border-b p-3 text-center">
//                                                 <button
//                                                     onClick={() => setVariantModal({ open: true, mode: "update", data: variant })}
//                                                     className="text-primary hover:underline mr-2"
//                                                 >
//                                                     Edit
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleDelete("variant", variant._id)}
//                                                     className="text-red-500 hover:underline mr-2"
//                                                 >
//                                                     Delete
//                                                 </button>
//                                                 <button
//                                                     onClick={() => openVariantImagesModal(variant._id)}
//                                                     className="text-primary hover:underline"
//                                                 >
//                                                     Add/Edit Images
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                         {variantsData.totalPages > 1 && (
//                             <div className="flex justify-center gap-2 mt-4">
//                                 {[...Array(variantsData.totalPages)].map((_, i) => (
//                                     <button
//                                         key={i}
//                                         onClick={() => setVariantPage(i + 1)}
//                                         className={`px-3 py-1 rounded ${variantPage === i + 1 ? "bg-primary text-white" : "bg-gray-200"}`}
//                                     >
//                                         {i + 1}
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>

//             <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-2xl font-bold">Variant Images</h2>
//                 </div>
//                 {variantsLoading ? (
//                     <p className="text-gray-500">Loading variants...</p>
//                 ) : variantsError ? (
//                     <p className="text-red-500">Error: {variantsError.message}</p>
//                 ) : !variantsData?.variants?.length ? (
//                     <div className="text-center py-10 text-gray-500">
//                         <p className="text-lg">No variants found.</p>
//                     </div>
//                 ) : (
//                     <div className="overflow-x-auto">
//                         <table className="w-full border-collapse">
//                             <thead>
//                                 <tr className="bg-gray-100 text-gray-700">
//                                     <th className="border-b p-3 text-left">Variant</th>
//                                     <th className="border-b p-3 text-left">Images</th>
//                                     <th className="border-b p-3 text-center">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {variantsData.variants.map((variant) => (
//                                     <tr key={variant._id} className="hover:bg-gray-50 transition-colors duration-150">
//                                         <td className="border-b p-3">{variant.product.name} - {variant.color.name}</td>
//                                         <td className="border-b p-3">
//                                             <VariantImages variantId={variant._id} />
//                                         </td>
//                                         <td className="border-b p-3 text-center">
//                                             <button
//                                                 onClick={() => openVariantImagesModal(variant._id)}
//                                                 className="text-primary hover:underline mr-2"
//                                             >
//                                                 Add/Edit Images
//                                             </button>
//                                             <button
//                                                 onClick={async () => {
//                                                     const images = await getVariantImages({ variantId: variant._id });
//                                                     if (images?.images?.length) {
//                                                         handleDelete("variantImages", images._id);
//                                                     }
//                                                 }}
//                                                 disabled={!(variantsData.variants.find((v) => v._id === variant._id)?.images?.length)}
//                                                 className="text-red-500 hover:underline disabled:opacity-50"
//                                             >
//                                                 Delete Images
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>

//             {colorModal.open && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg p-6 w-full max-w-md">
//                         <h2 className="text-xl font-bold mb-4">{colorModal.mode === "create" ? "Add Color" : "Edit Color"}</h2>
//                         <form
//                             onSubmit={colorForm.handleSubmit((data) =>
//                                 colorModal.mode === "create"
//                                     ? createColorMutation.mutate(data)
//                                     : updateColorMutation.mutate({ id: colorModal.data._id, data })
//                             )}
//                         >
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Name</label>
//                                 <input
//                                     {...colorForm.register("name", { required: "Name is required" })}
//                                     defaultValue={colorModal.data?.name || ""}
//                                     className="border border-gray-300 rounded-lg p-2 w-full"
//                                 />
//                                 {colorForm.formState.errors.name && (
//                                     <p className="text-red-500 text-sm">{colorForm.formState.errors.name.message}</p>
//                                 )}
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Hex Code</label>
//                                 <input
//                                     {...colorForm.register("hex", { required: "Hex code is required" })}
//                                     defaultValue={colorModal.data?.hex || ""}
//                                     className="border border-gray-300 rounded-lg p-2 w-full"
//                                 />
//                                 {colorForm.formState.errors.hex && (
//                                     <p className="text-red-500 text-sm">{colorForm.formState.errors.hex.message}</p>
//                                 )}
//                             </div>
//                             <div className="flex justify-end gap-2">
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         setColorModal({ open: false, mode: "create", data: null });
//                                         colorForm.reset();
//                                     }}
//                                     className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     disabled={createColorMutation.isPending || updateColorMutation.isPending}
//                                     className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover transition disabled:opacity-50"
//                                 >
//                                     {createColorMutation.isPending || updateColorMutation.isPending ? "Saving..." : "Save"}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {productModal.open && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg p-6 w-full max-w-md">
//                         <h2 className="text-xl font-bold mb-4">{productModal.mode === "create" ? "Add Product" : "Edit Product"}</h2>
//                         <form
//                             onSubmit={productForm.handleSubmit((data) =>
//                                 productModal.mode === "create"
//                                     ? createProductMutation.mutate(data)
//                                     : updateProductMutation.mutate({ id: productModal.data._id, data })
//                             )}
//                         >
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Name</label>
//                                 <input
//                                     {...productForm.register("name", { required: "Name is required" })}
//                                     defaultValue={productModal.data?.name || ""}
//                                     className="border border-gray-300 rounded-lg p-2 w-full"
//                                 />
//                                 {productForm.formState.errors.name && (
//                                     <p className="text-red-500 text-sm">{productForm.formState.errors.name.message}</p>
//                                 )}
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Description</label>
//                                 <textarea
//                                     rows='3'
//                                     {...productForm.register("description", { required: "Description is required" })}
//                                     defaultValue={productModal.data?.description || ""}
//                                     className="border border-gray-300 rounded-lg p-2 w-full resize-none"
//                                 />
//                                 {productForm.formState.errors.description && (
//                                     <p className="text-red-500 text-sm">{productForm.formState.errors.description.message}</p>
//                                 )}
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Story</label>
//                                 <textarea
//                                     rows='4'
//                                     {...productForm.register("story", { required: "Story is required" })}
//                                     defaultValue={productModal.data?.story || ""}
//                                     className="border border-gray-300 rounded-lg p-2 w-full resize-none"
//                                 />
//                                 {productForm.formState.errors.story && (
//                                     <p className="text-red-500 text-sm">{productForm.formState.errors.story.message}</p>
//                                 )}
//                             </div>
//                             <div className="flex justify-end gap-2">
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         setProductModal({ open: false, mode: "create", data: null });
//                                         productForm.reset();
//                                     }}
//                                     className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     disabled={createProductMutation.isPending || updateProductMutation.isPending}
//                                     className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover transition disabled:opacity-50"
//                                 >
//                                     {createProductMutation.isPending || updateProductMutation.isPending ? "Saving..." : "Save"}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {variantModal.open && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg p-6 w-full max-w-md">
//                         <h2 className="text-xl font-bold mb-4">{variantModal.mode === "create" ? "Add Variant" : "Edit Variant"}</h2>
//                         <form
//                             onSubmit={variantForm.handleSubmit((data) => {
//                                 const formData = new FormData();
//                                 formData.append("productId", data.productId);
//                                 formData.append("colorId", data.colorId);
//                                 const quantity = {
//                                     M: Number(data.sizeM) || 0,
//                                     L: Number(data.sizeL) || 0,
//                                     XL: Number(data.sizeXL) || 0,
//                                     XXL: Number(data.sizeXXL) || 0,
//                                 };
//                                 formData.append("quantity", JSON.stringify(quantity));
//                                 formData.append("price", data.price);
//                                 if (data.image) formData.append("image", data.image[0]);
//                                 if (variantModal.mode === "create") {
//                                     createVariantMutation.mutate(formData);
//                                 } else {
//                                     updateVariantMutation.mutate({ id: variantModal.data._id, data: formData });
//                                 }
//                             })}
//                         >
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Product</label>
//                                 <select
//                                     {...variantForm.register("productId", { required: "Product is required" })}
//                                     defaultValue={variantModal.data?.product._id || ""}
//                                     className="border border-gray-300 rounded-lg p-2 w-full"
//                                 >
//                                     <option value="">Select Product</option>
//                                     {productsData?.products?.map((product) => (
//                                         <option key={product._id} value={product._id}>{product.name}</option>
//                                     ))}
//                                 </select>
//                                 {variantForm.formState.errors.productId && (
//                                     <p className="text-red-500 text-sm">{variantForm.formState.errors.productId.message}</p>
//                                 )}
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Color</label>
//                                 <select
//                                     {...variantForm.register("colorId", { required: "Color is required" })}
//                                     defaultValue={variantModal.data?.color._id || ""}
//                                     className="border border-gray-300 rounded-lg p-2 w-full"
//                                 >
//                                     <option value="">Select Color</option>
//                                     {colorsData?.map((color) => (
//                                         <option key={color._id} value={color._id}>{color.name}</option>
//                                     ))}
//                                 </select>
//                                 {variantForm.formState.errors.colorId && (
//                                     <p className="text-red-500 text-sm">{variantForm.formState.errors.colorId.message}</p>
//                                 )}
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Quantity</label>
//                                 <div className="grid grid-cols-2 gap-4">
//                                     {["M", "L", "XL", "XXL"].map((size) => (
//                                         <div key={size}>
//                                             <label className="block text-gray-700">Size {size}</label>
//                                             <input
//                                                 type="number"
//                                                 {...variantForm.register(`size${size}`, {
//                                                     valueAsNumber: true,
//                                                     min: { value: 0, message: `Size ${size} quantity must be non-negative` },
//                                                 })}
//                                                 defaultValue={variantModal.data?.quantity[size] || ""}
//                                                 className="border border-gray-300 rounded-lg p-2 w-full"
//                                             />
//                                             {variantForm.formState.errors[`size${size}`] && (
//                                                 <p className="text-red-500 text-sm">{variantForm.formState.errors[`size${size}`].message}</p>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Price</label>
//                                 <input
//                                     type="number"
//                                     {...variantForm.register("price", { required: "Price is required", min: { value: 0, message: "Price must be non-negative" } })}
//                                     defaultValue={variantModal.data?.price || ""}
//                                     className="border border-gray-300 rounded-lg p-2 w-full"
//                                 />
//                                 {variantForm.formState.errors.price && (
//                                     <p className="text-red-500 text-sm">{variantForm.formState.errors.price.message}</p>
//                                 )}
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Image</label>
//                                 <input
//                                     type="file"
//                                     {...variantForm.register("image", { required: variantModal.mode === "create" ? "Image is required" : false })}
//                                     className="border border-gray-300 rounded-lg p-2 w-full"
//                                 />
//                                 {variantForm.formState.errors.image && (
//                                     <p className="text-red-500 text-sm">{variantForm.formState.errors.image.message}</p>
//                                 )}
//                             </div>
//                             <div className="flex justify-end gap-2">
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         setVariantModal({ open: false, mode: "create", data: null });
//                                         variantForm.reset();
//                                     }}
//                                     className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     disabled={createVariantMutation.isPending || updateVariantMutation.isPending}
//                                     className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover transition disabled:opacity-50"
//                                 >
//                                     {createVariantMutation.isPending || updateVariantMutation.isPending ? "Saving..." : "Save"}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {variantImagesModal.open && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg p-6 w-full max-w-md">
//                         <h2 className="text-xl font-bold mb-4">{variantImagesModal.mode === "create" ? "Add Variant Images" : "Edit Variant Images"}</h2>
//                         <form
//                             onSubmit={variantImagesForm.handleSubmit((data) => {
//                                 const formData = new FormData();
//                                 formData.append("variantId", data.variantId);
//                                 for (const file of data.images) {
//                                     formData.append("images", file);
//                                 }
//                                 if (variantImagesModal.mode === "create") {
//                                     createVariantImagesMutation.mutate(formData);
//                                 } else {
//                                     updateVariantImagesMutation.mutate({ id: variantImagesModal.data._id, data: formData });
//                                 }
//                             })}
//                         >
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Variant</label>
//                                 <input
//                                     type="text"
//                                     value={variantsData?.variants?.find((v) => v._id === variantImagesModal.data?.variantId)?.product.name || ""}
//                                     disabled
//                                     className="border border-gray-300 rounded-lg p-2 w-full opacity-50"
//                                 />
//                                 <input
//                                     type="hidden"
//                                     {...variantImagesForm.register("variantId")}
//                                     defaultValue={variantImagesModal.data?.variantId || ""}
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Images</label>
//                                 <input
//                                     type="file"
//                                     multiple
//                                     {...variantImagesForm.register("images", { required: "At least one image is required" })}
//                                     className="border border-gray-300 rounded-lg p-2 w-full"
//                                 />
//                                 {variantImagesForm.formState.errors.images && (
//                                     <p className="text-red-500 text-sm">{variantImagesForm.formState.errors.images.message}</p>
//                                 )}
//                             </div>
//                             <div className="flex justify-end gap-2">
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         setVariantImagesModal({ open: false, mode: "create", data: null });
//                                         variantImagesForm.reset();
//                                     }}
//                                     className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     disabled={createVariantImagesMutation.isPending || updateVariantImagesMutation.isPending}
//                                     className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover transition disabled:opacity-50"
//                                 >
//                                     {createVariantImagesMutation.isPending || updateVariantImagesMutation.isPending ? "Saving..." : "Save"}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {deleteConfirm.open && (
//                 <ConfirmationPopup
//                     isOpen={deleteConfirm.open}
//                     title={`Delete ${deleteConfirm.type.charAt(0).toUpperCase() + deleteConfirm.type.slice(1)}`}
//                     message={`Are you sure you want to delete this ${deleteConfirm.type}?`}
//                     onConfirm={confirmDelete}
//                     onCancel={() => setDeleteConfirm({ open: false, type: "", id: null })}
//                     confirmButtonText={
//                         deleteColorMutation.isPending ||
//                         deleteProductMutation.isPending ||
//                         deleteVariantMutation.isPending ||
//                         deleteVariantImagesMutation.isPending
//                             ? "Deleting..."
//                             : "Confirm"
//                     }
//                     confirmButtonDisabled={
//                         deleteColorMutation.isPending ||
//                         deleteProductMutation.isPending ||
//                         deleteVariantMutation.isPending ||
//                         deleteVariantImagesMutation.isPending
//                     }
//                 />
//             )}
//         </div>
//     );
// };

// const VariantImages = ({ variantId }) => {
//     const { data: variantImagesData, isLoading, error } = useQuery({
//         queryKey: ["variantImages", variantId],
//         queryFn: () => getVariantImages({ variantId }),
//     });

//     if (isLoading) return <p className="text-gray-500">Loading images...</p>;
//     if (error) return <p className="text-red-500">Error: {error.message}</p>;
//     if (!variantImagesData?.images?.length) return <p className="text-gray-500">No images</p>;

//     return (
//         <div className="flex items-center gap-2">
//             {variantImagesData.images.map((image, index) => (
//                 <img
//                     key={index}
//                     src={image.url}
//                     alt={`Variant Image ${index + 1}`}
//                     className="h-10 w-10 object-cover rounded"
//                 />
//             ))}
//         </div>
//     );
// };

// export default ProductManagement;

import React from 'react'
import AdminColors from './adminProductManagement/AdminColors'
import AdminProducts from './adminProductManagement/AdminProducts'
import AdminVariants from './adminProductManagement/AdminVariants'

const ProductManagement = () => {
  return (
    <div className='md:mt-45'>
        <AdminColors/>
        <AdminProducts/>
        <AdminVariants/>
    </div>
  )
}

export default ProductManagement