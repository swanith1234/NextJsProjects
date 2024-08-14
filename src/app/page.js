import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen flex-col flex justify-center bg-gradient-to-r from-purple-500 to-blue-600  items-center">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <h2 className="text-4xl text-white font-bold mb-4">
          Browse our blog collection
        </h2>
        <Link
          href={"/blogs"}
          className="bg-white text-blue hover:rounded-xl font-semibold p-4"
        >
          Explore blogs
        </Link>
      </div>
    </div>
  );
}
