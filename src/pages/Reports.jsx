import TotalPendingTasks from "../components/TotalPendingTasks";
import TotalTasksClosed from "../components/TotalTasksClosed";
import WorkDoneByLastWeek from "../components/WorkDoneByLastWeek";
import useFetch from "../hooks/useFetch";

export default function Reports() {
  const {
    data: tasks,
    loading: isTaskLoading,
    error: isTaskError,
  } = useFetch("/tasks");
  return (
    <div className="container mt-4">
      {isTaskLoading && (
        <div className="alert alert-info text-center py-3">Loading...</div>
      )}
      {isTaskError && (
        <div className="alert alert-danger text-center py-3">
          No Task Data Found.
        </div>
      )}
      {!isTaskLoading && (
        <div className="row g-4">
          {/* Chart 1 */}
          <div className="col-12 col-md-6">
            <div className="card shadow-sm">
              <div className="card-body p-0">
                <WorkDoneByLastWeek tasks={tasks} />
              </div>
            </div>
          </div>

          {/* Chart 2 */}
          <div className="col-12 col-md-6">
            <div className="card shadow-sm">
              <div className="card-body p-0">
                <TotalPendingTasks tasks={tasks} />
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card shadow-sm">
              <div className="card-body p-0">
                <TotalTasksClosed
                  tasks={tasks}
                  teamWise={true}
                  ownerwise={false}
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card shadow-sm">
              <div className="card-body p-0">
                <TotalTasksClosed
                  tasks={tasks}
                  teamWise={false}
                  ownerwise={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
