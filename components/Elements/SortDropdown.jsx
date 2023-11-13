import React, { useState, useRef, useEffect } from "react";

export const SortDropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchString, setSearchString] = useState("");
  const comboEl = useRef(null);
  const listboxEl = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (
      comboEl.current &&
      !comboEl.current.contains(event.target) &&
      listboxEl.current &&
      !listboxEl.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  const handleComboBlur = (event) => {
    if (
      isOpen &&
      event.relatedTarget &&
      event.relatedTarget.hasAttribute("role")
    ) {
      event.preventDefault();
      return;
    }

    if (isOpen) {
      selectOption(activeIndex);
      updateMenuState(false);
    }
  }; // test

  const handleComboClick = () => {
    updateMenuState(!isOpen);
  };

  const handleComboKeyDown = (event) => {
    const { key } = event;
    const maxIndex = options.length - 1;

    const action = getActionFromKey(event, isOpen);

    switch (action) {
      case SelectActions.Last:
      case SelectActions.First:
        updateMenuState(true);
      // intentional fallthrough
      case SelectActions.Next:
      case SelectActions.Previous:
      case SelectActions.PageUp:
      case SelectActions.PageDown:
        event.preventDefault();
        return handleOptionChange(
          getUpdatedIndex(activeIndex, maxIndex, action)
        );
      case SelectActions.CloseSelect:
        event.preventDefault();
        selectOption(activeIndex);
      // intentional fallthrough
      case SelectActions.Close:
        event.preventDefault();
        return updateMenuState(false);
      case SelectActions.Type:
        return handleComboType(key);
      case SelectActions.Open:
        event.preventDefault();
        return updateMenuState(true);
      default:
        return;
    }
  };

  const handleComboType = (letter) => {
    updateMenuState(true);

    const searchString = getSearchString(letter);
    const searchIndex = getIndexByLetter(
      options,
      searchString,
      activeIndex + 1
    );

    if (searchIndex >= 0) {
      handleOptionChange(searchIndex);
    } else {
      clearTimeout(searchTimeout);
      setSearchString("");
    }
  };

  const handleOptionChange = (index) => {
    setActiveIndex(index);

    const options = listboxEl.current.querySelectorAll('[role="option"]');
    [...options].forEach((optionEl) => {
      optionEl.classList.remove("option-current");
    });
    options[index].classList.add("option-current");

    if (isScrollable(listboxEl.current)) {
      maintainScrollVisibility(options[index], listboxEl.current);
    }

    if (!isElementInView(options[index])) {
      options[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const handleOptionClick = (index) => {
    handleOptionChange(index);
    selectOption(index);
    updateMenuState(false);
  };

  // const handleOptionMouseDown = () => {
  //   ignoreBlur.current = true;
  // };

  const selectOption = (index) => {
    setActiveIndex(index);
    comboEl.current.innerHTML = options[index];

    const optionEls = listboxEl.current.querySelectorAll('[role="option"]');
    [...optionEls].forEach((optionEl, i) => {
      optionEl.setAttribute("aria-selected", `${i === index}`);
    });
  };

  const updateMenuState = (open, callFocus = true) => {
    if (isOpen === open) {
      return;
    }

    setIsOpen(open);
    comboEl.current.setAttribute("aria-expanded", `${open}`);
    open
      ? comboEl.current.classList.add("open")
      : comboEl.current.classList.remove("open");

    const activeID = open ? `combo-${activeIndex}` : "";
    comboEl.current.setAttribute("aria-activedescendant", activeID);

    if (activeID === "" && !isElementInView(comboEl.current)) {
      comboEl.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    callFocus && comboEl.current.focus();
  };

  const getSearchString = (char) => {
    if (typeof searchTimeout === "number") {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(() => {
        setSearchString("");
      }, 500)
    );

    setSearchString(searchString + char);
    return searchString + char;
  };

  const getActionFromKey = (event, menuOpen) => {
    const { key, altKey, ctrlKey, metaKey } = event;
    const openKeys = ["ArrowDown", "ArrowUp", "Enter", " "];

    if (!menuOpen && openKeys.includes(key)) {
      return SelectActions.Open;
    }

    if (key === "Home") {
      return SelectActions.First;
    }
    if (key === "End") {
      return SelectActions.Last;
    }

    if (
      key === "Backspace" ||
      key === "Clear" ||
      (key.length === 1 && key !== " " && !altKey && !ctrlKey && !metaKey)
    ) {
      return SelectActions.Type;
    }

    if (menuOpen) {
      if (key === "ArrowUp" && altKey) {
        return SelectActions.CloseSelect;
      } else if (key === "ArrowDown" && !altKey) {
        return SelectActions.Next;
      } else if (key === "ArrowUp") {
        return SelectActions.Previous;
      } else if (key === "PageUp") {
        return SelectActions.PageUp;
      } else if (key === "PageDown") {
        return SelectActions.PageDown;
      } else if (key === "Escape") {
        return SelectActions.Close;
      } else if (key === "Enter" || key === " ") {
        return SelectActions.CloseSelect;
      }
    }
  };

  const getIndexByLetter = (options, filter, startIndex = 0) => {
    const orderedOptions = [
      ...options.slice(startIndex),
      ...options.slice(0, startIndex),
    ];
    const firstMatch = filterOptions(orderedOptions, filter)[0];
    const allSameLetter = (array) =>
      array.every((letter) => letter === array[0]);

    if (firstMatch) {
      return options.indexOf(firstMatch);
    } else if (allSameLetter(filter.split(""))) {
      const matches = filterOptions(orderedOptions, filter[0]);
      return options.indexOf(matches[0]);
    } else {
      return -1;
    }
  };

  const getUpdatedIndex = (currentIndex, maxIndex, action) => {
    const pageSize = 10;

    switch (action) {
      case SelectActions.First:
        return 0;
      case SelectActions.Last:
        return maxIndex;
      case SelectActions.Previous:
        return Math.max(0, currentIndex - 1);
      case SelectActions.Next:
        return Math.min(maxIndex, currentIndex + 1);
      case SelectActions.PageUp:
        return Math.max(0, currentIndex - pageSize);
      case SelectActions.PageDown:
        return Math.min(maxIndex, currentIndex + pageSize);
      default:
        return currentIndex;
    }
  };

  const isElementInView = (element) => {
    const bounding = element.getBoundingClientRect();

    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const isScrollable = (element) => {
    return element && element.clientHeight < element.scrollHeight;
  };

  const maintainScrollVisibility = (activeElement, scrollParent) => {
    const { offsetHeight, offsetTop } = activeElement;
    const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

    const isAbove = offsetTop < scrollTop;
    const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

    if (isAbove) {
      scrollParent.scrollTo(0, offsetTop);
    } else if (isBelow) {
      scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
    }
  };

  const filterOptions = (options = [], filter, exclude = []) => {
    return options.filter((option) => {
      const matches = option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
      return matches && exclude.indexOf(option) < 0;
    });
  };

  const SelectActions = {
    Close: 0,
    CloseSelect: 1,
    First: 2,
    Last: 3,
    Next: 4,
    Open: 5,
    PageDown: 6,
    PageUp: 7,
    Previous: 8,
    Select: 9,
    Type: 10,
  };

  const optionsMarkup = options.map((option, index) => (
    <div
      key={index}
      role="option"
      id={`combo-${index}`}
      className={`combo-option ${
        index === activeIndex ? "option-current" : ""
      }`}
      aria-selected={index === activeIndex}
      onClick={() => handleOptionClick(index)}
    >
      {option}
    </div>
  ));

  return (
    <div className="combo js-select" ref={comboEl}>
      <div
        role="combobox"
        id="combo1"
        className="combo-input"
        aria-expanded={isOpen}
        aria-activedescendant={`combo-${activeIndex}`}
        aria-labelledby="combo1-label"
        tabIndex="0"
        onBlur={handleComboBlur}
        onClick={handleComboClick}
        onKeyDown={handleComboKeyDown}
      ></div>
      <div
        role="listbox"
        id="listbox1"
        className={`combo-menu ${isOpen ? "open" : ""}`}
        aria-labelledby="combo1-label"
        tabIndex="-1"
        ref={listboxEl}
      >
        {optionsMarkup}
      </div>
    </div>
  );
};

export default SortDropdown;
