import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SingleVideo from "./SingleVideo";
import "./videofeed.css";

export default function ListVideos({ videos }) {
  const [paused, setPaused] = useState(false);

  return (
    <Swiper
      className="video-feed"
      autoplay={false}
      watchSlidesProgress={false}
      direction="vertical"
      style={{ position: "relative" }}
    >
      {videos.map((data) => (
        <SwiperSlide
          className="single-video"
          key={data.id}
          onClick={() => setPaused((prev) => !prev)}
        >
          {({ isActive }) => {
            return (
              <SingleVideo video={data} isActive={isActive} paused={paused} />
            );
          }}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
