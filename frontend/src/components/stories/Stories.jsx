import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { getImage } from "../../utility/utility.js";
import Posting from "../posting/Posting.jsx";
import UserStory from "./UserStory.jsx";
import "./stories.css";

export default function Stories() {
  const { currentUser } = useContext(AuthContext);
  const [postOpenState, setPostOpenState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setPostOpenState(open);
  };
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
        <SwiperSlide style={{ width: "5rem" }}>
          <UserStory handleClick={setPostOpenState} />
        </SwiperSlide>
        {error
          ? "Something went wrong"
          : isLoading
          ? "loading"
          : data.map((s) => (
              <SwiperSlide style={{ width: "5rem" }} key={s.id}>
                <div className="story">
                  <div className="story-circle">
                    <img src={getImage(s.data)} alt="" />
                  </div>
                  <h5>{s.username}</h5>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
      <Posting story openDrawer={postOpenState} toggleDrawer={toggleDrawer} />
    </div>
  );
}
