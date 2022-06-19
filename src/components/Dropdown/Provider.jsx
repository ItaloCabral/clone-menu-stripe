import React, { useState, useEffect, useCallback } from "react";

export const Context = React.createContext();

export const DropDownProvider = ({ children }) => {

  const [options, setOptions] = useState([]);
  const [targetId, setTargetId] = useState(null);
  const [cachedId, setCachedId] = useState(null);

  useEffect(() => {
    console.log(options)
  }, [options]);

  const registerOption = useCallback(({
    id, options, centerX, wrappedContent, height
  }) => {
    setOptions((items) => [
      ...items,
      { id, options, centerX, wrappedContent, height }
    ]);
  }, [setOptions]);

  const updateOption = useCallback((optionId, props) => {
    setOptions((items) =>
      items.map((item) => {
        if (item.id === optionId) {
          item = { ...item, ...props };
        }

        return item;
      })
    );
  }, [setOptions]);

  const getOption = useCallback((id) => {
    return options.find((item) => item.id === id);
  }, [options]);

  const deleteOption = useCallback((id) => {
    setOptions((items) => {
      return items.filter(item => item.id !== id);
    });
  }, [setOptions]);

  useEffect(() => {
    if(targetId !== null) {
      setCachedId(targetId);
    }
  }, [targetId]);

  return (
    <Context.Provider
      value={{
        registerOption,
        updateOption,
        getOption,
        deleteOption,
        options,
        targetId,
        setTargetId,
        cachedId,
        setCachedId
      }}>
      {children}
    </Context.Provider>
  );

}
