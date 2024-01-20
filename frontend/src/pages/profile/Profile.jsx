import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import FeedContainer from "../../components/feed/FeedContainer";
import UserProfile from "../../components/userProfile/UserProfile";
import { AuthContext } from "../../context/AuthContext";
import "./profile.css";

export default function Profile() {
  const [value, setValue] = useState(0);
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [userId, setUserId] = useState(id);

  useEffect(() => {
    setUserId(id === currentUser.id ? currentUser : id);
  }, [id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <UserProfile userId={userId} />
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons={false}
        >
          <Tab label="Posts" />
          {id == currentUser.id && <Tab label="Draft" />}
          {id == currentUser.id && <Tab label="liked" />}
          {id == currentUser.id && <Tab label="Saved" />}
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <FeedContainer domain={["profile"]} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FeedContainer domain={["profile"]} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <FeedContainer domain={["liked"]} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <FeedContainer domain={["profile"]} />
      </CustomTabPanel>
    </>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
