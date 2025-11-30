import axios from "axios";
import { useEffect, useState } from "react";

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/plans")
      .then(res => setPlans(res.data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-5 p-10">
      {plans.map(p => (
        <div key={p.id} className="border p-5 rounded shadow">
          <h2 className="font-bold text-xl">{p.name}</h2>
          <p>{p.description}</p>
          <p className="font-bold">${p.price}</p>
        </div>
      ))}
    </div>
  );
}
