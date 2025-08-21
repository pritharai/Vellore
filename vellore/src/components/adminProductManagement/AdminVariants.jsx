// import React, { useState, useEffect } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { useForm } from "react-hook-form";
// import ConfirmationPopup from "../ConfirmationPopup";
// import Papa from "papaparse";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { getVariants, createVariant, updateVariant, deleteVariant, } from "../../services/variantService";
// import { getColors, } from "../../services/colorService";
// import { getProducts, } from "../../services/productService";
// import { getVariantImages, createVariantImages, updateVariantImages, deleteVariantImages, } from "../../services/variantImageService";

// // Custom debounce hook
// const useDebounce = (value, delay) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);
//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);
//   return debouncedValue;
// };

// const AdminVariants = () => {
//   const queryClient = useQueryClient();
//   const [variantModal, setVariantModal] = useState({ open: false, mode: "create", data: null });
//   const [variantImagesModal, setVariantImagesModal] = useState({ open: false, mode: "create", data: null });
//   const [viewImagesModal, setViewImagesModal] = useState({ open: false, variantId: null });
//   const [deleteConfirm, setDeleteConfirm] = useState({ open: false, type: "", id: null });
//   const [variantFilters, setVariantFilters] = useState({ productId: "", color: "", size: "", minPrice: "", maxPrice: "", search: "" });
//   const [variantPage, setVariantPage] = useState(1);
//   const limit = 10;

//   const variantForm = useForm({ defaultValues: { sizeM: "", sizeL: "", sizeXL: "", sizeXXL: "", price: "", productId: "", colorId: "", images: null } });
//   const variantImagesForm = useForm();

//   const [searchInput, setSearchInput] = useState("");
//   const debouncedSearch = useDebounce(searchInput, 300);

//   useEffect(() => {
//     setVariantFilters((prev) => ({ ...prev, search: debouncedSearch }));
//   }, [debouncedSearch]);

//   const { data: colorsData } = useQuery({ queryKey: ["colors"], queryFn: () => getColors(), });
//   const { data: productsData } = useQuery({ queryKey: ["products"], queryFn: () => getProducts({}), });
//   const { data: variantsData, isLoading: variantsLoading, error: variantsError } = useQuery({ 
//     queryKey: ["variants", variantFilters, variantPage], 
//     queryFn: () => getVariants({ ...variantFilters, limit, page: variantPage }), 
//   });

