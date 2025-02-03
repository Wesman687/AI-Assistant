import { useState, useEffect } from "react";
import axios from "axios";

const ModelSelector = ({ selectedModel, setSelectedModel }) => {
  const [availableModels, setAvailableModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get("https://api.paul-miracle.info/models");
        setAvailableModels(response.data); // ✅ Assuming API returns an array of models
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };
    fetchModels();
  }, []); // ✅ Run once on mount

  return (
    <>
     
      <select
        id="modelSelect"
        className="p-1 border border-gray-400 rounded-md bg-transparent"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        {availableModels.length > 0 ? (
          availableModels.map((model) => (
            <option key={model.id} value={model.name}>
              {model.name}
            </option>
          ))
        ) : (
          <option value="">Loading models...</option>
        )}
      </select>
    </>
  );
};

export default ModelSelector;