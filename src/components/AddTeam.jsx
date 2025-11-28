import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useRef, useState } from "react";
import usePost from "../hooks/usePost";

const AddTeam = ({ open, onClose }) => {
  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  const { postHandler, success, loading, error } = usePost();

  const defaultFormValues = {
    name: "",
    description: "",
  };
  const [formValues, setFormValues] = useState(defaultFormValues);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await postHandler("/teams", formValues);
      setFormValues(defaultFormValues);

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {}
  };

  useEffect(() => {
    modalInstance.current = new bootstrap.Modal(modalRef.current, {
      backdrop: "static",
    });
  }, []);

  useEffect(() => {
    if (open) {
      modalInstance.current.show();
    } else {
      modalInstance.current.hide();
    }
  }, [open]);

  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Team</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Task Name
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  onChange={handleChange}
                  value={formValues.name}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description:
                </label>
                <textarea
                  required
                  name="description"
                  id="description"
                  className="form-control"
                  onChange={handleChange}
                  value={formValues.description}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  {loading ? "Saving" : "Save changes"}
                </button>
              </div>

              {success && (
                <div className="alert alert-success text-center py-2">
                  {success}
                </div>
              )}
              {error && (
                <div className="alert alert-danger text-center py-2">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeam;
