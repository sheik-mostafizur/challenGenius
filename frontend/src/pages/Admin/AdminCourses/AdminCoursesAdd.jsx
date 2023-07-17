import {useForm} from "react-hook-form";
import Button from "../../../components/Button";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from "../../../config/firebase";
import {v4} from "uuid";
import Swal from "sweetalert2";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const AdminCoursesAdd = () => {
  const navigate = useNavigate();

  const {register, handleSubmit, reset} = useForm();
  const onSubmit = (data) => {
    if (!data.imageLink[0]) return alert("Please provide an image");

    const imageRef = ref(storage, `images/${v4() + data.imageLink[0].name}`);

    uploadBytes(imageRef, data.imageLink[0])
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            data.imageLink = url;
            axios
              .post("/admin/courses/", data)
              .then(({data}) => {
                if (data.insertedId) {
                  reset();
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Course Added Successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/dashboard/courses");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => console.log(error));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold">AdminCoursesAdd</h1>
      </section>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="course title"
              {...register("title")}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Course Price
            </label>
            <input
              type="text"
              id="price"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="course price"
              {...register("price")}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Course Description
            </label>
            <textarea
              id="message"
              rows="4"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Description..."
              {...register("description")}
              required></textarea>
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input">
              Upload course image
            </label>
            <input
              className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              {...register("imageLink")}
              required
            />
          </div>
          <Button type="submit" text="Add A Course" />
        </form>
      </section>
    </div>
  );
};

export default AdminCoursesAdd;
