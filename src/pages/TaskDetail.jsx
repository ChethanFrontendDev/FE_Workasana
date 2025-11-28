import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import api from "../api";

export default function TaskDetail() {
  const params = useParams();
  const navigate = useNavigate();

  const [updateSuccess, setUpdateSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");

  const {
    data: getTasks,
    loading,
    error,
    refetch: fetchTask,
  } = useFetch("/tasks");
  const task = getTasks?.find((task) => task._id === params.id);

  const markAsComplete = async (id) => {
    const payload = { status: "Completed" };
    setUpdateSuccess("");
    setUpdateError("");
    try {
      const res = await api.put(`/tasks/${id}`, payload);
      setUpdateSuccess(res?.data?.message);
      fetchTask();
      return res?.data;
    } catch (error) {
      setUpdateError(
        error?.response?.data?.error || error?.response?.data?.message
      );
    }
  };

  useEffect(() => {
    if (updateSuccess || updateError) {
      const timer = setTimeout(() => {
        setUpdateSuccess("");
        setUpdateError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [updateSuccess, updateError]);

  return (
    <div>
      {loading && (
        <div className="alert alert-info text-center">Loading...</div>
      )}
      {error && (
        <div className="alert alert-danger text-center">No Data Found.</div>
      )}

      <div>
        <button
          className="btn btn-outline-secondary px-4"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="fw-bold mb-0">{task?.name}</h2>

          <span
            className={`badge ${
              task?.status === "To Do"
                ? "text-bg-primary"
                : task?.status === "In Progress"
                ? "text-bg-warning"
                : task?.status === "Completed"
                ? "text-bg-success"
                : task?.status === "Blocked"
                ? "text-bg-danger"
                : ""
            }  py-2 px-2`}
          >
            {task?.status?.toUpperCase()}
          </span>
        </div>

        <div className="p-4 border rounded shadow-sm bg-light">
          {/* Owners */}
          <div className="mb-4">
            <h5 className="fw-bold text-primary mb-2">Owners</h5>
            <ul className="ps-3 mb-0">
              {task?.owners?.map((owner) => (
                <li key={owner._id} className="text-secondary">
                  {owner.name}
                </li>
              ))}
            </ul>
          </div>

          <hr className="opacity-25" />

          {/* Team */}
          <div className="mb-4">
            <h5 className="fw-bold text-primary mb-2">Team</h5>
            <p className="text-secondary mb-0">{task?.team?.name}</p>
          </div>

          <hr className="opacity-25" />

          {/* Tags */}
          <div className="mb-4">
            <h5 className="fw-bold text-primary mb-2">Tags</h5>
            <div className="d-flex flex-wrap gap-2">
              {task?.tags?.map((tag) => (
                <span
                  key={tag._id}
                  className="badge bg-info text-dark px-3 py-2 rounded-pill"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>

          <hr className="opacity-25" />

          {/* Due Date */}
          <div className="mb-4">
            <h5 className="fw-bold text-primary mb-2">Due Date</h5>
            <p className="text-secondary mb-0">
              {new Date(task?.dueDate).toLocaleDateString()}
            </p>
          </div>

          <hr className="opacity-25" />

          {task?.status !== "Completed" && (
            <div className="mt-4">
              <button
                className="btn btn-success px-4 py-2 fw-semibold shadow-sm"
                onClick={() => markAsComplete(task?._id)}
              >
                ✓ Mark as Completed
              </button>
            </div>
          )}

          {updateSuccess && (
            <div className="alert alert-success text-center mt-4 rounded-3 shadow-sm">
              {updateSuccess}
            </div>
          )}

          {updateError && (
            <div className="alert alert-danger text-center mt-4 rounded-3 shadow-sm">
              {updateError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
