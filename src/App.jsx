import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [allCurrency, setAllCurrency] = useState([]);
  const [currentAmount, setCurrentAmount] = useState("");
  const [currentFrom, setCurrentFrom] = useState("AUD");
  const [currentTo, setCurrentTo] = useState("AUD");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [swapTrigger, setswapTrigger] = useState(0);

  async function getAllCurrency() {
    const { data } = await axios.get(`https://api.frankfurter.app/currencies`);
    const newArr = Object.entries(data).map(([code, name]) => ({
      code,
      name,
    }));
    setAllCurrency(newArr);
  }

  async function convertCurrency() {
    if (
      currentAmount.trim() === "" ||
      isNaN(currentAmount) ||
      +currentAmount <= 0
    ) {
      setError("Please enter a valid number!");
      return;
    }

    try {
      const { data } = await axios.get(
        `https://api.frankfurter.app/latest?amount=${currentAmount}&from=${currentFrom}&to=${currentTo}`
      );
      setResult(data);
      console.log(data);

      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  function swap() {
    const temp = currentFrom;
    setCurrentFrom(currentTo);
    setCurrentTo(temp);
    setswapTrigger((value) => value + 1); // to change state to check and call converter function again
  }

  // to get all data when swap value when click swap
  useEffect(() => {
    if (swapTrigger == 0) return;
    convertCurrency();
  }, [swapTrigger]);

  useEffect(() => {
    getAllCurrency();
  }, []);

  return (
    <>
      <div className="container flex items-center h-screen mx-auto w-[80%]  p-3">
        <form className="mx-auto w-[90%] md:w-[80%] lg:w-[60%] bg-green-500 p-4 rounded-2xl">
          <h1 className="text-4xl text-center font-bold text-white my-8">
            Currency Converter
          </h1>

          {error && (
            <h2 className="bg-red-500 text-center text-white p-3 rounded my-3">
              {error} !
            </h2>
          )}

          <div>
            <label
              htmlFor="amount"
              className="block mb-2 font-bold text-white text-xl"
            >
              Your Amount :
            </label>
            <input
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              type="text"
              id="amount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3"
            />
          </div>

          <div>
            <label
              htmlFor="from"
              className="block mb-2 text-white mt-3 font-bold text-xl"
            >
              From Currency:
            </label>
            <select
              value={currentFrom}
              onChange={(e) => setCurrentFrom(e.target.value)}
              id="from"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              {allCurrency.map((curr) => (
                <option value={curr.code} key={curr.code}>
                  {curr.code}: {curr.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="to"
              className="block mb-2 text-white mt-3 font-bold text-xl"
            >
              To Currency:
            </label>
            <select
              value={currentTo}
              onChange={(e) => setCurrentTo(e.target.value)}
              id="to"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              {allCurrency.map((curr) => (
                <option value={curr.code} key={curr.code}>
                  {curr.code}: {curr.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={convertCurrency}
            className="mt-6 bg-white text-slate-900 w-full p-2 rounded-lg font-bold text-lg cursor-pointer hover:bg-slate-900 hover:text-slate-200 transition-all"
            type="button"
          >
            Convert
          </button>

          <button
            onClick={swap}
            className="mt-3 bg-yellow-300 text-black w-full p-2 rounded-lg font-bold text-lg cursor-pointer hover:bg-yellow-400 transition-all"
            type="button"
          >
            🔁 Swap
          </button>

          {result && (
            <>
              <h1 className="bg-blue-300 rounded w-full text-center my-3 p-3">
                <span className="font-bold">{currentAmount}</span> {result.base}{" "}
                = <span className="font-bold">{result.rates[currentTo]}</span>{" "}
                {currentTo}
              </h1>
              <h1 className="bg-blue-300 rounded w-full text-center my-3 p-3">
                <span className="font-bold">1 </span> {result.base} =
                <span className="font-bold">
                  {(result.rates[currentTo] / result.amount).toFixed(4)}
                </span>
                {currentTo}
              </h1>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default App;
