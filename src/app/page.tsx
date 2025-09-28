"use client";
import InfiniteScrollPhotos from "@/components/InfiniteScrollPhotos";
// import LoadingPage from "@/components/Loader";
// import { getPhotos } from "@/services/photo";
// import { SinglePhotoType } from "@/types";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

export default function Home() {
  // const [data, setData] = useState<SinglePhotoType[] | null>(null);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [page, setPage] = useState<number>(1);
  // const LIMIT = 20;

  // async function dataHandler() {
  //   setLoading(true);
  //   const response = await getPhotos(1, LIMIT);
  //   if (response) {
  //     setData(response);
  //     setPage(2);
  //   }
  //   setLoading(false);
  // }

  // useEffect(() => {
  //   dataHandler();

  //   return () => {};
  // }, []);

  // console.log(data);

  // if (loading) {
  //   return <LoadingPage />;
  // }

  // if (data === null) {
  //   return;
  // }

  return (
    // <div className="w-full p-4">
    //   <div className="columns-[200px]">
    //     {data.map((val, idx) => {
    //       return (
    //         <Link href={`/photos/${val._id}`} key={idx}>
    //           <Image
    //             src={val.url}
    //             alt={val.title}
    //             width={200}
    //             height={200}
    //             className="mb-4 h-full w-full rounded-xl"
    //           />
    //         </Link>
    //       );
    //     })}
    //   </div>
    // </div>
    <InfiniteScrollPhotos key={"homescreen"} />
  );
}
