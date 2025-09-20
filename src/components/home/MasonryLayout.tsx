const MasonryLayout = () => {
  //   const photos = "../../data/photos/1.jpeg";

  return (
    <div className="w-full min-h-screen columns-[140px] sm:columns-[320px] overflow-x-hidden sm:p-1 no-scrollbar">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
        return (
          <div className="p-2">
            <img
              src={`/photos/${i}.jpeg`}
              alt={`img${i}`}
              key={`img${i}`}
              className=" object-contain rounded-xl "
            />
          </div>
        );
      })}
    </div>
  );
};

export default MasonryLayout;
