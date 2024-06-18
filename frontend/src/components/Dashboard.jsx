import { useEffect, useState } from "react";
import Appbar from "./Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getBalance() {
      const token = localStorage.getItem("token");
      const accountResponse = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (accountResponse.status !== 200) {
        alert("Cannot get the balance");
        console.error(accountResponse.message);
      } else {
        setBalance(accountResponse.data.balance);
      }
    }
    getBalance();
  }, []);

  useEffect(() => {
    async function getUsers() {
      const token = localStorage.getItem("token");
      const userResponse = await axios.get(
        `http://localhost:3000/api/v1/user/bulk?filter=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(userResponse.data.users);
    }
    getUsers();
  }, [filter]);

  return (
    <div className="bg-white w-full cursor-default">
      <Appbar />
      <div className="p-5">
        <div className="mt-2">
          <h2 className="text-xl font-bold">Your Balance ₹{balance}</h2>
        </div>
        <div className="mt-4">
          <label>
            <div className="mt-2 mb-1 text-xl font-bold">Users</div>
            <input
              onChange={(e) => setFilter(e.target.value)}
              name="filter"
              className="w-full border border-slate-200 rounded py-2 px-3"
              placeholder="Search users..."
              type="text"
              value={filter}
              required
            />
          </label>
        </div>
        <div>
          {users.map((user) => (
            <div key={user._id} className="pt-4">
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 font-semibold">
                    {user.firstname[0]}
                    {user.lastname[0]}
                  </div>
                  <div className="font-bold">
                    {user.firstname} {user.lastname}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      navigate("/send", {
                        state: user,
                      });
                    }}
                    className="bg-black text-white rounded text-sm font-semibold py-2 px-3 w-full"
                  >
                    Send Money
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
