const TaskFilters = ({
  isProjectNeeded,
  filters,
  setFilters,
  projects,
  getTeams,
  getUsers,
  getTags,
}) => {
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      project: "",
      team: "",
      owner: "",
      tags: "",
      status: "",
      sort: "",
    });
  };

  return (
    <div className="row g-3 py-3">
      {isProjectNeeded && (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <select
            className="form-select"
            name="project"
            value={filters.project}
            onChange={handleChange}
          >
            <option value="">Filter by Project</option>
            {projects?.map((project) => (
              <option key={project._id} value={project.name}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <select
          className="form-select"
          name="team"
          value={filters.team}
          onChange={handleChange}
        >
          <option value="">Filter by Team</option>
          {getTeams?.map((team) => (
            <option key={team._id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <select
          className="form-select"
          name="owner"
          value={filters.owner}
          onChange={handleChange}
        >
          <option value="">Filter by User</option>
          {getUsers?.map((user) => (
            <option key={user._id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <select
          className="form-select"
          name="tags"
          value={filters.tags}
          onChange={handleChange}
        >
          <option value="">Filter by Tags</option>
          {getTags?.map((tag) => (
            <option key={tag._id} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <select
          className="form-select"
          name="status"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="">Filter by Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <select
          className="form-select"
          name="sort"
          value={filters.sort}
          onChange={handleChange}
        >
          <option value="">Sort by Due Date</option>
          <option value="dueDateAsc">Oldest First</option>
          <option value="dueDateDesc">Newest First</option>
        </select>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-2">
        <button className="btn btn-primary w-100" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;
