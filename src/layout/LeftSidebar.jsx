import { Outlet, NavLink } from "react-router-dom";

export default function LeftSidebar() {
  return (
    <div className="d-flex">
      <div>
        {/* Mobile Menu Button */}
        <button
          className="btn btn-primary d-md-none m-2"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
        >
          ☰ Menu
        </button>

        {/* Sidebar : sm, md*/}
        <div
          className="offcanvas offcanvas-start offcanvas-md"
          tabIndex="-1"
          id="sidebarMenu"
          aria-labelledby="sidebarMenuLabel"
        >
          <div className="offcanvas-header d-md-none">
            <h5 className="offcanvas-title text-primary display-6 fw-semibold" id="sidebarMenuLabel">
              Workasana
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body p-0">
            <ul className="nav flex-column nav-pills p-3">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/home/projects">
                  Projects
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/home/teams">
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/home/reports">
                  Reports
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Sidebar: Lg */}
        <div
          className="d-none d-md-block"
          style={{
            width: "220px",
            marginLeft: "-0.5rem",
            marginTop: "-0.5rem",
          }}
        >
          <div className="p-0">
            <ul className="nav flex-column nav-pills p-3">
              <li className="nav-item">
                <NavLink className="nav-link fw-bold fs-5 mb-5" to="/home">
                  Workasana
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/home/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/home/projects">
                  Projects
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/home/teams">
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/home/reports">
                  Reports
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="p-4 flex-grow-1">
        <Outlet />
      </main>
    </div>
  );
}
