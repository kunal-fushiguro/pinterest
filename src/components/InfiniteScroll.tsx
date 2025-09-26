"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const InfiniteScroll = () => {
  const [tempData, setTempData] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7,
    8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);

  return (
    <div className="columns-[200px]">
      {tempData.map((val, idx) => {
        return (
          <Link href={"/"} key={idx}>
            <Image
              src={`/photos/${val}.jpeg`}
              alt={"photo" + val}
              width={200}
              height={200}
              className="mb-4 h-full w-full rounded-xl"
            />
          </Link>
        );
      })}
    </div>
  );
};

export default InfiniteScroll;
