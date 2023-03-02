import React, { useEffect } from "react";
import { UserType } from "../../../types/types";

interface DataGridProps {
  users: UserType[];
  selectedUserId: string;
  onRowSelect: (userId: UserType) => void;
}

const DataGridSimple: React.FC<DataGridProps> = ({
  users,
  selectedUserId,
  onRowSelect,
}) => {
  // Create columns array from JSON file or User interface
  const columns = [
    { key: "username", header: "username" },
    { key: "isAdmin", header: "isAdmin" },
    { key: "family", header: "family" },
  ];

  useEffect(() => {
    console.log("usersusersusers", users);
  }, [users]);

  return (
    <table className="border rounded-lg">
      <thead className="flex w-full  ">
        <tr className="flex  m-1 ">
          {columns.map(({ key, header }, index) => (
            <th className={`m-2 p-2 ${index > 0 ? "border-r" : ""}`} key={key}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="flex flex-wrap w-full  ">
        {users?.map((user: any) => (
          <>
            {user?._id !== undefined ? (
              <tr
                key={user._id}
                onClick={() => onRowSelect(user)}
                className={`border cursor-pointer flex justify-around  w-full ${
                  selectedUserId === user._id ? " border-2 bg-gray-600 " : ""
                }`}
                // + selectedUserIds?.includes(user._id)
                //     ? "selected"
                //     : ""
              >
                {columns?.map(({ key }) => (
                  <>
                    <td className="text-white" key={key}>
                      {user?.[key]?.toString() ?? "-"}
                    </td>
                  </>
                ))}
              </tr>
            ) : (
              <></>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
};

export default DataGridSimple;
