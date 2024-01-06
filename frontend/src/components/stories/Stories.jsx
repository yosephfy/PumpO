import "./stories.css";
import UserStory from "./UserStory.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";

import reactIcon from "../../assets/react.svg";
import { useContext } from "react";
import { makeRequest } from "../../Axios.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { getImage } from "../../utility/utility.js";

export default function Stories() {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: "stories",
    queryFn: () =>
      makeRequest.get(`/stories/followed/${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <div className="stories">
      <UserStory />

      <Swiper style={{ width: "80%" }} slidesPerView={4} spaceBetween={10}>
        {error
          ? "Something went wrong"
          : isLoading
          ? "loading"
          : data.map((s) => (
              <SwiperSlide key={s.id}>
                <div className="story">
                  <div className="user">
                    <img src={getImage(s.profilePic, "profilePic")} alt="" />
                  </div>
                  <img src={getImage(s.data)} alt="" />
                  <h5>{s.username}</h5>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}
