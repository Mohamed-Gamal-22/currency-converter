import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [allCurrency, setallCurrency] = useState([]);
  const [cuurentFrom, setcuurentFrom] = useState("")
  const [currentTo, setcurrentTo] = useState("")

  async function getAllCurrency() {
    let { data } = await axios.get(`https://api.frankfurter.app/currencies`);
    let newArr = Object.entries(data).map((element) => element[0]);
    console.log(newArr);
    
    setallCurrency(newArr);
  }

  useEffect(() => {
    getAllCurrency();
  }, []);

  return (
    <>
      <div className="container flex items-center h-screen mx-auto w-[80%]  p-3">
        <form className="mx-auto w-[90%] md:w-[80%] lg:w-[60%] bg-rose-500 p-4 rounded-2xl">
          <h1 className="text-4xl text-center font-bold text-white my-8">
            Currency Converter
          </h1>
          <div>
            <label
              htmlFor="amount"
              className="block mb-2 font-bold text-white text-xl"
            >
              Your Amount :
            </label>
            <input
              type="text"
              id="amount"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3"
            />
          </div>
          <div>
            <label
              htmlFor="from"
              className="block mb-2 text-white mt-3 font-bold text-xl"
            >
              Choose Curruncy :
            </label>
            <select
              id="from"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option>UAE</option>
              <option>USD</option>
              <option>EGP</option>
              <option>EUR</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="to"
              className="block mb-2 text-white mt-3 font-bold text-xl"
            >
              Converted To :
            </label>
            <select
              id="to"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option>UAE</option>
              <option>USD</option>
              <option>EGP</option>
              <option>EUR</option>
            </select>
          </div>
        <button className="mt-6 bg-white text-slate-900 w-full p-2 rounded-lg font-bold text-lg cursor-pointer hover:bg-slate-900 hover:text-slate-200 transition-all" type="button">Convert</button>
        </form>
      </div>
    </>
  );
}

export default App;
