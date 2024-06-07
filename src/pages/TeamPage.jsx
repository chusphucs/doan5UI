import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Nav from "../components/Nav";
import AddNewMember from "../modals/AddNewMember";
import instance from "../apis/apisconfig";
import { useParams } from "react-router-dom";
import AddTaskModal from "../modals/AddTaskModal";
import TaskTeamDetail from "../modals/TaskTeamDetail";

export default function TeamPage() {
  const userId = localStorage.getItem("userId");
  const { teamId, teamName } = useParams();
  const [addTask, setAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [memberOfTeam, setMemberOfTeam] = useState([]);
  const [taskDetail, setTaskDetail] = useState(null);
  const [addMember, setAddMember] = useState(false);

  const getMember = () => {
    instance
      .get(`team/${teamId}/member`)
      .then((res) => {
        setMemberOfTeam(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getMember();
  }, [teamId]);
  const getTask = () => {
    instance
      .get(`team/${teamId}/task`)
      .then((res) => {
        setTasks(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getTask();
  }, [teamId]);
  const handleTaskClick = (task) => {
    setTaskDetail(task);
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-5 pt-14 h-screen">
        <Nav />
        <div className="md:grid md:col-span-4 grid col-span-5">
          <div className="">
            <div className="w-full p-4 justify-between items-center flex">
              <p className="ml-4 text-sm text-gray-600">Teams / {teamName}</p>
              <div className="flex mr-10 items-center gap-4">
                <button
                  onClick={() => setAddMember(true)}
                  className="border-gray-500 border-[0.2px] px-2 pb-1 rounded-full "
                >
                  +
                </button>
                {memberOfTeam &&
                  memberOfTeam.map((member) => {
                    return (
                      <div
                        key={member.id}
                        className="h-6 w-6 rounded-full cursor-pointer flex justify-center items-center bg-gray-300 text-gray-700"
                      >
                        {member.user.name.charAt(0).toUpperCase()}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div>
              <button
                onClick={() => setAddTask(true)}
                className=" border rounded-full text-xs border-black p-2 ml-4"
              >
                Thêm nhiệm vụ
              </button>
            </div>

            <div className="p-10">
              {tasks &&
                tasks.map((task) => {
                  console.log(task);
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
                    <div className="flex items-center gap-4">
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
                      <div>Giao nhiệm vụ</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {addMember && (
        <AddNewMember onClose={() => setAddMember(false)} refresh={getMember} />
      )}
      {addTask && (
        <AddTaskModal
          onClose={() => setAddTask(false)}
          refreshTasks={getTask}
          teamId={teamId}
          userId={userId}
        />
      )}
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
