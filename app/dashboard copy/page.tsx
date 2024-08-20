import Image from "next/image";
import FileReaderComp from "../components/FileUploaderComp";
import FileReaderCp from "../components/FileReaderCp";
import FileUploaderComp from "../components/FileUploaderComp";


export default function Dashboard() {
  return (
    <main className="flex flex-col space-y-2 min-h-screen justify-between p-10">
        <div className="text-center mb-2">
            <h3 className="text-4xl font-mono font-bold underline">Organize Your Photo Rack</h3>
        </div>
        <FileUploaderComp />

        <FileReaderCp />
    </main>
  );
}
