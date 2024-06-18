import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Send = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [amount, setAmount] = useState(0);
  return (
    <div className="h-screen flex flex-col">
      <div className="m-auto bg-slate-50 px-7 py-4 text-lg w-96 rounded-xl shadow-xl">
        <div>
          <h1 className="text-3xl font-bold text-center">Send Money</h1>
        </div>
        <div>
          <div className="flex items-center gap-3 mt-14">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-400 text-white font-semibold text-2xl">
              {state.firstname[0]}
              {state.lastname[0]}
            </div>
            <div className="font-bold text-2xl">
              {state.firstname} {state.lastname}
            </div>
          </div>
        </div>
        <div>
          <label>
            <div className="mt-2 mb-1 text-md font-semibold">Amount (Rs.)</div>
            <input
              onChange={(e) => setAmount(e.target.value)}
              name="filter"
              className="w-full border border-slate-200 rounded py-2 px-3"
              placeholder="Enter amount"
              type="number"
              value={amount ? amount : null}
              required
            />
          </label>
        </div>
        <div>
          <button
            onClick={async (e) => {
              e.preventDefault();
              const token = localStorage.getItem("token");
              const response = await axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                { to: state._id, amount: amount },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (response.status !== 200) {
                alert(response.message);
                return;
              } else {
                navigate("/dashboard");
              }
            }}
            className="bg-green-400 text-white rounded py-2 mt-4 w-full font-semibold text-md"
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Send;
