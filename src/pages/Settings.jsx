import { useState } from "react";
import useDelete from "../hooks/useDelete";
import useFetch from "../hooks/useFetch";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("projects");

  const { deleteHandler, deleteSuccess, deleteError } = useDelete();

  const {
    data: getProjects,
    loading: isProjectsLoading,
    error: isProjectsError,
    refetch: fetchProjects,
  } = useFetch("/projects");

  const {
    data: getTasks,
    loading: isTasksLoading,
    error: isTasksError,
    refetch: fetchTasks,
  } = useFetch("/tasks");

  const {
    data: getTeams,
    loading: isTeamsLoading,
    error: isTeamsError,
    refetch: fetchTeams,
  } = useFetch("/teams");

  const handleDelete = async (id) => {
    try {
      if (activeTab === "projects") {
        await deleteHandler("/projects", id);
        fetchProjects();
      } else if (activeTab === "tasks") {
        await deleteHandler("/tasks", id);
        fetchTasks();
      } else if (activeTab === "teams") {
        await deleteHandler("/teams", id);
        fetchTeams();
      }
    } catch (error) {}
  };

  return (
    <div className="container py-3">
      {/* Tabs */}
      <div className="mb-3 bg-light p-3 rounded d-flex flex-wrap gap-2 justify-content-start">
        <button
          className={`btn btn-outline-primary ${
            activeTab === "projects" ? "active" : ""
          }`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>

        <button
          className={`btn btn-outline-primary ${
            activeTab === "tasks" ? "active" : ""
          }`}
          onClick={() => setActiveTab("tasks")}
        >
          Tasks
        </button>

        <button
          className={`btn btn-outline-primary ${
            activeTab === "teams" ? "active" : ""
          }`}
          onClick={() => setActiveTab("teams")}
        >
          Teams
        </button>
      </div>

      {/* PROJECTS TAB */}
      {activeTab === "projects" && (
        <>
          {isProjectsLoading && (
            <div className="alert alert-info text-center py-3">Loading...</div>
          )}
          {isProjectsError && (
            <div className="alert alert-danger text-center py-3">
              {isProjectsError}
            </div>
          )}

          {/* Delete status */}
          {deleteSuccess && (
            <div className="alert alert-success text-center py-3">
              {deleteSuccess}
            </div>
          )}
          {deleteError && (
            <div className="alert alert-danger text-center py-3">
              {deleteError}
            </div>
          )}

          <div className="row g-3">
            {getProjects?.length === 0 && !isProjectsLoading && (
              <div className="col-12">
                <div className="alert alert-secondary text-center py-3">
                  No projects found
                </div>
              </div>
            )}

            {getProjects?.map((project) => (
              <div
                key={project?._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column">
                    <div className="text-end mb-2">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(project?._id)}
                      >
                        Delete
                      </button>
                    </div>
                    <h5 className="card-title mb-0">{project?.name}</h5>

                    <p className="card-text small mt-2">
                      {project?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* TASKS TAB */}
      {activeTab === "tasks" && (
        <>
          {isTasksLoading && (
            <div className="alert alert-info text-center py-3">Loading...</div>
          )}
          {isTasksError && (
            <div className="alert alert-danger text-center py-3">
              {isTasksError}
            </div>
          )}

          {/* Delete status */}
          {deleteSuccess && (
            <div className="alert alert-success text-center py-3">
              {deleteSuccess}
            </div>
          )}
          {deleteError && (
            <div className="alert alert-danger text-center py-3">
              {deleteError}
            </div>
          )}

          <div className="row g-3">
            {getTasks?.length === 0 && (
              <div className="col-12">
                <div className="alert alert-secondary text-center py-3">
                  No tasks found
                </div>
              </div>
            )}

            {getTasks?.map((task) => (
              <div
                key={task?._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column">
                    <div className="text-end mb-2">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(task?._id)}
                      >
                        Delete
                      </button>
                    </div>

                    <h5 className="card-title mb-0">{task?.name}</h5>
                    <ul className="mt-3 small text-muted list-unstyled">
                      <li className="mb-1">
                        <strong>Status: </strong> {task?.status}
                      </li>
                      <li className="mb-1">
                        <strong>Time to Complete: </strong>
                        {task?.timeToComplete}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* TEAMS TAB */}
      {activeTab === "teams" && (
        <>
          {isTeamsLoading && (
            <div className="alert alert-info text-center py-3">Loading...</div>
          )}
          {isTeamsError && (
            <div className="alert alert-danger text-center py-3">
              {isTeamsError}
            </div>
          )}

          {/* Delete status */}
          {deleteSuccess && (
            <div className="alert alert-success text-center py-3">
              {deleteSuccess}
            </div>
          )}
          {deleteError && (
            <div className="alert alert-danger text-center py-3">
              {deleteError}
            </div>
          )}

          <div className="row g-3">
            {getTeams?.length === 0 && (
              <div className="col-12">
                <div className="alert alert-secondary text-center py-3">
                  No teams found
                </div>
              </div>
            )}

            {getTeams?.map((team) => (
              <div
                key={team?._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column">
                    <div className="text-end mb-2">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(team?._id)}
                      >
                        Delete
                      </button>
                    </div>

                    <h5 className="card-title mb-0">{team?.name}</h5>
                    <p className="card-text small mt-3">{team?.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
