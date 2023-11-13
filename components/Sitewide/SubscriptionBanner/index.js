"use client";
import React, { useState } from "react";
import { renderRichTextField } from "/lib/contentRenderer";
import { Button } from "/components/Elements/Button";
import { useSelector } from "react-redux";
import {
  selectFormValidationMessage,
  selectResponseCodeMessage,
} from "../../../store/slices/labelsSlice";
import {
  getResponseMessageByCode,
  getValidationMessageByType,
  validateEmail,
} from "../../../lib/Common";
import { createEmailSubscription } from "../../../lib/methods";
import { extractInnerContent } from "../../../lib/contentRenderer";

const SubscriptionBanner = ({ ...props }) => {
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const {
    heading,
    main_content,
    email_field_label,
    button,
    disclaimer,
    submission_success_message,
    submission_failure_message,
    cta_style = "primary-black"
  } = props ?? {};
  const formValidationResponse = useSelector(selectFormValidationMessage);
  const responseCodeMessage = useSelector(selectResponseCodeMessage);
  const inputValidationResponse =
    formValidationResponse?.input_validation_messages;
  const apiResponseMessage = responseCodeMessage?.api_response_messages;
  const failureMessage = renderRichTextField(submission_failure_message, "p")

  const handleBtnSubmission = (e) => {
    e.preventDefault();
    handleFormSubmission();
  };

  const handleChangeInput = async (e) => {
    setEmail(e.target.value);
    handleValidation();
  };

  const handleValidation = () => {
    let status = false;
    if ((email === "") | (email === null)) {
      setErrorMsg(
        getValidationMessageByType(inputValidationResponse, "required")
      );
    } else if (!validateEmail(email)) {
      setErrorMsg(
        getValidationMessageByType(inputValidationResponse, "invalidEmail")
      );
    } else {
      setErrorMsg(null);
      status = true;
    }
    return status;
  };

  const handleFormSubmission = async () => {
    if (!handleValidation()) {
      return false;
    }
    try {
      const response = await createEmailSubscription({ email });
      const status = response?.status || 400;
      if (status === 202 || status === 200) {
        setShowSuccessScreen(true);
      } else {
        if (submission_failure_message) {
          setErrorMsg(failureMessage);
        } else {
          const message = getResponseMessageByCode(
            apiResponseMessage,
            ex?.statusCode || 400
          );
          setErrorMsg(message);
        }
      }
    } catch (ex) {
      if (submission_failure_message) {
        setErrorMsg(failureMessage);
      } else {
        const message = getResponseMessageByCode(
          apiResponseMessage,
          ex?.statusCode || 400
        );
        setErrorMsg(message);
      }
    }
  };

  return (
    <>
      <section className={"subscription-banner tm-height"}>
        {showSuccessScreen && (
          <div className="w1">
            <span className="check-icon"></span>
            <div className="heading">
              {renderRichTextField(extractInnerContent(submission_success_message, "h2"), "h2")}
            </div>
            <div className="message p-sm">
              {renderRichTextField(extractInnerContent(submission_success_message, "p"), "p")}
            </div>
          </div>
        )}
        {!showSuccessScreen && (
          <div className="w1">
            <div className="heading">{renderRichTextField(heading, "h2")}</div>
            <div className="message">
              {renderRichTextField(main_content, "p")}
            </div>
            <form
              className={"join-form"}
              onSubmit={() => {
                e.preventDefault();
                handleFormSubmission();
              }}
            >
              <div className="form-group">
                <div className={"tm-input"}>
                  <input
                    type="email" className={errorMsg ? "error" : ''}
                    placeholder={email_field_label}
                    value={email}
                    onChange={handleChangeInput}
                  />
                  {errorMsg && <div className="error-message p-xs">{errorMsg}</div>}
                </div>

                <Button
                  label={button.title}
                  url={button.href}
                  type={cta_style}
                  onClick={handleBtnSubmission}
                />
              </div>

            </form>
            <div className="disclaimer p-xs">
              {renderRichTextField(disclaimer, "span")}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default SubscriptionBanner;
