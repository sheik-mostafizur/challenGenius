// import {Accordion, AccordionItem} from "@szhsin/react-accordion";
import "./style.css";
import {useState} from "react";
import Button from "../../../components/Button";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {BiEdit} from "react-icons/bi";
const AdminModules = () => {
  const {id: courseId} = useParams();
  const {
    data: loadedModules,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`${courseId}-module`],
    queryFn: async () => {
      const response = await axios.get(`/admin/courses/${courseId}/modules/`);
      return response.data;
    },
  });

  const [showContent, setShowContent] = useState({});

  return (
    <div>
      <section className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">AdminModules</h1>
        <Link to="modules/add">
          <Button text="Add A Module" />
        </Link>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="relative bg-primary-100">
          {Object.keys(showContent).length ? (
            <>
              <Link to={`modules/update/${showContent._id}`}>
                <button>
                  <BiEdit className="absolute right-2 rounded-md bg-primary-100 text-3xl text-primary-600" />
                </button>
              </Link>
              {showContent?._id}
              <h2>{showContent?.title}</h2>
              <div
                className="bg-primary-200 p-1"
                dangerouslySetInnerHTML={{__html: showContent?.content}}
              />
            </>
          ) : (
            "Click module"
          )}
        </div>
        <div>
          {loadedModules &&
            loadedModules.map((module) => (
              <div key={module._id}>
                <h4
                  className="my-1 cursor-pointer bg-primary-50"
                  onClick={() => setShowContent(module)}>
                  {module.moduleNumber} Module: {module.title}
                </h4>
              </div>
            ))}
        </div>
        {/* <div>
          <Accordion>
            <AccordionItem header="What is Lorem Ipsum?">
              {lessons.map((lesson) => {
                return (
                  <Button
                    handleClick={() => setShowLesson(lesson)}
                    key={lesson.id}
                    className="block"
                    text={lesson.title}
                  />
                );
              })}
            </AccordionItem>
          </Accordion>
        </div> */}
      </section>
    </div>
  );
};

export default AdminModules;
