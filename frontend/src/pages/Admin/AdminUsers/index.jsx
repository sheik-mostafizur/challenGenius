import {useQuery} from "@tanstack/react-query";
import {uesAuthContext} from "../../../context/AuthContext";
import axios from "axios";
import LoaderSpinner from "../../../components/LoaderSpinner";
import Swal from "sweetalert2";

const AdminUsers = () => {
  const {user} = uesAuthContext();
  const {
    data: loadedUsers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const {data} = await axios.get("/admin/users", {
        params: {email: user?.email},
      });
      return data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Please delete manually from firebase then click yes!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      axios.delete(`/admin/users/${id}`).then(({data}) => {
        if (data.deletedCount) {
          if (result.isConfirmed) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
          refetch();
        }
      });
    });
  };
  return (
    <div>
      <h1>AdminUsers</h1>
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <>
          {loadedUsers &&
            loadedUsers.map((user) => {
              return (
                <div
                  key={user?._id}
                  className="my-2 border border-primary-600 p-4">
                  <h3>Name: {user.name}</h3>
                  <p>Email: {user.email}</p>
                  {user?.role && (
                    <p className="bg-primary-700 text-white">
                      Role: {user?.role}
                    </p>
                  )}
                  <button
                    onClick={() => handleDelete(user?._id)}
                    disabled={user?.role}
                    className="font-medium text-red-600 hover:underline dark:text-red-500">
                    Delate
                  </button>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default AdminUsers;
