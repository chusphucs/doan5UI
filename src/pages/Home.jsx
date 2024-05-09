import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link, useLocation } from "react-router-dom";
import Task from "../components/Task";
import Nav from "../components/Nav";
import AddTaskModal from "../modals/AddTaskModal";

export default function Home() {
  const [addTask, setAddTask] = useState(false);
  const tasks = ["task 1", "task 2", "task 3", "task 4"];

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
                {tasks.map((task) => {
                  return (
                    <div key={task.indexOf}>
                      <Task task={task} />
                    </div>
                  );
                })}
                <button onClick={() => setAddTask(true)}>+ Add task</button>
              </div>
              <div className="col-span-1">
                <b>In Process</b>
              </div>
              <div className="col-span-1">
                <b>Done</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
