import React, { useState } from "react";
import { FaBox } from "react-icons/fa";
import { useQuery, useMutation,useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import ConfirmationPopup from '../ConfirmationPopup'
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../../services/productService";

const AdminProducts = () => {
    const queryClient = useQueryClient();
    const [productModal, setProductModal] = useState({ open: false, mode: "create", data: null });
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, type: "product", id: null });

    const productForm = useForm();

    const { data: productsData, isLoading: productsLoading, error: productsError } = useQuery({
        queryKey: ["products"],
        queryFn: () => getProducts({}),
    });

    const createProductMutation = useMutation({
        mutationFn: (data) => createProduct(data),
        onSuccess: () => {
            toast.success("Product created successfully");
            queryClient.invalidateQueries(["products", "variants"]);
            setProductModal({ open: false, mode: "create", data: null });
            productForm.reset();
        },
        onError: (err) => toast.error(err.message),
    });

    const updateProductMutation = useMutation({
        mutationFn: ({ id, data }) => updateProduct(id, data),
        onSuccess: () => {
            toast.success("Product updated successfully");
            queryClient.invalidateQueries(["products", "variants"]);
            setProductModal({ open: false, mode: "create", data: null });
            productForm.reset();
        },
        onError: (err) => toast.error(err.message),
    });

    const deleteProductMutation = useMutation({
        mutationFn: (id) => deleteProduct(id),
        onSuccess: () => {
            toast.success("Product deleted successfully");
            queryClient.invalidateQueries(["products", "variants"]);
            setDeleteConfirm({ open: false, type: "", id: null });
        },
        onError: (err) => toast.error(err.message),
    });

    const handleDelete = (type, id) => {
        setDeleteConfirm({ open: true, type, id });
    };

    const confirmDelete = () => {
        const { id } = deleteConfirm;
        deleteProductMutation.mutate(id);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Products</h2>
                <button
                    onClick={() => setProductModal({ open: true, mode: "create", data: null })}
                    className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover transition"
                >
                    Add Product
                </button>
            </div>
            {productsLoading ? (
                <p className="text-gray-500">Loading products...</p>
            ) : productsError ? (
                <p className="text-red-500">Error: {productsError.message}</p>
            ) : !productsData?.products?.length ? (
                <div className="text-center py-10 text-gray-500">
                    <p className="text-lg">No products found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="border-b p-3 text-left">Name</th>
                                <th className="border-b p-3 text-left">Description</th>
                                <th className="border-b p-3 text-left">Story</th>
                                <th className="border-b p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsData.products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="border-b p-3">{product.name}</td>
                                    <td className="border-b p-3">{product.description}</td>
                                    <td className="border-b p-3">{product.story}</td>
                                    <td className="border-b p-3 text-center">
                                        <button
                                            onClick={() => setProductModal({ open: true, mode: "update", data: product })}
                                            className="text-primary hover:underline mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete("product", product._id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {productModal.open && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">{productModal.mode === "create" ? "Add Product" : "Edit Product"}</h2>
                        <form
                            onSubmit={productForm.handleSubmit((data) =>
                                productModal.mode === "create"
                                    ? createProductMutation.mutate(data)
                                    : updateProductMutation.mutate({ id: productModal.data._id, data })
                            )}
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    {...productForm.register("name", { required: "Name is required" })}
                                    defaultValue={productModal.data?.name || ""}
                                    className="border border-gray-300 rounded-lg p-2 w-full"
                                />
                                {productForm.formState.errors.name && (
                                    <p className="text-red-500 text-sm">{productForm.formState.errors.name.message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    rows='3'
                                    {...productForm.register("description", { required: "Description is required" })}
                                    defaultValue={productModal.data?.description || ""}
                                    className="border border-gray-300 rounded-lg p-2 w-full resize-none"
                                />
                                {productForm.formState.errors.description && (
                                    <p className="text-red-500 text-sm">{productForm.formState.errors.description.message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Story</label>
                                <textarea
                                    rows='4'
                                    {...productForm.register("story", { required: "Story is required" })}
                                    defaultValue={productModal.data?.story || ""}
                                    className="border border-gray-300 rounded-lg p-2 w-full resize-none"
                                />
                                {productForm.formState.errors.story && (
                                    <p className="text-red-500 text-sm">{productForm.formState.errors.story.message}</p>
                                )}
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setProductModal({ open: false, mode: "create", data: null });
                                        productForm.reset();
                                    }}
                                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createProductMutation.isPending || updateProductMutation.isPending}
                                    className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover transition disabled:opacity-50"
                                >
                                    {createProductMutation.isPending || updateProductMutation.isPending ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
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
                    confirmButtonText={
                        deleteProductMutation.isPending
                            ? "Deleting..."
                            : "Confirm"
                    }
                    confirmButtonDisabled={deleteProductMutation.isPending}
                />
            )}
        </div>
    );
};

export default AdminProducts;