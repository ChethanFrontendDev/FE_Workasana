import { useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons";
import AddProject from "../components/AddProject";
import AddTask from "../components/AddTask";
import useFetch from "../hooks/useFetch";
import TaskFilters from "../components/TaskFilters";

export default function Dashboard() {
  // const [searchItem, setSearchItem] = useState("");
  // const [inputSearchItem, setInputSearchItem] = useState("");

  const [openProject, setOpenProject] = useState(false);
  const [openTask, setOpenTask] = useState(false);

  const [filters, setFilters] = useState({
    project: "",
    team: "",
    owner: "",
    tags: "",
    status: "",
    sort: "",
  });

  const {
    data: projects,
    loading: isProjectLoading,
    error: isProjectError,
    refetch: refetchProjects,
  } = useFetch("/projects");
  const {
    data: tasks,
    loading: isTaskLoading,
    error: isTaskError,
    refetch: refetchTasks,
  } = useFetch("/tasks", filters);
  const { data: getTeams } = useFetch("/teams");
  const { data: getUsers } = useFetch("/users");
  const { data: getTags } = useFetch("/tags");

  useEffect(() => {
    if (!openProject) {
      refetchProjects();
    }
  }, [openProject]);

  useEffect(() => {
    if (!openTask) {
      refetchTasks();
    }
  }, [openTask]);

  // console.log("-->", searchItem);
  return (
    <div>
      {/* Search section */}
      {/* <div className="input-group flex-nowrap">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setInputSearchItem(e.target.value)}
        />
        <span
          onClick={() => setSearchItem(inputSearchItem)}
          className="input-group-text"
          style={{ cursor: "pointer" }}
        >
          <Search />
        </span>
      </div> */}

      {/* Project Section */}
      <div className="mt-3">
        <div className="d-flex justify-content-between py-2">
          <div className="d-flex gap-3">
            <h4>Projects</h4>
          </div>
          <div>
            <button
              onClick={() => setOpenProject(true)}
              className="btn btn-primary"
            >
              + New Project
            </button>
            <AddProject
              open={openProject}
              onClose={() => setOpenProject(false)}
            />
          </div>
        </div>

        {isProjectLoading && (
          <div className="alert alert-info text-center py-3">Loading...</div>
        )}

        {isProjectError && (
          <div className="alert alert-danger text-center py-3">
            No Project Data Found.
          </div>
        )}

        <div className="row g-4">
          {projects?.map((project) => (
            <div
              key={project._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{project.name}</h5>
                  <p className="card-text">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Section */}
      <div>
        <div className="mt-4">
          <div className="d-flex justify-content-between  py-2">
            <div className="d-flex gap-3">
              <h4>My Tasks</h4>
            </div>
            <div>
              <button
                onClick={() => setOpenTask(true)}
                className="btn btn-primary"
              >
                + New Task
              </button>
            </div>
          </div>
          <TaskFilters
            isProjectNeeded={true}
            filters={filters}
            setFilters={setFilters}
            projects={projects}
            getTeams={getTeams}
            getUsers={getUsers}
            getTags={getTags}
          />
          <AddTask
            isProjectNeeded={true}
            matchedProjectData={false}
            open={openTask}
            onClose={() => setOpenTask(false)}
            getProjects={projects}
            getTeams={getTeams}
            getUsers={getUsers}
            getTags={getTags}
          />
        </div>

        {isTaskLoading && (
          <div className="alert alert-info text-center py-3">Loading...</div>
        )}
        {isTaskError && (
          <div className="alert alert-danger text-center py-3">
            No Task Data Found.
          </div>
        )}

        <div className="row g-4">
          {tasks?.map((task) => (
            <div key={task._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100">
                <div className="card-body">
                  <h6
                    className={`badge ${
                      task.status === "To Do"
                        ? "text-bg-primary"
                        : task.status === "In Progress"
                        ? "text-bg-warning"
                        : task.status === "Completed"
                        ? "text-bg-success"
                        : task.status === "Blocked"
                        ? "text-bg-danger"
                        : ""
                    } `}
                  >
                    {task.status}
                  </h6>
                  <h5 className="card-title">{task.name}</h5>
                  <small className="text-muted">
                    Due on: {new Date(task.dueDate).toDateString()}
                  </small>
                  <ul className="card-text list-unstyled">
                    {task.owners.map((owner) => (
                      <li key={owner._id} className="d-flex gap-2 py-1">
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            backgroundColor: "#e0e0e0",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "bold",
                            fontSize: "14px",
                            textTransform: "uppercase",
                          }}
                        >
                          {owner.name?.[0]}
                        </div>
                        {owner.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
