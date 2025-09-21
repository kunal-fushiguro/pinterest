import { Link } from "@tanstack/react-router";
import Button from "../components/Button";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <nav className="w-full h-14 flex justify-between sm:justify-start items-center px-3 sm:px-6 gap-3 sticky top-0 bg-neutral-50 shadow-sm z-50">
      <Link to={"/"}>
        <div className="h-12 flex justify-center items-center">
          <img src="/logo.png" alt="logo" className="h-10 sm:h-12" />
        </div>
      </Link>
      <div className="relative flex-1 hidden sm:flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          placeholder="Search..."
          className="w-full h-10 px-4 rounded-full bg-neutral-200 focus:bg-white border border-transparent focus:border-red-400 focus:ring-2 focus:ring-red-200 outline-none transition text-sm"
        />
        <AnimatePresence>
          {isFocused && query && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-12 left-0 w-full bg-white rounded-xl shadow-lg p-3 flex flex-col gap-2"
            >
              <span className="text-sm text-neutral-700">
                Suggested: {query}
              </span>
              <span className="text-sm text-neutral-700">
                Explore "{query}"
              </span>
              <span className="text-sm text-neutral-700">
                Trending around "{query}"
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex justify-center items-center gap-2 h-full">
        <Link to="/login">
          <Button className="bg-neutral-200 text-black hover:bg-neutral-400 hover:text-black/90 text-sm px-4 py-2">
            Log in
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="text-sm px-4 py-2">Sign up</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
