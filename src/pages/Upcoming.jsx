import React, { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import Task from "../components/Task";
import Nav from "../components/Nav";
import instance from "../apis/apisconfig";
import { useState } from "react";
import AddTaskModal from "../modals/AddTaskModal";
import moment from "moment";
import toast from "react-hot-toast";
import EditTask from "../modals/EditTask";
export default function Upcoming() {
  const User_id = localStorage.getItem("userId");
  const [isEdit, setIsEdit] = useState(false);

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
  const handleDeleteTask = () => {
    console.log(selectedTask);
    instance
      .delete(`user/${selectedTask.user_id}/task/${selectedTask.id}/delete`)
      .then((res) => {
        if (res.status === 200) {
          getData();
          setSelectedTask(null);
          toast.success("Xóa thành công!");
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleTaskClick = (task) => {
    setSelectedTask(task);
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
              <h1 className="text-3xl font-bold mr-8 ">Hôm nay</h1>
              <p className="">{currentDate}</p>
            </div>
            <div className="md:grid md:grid-cols-3 flex flex-col gap-10 p-4 md:pl-10 ">
              <div className="col-span-1 flex flex-col  border-[1px] border-gray-300 shadow-lg p-4 ">
                <b className="mb-4 border-b-[1px] border-gray-300">Chuẩn bị</b>
                {todoTask.map((task) => {
                  return (
                    <div key={task.id}>
                      <Task task={task} refreshTasks={getData} />
                    </div>
                  );
                })}
                <button onClick={() => setAddTask(true)}>
                  + Thêm nhiệm vụ{" "}
                </button>
              </div>
              <div className="col-span-1 flex flex-col  border-[1px] border-gray-300 shadow-lg p-4">
                <b className="mb-4 border-b-[1px] border-gray-300">
                  Đang thực hiện
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
                <b className="mb-4 border-b-[1px] border-gray-300">
                  Hoàn thành
                </b>
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
              <h1 className="text-3xl font-bold mr-8">Ngày mai</h1>
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
                          <p className=" text-gray-400 mr-4 w-40 overflow-hidden">
                            {task.title}
                          </p>
                          <p>{task.description}</p>
                        </div>
                      </div>
                    );
                  })}
                  <button
                    className="p-4 md:pl-10 text-blue-400"
                    onClick={() => setAddTask(true)}
                  >
                    -> Thêm nhiệm vụ cho ngày mai
                  </button>
                </div>
              </div>
              <div class="md:w-2/5">
                <div className="bg-white p-8 rounded-md md:mr-32 md:m-0 m-6">
                  <div className="flex justify-between gap-10 items-center mb-4">
                    <h2 className="text-lg font-bold">{selectedTask?.title}</h2>
                  </div>
                  <p className="text-gray-400 text-xs mb-1">Chi tiết:</p>
                  <p className="text-gray-700 pl-2 w-[250px] md:w-[400px] h-20">
                    {selectedTask?.description}
                  </p>
                  <p className="text-gray-400 text-xs mb-1">Ngày bắt đầu</p>
                  <p className="text-gray-500 text-sm pl-2">
                    {selectedTask &&
                      new Date(selectedTask?.day_start)
                        .toISOString()
                        .split("T")[0]}
                  </p>
                  <p className="text-gray-400 text-xs mb-1">
                    Thời gian bắt đầu
                  </p>
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
                  <div className="flex items-center pt-6 gap-4">
                    <button
                      className="px-2 py-1 text-sm rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                      onClick={handleDeleteTask}
                      aria-label="Delete Task"
                    >
                      Xóa
                    </button>

                    <button
                      className="px-2 py-1 text-sm rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => setIsEdit(true)}
                      aria-label="Edit Task"
                    >
                      Chỉnh sửa
                    </button>
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
      {isEdit && (
        <EditTask
          task={selectedTask}
          onClose={() => setIsEdit(false)}
          refresh={getData}
        />
      )}
    </MainLayout>
  );
}
