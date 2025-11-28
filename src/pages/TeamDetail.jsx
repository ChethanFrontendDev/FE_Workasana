import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddMember from "../components/AddMember";
import useFetch from "../hooks/useFetch";

export default function TeamDetail() {
  const params = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const {
    data: teamData,
    loading,
    error,
    refetch,
  } = useFetch(`/teams/${params.teamId}/members`);

  useEffect(() => {
    if (!open) {
      refetch();
    }
  }, [open]);

  return (
    <div>
      <button
        className="btn btn-outline-secondary px-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">{teamData?.teamName}</h3>
          <button
            onClick={() => setOpen(true)}
            className="btn btn-success px-4"
          >
            + Add Member
          </button>
          {/* <button onClick={() => setOpen(true)} className="btn btn-primary">
            + New Team
          </button> */}
        </div>

        <AddMember open={open} onClose={() => setOpen(false)} teamId={params} />

        {loading && (
          <div className="alert alert-info text-center">Loading...</div>
        )}
        {error && (
          <div className="alert alert-danger text-center">No Data Found.</div>
        )}

        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-semibold mb-3">
              Team Members ({teamData?.members?.length || 0})
            </h5>

            {teamData?.members?.length === 0 ? (
              <p className="text-muted">No members assigned yet.</p>
            ) : (
              <div className="row g-3">
                {teamData?.members?.map((member) => (
                  <div key={member._id} className="col-12 col-sm-6 col-lg-4">
                    <div className="border rounded p-3 d-flex align-items-center member-card">
                      <div className="avatar-circle me-3 text-info">
                        {member.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="mb-0 fw-semibold">{member.name}</p>
                        <small className="text-muted">{member.email}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* <div className="text-end mt-3">
          <button className="btn btn-success px-4">+ Add Member</button>
        </div> */}
      </div>
    </div>
  );
}
