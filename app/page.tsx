import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";



export default function Home() {
  return (
    <main className="flex flex-col space-y-2 min-h-screen justify-between p-20 place-content-center items-center">
        <div className="w-[700px] h-[400px]  relative rounded-3xl">
            <Image src={'/./img/bg1.png'} className="rounded-3xl" fill={true} alt="" />
        </div>
        <div className="flex place-content-end items-end w-full">
            <div className="flex space-x-1 place-items-center">
              <div><Link href={'/dashboard'} className="text-main">Go To Studio </Link></div>
              <div><FaArrowRight className="text-main" /></div>
            </div>
        </div>
    </main>
  );
}
