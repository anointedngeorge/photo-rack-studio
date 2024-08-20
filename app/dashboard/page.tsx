import Image from "next/image";
import FileReaderComp from "../components/FileUploaderComp";
import FileReaderCp from "../components/FileReaderCp";
import FileUploaderComp from "../components/FileUploaderComp";
import { FaPlus, FaPlusCircle } from "react-icons/fa";
import Link from "next/link";
import TopMenu from "../components/TopMenu";
import Collections from "../components/Collections";
import SpeedDial from "../components/SpeedDial";
import CustomModal from "../components/CustomModal";



export default function Dashboard() {
  return (
    <main className="flex flex-col min-h-screen px-20 py-10">
      <TopMenu />
      <Collections />

      <FileReaderCp />

      <CustomModal />
    </main>
  );
}
