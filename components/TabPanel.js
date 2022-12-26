import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Divider } from "@material-ui/core";

import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import TimerIcon from "@material-ui/icons/Timer";

import TimerContent from "./TimerContent";
import StopWatchContent from "./StopWatchContent";

import { pageState } from "../utils/stateStore";
import { useRecoilState } from "recoil";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box display="flex" alignItems="flex-end" px={2} pb={2} height={120}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useRecoilState(pageState);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab
          label={
            <div>
              <HourglassEmptyIcon fontSize="inherit" /> TIMER
            </div>
          }
          {...a11yProps(0)}
        />
        <Tab
          label={
            <div>
              <TimerIcon fontSize="inherit" /> STOPWATCH
            </div>
          }
          {...a11yProps(1)}
        />
      </Tabs>
      <Divider />
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <TimerContent />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <StopWatchContent />
        </TabPanel>
      </SwipeableViews>
    </>
  );
}
