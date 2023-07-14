import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useLoaderData} from "react-router-dom";
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import Button from "../../components/Button";
import {useForm} from "react-hook-form";
import {uesAuthContext} from "../../context/AuthContext";

const Enroll = () => {
  const {user} = uesAuthContext();
  const {data: loadedCourse} = useLoaderData();
  const {register, handleSubmit, reset} = useForm();
  const onSubmit = (data) => {
    data.status= 'pending';
    console.table(data);
  };

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <Container>
        <div className="flex items-center gap-8">
          <div>
            <img src={loadedCourse?.imageLink} alt="" />
            <h3>{loadedCourse?.title}</h3>
            <p>{loadedCourse?.description}</p>
            <p>
              <b>Total Students: </b>
              {loadedCourse?.totalStudents || "0"}
            </p>
          </div>
          <div className="min-w-[500px]">
            <h2>Pay Details</h2>
            <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label
                  htmlFor="courseId"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Course ID
                </label>
                <input
                  type="text"
                  id="courseId"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="course id"
                  value={loadedCourse?._id}
                  readOnly
                  {...register("courseId")}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  User Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="user email"
                  value={user?.email}
                  readOnly
                  {...register("email")}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  User Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="User Phone Number"
                  {...register("phone")}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="payPhone"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Pay Phone Number
                </label>
                <input
                  type="tel"
                  id="payPhone"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Pay Phone Number"
                  {...register("payPhone")}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="transID"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Transition ID
                </label>
                <input
                  type="text"
                  id="transID"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Transition ID (Provide same value with case sensitive)"
                  {...register("transID")}
                  required
                />
              </div>
              <Button type="submit" text="Submit Pay Information" />
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Enroll;
