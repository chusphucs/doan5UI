import React, { useState } from "react";
import instance from "../apis/apisconfig";
import toast from "react-hot-toast";
import TaskDescription from "../modals/TaskDescriptionModal";

export default function Task({ task, refreshTasks }) {
  const [showDescription, setShowDescription] = useState(false);
  const handleChangeStatus = () => {
    instance
      .put(`user/${task.user_id}/task/${task.id}/edit_status`, {
        status: task.status,
      })
      .then((res) => {
        console.log(res);
        refreshTasks();
      })
      .catch((err) => console.log(err));
  };
  const handleDeleteTask = () => {
    console.log(task);
    instance
      .delete(`user/${task.user_id}/task/${task.id}/delete`)
      .then((res) => {
        if (res.status === 200) {
          refreshTasks();
          toast.success("Xóa thành công!");
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-full py-2 flex justify-between items-center">
      <p
        className={`cursor-pointer ${
          task.status === "todo"
            ? "text-blue-700"
            : task.status === "process"
            ? "text-orange-400"
            : "text-black"
        }`}
        onClick={() => setShowDescription(true)}
      >
        {task.title}
      </p>
      <div className="flex gap-2 items-center">
        {task.status !== "done" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.5}
            stroke="currentColor"
            className="w-5 h-5 cursor-pointer hover:fill-green-300"
            onClick={handleChangeStatus}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        )}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          ß
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#f05959"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 cursor-pointer"
          onClick={handleDeleteTask}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
          />
        </svg>
      </div>
      {showDescription && (
        <TaskDescription
          task={task}
          onClose={() => setShowDescription(false)}
        />
      )}
    </div>
  );
}
