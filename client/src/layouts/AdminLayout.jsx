import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-slate-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;