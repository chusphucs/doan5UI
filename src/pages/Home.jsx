import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link, useLocation } from "react-router-dom";
import Task from "../components/Task";
import Nav from "../components/Nav";
import AddTaskModal from "../modals/AddTaskModal";
import instance from "../apis/apisconfig";

export default function Home() {
  const [addTask, setAddTask] = useState(false);
  const [todoTask, setTodoTask] = useState([]);
  const [processTask, setProcessTask] = useState([]);
  const [doneTask, setDoneTask] = useState([]);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
  });

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const getTask = () => {
    instance
      .get("user/4/task")
      .then((res) => {
        const tasklist = res.data.data;
        setTodoTask(tasklist.filter((task) => task.status === "todo"));
        console.log(tasklist.filter((task) => task.status === "todo"));
        setProcessTask(tasklist.filter((task) => task.status === "process"));
        console.log(tasklist.filter((task) => task.status === "process"));
        setDoneTask(tasklist.filter((task) => task.status === "done"));
        console.log(tasklist.filter((task) => task.status === "done"));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <MainLayout>
      <div className="grid grid-cols-5 pt-14 h-screen">
        <Nav />
        <div className="md:grid md:col-span-4 grid col-span-5">
          <div className="flex flex-col">
            <div className="flex items-center px-12 pt-10 pb-1">
              <h1 className="text-3xl font-bold mr-8">Today</h1>
              <p className="">3 May</p>
            </div>
            <div className="md:grid md:grid-cols-3 flex flex-col gap-10 pl-10 md:pl-32 pt-4">
              <div className="col-span-1 flex flex-col md:max-w-[80%] max-w-[90%] border-[1px] border-gray-300 shadow-lg p-4">
                <b className="mb-4 border-b-[1px] border-gray-300">To do</b>
                {todoTask.map((task) => {
                  return (
                    <div key={task.id}>
                      <Task task={task} />
                    </div>
                  );
                })}
                <button onClick={() => setAddTask(true)}>+ Add task</button>
              </div>
              <div className="col-span-1 flex flex-col md:max-w-[80%] max-w-[90%] border-[1px] border-gray-300 shadow-lg p-4">
                <b className="mb-4 border-b-[1px] border-gray-300">
                  In Process
                </b>
                {processTask.map((task) => {
                  return (
                    <div key={task.id}>
                      <Task task={task} />
                    </div>
                  );
                })}
              </div>
              <div className="col-span-1 flex flex-col md:max-w-[80%] max-w-[90%] border-[1px] border-gray-300 shadow-lg p-4">
                <b className="mb-4 border-b-[1px] border-gray-300">Done</b>
                {doneTask.map((task) => {
                  return (
                    <div key={task.id}>
                      <Task task={task} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {addTask && (
        <AddTaskModal
          taskForm={taskForm}
          onChange={handleTaskFormChange}
          onClose={() => setAddTask(false)}
        />
      )}
    </MainLayout>
  );
}
