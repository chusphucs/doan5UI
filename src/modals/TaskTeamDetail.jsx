import React, { useEffect, useState } from "react";
import instance from "../apis/apisconfig";
import toast from "react-hot-toast";

export default function TaskTeamDetail({ taskDetail, onClose, refresh }) {
  const teamId = taskDetail.team_id;
  const userId = localStorage.getItem("userId");
  const taskId = String(taskDetail.id);
  const [team, setTeam] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const startDate = new Date(taskDetail.day_start);
  const endDate = new Date(taskDetail.day_expire);

  const startDateString = startDate.toISOString().split("T")[0];
  const startTimeString = startDate.toTimeString().split(" ")[0].slice(0, 5);
  const endTimeString = endDate.toTimeString().split(" ")[0].slice(0, 5);

  const [formData, setFormData] = useState({
    title: taskDetail.title || "",
    user_id: userId,
    task_id: taskDetail.id || "",
    description: taskDetail.description || "",
    day_start: taskDetail.day_start || "",
    day_expire: taskDetail.day_expire,
    status: taskDetail.status,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleDelete = () => {
    const data = {
      user_id: userId,
      task_id: taskId,
    };
    instance
      .delete(`team/${taskDetail.team_id}/task/delete`, { data })
      .then((res) => {
        if (res.data.message === "Delete team task success") {
          toast.success("Xóa thành công!");
          onClose();
          refresh();
        }
      })
      .catch((err) => console.log(err));
  };
  const handleUpdate = () => {
    console.log(formData);
    instance
      .put(`team/${teamId}/task/edit`, formData)
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success("Cập nhật nhiệm vụ thành công!");
          onClose();
          refresh();
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    instance
      .get(`/teams/${teamId}`, {
        params: {
          user_id: userId,
        },
      })
      .then((res) => {
        setTeam(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleEdit = () => {
    instance
      .put(`team/${teamId}/task/member/edit`, formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg p-10 pt-4 w-[600px]">
        <div className="flex justify-between items-center mb-4">
          <input
            disabled={!isEdit}
            id="title"
            className={` ${
              isEdit ? " underline" : "outline-none "
            }  text-xl rounded-md px-4 py-2 w-[50%]  focus:border-blue-500 focus:ring-blue-500`}
            type="text"
            value={formData.title}
            onChange={handleChange}
          />
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 hover:fill-red-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
        <hr className="border w-full m-2" />
        <div className="  grid grid-cols-3">
          <div className="col-span-2">
            <p className="font-bold">Description:</p>
            <input
              disabled={!isEdit}
              id="description"
              className={` ${
                isEdit ? "border-gray-300 border-[1px]" : "outline-none "
              }  text-xl rounded-md px-4 py-2 w-[70%]  focus:border-blue-500 focus:ring-blue-500`}
              type="text"
              value={formData.description}
              onChange={handleChange}
            />
            <div className="absolute bottom-4 left-10 flex gap-10 ">
              <button
                onClick={() => {
                  if (isEdit) {
                    handleUpdate();
                  }
                  setIsEdit(!isEdit);
                }}
                className=" p-1 border shadow-md rounded-full w-20 hover:bg-gray-300 duration-300 "
              >
                {isEdit ? "Save" : "Edit"}
              </button>
              <button
                className="p-1 border shadow-md rounded-full w-20 hover:bg-red-400"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="col-span-1 bg-blue-200 rounded-md  p-4">
            <p className="text-sm font-bold">Team: {team.name}</p>
            <p className="text-sm font-bold py-2">Ngay: {startDateString}</p>
            <div className="flex justify-around text-sm font-bold">
              <p>Bắt đầu</p>
              <p>Kết thúc</p>
            </div>
            <div className="flex  justify-around text-sm font-bold">
              <p>{startTimeString}</p>
              <p>{endTimeString}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
