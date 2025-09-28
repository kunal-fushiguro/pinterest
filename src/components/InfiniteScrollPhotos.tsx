"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPhotos } from "@/services/photo";
import { SinglePhotoType } from "@/types";
import LoadingPage from "@/components/Loader";

const photoCache: Record<number, SinglePhotoType[]> = {};

const LIMIT = 25;

export default function InfiniteScrollPhotos() {
  const [data, setData] = useState<SinglePhotoType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchPhotos = async (pageNumber: number) => {
    if (photoCache[pageNumber]) {
      setData((prev) => [...prev, ...photoCache[pageNumber]]);
      return;
    }

    setLoading(true);
    try {
      const response = await getPhotos(pageNumber, LIMIT);
      if (response && response.length > 0) {
        photoCache[pageNumber] = response; // Save to cache
        setData((prev) => [...prev, ...response]);
        if (response.length < LIMIT) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch photos:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchPhotos(page);
  }, []);

  // Intersection observer for infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchPhotos(nextPage);
        }
      },
      { threshold: 1.0 },
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [hasMore, loading, page]);

  if (data.length === 0 && loading) return <LoadingPage />;

  return (
    <div className="w-full p-4">
      <div className="columns-[200px]">
        {data.map((photo, idx) => (
          <Link href={`/photos/${photo._id}`} key={photo._id + idx}>
            <Image
              src={photo.url}
              alt={photo.title}
              width={200}
              height={200}
              className="mb-4 h-full w-full rounded-xl"
            />
          </Link>
        ))}
      </div>

      {loading && <LoadingPage />}

      {hasMore && !loading && <div ref={observerRef} className="h-10 w-full" />}

      {!hasMore && (
        <p className="mt-4 text-center text-gray-500">No more photos</p>
      )}
    </div>
  );
}
