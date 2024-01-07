import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { getImage } from "../../utility/utility.js";
import UserStory from "./UserStory.jsx";
import "./stories.css";

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
