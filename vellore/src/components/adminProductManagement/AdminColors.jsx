import React, { useState } from "react";
import { FaPaintRoller } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import ConfirmationPopup from "../ConfirmationPopup";
import {
    getColors,
    createColor,
    updateColor,
    deleteColor,
} from "../../services/colorService";

const AdminColors = () => {
    const queryClient = useQueryClient();
    const [colorModal, setColorModal] = useState({ open: false, mode: "create", data: null });
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, type: "color", id: null });

    const colorForm = useForm();

    const { data: colorsData, isLoading: colorsLoading, error: colorsError } = useQuery({
        queryKey: ["colors"],
        queryFn: () => getColors(),
    });

    const createColorMutation = useMutation({
        mutationFn: (data) => createColor(data),
        onSuccess: () => {
            toast.success("Color created successfully");
            queryClient.invalidateQueries(["colors"]);
            setColorModal({ open: false, mode: "create", data: null });
            colorForm.reset();
        },
        onError: (err) => toast.error(err.message),
    });

    const updateColorMutation = useMutation({
        mutationFn: ({ id, data }) => updateColor(id, data),
        onSuccess: () => {
            toast.success("Color updated successfully");
            queryClient.invalidateQueries(["colors"]);
            setColorModal({ open: false, mode: "create", data: null });
            colorForm.reset();
        },
        onError: (err) => toast.error(err.message),
    });

    const deleteColorMutation = useMutation({
        mutationFn: (id) => deleteColor(id),
        onSuccess: () => {
            toast.success("Color deleted successfully");
            queryClient.invalidateQueries(["colors"]);
            setDeleteConfirm({ open: false, type: "", id: null });
        },
        onError: (err) => toast.error(err.message),
    });

    const handleDelete = (type, id) => {
        setDeleteConfirm({ open: true, type, id });
    };

    const confirmDelete = () => {
        const { id } = deleteConfirm;
        deleteColorMutation.mutate(id);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Colors</h2>
                <button
                    onClick={() => setColorModal({ open: true, mode: "create", data: null })}
                    className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover transition"
                >
                    Add Color
                </button>
            </div>
            {colorsLoading ? (
                <p className="text-gray-500">Loading colors...</p>
            ) : colorsError ? (
                <p className="text-red-500">Error: {colorsError.message}</p>
            ) : colorsData?.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    <p className="text-lg">No colors found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="border-b p-3 text-left">Name</th>
                                <th className="border-b p-3 text-left">Hex</th>
                                <th className="border-b p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {colorsData.map((color) => (
                                <tr key={color._id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="border-b p-3">{color.name}</td>
                                    <td className="border-b p-3">
                                        <div className="flex items-center">
                                            <div
                                                className="w-6 h-6 rounded-full mr-2"
                                                style={{ backgroundColor: color.hex }}
                                            ></div>
                                            {color.hex}
                                        </div>
                                    </td>
                                    <td className="border-b p-3 text-center">
                                        <button
                                            onClick={() => setColorModal({ open: true, mode: "update", data: color })}
                                            className="text-primary hover:underline mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete("color", color._id)}
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

            {colorModal.open && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">{colorModal.mode === "create" ? "Add Color" : "Edit Color"}</h2>
                        <form
                            onSubmit={colorForm.handleSubmit((data) =>
                                colorModal.mode === "create"
                                    ? createColorMutation.mutate(data)
                                    : updateColorMutation.mutate({ id: colorModal.data._id, data })
                            )}
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    {...colorForm.register("name", { required: "Name is required" })}
                                    defaultValue={colorModal.data?.name || ""}
                                    className="border border-gray-300 rounded-lg p-2 w-full"
                                />
                                {colorForm.formState.errors.name && (
                                    <p className="text-red-500 text-sm">{colorForm.formState.errors.name.message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Hex Code</label>
                                <input
                                    {...colorForm.register("hex", { required: "Hex code is required" })}
                                    defaultValue={colorModal.data?.hex || ""}
                                    className="border border-gray-300 rounded-lg p-2 w-full"
                                />
                                {colorForm.formState.errors.hex && (
                                    <p className="text-red-500 text-sm">{colorForm.formState.errors.hex.message}</p>
                                )}
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setColorModal({ open: false, mode: "create", data: null });
                                        colorForm.reset();
                                    }}
                                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createColorMutation.isPending || updateColorMutation.isPending}
                                    className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover transition disabled:opacity-50"
                                >
                                    {createColorMutation.isPending || updateColorMutation.isPending ? "Saving..." : "Save"}
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
                        deleteColorMutation.isPending 
                        
                            ? "Deleting..."
                            : "Confirm"
                    }
                    confirmButtonDisabled={
                        deleteColorMutation.isPending 
                        
                    }
                />
            )}
        </div>
    );
};

export default AdminColors;