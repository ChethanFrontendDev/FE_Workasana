import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import usePost from "../hooks/usePost";

const AddMember = ({ open, onClose, teamId }) => {
  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  const { data: getUsers } = useFetch("/users");
  const { postHandler, success, loading, error } = usePost();

  // Single select user state
  const [selectedUser, setSelectedUser] = useState("");

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await postHandler(`/teams/${teamId.teamId}/add-member`, {
        userId: selectedUser,
      });

      setSelectedUser("");

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
    if (!modalInstance.current) return;
    open ? modalInstance.current.show() : modalInstance.current.hide();
  }, [open]);

  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Member</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label className="form-label">Select User</label>

                <select
                  className="form-select"
                  value={selectedUser}
                  onChange={handleUserChange}
                >
                  <option value="">-- Select User --</option>

                  {getUsers?.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
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
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>

              {success && (
                <div className="alert alert-success text-center">{success}</div>
              )}
              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
