import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useRef, useState } from "react";
import usePost from "../hooks/usePost";

const AddTask = ({
  matchedProjectData,
  isProjectNeeded,
  open,
  onClose,
  getProjects,
  getTeams,
  getUsers,
  getTags,
}) => {
  const { postHandler, success, loading, error } = usePost();
  // const { data: getProjects } = useFetch("/projects");
  // const { data: getTeams } = useFetch("/teams");
  // const { data: getUsers } = useFetch("/users");
  // const { data: getTags } = useFetch("/tags");
  //   const { data: getTasks } = useFetch("/tasks");

  //   use useRef to handle DOM
  const modalRef = useRef(null);
  const modalInstance = useRef(null);

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

  const defaultFormValues = {
    name: "",
    project: "",
    team: "",
    owners: [],
    tags: [],
    dueDate: "",
    timeToComplete: "",
    status: "",
  };

  const [formValues, setFormValues] = useState(defaultFormValues);

  const handleChange = (event) => {
    const { name, value, multiple, options } = event.target;

    if (multiple) {
      const selectedValues = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedValues.push(options[i].value);
        }
      }

      setFormValues((prev) => ({
        ...prev,
        [name]: selectedValues,
      }));
    } else
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
  };

  const handleTaskSubmit = async (event) => {
    event.preventDefault();
    try {
      await postHandler("/tasks", formValues);
      setFormValues(defaultFormValues);

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {}
  };

  useEffect(() => {
    if (matchedProjectData) {
      setFormValues((prev) => ({
        ...prev,
        project: matchedProjectData?._id,
      }));
    }
  }, [matchedProjectData]);

  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Task</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleTaskSubmit}>
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

              {isProjectNeeded && (
                <div className="mb-3">
                  <label htmlFor="project" className="form-label">
                    Select Project Name
                  </label>
                  <select
                    className="form-select"
                    id="project"
                    name="project"
                    onChange={handleChange}
                    value={formValues.project}
                  >
                    <option value=""></option>
                    {getProjects?.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="team" className="form-label">
                  Select Team
                </label>
                <select
                  className="form-select"
                  id="team"
                  name="team"
                  onChange={handleChange}
                  value={formValues.team}
                >
                  <option value=""></option>
                  {getTeams?.map((team) => (
                    <option key={team._id} value={team._id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="owners" className="form-label">
                  Select Owners
                </label>
                <select
                  className="form-select"
                  id="owners"
                  name="owners"
                  multiple
                  size="3"
                  onChange={handleChange}
                  value={formValues.owners}
                >
                  {getUsers?.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="tags" className="form-label">
                  Select Tags
                </label>
                <select
                  className="form-select"
                  id="tags"
                  name="tags"
                  multiple
                  size="3"
                  onChange={handleChange}
                  value={formValues.tags}
                >
                  {getTags?.map((tag) => (
                    <option key={tag._id} value={tag._id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="dueDate" className="form-label">
                  Due Date
                </label>
                <input
                  className="form-control"
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  onChange={handleChange}
                  value={formValues.dueDate}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="timeToComplete" className="form-label">
                  Time to Complete
                </label>
                <input
                  type="number"
                  name="timeToComplete"
                  id="timeToComplete"
                  className="form-control"
                  onChange={handleChange}
                  value={formValues.timeToComplete}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  className="form-select"
                  onChange={handleChange}
                  value={formValues.status}
                >
                  <option value=""></option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Blocked">Blocked</option>
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

export default AddTask;
