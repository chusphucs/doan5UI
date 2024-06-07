import React, { useState } from "react";
import toast from "react-hot-toast";
import instance from "../apis/apisconfig";

const EditTask = ({ task, onClose, refresh }) => {
  const userId = localStorage.getItem("userId");
  console.log(task.id);
  const [formData, setFormData] = useState({
    title: task.title,
    day_start: task.day_start,
    day_expire: task.day_expire,
    description: task.description,
    status: task.status,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month =
      dateTime.getMonth() + 1 < 10
        ? "0" + (dateTime.getMonth() + 1)
        : dateTime.getMonth() + 1;
    const day =
      dateTime.getDate() < 10 ? "0" + dateTime.getDate() : dateTime.getDate();
    const hours =
      dateTime.getHours() < 10
        ? "0" + dateTime.getHours()
        : dateTime.getHours();
    const minutes =
      dateTime.getMinutes() < 10
        ? "0" + dateTime.getMinutes()
        : dateTime.getMinutes();
    const seconds =
      dateTime.getSeconds() < 10
        ? "0" + dateTime.getSeconds()
        : dateTime.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedTask = {
      title: formData.title,
      description: formData.description,
      day_start: formatDateTime(formData.day_start),
      day_expire: formatDateTime(formData.day_expire),
      status: formData.status,
    };

    try {
      const response = await instance.put(
        `user/${userId}/task/${task.id}/edit`,
        updatedTask
      );
      if (response.data.message === "Edit user task success") {
        toast.success("Task updated successfully!");
        onClose();
        refresh();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task.");
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Edit Task</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Enter task title"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="day_start"
              className="block text-gray-700 font-bold mb-2"
            >
              Start Date
            </label>
            <input
              type="datetime-local"
              id="day_start"
              name="day_start"
              value={formData.day_start}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="day_expire"
              className="block text-gray-700 font-bold mb-2"
            >
              Expire Date
            </label>
            <input
              type="datetime-local"
              id="day_expire"
              name="day_expire"
              value={formData.day_expire}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              rows="4"
              placeholder="Enter task description"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-gray-700 font-bold mb-2"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="todo">To Do</option>
              <option value="process">In Process</option>
              <option value="done">Done</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
