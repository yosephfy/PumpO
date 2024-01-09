import { Outlet } from "react-router";

export default function SetttingContainer() {
  return (
    <div className="settings">
      <h3>Settings and Privacy</h3> <Outlet />
    </div>
  );
}
