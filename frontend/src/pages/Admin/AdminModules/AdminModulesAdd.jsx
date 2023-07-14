import {useForm} from "react-hook-form";
import Button from "../../../components/Button";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import JoditEditor from "jodit-react";
import {useRef, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
const AdminModulesAdd = () => {
  const {id: courseId} = useParams();
  const {data: totalModule} = useLoaderData();

  const navigate = useNavigate();
  const {register, handleSubmit} = useForm();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const onSubmit = (data) => {
    if (!courseId || !content) return alert("content and courseId is required");
    data.courseId = courseId;
    data.content = content;
    axios
      .post(`/admin/courses/${courseId}/modules`, data)
      .then(({data}) => {
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Module Added Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/courses/" + courseId);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold">Add a module</h1>
      </section>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 flex items-center gap-8">
            <div className="w-full">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Module Title
              </label>
              <input
                type="text"
                id="title"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="module title"
                {...register("title")}
                required
              />
            </div>
            <div>
              <label
                htmlFor="moduleNumber"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Module moduleNumber
              </label>
              <input
                type="text"
                id="moduleNumber"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="module moduleNumber"
                value={totalModule+1}
                {...register("moduleNumber")}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Module Content
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
          <Button type="submit" text="Add A Module" />
        </form>
        <div className="mt-8">
          <div dangerouslySetInnerHTML={{__html: content}} />
        </div>
      </section>
    </div>
  );
};

export default AdminModulesAdd;
