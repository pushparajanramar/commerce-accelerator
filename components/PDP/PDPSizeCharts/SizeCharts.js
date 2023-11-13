"use client";

import React, { useState, useRef, useEffect } from "react";
import parse from "html-react-parser";
import tableHeadingFix from "./TableHeadingFix";
import Modal from "../../Elements/Modal";
const { parse: HTMLParser } = require("node-html-parser");

function fixtablebody(richTextBlock) {
  const parsedRichtText = HTMLParser(richTextBlock);
  const tables = parsedRichtText.querySelectorAll("table");
  tables.forEach((table) => {
    tableHeadingFix(table);
  });
  const convertedRichText = parsedRichtText.toString();
  const tableBody = parse(convertedRichText);
  return tableBody;
}

const SizeCharts = ({ data, categoryId }) => {
  const { size_charts } = data;
  const [accordion, setAccordion] = useState({
    accordionTitle: "",
    accordionBody: "",
  });

  const [outerisOpen, setOuterIsopen] = useState(false);
  const [modal, openModal] = useState(false);
  const modalRef = useRef();

  function onClose() {
    openModal(false);
  }

  function modalOpener() {
    openModal((ogState) => !ogState);
  }

  function outerclickHandler() {
    setOuterIsopen((ogState) => !ogState);
  }

  const ChartBody = (chartContent, idx) => {
    function clickHandler() {
      const fixBody = fixtablebody(chartContent?.table_data || "");
      setAccordion({
        accordionTitle: chartContent.label,
        accordionBody: fixBody,
      });
      outerclickHandler();
    }

    return (
      <li key={`parsed_chart_${idx} `} onClick={clickHandler} tabIndex={0}>
        <h4>{chartContent.label}</h4>
      </li>
    );
  };

  const charts = size_charts?.chart_and_content.map((chartContent, idx) =>
    ChartBody(chartContent, idx)
  );

  useEffect(() => {
    setAccordion(() => {
      const details = size_charts?.chart_and_content.find((eachContent) => {
        const category = eachContent?.category_picker.split(",");
        if (Array.isArray(category)) {
          for (const code of category) {
            if (categoryId.includes(code)) {
              return eachContent;
            }
          }
        }
      });
      if (details) {
        const _accordion = { ...accordion };
        _accordion.accordionTitle = details.label;
        const tableBody = details.table_data;
        _accordion.accordionBody = parse(tableBody);
        setOuterIsopen(false);
        return _accordion;
      } else {
        setOuterIsopen(true);
        const _accordion = { ...accordion };
        _accordion.accordionTitle = size_charts?.component_label;
        _accordion.accordionBody = "";
        return _accordion;
      }
    });
  }, [categoryId, size_charts, modal]);

  return (
    <div className="pdp-size-chart">
      <button onClick={modalOpener}>Size Charts</button>
      {modal ? (
        <>
          <Modal
            title={"Size Chart"}
            subtitle={true}
            classname={"size-chart"}
            onClose={() => openModal((ogState) => !ogState)}
          >
            <div className="sizechart-list">
              <button className="title" onClick={outerclickHandler}>
                {accordion ? <h2>{accordion?.accordionTitle}</h2> : null}
                <span className={outerisOpen ? "close" : "open"}></span>
              </button>

              {outerisOpen ? <ul className="list-items">{charts}</ul> : null}
              {accordion?.accordionBody ? (
                <>{accordion?.accordionBody}</>
              ) : null}
              {parse(size_charts?.charts_help_text)}
            </div>
          </Modal>
        </>
      ) : null}
    </div>
  );
};

export default SizeCharts;
