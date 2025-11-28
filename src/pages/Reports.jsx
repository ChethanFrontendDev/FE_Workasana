import TotalPendingTasks from "../components/TotalPendingTasks";
import TotalTasksClosed from "../components/TotalTasksClosed";
import WorkDoneByLastWeek from "../components/WorkDoneByLastWeek";

export default function Reports() {
  return (
    <div className="container mt-4">
      <div className="row g-4">
        {/* Chart 1 */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <WorkDoneByLastWeek />
            </div>
          </div>
        </div>

        {/* Chart 2 */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <TotalPendingTasks />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <TotalTasksClosed teamWise={true} ownerwise={false} />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <TotalTasksClosed teamWise={false} ownerwise={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
