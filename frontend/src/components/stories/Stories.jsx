import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { getImage } from "../../utility/utility.js";
import UserStory from "./UserStory.jsx";
import "./stories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import reactIcon from "../../assets/react.svg";

export default function Stories() {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["stories"],
    queryFn: () =>
      makeRequest.get(`/stories/followed/${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <div className="stories">
      <Swiper style={{ width: "100%" }} slidesPerView="auto" spaceBetween={10}>
        <SwiperSlide style={{ width: "min-content" }}>
          <UserStory />
        </SwiperSlide>
        {error
          ? "Something went wrong"
          : isLoading
          ? "loading"
          : data.map((s) => (
              <SwiperSlide style={{ width: "min-content" }} key={s.id}>
                <div className="story">
                  <div className="story-circle">
                    <img src={getImage(s.data)} alt="" />
                  </div>

                  <h5>{s.username}</h5>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}
