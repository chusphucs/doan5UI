import React from "react";

const TaskDescription = ({ task, onClose }) => {
  console.log(task);
  const handleClose = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const startDate = new Date(task.day_start);
  const endDate = new Date(task.day_expire);

  const startDateString = startDate.toISOString().split("T")[0];
  const startTimeString = startDate.toTimeString().split(" ")[0].slice(0, 5);
  const endTimeString = endDate.toTimeString().split(" ")[0].slice(0, 5);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center "
      onClick={handleClose}
    >
      <div className="bg-white p-8 rounded-md">
        <div className="flex justify-between gap-10 items-center mb-4">
          <h2 className="text-lg font-bold">{task.title}</h2>
        </div>
        <p className="text-gray-400 text-xs mb-1">Description:</p>
        <p className="text-gray-700 pl-2 w-[250px] md:w-[400px] h-20">
          {task.description}
        </p>
        <p className="text-gray-400 text-xs mb-1">Start Date</p>
        <p className="text-gray-500 text-sm pl-2">{startDateString}</p>
        <p className="text-gray-400 text-xs mb-1">Start Time</p>
        <div className="flex justify-start gap-2 pl-2">
          <p className="text-sm text-gray-500">{startTimeString}</p>
          <p className="text-sm text-gray-500">-</p>
          <p className="text-sm text-gray-500">{endTimeString}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskDescription;
