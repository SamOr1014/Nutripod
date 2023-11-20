import LogoutButton from "./LogoutButton";
import NavButtons from "./NavButtons";

const DashboardNavBar = () => {
  return (
    <nav className=" w-full  p-3">
      <div className="flex">
        <div className="flex flex-1 gap-2">
          <NavButtons />
        </div>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default DashboardNavBar;
