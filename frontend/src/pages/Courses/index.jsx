import axios from "axios";
import Container from "../../components/Container";
import Navbar from "../../components/Navbar";
import {useQuery} from "@tanstack/react-query";
import LoaderSpinner from "../../components/LoaderSpinner";
import Button from "../../components/Button";
import {Link} from "react-router-dom";

const Courses = () => {
  const {data: loadedCourses, isLoading} = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await axios.get("/courses");
      return response.data;
    },
  });
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <Container>
        {isLoading ? (
          <LoaderSpinner />
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {loadedCourses.map((course) => (
              <div key={course._id}>
                <img src={course.imageLink} alt="" />
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p>
                  <b>Total Students: </b>
                  {course?.totalStudents || "0"}
                </p>
                <p>
                  <b>Price: </b>
                  {course?.price || "0"} Taka
                </p>
                <Link to={`/enroll/${course._id}`}>
                  <Button text="Enroll Now" size="lg" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Courses;
