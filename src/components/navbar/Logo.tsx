import Link from "next/link";
import { FaHeartbeat } from "react-icons/fa";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <FaHeartbeat className="text-blue-700 w-7 h-7 transition-transform group-hover:scale-105" />
      <span className="text-xl font-bold text-slate-900 tracking-tight">
        RAHA <span className="text-blue-700">Surgical</span>
      </span>
    </Link>
  );
};

export default Logo;
