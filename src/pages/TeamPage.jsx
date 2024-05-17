import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Nav from "../components/Nav";
import AddNewMember from "../modals/AddNewMember";
import instance from "../apis/apisconfig";
import { useParams } from "react-router-dom";

export default function TeamPage() {
  const { teamId, teamName } = useParams();
  console.log(teamId, teamName);
  const [memberOfTeam, setMemberOfTeam] = useState([]);
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
  return (
    <MainLayout>
      <div className="grid grid-cols-5 pt-14 h-screen">
        <Nav />
        <div className="md:grid md:col-span-4 grid col-span-5">
          <div className="flex flex-col">
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
                      <div className="h-6 w-6 rounded-full cursor-pointer flex justify-center items-center bg-gray-300 text-gray-700">
                        {member.user.name.charAt(0).toUpperCase()}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {addMember && (
        <AddNewMember onClose={() => setAddMember(false)} refresh={getMember} />
      )}
    </MainLayout>
  );
}
