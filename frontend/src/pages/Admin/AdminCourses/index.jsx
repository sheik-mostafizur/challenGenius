import {AiOutlineDelete} from "react-icons/ai";
import {BiEdit} from "react-icons/bi";
import {Link} from "react-router-dom";
import Button from "../../../components/Button";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import LoaderSpinner from "../../../components/LoaderSpinner";

const AdminCourses = () => {
  const {
    data: loadedCourses,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-courses"],
    queryFn: async () => {
      const response = await axios.get("/admin/courses");
      return response.data;
    },
  });

  const handleCourseDelete = (id) => {
    console.log(id);
    // todo: it's huge work to delete course and this course modules
  };

  return (
    <div>
      <section className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Courses</h1>
        <Link to="add">
          <Button text="Add New" />
        </Link>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        {isLoading ? (
          <LoaderSpinner />
        ) : (
          loadedCourses.map((course) => (
            <div
              key={course._id}
              className="relative rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
              <div className="absolute right-0 top-2 flex flex-col gap-4 pe-4 text-4xl">
                <Link to={`update/${course._id}`}>
                  <button>
                    <BiEdit className="rounded-md bg-primary-100 text-primary-600" />
                  </button>
                </Link>

                <button
                  onClick={() => handleCourseDelete(course._id)}
                  className="rounded-md bg-red-100 text-red-600">
                  <AiOutlineDelete />
                </button>
              </div>
              <img
                className="mx-auto block rounded-t-lg"
                src={course?.imageLink}
                alt="Course Image"
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {course?.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {course?.description}
                </p>
                <p>
                  <b>Total Modules: </b>
                  {course?.totalModules || "0"}
                </p>
                <p>
                  <b>Total Students: </b>
                  {course?.totalStudents || "0"}
                </p>
                <p>
              <b>Price: </b>
              {course?.price || "0"} Taka
            </p>
                <Link to={course._id}>
                  <Button
                    text="View Modules"
                    className="mx-auto mt-6 block w-full max-w-xs"
                  />
                </Link>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default AdminCourses;
