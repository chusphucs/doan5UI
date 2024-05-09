import React from "react";
import MainLayout from "../layouts/MainLayout";
import Task from "../components/Task";
import Nav from "../components/Nav";

export default function Upcoming() {
  const tasks = ["task 1", "task 2", "task 3", "task 4"];

  return (
    <MainLayout>
      <div className="grid grid-cols-5 pt-14 h-screen">
        <Nav />
        <div className="md:grid md:col-span-4 grid col-span-5">
          <div className="flex flex-col">
            <div className="flex items-center px-12 pt-10 pb-1">
              <h1 className="text-3xl font-bold mr-8 ">Today</h1>
              <p className="">3 May</p>
            </div>
            <div className="grid grid-cols-3 pl-32 pt-4">
              <div className="col-span-1 flex flex-col max-w-[80%] border-[1px] border-gray-300 shadow-lg p-4">
                <b className="mb-4 border-b-[1px] border-gray-300">To do</b>
                {tasks.map((task) => {
                  return (
                    <div key={task.indexOf}>
                      <Task task={task} />
                    </div>
                  );
                })}
                <button>+ Add task</button>
              </div>
              <div className="col-span-1">
                <b>In Process</b>
              </div>
              <div className="col-span-1">
                <b>Done</b>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center px-12 pb-1">
              <h1 className="text-3xl font-bold mr-8">Tomorrow</h1>
              <p className="">4 May</p>
            </div>
            <div className="grid grid-cols-3 pl-32 pt-4">
              <div className="col-span-1 flex flex-col max-w-[80%] border-[1px] border-gray-300 shadow-lg p-4">
                <b className="mb-4 border-b-[1px] border-gray-300">To do</b>
                {tasks.map((task) => {
                  return (
                    <div key={task.indexOf}>
                      <Task task={task} />
                    </div>
                  );
                })}
                <button>+ Add task</button>
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
