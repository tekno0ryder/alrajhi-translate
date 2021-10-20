import React from "react";

import "./App.css";
import "react-tabs/style/react-tabs.css";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ExcelToJS from "./ExcelToJS";
import JSToExcel from "./JsonToExcel";

function App() {
  return (
    <div>
      <h1>Translate Al-Rajhi</h1>
      <Tabs>
        <TabList>
          <Tab>Excel To JS</Tab>
          <Tab>JS To Excel</Tab>
        </TabList>

        <TabPanel>
          <ExcelToJS />
        </TabPanel>
        <TabPanel>
          <JSToExcel />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
