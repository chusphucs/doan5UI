import React, { useEffect } from "react";
import { useState } from "react";
import instance from "../apis/apisconfig";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const AddNewMember = ({ onClose, refresh }) => {
  const userId = localStorage.getItem("userId");
  const teamId = useParams();
  console.log(teamId.teamId);
  const [memberName, setMemberName] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [memberId, setMemberId] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post(
        `team/${teamId.teamId}/owner/member/add`,
        {
          user_id: userId,
          user_id_member: memberId,
          role: "member",
        }
      );
      if (response.data.status_code === 200) {
        toast.success(response.data.message);
        refresh();
        onClose();
      }
    } catch (error) {
      console.log("Error creating new team:", error);
    }
  };
  const searchUsers = async () => {
    try {
      const response = await instance.get("/users/search", {
        params: {
          name: memberName,
        },
      });
      setSearchList(response.data.data);
    } catch (error) {
      console.error("Error searching for users:", error);
      throw error;
    }
  };
  useEffect(() => {
    searchUsers();
  }, [memberName]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Add new member</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              required
            />
            {searchList && searchList.length > 0 && (
              <div className="absolute bg-white border rounded mt-2 w-[80%] max-h-48 overflow-y-auto z-10">
                <ul>
                  {searchList.map((user) => (
                    <li
                      key={user.id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setMemberName(user.name);
                        setMemberId(user.id);
                        setSearchList([]);
                        console.log(user.id);
                      }}
                    >
                      {user.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddNewMember;
