import Image from "next/image";
import logo from "../../assets/logo.png";
import "./index.css";
export default function Logo() {
  return (
    <div id="logo" className="flex flex-col gap-1 justify-center items-center ">
      <Image src={logo} alt="HelpDesk" className="h-[70px] object-contain" />
    </div>
  );
}
