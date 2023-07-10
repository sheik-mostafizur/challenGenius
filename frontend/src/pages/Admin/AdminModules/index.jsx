import {Accordion, AccordionItem} from "@szhsin/react-accordion";
import "./style.css";
import {useState} from "react";
import Button from "../../../components/Button";
import {Link} from "react-router-dom";
const AdminModules = () => {
  const [showLesson, setShowLesson] = useState({});
  const lessons = [
    {
      id: 1,
      title: "Lessons One",
      description: "one lorem ipsum dolor sit amet, consectetur adip",
    },
    {
      id: 2,
      title: "Lessons Two",
      description: "two lorem ipsum dolor sit amet, consectetur adip",
    },
  ];
  return (
    <div>
      <section className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">AdminModules</h1>
        <Link to="modules/add">
          <Button text="Add A Module" />
        </Link>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="bg-primary-100">
          {showLesson?.id}
          <h2>{showLesson?.title}</h2>
          {showLesson?.description}
        </div>
        <div>
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
        </div>
      </section>
    </div>
  );
};

export default AdminModules;
