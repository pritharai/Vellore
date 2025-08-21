import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import ConfirmationPopup from "../ConfirmationPopup";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
    getVariants,
} from "../../services/variantService";
import {
    getVariantImages,
    createVariantImages,
    updateVariantImages,
    deleteVariantImages,
} from "../../services/variantImageService";

const AdminVariantImages = () => {
    const queryClient = useQueryClient();
    const [variantImagesModal, setVariantImagesModal] = useState({ open: false, mode: "create", data: null });
    const [viewImagesModal, setViewImagesModal] = useState({ open: false, variantId: null });
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, type: "variantImages", id: null });

    const variantImagesForm = useForm();

    const { data: variantsData, isLoading: variantsLoading, error: variantsError } = useQuery({
        queryKey: ["variants"],
        queryFn: () => getVariants({}),
    });

    const createVariantImagesMutation = useMutation({
        mutationFn: (data) => createVariantImages(data),
        onSuccess: () => {
            toast.success("Variant images created successfully");
            queryClient.invalidateQueries(["variantImages"]);
            setVariantImagesModal({ open: false, mode: "create", data: null });
            variantImagesForm.reset();
        },
        onError: (err) => toast.error(err.message),
    });

    const updateVariantImagesMutation = useMutation({
        mutationFn: ({ id, data }) => updateVariantImages(id, data),
        onSuccess: () => {
            toast.success("Variant images updated successfully");
            queryClient.invalidateQueries(["variantImages"]);
            setVariantImagesModal({ open: false, mode: "create", data: null });
            variantImagesForm.reset();
        },
        onError: (err) => toast.error(err.message),
    });

    const deleteVariantImagesMutation = useMutation({
        mutationFn: (id) => deleteVariantImages(id),
        onSuccess: () => {
            toast.success("Variant images deleted successfully");
            queryClient.invalidateQueries(["variantImages"]);
            setDeleteConfirm({ open: false, type: "", id: null });
        },
        onError: (err) => toast.error(err.message),
    });

    const handleDelete = (type, id) => {
        setDeleteConfirm({ open: true, type, id });
    };

    const confirmDelete = () => {
        const { id } = deleteConfirm;
        deleteVariantImagesMutation.mutate(id);
    };

    const openVariantImagesModal = async (variantId) => {
        try {
            const variantImages = await getVariantImages({ variantId });
            if (variantImages?.images?.length > 0) {
                setVariantImagesModal({ open: true, mode: "update", data: { variantId, _id: variantImages._id } });
            } else {
                setVariantImagesModal({ open: true, mode: "create", data: { variantId } });
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    const openViewImagesModal = (variantId) => {
        setViewImagesModal({ open: true, variantId });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Variant Images</h2>
            </div>
            {variantsLoading ? (
                <p className="text-gray-500">Loading variants...</p>
            ) : variantsError ? (
                <p className="text-red-500">Error: {variantsError.message}</p>
            ) : !variantsData?.variants?.length ? (
                <div className="text-center py-10 text-gray-500">
                    <p className="text-lg">No variants found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="border-b p-3 text-left">Variant</th>
                                <th className="border-b p-3 text-left">Images Count</th>
                                <th className="border-b p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {variantsData.variants.map((variant) => (
                                <tr key={variant._id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="border-b p-3">{variant.product.name} - {variant.color.name}</td>
                                    <td className="border-b p-3">{variant.images?.length || 0}</td>
                                    <td className="border-b p-3 text-center">
                                        <button
                                            onClick={() => openViewImagesModal(variant._id)}
                                            className="text-primary hover:underline mr-2"
                                        >
                                            View Images
                                        </button>
                                        <button
                                            onClick={() => openVariantImagesModal(variant._id)}
                                            className="text-primary hover:underline mr-2"
                                        >
                                            Add/Edit Images
                                        </button>
                                        <button
                                            onClick={async () => {
                                                const images = await getVariantImages({ variantId: variant._id });
                                                if (images?.images?.length) {
                                                    handleDelete("variantImages", images._id);
                                                }
                                            }}
                                            disabled={!(variant.images?.length)}
                                            className="text-red-500 hover:underline disabled:opacity-50"
                                        >
                                            Delete Images
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {variantImagesModal.open && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">{variantImagesModal.mode === "create" ? "Add Variant Images" : "Edit Variant Images"}</h2>
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
                                <label className="block text-gray-700">Variant</label>
                                <input
                                    type="text"
                                    value={variantsData?.variants?.find((v) => v._id === variantImagesModal.data?.variantId)?.product.name || ""}
                                    disabled
                                    className="border border-gray-300 rounded-lg p-2 w-full opacity-50"
                                />
                                <input
                                    type="hidden"
                                    {...variantImagesForm.register("variantId")}
                                    defaultValue={variantImagesModal.data?.variantId || ""}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Images</label>
                                <input
                                    type="file"
                                    multiple
                                    {...variantImagesForm.register("images", { required: "At least one image is required" })}
                                    className="border border-gray-300 rounded-lg p-2 w-full"
                                />
                                {variantImagesForm.formState.errors.images && (
                                    <p className="text-red-500 text-sm">{variantImagesForm.formState.errors.images.message}</p>
                                )}
                            </div>
                            <div className="flex justify-between gap-2">
                                <button
                                    type="button"
                                    onClick={async () => {
                                        const images = await getVariantImages({ variantId: variantImagesModal.data?.variantId });
                                        if (images?.images?.length) {
                                            handleDelete("variantImages", images._id);
                                        }
                                    }}
                                    disabled={!(variantImagesModal.data?._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition disabled:opacity-50"
                                >
                                    Delete All Images
                                </button>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setVariantImagesModal({ open: false, mode: "create", data: null });
                                            variantImagesForm.reset();
                                        }}
                                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={createVariantImagesMutation.isPending || updateVariantImagesMutation.isPending}
                                        className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover transition disabled:opacity-50"
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
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Variant Images</h2>
                        <VariantImages variantId={viewImagesModal.variantId} />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setViewImagesModal({ open: false, variantId: null })}
                                className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
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
                    message={`Are you sure you want to delete all images for this variant?`}
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteConfirm({ open: false, type: "", id: null })}
                    confirmButtonText={deleteVariantImagesMutation.isPending ? "Deleting..." : "Confirm"}
                    confirmButtonDisabled={deleteVariantImagesMutation.isPending}
                />
            )}
        </div>
    );
};



export default AdminVariantImages;