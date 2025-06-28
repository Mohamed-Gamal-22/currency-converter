import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
// https://api.frankfurter.app/latest?amount=AMOUNT&from=FROM_CURRENCY&to=TO_CURRENCY

function App() {
  const [allCurrency, setallCurrency] = useState([]);
  const [currentAmount, setcurrentAmount] = useState("");
  const [cuurentFrom, setcuurentFrom] = useState("AUD");
  const [currentTo, setcurrentTo] = useState("AUD");
  const [error, seterror] = useState("");
  const [result, setresult] = useState(null);

  async function getAllCurrency() {
    let { data } = await axios.get(`https://api.frankfurter.app/currencies`);
    let newArr = Object.entries(data).map(
      (element) => `${element[0] + ": " + element[1]}`
    );
    setallCurrency(newArr);
  }

  async function convertCurrency() {
    try {
      let { data } = await axios.get(
        `https://api.frankfurter.app/latest?amount=${currentAmount}&from=${cuurentFrom}&to=${currentTo}`
      );
      console.log(data);
      setresult(data);
      seterror("");
    } catch (err) {
      seterror(err.response.data.message);
    }
  }

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
              onChange={(e) => {
                setcurrentAmount(e.target.value);
              }}
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
              onChange={(e) => {
                setcuurentFrom(e.target.value.slice(0, 3));
              }}
              id="from"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              {allCurrency.map((curr) => {
                return (
                  <option value={curr} key={curr} className={curr}>
                    {curr}
                  </option>
                );
              })}
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
              onChange={(e) => {
                setcurrentTo(e.target.value.slice(0, 3));
              }}
              id="to"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              {allCurrency.map((curr) => {
                return (
                  <option value={curr} key={curr} className={curr}>
                    {curr}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            onClick={() => convertCurrency()}
            className="mt-6 bg-white text-slate-900 w-full p-2 rounded-lg font-bold text-lg cursor-pointer hover:bg-slate-900 hover:text-slate-200 transition-all"
            type="button"
          >
            Convert
          </button>

          {result && (
            <h1 className=" bg-blue-300 roudned w-full text-center  my-3 p-3">
              <span className="font-bold">{result.amount}</span> {result.base} ={" "}
              <span className="font-bold">{result.rates[currentTo]}</span>{" "}
              {currentTo}
            </h1>
          )}
        </form>
      </div>
    </>
  );
}

export default App;
