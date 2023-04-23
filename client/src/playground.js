import { Sandpack } from "@codesandbox/sandpack-react";
import { useState } from "react";

function Playground() {
  const [selectedDataStructure, setSelectedDataStructure] = useState("");

  const handleDropdownChange = (e) => {
    setSelectedDataStructure(e.target.value);
  };

  const files = {
    "/App.js": `
      import React from 'react';
      function App() {
        const [count, setCount] = React.useState(0);
        
        return (
          <button onClick={() => setCount(count + 1)}>
            Count: {count}
          </button>
        );
      }
      export default App;
    `,
  };

  const dataStructureOptions = ["Map", "Stack", "Queue", "Tree"];

  return (
    <div className="flex">
      <div className="w-1/4">
        <select
          value={selectedDataStructure}
          onChange={handleDropdownChange}
          className="w-full p-2 border-2 rounded-lg"
        >
          <option value="">Choose a data structure!</option>
          {dataStructureOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="w-3/4 pl-4">
        <Sandpack template="react" files={files} />
      </div>
    </div>
  );
}

export default Playground;
