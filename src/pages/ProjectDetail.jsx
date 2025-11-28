import { NavLink, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import TaskFilters from "../components/TaskFilters";
import AddTask from "../components/AddTask";

export default function ProjectDetail() {
  const params = useParams();

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
    data: getTasks,
    refetch: refetchTasks,
    loading,
    error,
  } = useFetch("/tasks", filters);
  const { data: getProjects } = useFetch("/projects");
  const { data: getTeams } = useFetch("/teams");
  const { data: getUsers } = useFetch("/users");
  const { data: getTags } = useFetch("/tags");

  const matchedProjectData = getProjects?.find(
    (project) => project._id === params.id
  );
  const matchedTaskData = getTasks?.filter(
    (task) => task.project._id === params.id
  );

  useEffect(() => {
    if (!openTask) {
      refetchTasks();
    }
  }, [openTask]);

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold">{matchedProjectData?.name}</h4>
        <p className="text-muted">{matchedProjectData?.description}</p>
      </div>

      <div className="text-end">
        <button onClick={() => setOpenTask(true)} className="btn btn-primary">
          + New Task
        </button>
      </div>

      <div>
        <AddTask
          isProjectNeeded={false}
          matchedProjectData={matchedProjectData}
          open={openTask}
          onClose={() => setOpenTask(false)}
          getProjects={getProjects}
          getTeams={getTeams}
          getUsers={getUsers}
          getTags={getTags}
        />

        <TaskFilters
          isProjectNeeded={false}
          filters={filters}
          setFilters={setFilters}
          projects={getProjects}
          getTeams={getTeams}
          getUsers={getUsers}
          getTags={getTags}
        />
      </div>

      {matchedTaskData?.length === 0 && (
        <div className="col-12 text-center text-muted py-5">No tasks found</div>
      )}

      <div className="row g-4">
        {matchedTaskData?.map((task) => (
          <div key={task._id} className="col-12 col-sm-6 col-lg-4">
            <NavLink
              to={`/home/projects/${task.project._id}/tasks/${task._id}`}
              className="text-decoration-none"
            >
              <div className="card h-100 shadow-sm">
                {/* Header */}
                <div className="card-header fw-semibold">{task?.name}</div>

                {/* LIST GROUP BODY */}
                <ul className="list-group list-group-flush">
                  {/* Owners */}
                  <li className="list-group-item">
                    <p className="fw-semibold mb-1">Owners:</p>
                    <ul className="ps-3 mb-0">
                      {task?.owners?.map((owner) => (
                        <li key={owner._id}>{owner?.name}</li>
                      ))}
                    </ul>
                  </li>

                  {/* Due date */}
                  <li className="list-group-item">
                    <span className="fw-semibold">Due on:</span>{" "}
                    {new Date(task?.dueDate).toLocaleDateString()}
                  </li>

                  {/* Status */}
                  <li className="list-group-item">
                    <span className="fw-semibold">Status:</span> {task?.status}
                  </li>
                </ul>
              </div>
            </NavLink>
          </div>
        ))}

        {loading && (
          <div className="alert alert-info text-center">Loading...</div>
        )}
        {error && (
          <div className="alert alert-danger text-center">No Data Found.</div>
        )}
      </div>
    </div>
  );
}
