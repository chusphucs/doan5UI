import React, { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import Task from "../components/Task";
import Nav from "../components/Nav";
import instance from "../apis/apisconfig";
import { useState } from "react";
import AddTaskModal from "../modals/AddTaskModal";
import moment from "moment";
export default function Upcoming() {
  const User_id = localStorage.getItem("userId");

  const currentDate = new Date().toISOString().slice(0, 10);
  const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");
  const [addTask, setAddTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [upTask, setUpTask] = useState([]);
  const [todoTask, setTodoTask] = useState([]);
  const [processTask, setProcessTask] = useState([]);
  const [doneTask, setDoneTask] = useState([]);
  const getData = () => {
    instance
      .get(`user/${User_id}/task/upcomming`)
      .then((res) => {
        if (res.data.status === 200) {
          setUpTask(res.data.data.tomorrow);
          const tasklisttoday = res.data.data.today;
          setTodoTask(tasklisttoday.filter((task) => task.status === "todo"));
          console.log(tasklisttoday.filter((task) => task.status === "todo"));
          setProcessTask(
            tasklisttoday.filter((task) => task.status === "process")
          );
          setDoneTask(tasklisttoday.filter((task) => task.status === "done"));
        }
      })
      .catch((err) => console.log(err));
  };
  const handleTaskClick = (task) => {
    setSelectedTask(task); // Cập nhật state với task đã click
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <MainLayout>
      <div className="grid grid-cols-5 pt-14 h-screen">
        <Nav />
        <div className="md:grid md:col-span-4 grid col-span-5">
          <div className="flex flex-col">
            <div className="flex items-center px-12 pt-10 pb-1">
              <h1 className="text-3xl font-bold mr-8 ">Today</h1>
              <p className="">{currentDate}</p>
            </div>
            <div className="md:grid md:grid-cols-3 flex flex-col gap-10 p-4 md:pl-10 ">
              <div className="col-span-1 flex flex-col  border-[1px] border-gray-300 shadow-lg p-4 ">
                <b className="mb-4 border-b-[1px] border-gray-300">To do</b>
                {todoTask.map((task) => {
                  return (
                    <div key={task.id}>
                      <Task task={task} refreshTasks={getData} />
                    </div>
                  );
                })}
                <button onClick={() => setAddTask(true)}>+ Add task</button>
              </div>
              <div className="col-span-1 flex flex-col  border-[1px] border-gray-300 shadow-lg p-4">
                <b className="mb-4 border-b-[1px] border-gray-300">
                  In Process
                </b>
                {processTask.map((task) => {
                  return (
                    <div key={task.id}>
                      <Task task={task} refreshTasks={getData} />
                    </div>
                  );
                })}
              </div>
              <div className="col-span-1 flex flex-col  border-[1px] border-gray-300 shadow-lg p-4">
                <b className="mb-4 border-b-[1px] border-gray-300">Done</b>
                {doneTask.map((task) => {
                  return (
                    <div key={task.id}>
                      <Task task={task} refreshTasks={getData} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center px-12 pb-1">
              <h1 className="text-3xl font-bold mr-8">Tomorrow</h1>
              <p className="">{tomorrow}</p>
            </div>

            <div class="flex flex-col md:flex-row">
              <div class="md:w-3/5">
                <div className="p-4">
                  {upTask.map((task) => {
                    return (
                      <div
                        key={task.id}
                        className="px-4 my-2 shadow-lg py-2 md:ml-10 md:w-[80%] cursor-pointer w-full border-gray-500 rounded-md flex justify-between"
                        onClick={() => handleTaskClick(task)}
                      >
                        <div className="flex justify-start">
                          <p className=" text-gray-400 mr-4 w-20 overflow-hidden">
                            {task.title}
                          </p>
                          <p>{task.description}</p>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                          <p>delete</p> <p>edit</p>
                        </div>
                      </div>
                    );
                  })}
                  <button
                    className="p-4 md:pl-10 text-blue-400"
                    onClick={() => setAddTask(true)}
                  >
                    -> Add a task for tomorrow
                  </button>
                </div>
              </div>
              <div class="md:w-2/5">
                <div className="bg-white p-8 rounded-md md:mr-32 md:m-0 m-6">
                  <div className="flex justify-between gap-10 items-center mb-4">
                    <h2 className="text-lg font-bold">{selectedTask?.title}</h2>
                  </div>
                  <p className="text-gray-400 text-xs mb-1">Description:</p>
                  <p className="text-gray-700 pl-2 w-[250px] md:w-[400px] h-20">
                    {selectedTask?.description}
                  </p>
                  <p className="text-gray-400 text-xs mb-1">Start Date</p>
                  <p className="text-gray-500 text-sm pl-2">
                    {selectedTask &&
                      new Date(selectedTask?.day_start)
                        .toISOString()
                        .split("T")[0]}
                  </p>
                  <p className="text-gray-400 text-xs mb-1">Start Time</p>
                  <div className="flex justify-start gap-2 pl-2">
                    <p className="text-sm text-gray-500">
                      {selectedTask &&
                        new Date(selectedTask?.day_start)
                          .toTimeString()
                          .split(" ")[0]
                          .slice(0, 5)}
                    </p>
                    <p className="text-sm text-gray-500">-</p>
                    <p className="text-sm text-gray-500">
                      {selectedTask &&
                        new Date(selectedTask?.day_expire)
                          .toTimeString()
                          .split(" ")[0]
                          .slice(0, 5)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {addTask && (
        <AddTaskModal
          userId={User_id}
          onClose={() => setAddTask(false)}
          refreshTasks={getData}
        />
      )}
    </MainLayout>
  );
}
