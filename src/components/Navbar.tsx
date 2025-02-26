import { BookOpenCheck } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-neutral-100">
      <div className="container">
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost text-xl"><BookOpenCheck />BlogApp</Link>
        </div>
        <div className="flex-none">
            <Link href={"/create"} className="btn btn-ghost">Create Post</Link>
          <button className="btn btn-square btn-ghost">
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
