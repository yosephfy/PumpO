import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import FeedContainer from "../../components/feed/FeedContainer";
import UserProfile from "../../components/userProfile/UserProfile";
import "./profile.css";

export default function Profile() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <UserProfile />
      <Box sx={{ bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
        >
          <Tab label="My Posts" />
          <Tab label="Draft" />
          <Tab label="liked" />
          <Tab label="Saved" />
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
