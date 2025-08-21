import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient, useQueries } from "@tanstack/react-query";
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

    const variantIds = variantsData?.variants?.map(v => v._id) || [];

    const imageQueries = useQueries({
        queries: variantIds.map((id) => ({
            queryKey: ["variantImagesCount", id],
            queryFn: async () => {
                const data = await getVariantImages({ variantId: id });
                return data?.images?.length || 0;
            },
            staleTime: 5 * 60 * 1000,
        })),
    });

    const createVariantImagesMutation = useMutation({
        mutationFn: (data) => createVariantImages(data),
        onSuccess: () => {
            toast.success("Variant images created successfully");
            queryClient.invalidateQueries(["variantImages"]);
            queryClient.invalidateQueries(["variantImagesCount"]);
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
            queryClient.invalidateQueries(["variantImagesCount"]);
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
            queryClient.invalidateQueries(["variantImagesCount"]);
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
        <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
                <h2 className="text-xl lg:text-2xl font-bold">Variant Images</h2>
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
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-xs md:text-sm min-w-full">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="border-b p-1.5 md:p-3 text-left min-w-[150px]">Variant</th>
                                <th className="border-b p-1.5 md:p-3 text-left min-w-[100px]">Images Count</th>
                                <th className="border-b p-1.5 md:p-3 text-center min-w-[200px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {variantsData.variants.map((variant, index) => (
                                <tr key={variant._id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="border-b p-1.5 md:p-3">{variant.product.name} - {variant.color.name}</td>
                                    <td className="border-b p-1.5 md:p-3">{imageQueries[index]?.data ?? 0}</td>
                                    <td className="border-b p-1.5 md:p-3 text-center">
                                        <button
                                            onClick={() => openViewImagesModal(variant._id)}
                                            className="text-primary hover:underline mr-1 md:mr-2 text-xs md:text-sm"
                                        >
                                            View Images
                                        </button>
                                        <button
                                            onClick={() => openVariantImagesModal(variant._id)}
                                            className="text-primary hover:underline mr-1 md:mr-2 text-xs md:text-sm"
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
                                            disabled={!(imageQueries[index]?.data > 0)}
                                            className="text-red-500 hover:underline disabled:opacity-50 text-xs md:text-sm"
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
                                <input
                                    type="hidden"
                                    {...variantImagesForm.register("variantId")}
                                    defaultValue={variantImagesModal.data?.variantId || ""}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs md:text-sm">Images</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    {...variantImagesForm.register("images", { required: "At least one image is required" })}
                                    className="border border-gray-300 rounded-lg p-1.5 md:p-2 w-full text-xs md:text-sm"
                                />
                                {variantImagesForm.formState.errors.images && (
                                    <p className="text-red-500 text-xs">{variantImagesForm.formState.errors.images.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col lg:flex-row justify-between gap-2">
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
                                            setVariantImagesModal({ open: false, mode: "create", data: null });
                                            variantImagesForm.reset();
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

const VariantImages = ({ variantId }) => {
    const { data: variantImagesData, isLoading, error } = useQuery({
        queryKey: ["variantImages", variantId],
        queryFn: () => getVariantImages({ variantId }),
    });

    if (isLoading) return <p className="text-gray-500 text-sm md:text-base">Loading images...</p>;
    if (error) return <p className="text-red-500 text-sm md:text-base">Error: {error.message}</p>;
    if (!variantImagesData?.images?.length) return <p className="text-gray-500 text-sm md:text-base">No images uploaded</p>;

    return (
        <Carousel showThumbs={false}>
            {variantImagesData.images.map((image, index) => (
                <div key={index}>
                    <img src={image.url} alt={`Variant Image ${index + 1}`} />
                </div>
            ))}
        </Carousel>
    );
};

export default AdminVariantImages;