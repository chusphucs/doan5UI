import React from "react";

const AddTaskModal = ({ taskForm, onChange, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Add Task</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="title" className="block font-semibold mb-2">Title</label>
            <input type="text" id="title" name="title" value={taskForm.title} onChange={onChange} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-semibold mb-2">Description</label>
            <textarea id="description" name="description" value={taskForm.description} onChange={onChange} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="start" className="block font-semibold mb-2">Start</label>
            <input type="text" id="start" name="start" value={taskForm.start} onChange={onChange} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="end" className="block font-semibold mb-2">End</label>
            <input type="text" id="end" name="end" value={taskForm.end} onChange={onChange} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
