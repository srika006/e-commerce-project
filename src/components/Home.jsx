import { useContext, useEffect, useState } from "react";
import ProductList from "./ProductList";
import basicOps from "../utility/basicOps";
import { Link } from "react-router-dom";
import { PageContainer } from "../context/PageContextProvider";
import { useDarkMode } from "../context/DarkModeContextProvider";
import LightIcon from "../assets/icons/LightIcon";
import DarkIcon from "../assets/icons/DarkIcon";

function Home() {
  const [products, setProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDir, setSortDir] = useState(0);
  const [categories, setCategories] = useState(null);
  const [currCategory, setCurrCategory] = useState("All categories");
  //state variable for storing page num

  //state variable for storing page size
  const { pageNum, pageSize, setPageNum } = useContext(PageContainer);
  const { darkMode, toggleDarkMode } = useDarkMode();

  function handleInput(event) {
    setSearchTerm(event.target.value);
    setPageNum(1);
  }

  function fetchDetails() {
    async function fn() {
      const res = await fetch("https://fakestoreapi.in/api/products");
      const productsData = await res.json();
      //setProducts(productsData.products);
      setProducts(productsData.products);
    }
    fn();
  }
  function fetchCategoriesDetails() {
    async function fn() {
      const res = await fetch("https://fakestoreapi.in/api/products/category");
      const categoriesData = await res.json();
      setCategories(categoriesData.categories);
    }
    fn();
  }

  useEffect(fetchDetails, []);
  //searching -> is all about hiding the unwanted elements

  useEffect(fetchCategoriesDetails, []);

  let objects = basicOps(
    products,
    searchTerm,
    sortDir,
    currCategory,
    pageNum,
    pageSize
  );
  if (objects == undefined) {
    return;
  }
  let filteredSortedGroupArr = objects.filteredSortedGroupArr;
  let totalPages = objects.totalPages;

  return (
    <div>
      <header className="flex flex-wrap items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 shadow-md">
        {/* Search Bar */}
        <div className="flex items-center gap-2 w-full md:w-1/2 bg-white rounded-full px-4 py-2 shadow-inner">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search products..."
            onChange={handleInput}
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setSortDir(1)}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 cursor-pointer hover:text-indigo-600 transition"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385..."
              clipRule="evenodd"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setSortDir(-1)}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 cursor-pointer hover:text-indigo-600 transition"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385..."
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 text-white font-medium mt-3 md:mt-0">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/cart" className="hover:underline">
            Cart
          </Link>
        </div>

        {/* Dark Mode Toggle */}
        <div className="ml-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white shadow hover:scale-110 transition"
          >
            {darkMode ? <LightIcon /> : <DarkIcon />}
          </button>
        </div>
      </header>

      {/* Categories */}
      <div className="bg-gray-100 dark:bg-gray-800 py-3 px-4 overflow-x-auto flex items-center justify-center gap-6">
        {categories?.map((cat, idx) => (
          <div>
            <button
              key={idx}
              onClick={() => setCurrCategory(cat)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                currCategory === cat
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-gray-600 hover:bg-indigo-100"
              }`}
            >
              {cat}
            </button>
          </div>
        ))}
      </div>

      {/* Products */}
      {/* Products */}
      <main
        className={`p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white"}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          <ProductList productList={filteredSortedGroupArr} />
        </div>
      </main>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 py-8">
        {/* Previous Button */}
        <button
          onClick={() => pageNum > 1 && setPageNum(pageNum - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition disabled:opacity-40"
          disabled={pageNum === 1}
        >
          &lt;
        </button>

        {/* Page Numbers */}
        {/* {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPageNum(index + 1)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition 
        ${
          pageNum === index + 1
            ? "bg-indigo-600 text-white shadow-lg"
            : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
        }`}
          >
            {index + 1}
          </button>
        ))} */}

        {/* Next Button */}
        <button
          onClick={() => pageNum < totalPages && setPageNum(pageNum + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition disabled:opacity-40"
          disabled={pageNum === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Home;
