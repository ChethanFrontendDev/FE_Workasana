import { NavLink } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import AddTeam from "../components/AddTeam";

export default function Teams() {
  const {
    data: getTeams,
    loading,
    error,
    refetch: refetchTeams,
  } = useFetch("/teams");

  const [openTeamModal, setOpenTeamModal] = useState(false);

  useEffect(() => {
    if (!openTeamModal) {
      refetchTeams();
    }
  }, [openTeamModal]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h4>Teams</h4>
        <button
          className="btn btn-primary"
          onClick={() => setOpenTeamModal(true)}
        >
          + New Team
        </button>
      </div>

      <div>
        <AddTeam open={openTeamModal} onClose={() => setOpenTeamModal(false)} />
      </div>

      {loading && (
        <div className="alert alert-info text-center py-3">Loading...</div>
      )}
      {error && (
        <div className="alert alert-danger text-center py-3">
          No Team Data Found.
        </div>
      )}

      <div className="row g-4">
        {getTeams?.map((team) => (
          <div key={team._id} className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100 shadow-sm team-card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{team.name}</h5>
                <p className="card-text flex-grow-1">{team.description}</p>
                <NavLink
                  to={`/home/teams/${team._id}/members`}
                  className="btn btn-primary mt-auto"
                >
                  View Details
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
