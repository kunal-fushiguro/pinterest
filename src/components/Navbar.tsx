import { Link } from "@tanstack/react-router";
import Button from "../components/Button";

const Navbar = () => {
  return (
    <nav className="w-full h-14 sm:h-16 flex justify-between sm:justify-start items-center p-2 gap-3 sticky top-0 bg-neutral-50">
      {/* title and logo */}
      <Link to={"/"}>
        <div className="h-14 sm:h-16 flex justify-center items-center">
          <img src="/logo.png" alt="logo" className="h-14 sm:h-16" />
        </div>
      </Link>
      {/*  search based on the tags */}
      <div className=" sm:flex-1 sm:flex bg-neutral-200 rounded-xl h-full hidden"></div>
      {/* login and sign up buttons / if login user profile info */}
      <div className=" flex justify-center items-center gap-2 h-full">
        <Link to="/login">
          <Button className="bg-neutral-200 text-black hover:bg-neutral-400 hover:text-black/90">
            Log in
          </Button>
        </Link>
        <Link to="/signup">
          <Button>Sign up</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
