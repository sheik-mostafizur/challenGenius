import {uesAuthContext} from "../../context/AuthContext";

const DashboardHome = () => {
  const {user} = uesAuthContext();
  return (
    <div>
      <img src={user?.photoURL} alt="" />
      <div>
        <p>
          <b>Name:</b> {user?.name}
        </p>
        <p>
          <b>Email:</b> {user?.email}
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;
