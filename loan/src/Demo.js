import { useEffect, useState } from "react";
import axios from "axios";

export default function Demo() {
  const [message, setMessage] = useState("Checking backend...");

  useEffect(() => {
    async function fetchTest() {
      try {
        const res = await axios.get("http://localhost:8080/test");
        setMessage(res.data);
      } catch (err) {
        console.error("Error:", err);
        setMessage("Backend not working");
      }
    }

    fetchTest();
  }, []); // run only once on component mount

  return <div>{message}</div>;
}
