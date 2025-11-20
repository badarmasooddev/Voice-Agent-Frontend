import React, { createContext, useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [showAssistantMenu, setShowAssistantMenu] = useState(false);
  const [selectedKnowledge, setSelectedKnowledge] = useState(null);
  const queryClient = useQueryClient();

  const addKnowledgeBase = (newBase) => {
    queryClient.setQueryData(["knowledgeBases"], (prevBases = []) => [...prevBases, newBase]);
  };

  const addDocument = (knowledgeBaseName, doc) => {
    queryClient.setQueryData(["knowledgeBases"], (prevBases = []) =>
      prevBases.map((kb) =>
        kb.name === knowledgeBaseName
          ? {
              ...kb,
              documents: [...kb.documents, { ...doc, length: doc.content.length }],
              totalDocumentLength: (kb.totalDocumentLength || 0) + doc.content.length,
            }
          : kb
      )
    );
  };

  return (
    <GlobalStateContext.Provider
      value={{
        showAssistantMenu,
        setShowAssistantMenu,
        addKnowledgeBase,
        addDocument,
        selectedKnowledge,
        setSelectedKnowledge,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
