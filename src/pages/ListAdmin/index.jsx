import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAdmins, selectAdmins } from "../../store/adminsSlice";
import { APIAdmins } from "../../apis/APIAdmins";
import useIsAdmin from "../../hooks/useIsAdmin";
import { auth } from "../../configs/firebase";
import Swal from "sweetalert2";

function ListAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateAdmins = useSelector(selectAdmins);
  const isAdmin = useIsAdmin();
  const currentUid = auth.currentUser?.uid;
  const [uidInput, setUidInput] = useState("");

  useEffect(() => {
    dispatch(fetchGetAdmins());
  }, [dispatch]);

  const handleAdd = async () => {
    const uid = uidInput.trim();
    if (!uid) {
      Swal.fire({ icon: "warning", title: "UID cannot be empty", showConfirmButton: false, timer: 1500 });
      return;
    }
    try {
      await APIAdmins.addAdmin(uid);
      Swal.fire({
        icon: "success",
        title: "Admin Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setUidInput("");
        dispatch(fetchGetAdmins());
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to add admin!",
        text: "Make sure this user exists in Firebase Auth.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleDelete = (uid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await APIAdmins.deleteAdmin(uid);
          Swal.fire({
            icon: "success",
            title: "Admin Deleted Successfully",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => navigate(0));
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Failed to delete admin!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <>
      {stateAdmins?.status === "loading" && (
        <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
          <div className="flex items-center">
            <span className="text-3xl mr-4">Loading</span>
            <svg className="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      )}
      <div className="flex flex-row">
        <Sidebar />
        <div className="px-[2rem] pt-[2rem] min-h-screen w-screen flex flex-col justify-between">
          <div className="mb-4">
            <input
              type="text"
              value={uidInput}
              onChange={(e) => setUidInput(e.target.value)}
              placeholder="Paste Firebase Auth UID of the new admin"
              className="border border-gray-400 p-2 rounded w-[24rem] max-w-full"
            />
            <button
              type="button"
              onClick={handleAdd}
              className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center ml-2"
            >
              Add Admin
            </button>
          </div>
          <table className="h-auto w-full border-collapse md:table">
            <thead className="block md:table-header-group">
              <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">UID</th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Added At</th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Action</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {stateAdmins.data?.map((admin) => (
                <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row" key={admin.id}>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell break-all">
                    <span className="inline-block w-1/3 md:hidden font-bold">UID</span>
                    {admin.id}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Added At</span>
                    {admin.addedAt ? new Date(admin.addedAt).toLocaleString() : "-"}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Action</span>
                    <button
                      className="font-medium text-red-600 hover:underline cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
                      disabled={isAdmin && admin.id === currentUid}
                      onClick={() => handleDelete(admin.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ListAdmin;