//   const createVariantMutation = useMutation({
//     mutationFn: (data) => createVariant(data),
//     onSuccess: () => {
//       toast.success("Variant created successfully");
//       queryClient.invalidateQueries(["variants"]);
//       setVariantModal({ open: false, mode: "create", data: null });
//       variantForm.reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   const updateVariantMutation = useMutation({
//     mutationFn: ({ id, data }) => updateVariant(id, data),
//     onSuccess: () => {
//       toast.success("Variant updated successfully");
//       queryClient.invalidateQueries(["variants"]);
//       setVariantModal({ open: false, mode: "create", data: null });
//       variantForm.reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   const deleteVariantMutation = useMutation({
//     mutationFn: (id) => deleteVariant(id),
//     onSuccess: () => {
//       toast.success("Variant deleted successfully");
//       queryClient.invalidateQueries(["variants"]);
//       setDeleteConfirm({ open: false, type: "", id: null });
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   const createVariantImagesMutation = useMutation({
//     mutationFn: (data) => createVariantImages(data),
//     onSuccess: () => {
//       toast.success("Variant images created successfully");
//       queryClient.invalidateQueries(["variantImages"]);
//       setVariantImagesModal({ open: false, mode: "create", data: null });
//       variantImagesForm.reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   const updateVariantImagesMutation = useMutation({
//     mutationFn: ({ id, data }) => updateVariantImages(id, data),
//     onSuccess: () => {
//       toast.success("Variant images updated successfully");
//       queryClient.invalidateQueries(["variantImages"]);
//       setVariantImagesModal({ open: false, mode: "create", data: null });
//       variantImagesForm.reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   const deleteVariantImagesMutation = useMutation({
//     mutationFn: (id) => deleteVariantImages(id),
//     onSuccess: () => {
//       toast.success("Variant images deleted successfully");
//       queryClient.invalidateQueries(["variantImages"]);
//       setDeleteConfirm({ open: false, type: "", id: null });
//       setVariantImagesModal({ open: false, mode: "create", data: null });
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   const downloadCSV = (data, filename) => {
//     const flatData = data.map((variant) => ({
//       "Product Name": variant.product.name,
//       "Color": variant.color.name,
//       "Price": variant.price,
//       "Quantity": JSON.stringify(variant.quantity),
//       "SKU": variant.sku,
//       "Image URL": variant.images?.url || "",
//     }));
//     const csv = Papa.unparse(flatData, { header: true });
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = `${filename}.csv`;
//     link.click();
//   };

//   const handleDelete = (type, id) => {
//     setDeleteConfirm({ open: true, type, id });
//   };

//   const confirmDelete = () => {
//     const { type, id } = deleteConfirm;
//     if (type === "variant") deleteVariantMutation.mutate(id);
//     else if (type === "variantImages") deleteVariantImagesMutation.mutate(id);
//   };

//   const handleOpenVariantModal = (mode, data) => {
//     setVariantModal({ open: true, mode, data });
//     if (mode === "update") {
//       variantForm.reset({
//         price: data.price,
//         sizeM: data.quantity.M || 0,
//         sizeL: data.quantity.L || 0,
//         sizeXL: data.quantity.XL || 0,
//         sizeXXL: data.quantity.XXL || 0,
//         images: null,
//       });
//     } else {
//       variantForm.reset();
//     }
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 mb-8">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
//         <h2 className="text-xl md:text-2xl font-bold">Variants</h2>
//         <div className="flex flex-col md:flex-row gap-2 md:gap-3 w-full md:w-auto">
//           <select
//             value={variantFilters.productId}
//             onChange={(e) => setVariantFilters((prev) => ({ ...prev, productId: e.target.value }))}
//             className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full max-w-[200px] md:max-w-[160px] text-xs md:text-sm"
//           >
//             <option value="">All Products</option>
//             {productsData?.products?.map((product) => (
//               <option key={product._id} value={product._id}>{product.name}</option>
//             ))}
//           </select>
//           <select
//             value={variantFilters.color}
//             onChange={(e) => setVariantFilters((prev) => ({ ...prev, color: e.target.value }))}
//             className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full max-w-[200px] md:max-w-[160px] text-xs md:text-sm"
//           >
//             <option value="">All Colors</option>
//             {colorsData?.map((color) => (
//               <option key={color._id} value={color.name}>{color.name}</option>
//             ))}
//           </select>
//           <input
//             type="text"
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//             placeholder="Search..."
//             className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full max-w-[200px] md:max-w-[160px] text-xs md:text-sm"
//           />
//           <button
//             onClick={() => handleOpenVariantModal("create", null)}
//             className="bg-primary text-white px-2 md:px-3 py-1 md:py-1.5 rounded hover:bg-primary-hover transition w-full max-w-[200px] md:max-w-[120px] text-xs md:text-sm"
//           >
//             Add Variant
//           </button>
//           <button
//             onClick={() => downloadCSV(variantsData?.variants || [], "variants")}
//             className="bg-primary text-white px-2 md:px-3 py-1 md:py-1.5 rounded hover:bg-primary-hover transition w-full max-w-[200px] md:max-w-[120px] text-xs md:text-sm"
//           >
//             Download CSV
//           </button>
//         </div>
//       </div>
//       {variantsLoading ? (
//         <p className="text-gray-500 text-center text-sm md:text-base">Loading variants...</p>
//       ) : variantsError ? (
//         <p className="text-red-500 text-center text-sm md:text-base">Error: {variantsError.message}</p>
//       ) : !variantsData?.variants?.length ? (
//         <div className="text-center py-10 text-gray-500">
//           <p className="text-base md:text-lg">No variants found.</p>
//         </div>
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse text-xs md:text-sm">
//               <thead>
//                 <tr className="bg-gray-100 text-gray-700">
//                   <th className="border-b p-1.5 md:p-2 text-left min-w-[60px]">Image</th>
//                   <th className="border-b p-1.5 md:p-2 text-left min-w-[100px]">Product</th>
//                   <th className="border-b p-1.5 md:p-2 text-left min-w-[80px]">Color</th>
//                   <th className="border-b p-1.5 md:p-2 text-right min-w-[80px]">Price</th>
//                   <th className="border-b p-1.5 md:p-2 text-left min-w-[120px]">Quantity</th>
//                   <th className="border-b p-1.5 md:p-2 text-center min-w-[100px]">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {variantsData.variants.map((variant) => (
//                   <tr key={variant._id} className="hover:bg-gray-50 transition-colors duration-150">
//                     <td className="border-b p-1.5 md:p-2">
//                       {variant.image?.url ? (
//                         <img src={variant.image.url} alt={variant.product.name} className="h-6 w-6 md:h-8 md:w-8 object-cover rounded" />
//                       ) : (
//                         <span className="text-gray-500">No image</span>
//                       )}
//                     </td>
//                     <td className="border-b p-1.5 md:p-2">{variant.product.name}</td>
//                     <td className="border-b p-1.5 md:p-2">{variant.color.name}</td>
//                     <td className="border-b p-1.5 md:p-2 text-right">₹{variant.price.toLocaleString("en-IN")}</td>
//                     <td className="border-b p-1.5 md:p-2">{Object.entries(variant.quantity).map(([size, stock]) => `${size}: ${stock}`).join(", ")}</td>
//                     <td className="border-b p-1.5 md:p-2 text-center">
//                       <button
//                         onClick={() => handleOpenVariantModal("update", variant)}
//                         className="text-primary hover:underline mr-1 md:mr-2 text-xs md:text-sm"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete("variant", variant._id)}
//                         className="text-red-500 hover:underline mr-1 md:mr-2 text-xs md:text-sm"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           {variantsData.totalPages > 1 && (
//             <div className="flex justify-center gap-2 mt-4">
//               {[...Array(variantsData.totalPages)].map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setVariantPage(i + 1)}
//                   className={`px-2 py-1 md:px-3 md:py-1 rounded text-xs md:text-sm ${variantPage === i + 1 ? "bg-primary text-white" : "bg-gray-200"}`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//       {variantModal.open && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-[90vw] md:max-w-md">
//             <h2 className="text-lg md:text-xl font-bold mb-4">{variantModal.mode === "create" ? "Add Variant" : "Edit Variant"}</h2>
//             <form
//               onSubmit={variantForm.handleSubmit((data) => {
//                 const formData = new FormData();
//                 if (variantModal.mode === "create") {
//                   formData.append("productId", data.productId);
//                   formData.append("colorId", data.colorId);
//                   const quantity = {
//                     M: Number(data.sizeM) || 0,
//                     L: Number(data.sizeL) || 0,
//                     XL: Number(data.sizeXL) || 0,
//                     XXL: Number(data.sizeXXL) || 0,
//                   };
//                   formData.append("quantity", JSON.stringify(quantity));
//                   formData.append("price", data.price);
//                   if (data.images) formData.append("image", data.images[0]);
//                   createVariantMutation.mutate(formData);
//                 } else {
//                   const quantity = {
//                     M: Number(data.sizeM) || 0,
//                     L: Number(data.sizeL) || 0,
//                     XL: Number(data.sizeXL) || 0,
//                     XXL: Number(data.sizeXXL) || 0,
//                   };
//                   formData.append("quantity", JSON.stringify(quantity));
//                   formData.append("price", data.price);
//                   if (data.images) formData.append("image", data.images[0]);
//                   updateVariantMutation.mutate({ id: variantModal.data._id, data: formData });
//                 }
//               })}
//             >
//               {variantModal.mode === "create" ? (
//                 <>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-xs md:text-sm">Product</label>
//                     <select
//                       {...variantForm.register("productId", { required: "Product is required" })}
//                       className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full text-xs md:text-sm"
//                     >
//                       <option value="">Select Product</option>
//                       {productsData?.products?.map((product) => (
//                         <option key={product._id} value={product._id}>{product.name}</option>
//                       ))}
//                     </select>
//                     {variantForm.formState.errors.productId && (
//                       <p className="text-red-500 text-xs">{variantForm.formState.errors.productId.message}</p>
//                     )}
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-xs md:text-sm">Color</label>
//                     <select
//                       {...variantForm.register("colorId", { required: "Color is required" })}
//                       className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full text-xs md:text-sm"
//                     >
//                       <option value="">Select Color</option>
//                       {colorsData?.map((color) => (
//                         <option key={color._id} value={color._id}>{color.name}</option>
//                       ))}
//                     </select>
//                     {variantForm.formState.errors.colorId && (
//                       <p className="text-red-500 text-xs">{variantForm.formState.errors.colorId.message}</p>
//                     )}
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-xs md:text-sm">Product</label>
//                     <input
//                       type="text"
//                       value={variantModal.data?.product.name || ""}
//                       disabled
//                       className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full opacity-50 text-xs md:text-sm"
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-xs md:text-sm">Color</label>
//                     <input
//                       type="text"
//                       value={variantModal.data?.color.name || ""}
//                       disabled
//                       className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full opacity-50 text-xs md:text-sm"
//                     />
//                   </div>
//                 </>
//               )}
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs md:text-sm">Quantity</label>
//                 <div className="grid grid-cols-2 gap-2 md:gap-4">
//                   {["M", "L", "XL", "XXL"].map((size) => (
//                     <div key={size}>
//                       <label className="block text-gray-700 text-xs md:text-sm">Size {size}</label>
//                       <input
//                         type="number"
//                         {...variantForm.register(`size${size}`, {
//                           valueAsNumber: true,
//                           min: { value: 0, message: `Size ${size} quantity must be non-negative` },
//                         })}
//                         className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full text-xs md:text-sm"
//                       />
//                       {variantForm.formState.errors[`size${size}`] && (
//                         <p className="text-red-500 text-xs">{variantForm.formState.errors[`size${size}`].message}</p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs md:text-sm">Price</label>
//                 <input
//                   type="number"
//                   {...variantForm.register("price", { required: "Price is required", min: { value: 0, message: "Price must be non-negative" } })}
//                   className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full text-xs md:text-sm"
//                 />
//                 {variantForm.formState.errors.price && (
//                   <p className="text-red-500 text-xs">{variantForm.formState.errors.price.message}</p>
//                 )}
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs md:text-sm">Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   {...variantForm.register("images", { required: variantModal.mode === "create" ? "Image is required" : false })}
//                   className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full text-xs md:text-sm"
//                 />
//                 {variantForm.formState.errors.images && (
//                   <p className="text-red-500 text-xs">{variantForm.formState.errors.images.message}</p>
//                 )}
//               </div>
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setVariantModal({ open: false, mode: "create", data: null });
//                     variantForm.reset();
//                   }}
//                   className="bg-gray-300 text-gray-700 px-2 md:px-3 py-1 md:py-1.5 rounded hover:bg-gray-400 transition text-xs md:text-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={createVariantMutation.isPending || updateVariantMutation.isPending}
//                   className="bg-primary text-white px-2 md:px-3 py-1 md:py-1.5 rounded hover:bg-primary-hover transition disabled:opacity-50 text-xs md:text-sm"
//                 >
//                   {createVariantMutation.isPending || updateVariantMutation.isPending ? "Saving..." : "Save"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       {variantImagesModal.open && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-[90vw] md:max-w-md">
//             <h2 className="text-lg md:text-xl font-bold mb-4">{variantImagesModal.mode === "create" ? "Add Variant Images" : "Edit Variant Images"}</h2>
//             <form
//               onSubmit={variantImagesForm.handleSubmit((data) => {
//                 const formData = new FormData();
//                 formData.append("variantId", data.variantId);
//                 for (const file of data.images) {
//                   formData.append("images", file);
//                 }
//                 if (variantImagesModal.mode === "create") {
//                   createVariantImagesMutation.mutate(formData);
//                 } else {
//                   updateVariantImagesMutation.mutate({ id: variantImagesModal.data._id, data: formData });
//                 }
//               })}
//             >
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs md:text-sm">Variant</label>
//                 <input
//                   type="text"
//                   value={variantsData?.variants?.find((v) => v._id === variantImagesModal.data?.variantId)?.product.name || ""}
//                   disabled
//                   className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full opacity-50 text-xs md:text-sm"
//                 />
//                 <input type="hidden" {...variantImagesForm.register("variantId")} defaultValue={variantImagesModal.data?.variantId || ""} />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs md:text-sm">Images</label>
//                 <input
//                   type="file"
//                   multiple
//                   {...variantImagesForm.register("images", { required: "At least one image is required" })}
//                   className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full text-xs md:text-sm"
//                 />
//                 {variantImagesForm.formState.errors.images && (
//                   <p className="text-red-500 text-xs">{variantImagesForm.formState.errors.images.message}</p>
//                 )}
//               </div>
//               <div className="flex flex-col md:flex-row justify-between gap-2">
//                 <button
//                   type="button"
//                   onClick={async () => {
//                     const images = await getVariantImages({ variantId: variantImagesModal.data?.variantId });
//                     if (images?.images?.length) {
//                       handleDelete("variantImages", images._id);
//                     }
//                   }}
//                   disabled={!(variantImagesModal.data?._id)}
//                   className="bg-red-500 text-white px-2 md:px-3 py-1 md:py-1.5 rounded hover:bg-red-600 transition disabled:opacity-50 text-xs md:text-sm"
//                 >
//                   Delete All Images
//                 </button>
//                 <div className="flex gap-2">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setVariantImagesModal({ open: false, mode: "create", data: null });
//                       variantImagesForm.reset();
//                     }}
//                     className="bg-gray-300 text-gray-700 px-2 md:px-3 py-1 md:py-1.5 rounded hover:bg-gray-400 transition text-xs md:text-sm"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={createVariantImagesMutation.isPending || updateVariantImagesMutation.isPending}
//                     className="bg-primary text-white px-2 md:px-3 py-1 md:py-1.5 rounded hover:bg-primary-hover transition disabled:opacity-50 text-xs md:text-sm"
//                   >
//                     {createVariantImagesMutation.isPending || updateVariantImagesMutation.isPending ? "Saving..." : "Save"}
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       {viewImagesModal.open && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-[90vw] md:max-w-md">
//             <h2 className="text-lg md:text-xl font-bold mb-4">Variant Images</h2>
//             <VariantImages variantId={viewImagesModal.variantId} />
//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={() => setViewImagesModal({ open: false, variantId: null })}
//                 className="bg-gray-300 text-gray-700 px-2 md:px-3 py-1 md:py-1.5 rounded hover:bg-gray-400 transition text-xs md:text-sm"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {deleteConfirm.open && (
//         <ConfirmationPopup
//           isOpen={deleteConfirm.open}
//           title={`Delete ${deleteConfirm.type.charAt(0).toUpperCase() + deleteConfirm.type.slice(1)}`}
//           message={`Are you sure you want to delete this ${deleteConfirm.type}?`}
//           onConfirm={confirmDelete}
//           onCancel={() => setDeleteConfirm({ open: false, type: "", id: null })}
//           confirmButtonText={deleteVariantMutation.isPending || deleteVariantImagesMutation.isPending ? "Deleting..." : "Confirm"}
//           confirmButtonDisabled={deleteVariantMutation.isPending || deleteVariantImagesMutation.isPending}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminVariants;


import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import ConfirmationPopup from "../ConfirmationPopup";
import Papa from "papaparse";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getVariants, createVariant, updateVariant, deleteVariant } from "../../services/variantService";
import { getColors } from "../../services/colorService";
import { getProducts } from "../../services/productService";
import { getVariantImages, createVariantImages, updateVariantImages, deleteVariantImages } from "../../services/variantImageService";

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const AdminVariants = () => {
  const queryClient = useQueryClient();
  const [variantModal, setVariantModal] = useState({ open: false, mode: "create", data: null });
  const [variantImagesModal, setVariantImagesModal] = useState({ open: false, mode: "create", data: null });
  const [viewImagesModal, setViewImagesModal] = useState({ open: false, variantId: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, type: "", id: null });
  const [variantFilters, setVariantFilters] = useState({ productId: "", color: "", size: "", minPrice: "", maxPrice: "", search: "" });
  const [variantPage, setVariantPage] = useState(1);
  const limit = 10;

  const defaultFormValues = {
    sizeM: "",
    sizeL: "",
    sizeXL: "",
    sizeXXL: "",
    price: "",
    productId: "",
    colorId: "",
    images: null,
  };

  const variantForm = useForm({ defaultValues: defaultFormValues });
  const variantImagesForm = useForm();

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    setVariantFilters((prev) => ({ ...prev, search: debouncedSearch }));
  }, [debouncedSearch]);

  const { data: colorsData } = useQuery({ queryKey: ["colors"], queryFn: () => getColors() });
  const { data: productsData } = useQuery({ queryKey: ["products"], queryFn: () => getProducts({}) });
  const { data: variantsData, isLoading: variantsLoading, error: variantsError } = useQuery({
    queryKey: ["variants", variantFilters, variantPage],
    queryFn: () => getVariants({ ...variantFilters, limit, page: variantPage }),
  });

  const createVariantMutation = useMutation({
    mutationFn: (data) => createVariant(data),
    onSuccess: () => {
      toast.success("Variant created successfully");
      queryClient.invalidateQueries(["variants"]);
      variantForm.reset(defaultFormValues); // Reset form with default values
      setVariantModal({ open: false, mode: "create", data: null });
    },
    onError: (err) => toast.error(err.message),
  });

  const updateVariantMutation = useMutation({
    mutationFn: ({ id, data }) => updateVariant(id, data),
    onSuccess: () => {
      toast.success("Variant updated successfully");
      queryClient.invalidateQueries(["variants"]);
      variantForm.reset(defaultFormValues); // Reset form with default values
      setVariantModal({ open: false, mode: "create", data: null });
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteVariantMutation = useMutation({
    mutationFn: (id) => deleteVariant(id),
    onSuccess: () => {
      toast.success("Variant deleted successfully");
      queryClient.invalidateQueries(["variants"]);
      setDeleteConfirm({ open: false, type: "", id: null });
    },
    onError: (err) => toast.error(err.message),
  });

  const createVariantImagesMutation = useMutation({
    mutationFn: (data) => createVariantImages(data),
    onSuccess: () => {
      toast.success("Variant images created successfully");
      queryClient.invalidateQueries(["variantImages"]);
      variantImagesForm.reset(); // Reset variant images form
      setVariantImagesModal({ open: false, mode: "create", data: null });
    },
    onError: (err) => toast.error(err.message),
  });

  const updateVariantImagesMutation = useMutation({
    mutationFn: ({ id, data }) => updateVariantImages(id, data),
    onSuccess: () => {
      toast.success("Variant images updated successfully");
      queryClient.invalidateQueries(["variantImages"]);
      variantImagesForm.reset(); // Reset variant images form
      setVariantImagesModal({ open: false, mode: "create", data: null });
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteVariantImagesMutation = useMutation({
    mutationFn: (id) => deleteVariantImages(id),
    onSuccess: () => {
      toast.success("Variant images deleted successfully");
      queryClient.invalidateQueries(["variantImages"]);
      setDeleteConfirm({ open: false, type: "", id: null });
      setVariantImagesModal({ open: false, mode: "create", data: null });
    },
    onError: (err) => toast.error(err.message),
  });

  const downloadCSV = (data, filename) => {
    const flatData = data.map((variant) => ({
      "Product Name": variant.product.name,
      "Color": variant.color.name,
      "Price": variant.price,
      "Quantity": JSON.stringify(variant.quantity),
      "SKU": variant.sku,
      "Image URL": variant.images?.url || "",
    }));
    const csv = Papa.unparse(flatData, { header: true });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
  };

  const handleDelete = (type, id) => {
    setDeleteConfirm({ open: true, type, id });
  };

  const confirmDelete = () => {
    const { type, id } = deleteConfirm;
    if (type === "variant") deleteVariantMutation.mutate(id);
    else if (type === "variantImages") deleteVariantImagesMutation.mutate(id);
  };

  const handleOpenVariantModal = (mode, data) => {
    setVariantModal({ open: true, mode, data });
    if (mode === "update") {
      variantForm.reset({
        price: data.price,
        sizeM: data.quantity.M || 0,
        sizeL: data.quantity.L || 0,
        sizeXL: data.quantity.XL || 0,
        sizeXXL: data.quantity.XXL || 0,
        images: null,
      });
    } else {
      variantForm.reset(defaultFormValues); // Explicitly reset to default values
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-xl md:text-2xl font-bold">Variants</h2>
        <div className="flex flex-col md:flex-row gap-2 md:gap-3 w-full md:w-auto">
          <select
            value={variantFilters.productId}
            onChange={(e) => setVariantFilters((prev) => ({ ...prev, productId: e.target.value }))}
            className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full max-w-[200px] md:max-w-[160px] text-xs md:text-sm"
          >
            <option value="">All Products</option>
            {productsData?.products?.map((product) => (
              <option key={product._id} value={product._id}>{product.name}</option>
            ))}
          </select>
          <select
            value={variantFilters.color}
            onChange={(e) => setVariantFilters((prev) => ({ ...prev, color: e.target.value }))}
            className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full max-w-[200px] md:max-w-[160px] text-xs md:text-sm"
          >
            <option value="">All Colors</option>
            {colorsData?.map((color) => (
              <option key={color._id} value={color.name}>{color.name}</option>
            ))}
          </select>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search..."
            className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full max-w-[200px] md:max-w-[160px] text-xs md:text-sm"
          />
          <button
            onClick={() => handleOpenVariantModal("create", null)}
            className="bg-primary text-white px-2 md:px-3 py-1 md:py-1.5 rounded hover:bg-primary-hover transition w-full max-w-[200px] md:max-w-[120px] text-xs md:text-sm"
          >
            Add Variant
          </button>
          <button
            onClick={() => downloadCSV(variantsData?.variants || [], "variants")}
            className="bg-primary text-white px-2 md:px-3 py-1 md:py-1.5 rounded hover:bg-primary-hover transition w-full max-w-[200px] md:max-w-[120px] text-xs md:text-sm"
          >
            Download CSV
          </button>
        </div>
      </div>
      {variantsLoading ? (
        <p className="text-gray-500 text-center text-sm md:text-base">Loading variants...</p>
      ) : variantsError ? (
        <p className="text-red-500 text-center text-sm md:text-base">Error: {variantsError.message}</p>
      ) : !variantsData?.variants?.length ? (
        <div className="text-center py-10 text-gray-500">
          <p className="text-base md:text-lg">No variants found.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border-b p-1.5 md:p-2 text-left min-w-[60px]">Image</th>
                  <th className="border-b p-1.5 md:p-2 text-left min-w-[100px]">Product</th>
                  <th className="border-b p-1.5 md:p-2 text-left min-w-[80px]">Color</th>
                  <th className="border-b p-1.5 md:p-2 text-right min-w-[80px]">Price</th>
                  <th className="border-b p-1.5 md:p-2 text-left min-w-[120px]">Quantity</th>
                  <th className="border-b p-1.5 md:p-2 text-center min-w-[100px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {variantsData.variants.map((variant) => (
                  <tr key={variant._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="border-b p-1.5 md:p-2">
                      {variant.image?.url ? (
                        <img src={variant.image.url} alt={variant.product.name} className="h-6 w-6 md:h-8 md:w-8 object-cover rounded" />
                      ) : (
                        <span className="text-gray-500">No image</span>
                      )}
                    </td>
                    <td className="border-b p-1.5 md:p-2">{variant.product.name}</td>
                    <td className="border-b p-1.5 md:p-2">{variant.color.name}</td>
                    <td className="border-b p-1.5 md:p-2 text-right">₹{variant.price.toLocaleString("en-IN")}</td>
                    <td className="border-b p-1.5 md:p-2">{Object.entries(variant.quantity).map(([size, stock]) => `${size}: ${stock}`).join(", ")}</td>
                    <td className="border-b p-1.5 md:p-2 text-center">
                      <button
                        onClick={() => handleOpenVariantModal("update", variant)}
                        className="text-primary hover:underline mr-1 md:mr-2 text-xs md:text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete("variant", variant._id)}
                        className="text-red-500 hover:underline mr-1 md:mr-2 text-xs md:text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {variantsData.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {[...Array(variantsData.totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setVariantPage(i + 1)}
                  className={`px-2 py-1 md:px-3 md:py-1 rounded text-xs md:text-sm ${variantPage === i + 1 ? "bg-primary text-white" : "bg-gray-200"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
      {variantModal.open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-[90vw] md:max-w-md">
            <h2 className="text-lg md:text-xl font-bold mb-4">{variantModal.mode === "create" ? "Add Variant" : "Edit Variant"}</h2>
            <form
              onSubmit={variantForm.handleSubmit((data) => {
                const formData = new FormData();
                if (variantModal.mode === "create") {
                  formData.append("productId", data.productId);
                  formData.append("colorId", data.colorId);
                  const quantity = {
                    M: Number(data.sizeM) || 0,
                    L: Number(data.sizeL) || 0,
                    XL: Number(data.sizeXL) || 0,
                    XXL: Number(data.sizeXXL) || 0,
                  };
                  formData.append("quantity", JSON.stringify(quantity));
                  formData.append("price", data.price);
                  if (data.images) formData.append("image", data.images[0]);
                  createVariantMutation.mutate(formData);
                } else {
                  const quantity = {
                    M: Number(data.sizeM) || 0,
                    L: Number(data.sizeL) || 0,
                    XL: Number(data.sizeXL) || 0,
                    XXL: Number(data.sizeXXL) || 0,
                  };
                  formData.append("quantity", JSON.stringify(quantity));
                  formData.append("price", data.price);
                  if (data.images) formData.append("image", data.images[0]);
                  updateVariantMutation.mutate({ id: variantModal.data._id, data: formData });
                }
              })}
            >
              {variantModal.mode === "create" ? (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-xs md:text-sm">Product</label>
                    <select
                      {...variantForm.register("productId", { required: "Product is required" })}
                      className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full text-xs md:text-sm"
                    >
                      <option value="">Select Product</option>
                      {productsData?.products?.map((product) => (
                        <option key={product._id} value={product._id}>{product.name}</option>
                      ))}
                    </select>
                    {variantForm.formState.errors.productId && (
                      <p className="text-red-500 text-xs">{variantForm.formState.errors.productId.message}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-xs md:text-sm">Color</label>
                    <select
                      {...variantForm.register("colorId", { required: "Color is required" })}
                      className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full text-xs md:text-sm"
                    >
                      <option value="">Select Color</option>
                      {colorsData?.map((color) => (
                        <option key={color._id} value={color._id}>{color.name}</option>
                      ))}
                    </select>
                    {variantForm.formState.errors.colorId && (
                      <p className="text-red-500 text-xs">{variantForm.formState.errors.colorId.message}</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-xs md:text-sm">Product</label>
                    <input
                      type="text"
                      value={variantModal.data?.product.name || ""}
                      disabled
                      className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full opacity-50 text-xs md:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-xs md:text-sm">Color</label>
                    <input
                      type="text"
                      value={variantModal.data?.color.name || ""}
                      disabled
                      className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full opacity-50 text-xs md:text-sm"
                    />
                  </div>
                </>
              )}
              <div className="mb-4">
                <label className="block text-gray-700 text-xs md:text-sm">Quantity</label>
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  {["M", "L", "XL", "XXL"].map((size) => (
                    <div key={size}>
                      <label className="block text-gray-700 text-xs md:text-sm">Size {size}</label>
                      <input
                        type="number"
                        {...variantForm.register(`size${size}`, {
                          valueAsNumber: true,
                          min: { value: 0, message: `Size ${size} quantity must be non-negative` },
                        })}
                        className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full text-xs md:text-sm"
                      />
                      {variantForm.formState.errors[`size${size}`] && (
                        <p className="text-red-500 text-xs">{variantForm.formState.errors[`size${size}`].message}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-xs md:text-sm">Price</label>
                <input
                  type="number"
                  {...variantForm.register("price", { required: "Price is required", min: { value: 0, message: "Price must be non-negative" } })}
                  className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full text-xs md:text-sm"
                />
                {variantForm.formState.errors.price && (
                  <p className="text-red-500 text-xs">{variantForm.formState.errors.price.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-xs md:text-sm">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  {...variantForm.register("images", { required: variantModal.mode === "create" ? "Image is required" : false })}
                  className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full text-xs md:text-sm"
                />
                {variantForm.formState.errors.images && (
                  <p className="text-red-500 text-xs">{variantForm.formState.errors.images.message}</p>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    variantForm.reset(defaultFormValues); // Reset form with default values
                    setVariantModal({ open: false, mode: "create", data: null });
                  }}
                  className="bg-gray-300 text-gray-700 px-2 md:px-3 py-1 md:py-1.5 rounded hover:bg-gray-400 transition text-xs md:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createVariantMutation.isPending || updateVariantMutation.isPending}
                  className="bg-primary text-white px-2 md:px-3 py-1 md:py-1.5 rounded hover:bg-primary-hover transition disabled:opacity-50 text-xs md:text-sm"
                >
                  {createVariantMutation.isPending || updateVariantMutation.isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {variantImagesModal.open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-[90vw] md:max-w-md">
            <h2 className="text-lg md:text-xl font-bold mb-4">{variantImagesModal.mode === "create" ? "Add Variant Images" : "Edit Variant Images"}</h2>
            <form
              onSubmit={variantImagesForm.handleSubmit((data) => {
                const formData = new FormData();
                formData.append("variantId", data.variantId);
                for (const file of data.images) {
                  formData.append("images", file);
                }
                if (variantImagesModal.mode === "create") {
                  createVariantImagesMutation.mutate(formData);
                } else {
                  updateVariantImagesMutation.mutate({ id: variantImagesModal.data._id, data: formData });
                }
              })}
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-xs md:text-sm">Variant</label>
                <input
                  type="text"
                  value={variantsData?.variants?.find((v) => v._id === variantImagesModal.data?.variantId)?.product.name || ""}
                  disabled
                  className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full opacity-50 text-xs md:text-sm"
                />
                <input type="hidden" {...variantImagesForm.register("variantId")} defaultValue={variantImagesModal.data?.variantId || ""} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-xs md:text-sm">Images</label>
                <input
                  type="file"
                  multiple
                  {...variantImagesForm.register("images", { required: "At least one image is required" })}
                  className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full text-xs md:text-sm"
                />
                {variantImagesForm.formState.errors.images && (
                  <p className="text-red-500 text-xs">{variantImagesForm.formState.errors.images.message}</p>
                )}
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    const images = await getVariantImages({ variantId: variantImagesModal.data?.variantId });
                    if (images?.images?.length) {
                      handleDelete("variantImages", images._id);
                    }
                  }}
                  disabled={!(variantImagesModal.data?._id)}
                  className="bg-red-500 text-white px-2 md:px-3 py-1 md:py-1.5 rounded hover:bg-red-600 transition disabled:opacity-50 text-xs md:text-sm"
                >
                  Delete All Images
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      variantImagesForm.reset(); // Reset variant images form
                      setVariantImagesModal({ open: false, mode: "create", data: null });
                    }}
                    className="bg-gray-300 text-gray-700 px-2 md:px-3 py-1 md:py-1.5 rounded hover:bg-gray-400 transition text-xs md:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createVariantImagesMutation.isPending || updateVariantImagesMutation.isPending}
                    className="bg-primary text-white px-2 md:px-3 py-1 md:py-1.5 rounded hover:bg-primary-hover transition disabled:opacity-50 text-xs md:text-sm"
                  >
                    {createVariantImagesMutation.isPending || updateVariantImagesMutation.isPending ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {viewImagesModal.open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-[90vw] md:max-w-md">
            <h2 className="text-lg md:text-xl font-bold mb-4">Variant Images</h2>
            <VariantImages variantId={viewImagesModal.variantId} />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setViewImagesModal({ open: false, variantId: null })}
                className="bg-gray-300 text-gray-700 px-2 md:px-3 py-1 md:py-1.5 rounded hover:bg-gray-400 transition text-xs md:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteConfirm.open && (
        <ConfirmationPopup
          isOpen={deleteConfirm.open}
          title={`Delete ${deleteConfirm.type.charAt(0).toUpperCase() + deleteConfirm.type.slice(1)}`}
          message={`Are you sure you want to delete this ${deleteConfirm.type}?`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirm({ open: false, type: "", id: null })}
          confirmButtonText={deleteVariantMutation.isPending || deleteVariantImagesMutation.isPending ? "Deleting..." : "Confirm"}
          confirmButtonDisabled={deleteVariantMutation.isPending || deleteVariantImagesMutation.isPending}
        />
      )}
    </div>
  );
};

export default AdminVariants;