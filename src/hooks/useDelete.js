import { useEffect, useState } from "react";
import api from "../api";

export default function useDelete() {
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const deleteHandler = async (url, id) => {
    setDeleteSuccess("");
    setDeleteError("");

    try {
      const res = await api.delete(`${url}/${id}`);

      setDeleteSuccess(res.data.message);
      return res.data;
    } catch (error) {
      setDeleteError(
        error?.response?.data?.error || error?.response?.data?.message
      );

      throw error;
    }
  };

  useEffect(() => {
    if (deleteSuccess || deleteError) {
      const timer = setTimeout(() => {
        setDeleteSuccess("");
        setDeleteError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [deleteSuccess, deleteError]);

  return { deleteHandler, deleteSuccess, deleteError };
}
