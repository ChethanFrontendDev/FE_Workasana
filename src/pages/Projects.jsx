import { NavLink } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function Projects() {
  const { data: getProjects, loading, error } = useFetch("/projects");
  return (
    <div>
      {loading && (
        <div className="alert alert-info text-center py-3">Loading...</div>
      )}
      {error && (
        <div className="alert alert-danger text-center py-3">
          No projects data found
        </div>
      )}
      <div className="row g-4">
        {getProjects?.map((project) => (
          <div key={project._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <NavLink
              to={`/home/projects/${project._id}`}
              className="text-decoration-none"
            >
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{project.name}</h5>
                  <p className="card-text">{project.description}</p>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
