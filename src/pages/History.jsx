import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Nav from "../components/Nav";
import instance from "../apis/apisconfig";
import TaskTeamDetail from "../modals/TaskTeamDetail";

export default function History() {
  const User_id = localStorage.getItem("userId");
  const [tasks, setTasks] = useState([]);
  const [taskDetail, setTaskDetail] = useState(null);

  const getTask = () => {
    instance
      .get(`user/${User_id}/task/`)
      .then((res) => {
        setTasks(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const handleTaskClick = (task) => {
    setTaskDetail(task);
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <MainLayout>
      <div className="grid grid-cols-5  pt-14 h-screen">
        <Nav />
        <div className=" col-span-4">
          <p className=" text-2xl font-semibold p-12">
            Lịch sử nhiệm vụ cá nhân
          </p>
          <div className="px-12">
            {tasks &&
              tasks.map((task) => {
                let bgColor = "";
                switch (task.status) {
                  case "todo":
                    bgColor = "bg-blue-300";
                    break;
                  case "process":
                    bgColor = "bg-orange-200";
                    break;
                  default:
                    bgColor = "";
                }

                return (
                  <div
                    key={task.id}
                    className={`px-4 my-2 shadow-lg py-2 md:ml-10 md:w-[80%] cursor-pointer w-full border-gray-500 rounded-md flex justify-between ${bgColor}`}
                    onClick={() => handleTaskClick(task)}
                  >
                    <div className="flex justify-start">
                      <p className="text-gray-400 mr-4 w-40 overflow-hidden text-ellipsis whitespace-nowrap">
                        {task.title}
                      </p>
                      <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {task.description}
                      </p>
                    </div>
                    <div className="pr-4 text-gray-500">
                      {new Date(task.day_start).toISOString().split("T")[0]}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {taskDetail && (
        <TaskTeamDetail
          taskDetail={taskDetail}
          onClose={() => setTaskDetail(null)}
          refresh={getTask}
        />
      )}
    </MainLayout>
  );
}
