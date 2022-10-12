import React, { useState } from "react";
import * as Bootstrap from "react-bootstrap";
import { DatePicker } from "@deliveryhero/armor-datepicker";
import { concat, not, without } from "ramda";
import { ProfileEditorProps } from "../types";
import {
  getConfigByKey,
  getComparatorFromSupportedCondition,
  serializeDateToString,
  formatDate,
  getDateToday,
} from "../utils/helper";

const { Form, Modal } = Bootstrap;

const ProfileEditor: React.FC<ProfileEditorProps> = ({
  configs,
  profile: { fieldKey, comparator, value },
  onChange,
}) => {
  const [showMultipleValueSelector, setShowMultipleValueSelector] =
    useState(false);
  const selectedConfig = getConfigByKey(fieldKey, configs);
  const { supported_conditions, type, values } = selectedConfig;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target || {};
    onChange({ [name]: value }, selectedConfig);
  };

  const onMultipleSelectionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, value: checkedValue } = e.target || {};
    const prevValue = Array.isArray(value) ? value : [];
    const newValue = checked
      ? concat([checkedValue], prevValue)
      : without([checkedValue], prevValue);
    onChange({ value: newValue }, selectedConfig);
  };

  const onDatePickerChange = (date: Date | null | undefined) => {
    if (!date) {
      return;
    }
    onChange({ value: serializeDateToString(date, "date") }, selectedConfig);
  };

  const TWO_DECIMAL_PLACES = 0.01;
  const NO_DECIMAL_PLACES = 1;
  const INPUT_NUMBER_STEP =
    type === "float" ? TWO_DECIMAL_PLACES : NO_DECIMAL_PLACES;
  const INPUT_NUMBER_MIN = 0;
  const EMPTY_SELECTION = 0;

  // support for in comparator with date or time is poor, so we're only going to ensure it doesn't crash for now
  const dateValue =
    ["time", "date"].includes(type) && comparator.includes("in")
      ? (value as string[])[0]
      : value;
  const selectedDateValue = dateValue ? new Date(`${dateValue}`) : null;

  return (
    <div className="profile-selector-row">
      <Form.Group
        controlId="field-input"
        className="profile-selector-form-control field-input"
      >
        <Form.Control
          data-testid="profile-editor-field-key-control"
          as="select"
          name="fieldKey"
          value={fieldKey}
          onChange={onInputChange}
        >
          {configs.map(({ name, key }) => (
            <option value={key} key={key}>
              {name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group
        controlId="comparator-input"
        className="profile-selector-form-control comparator-input"
      >
        <Form.Control
          data-testid="profile-editor-comparator-control"
          as="select"
          name="comparator"
          value={comparator}
          onChange={onInputChange}
        >
          {supported_conditions.map((comparatorOption) => {
            const comparatorDisplay =
              getComparatorFromSupportedCondition(comparatorOption);
            return (
              <option value={comparatorDisplay} key={comparatorOption}>
                {comparatorDisplay}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      <Form.Group
        controlId="value-input"
        className="profile-selector-form-control value-input"
      >
        {type === "string" ? (
          values && values.length ? ( // theres pre-defined values (selector options)
            comparator.includes("in") ? (
              <Form.Control
                data-testid="profile-editor-multiple-select-control"
                as="select"
                name="value"
                onClick={() => {
                  if (not(showMultipleValueSelector)) {
                    setShowMultipleValueSelector(true);
                  }
                }}
              >
                {/* show the selected value */}
                <option>
                  {Array.isArray(value) ? value.length : EMPTY_SELECTION}{" "}
                  selected
                </option>
                <Modal
                  show={showMultipleValueSelector}
                  animation={false}
                  size="sm"
                  onHide={() => setShowMultipleValueSelector(false)}
                  centered
                  scrollable={false}
                >
                  <Modal.Body data-testid="profile-editor-multiple-select-options-modal-body">
                    {values.map(({ name, value: configValue }) => (
                      <Form.Check
                        data-testid="profile-editor-multiple-select-option"
                        // custom
                        key={configValue}
                        label={name}
                        name={name}
                        value={configValue}
                        checked={
                          Array.isArray(value) && value.includes(configValue)
                        }
                        onChange={onMultipleSelectionChange}
                        data-value={configValue}
                        id={configValue}
                      />
                    ))}
                  </Modal.Body>
                </Modal>
              </Form.Control>
            ) : (
              <Form.Control
                data-testid="profile-editor-select-control"
                as="select"
                name="value"
                value={`${value}`}
                onChange={onInputChange}
              >
                {values.map(({ name, value }) => (
                  <option value={value} key={value}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            )
          ) : (
            // render a free text input
            <Form.Control
              data-testid="profile-editor-text-input-control"
              type="text"
              name="value"
              onChange={onInputChange}
              value={`${value}`}
            />
          )
        ) : type === "int" || type === "float" ? (
          <>
            <Form.Control
              data-testid="profile-editor-number-input-control"
              as="input"
              type="number"
              name="value"
              onChange={onInputChange}
              value={`${value}`}
              min={
                values.find((i) => i.name === "min")?.value || INPUT_NUMBER_MIN
              }
              max={values.find((i) => i.name === "max")?.value || Infinity}
              step={INPUT_NUMBER_STEP}
            />
            <Form.Control.Feedback type="invalid">
              Invalid number! (
              {values.map(({ name, value }) => `${name}: ${value}`).join(", ")})
            </Form.Control.Feedback>
          </>
        ) : type === "bool" ? (
          <Form.Control
            data-testid="profile-editor-bool-input-control"
            as="select"
            name="value"
            value={`${value}`}
            onChange={onInputChange}
          >
            <option value="true" key="true">
              true
            </option>
            <option value="false" key="false">
              false
            </option>
          </Form.Control>
        ) : type === "time" || type === "date" ? (
          <div data-testid="profile-editor-datepicker-control">
            <DatePicker
              onDateValueChange={onDatePickerChange}
              placeholder={`(e.g. ${formatDate(getDateToday(), "DD/MM/YYYY")})`}
              dateValue={selectedDateValue}
              // name="start-date" // label?
              // dateFormat="dd/MM/yyyy"
            />
          </div>
        ) : (
          // we might not need this, but just in case we have another type
          <Form.Control
            type="text"
            name="value"
            onChange={onInputChange}
            value={`${value}`}
          />
        )}
      </Form.Group>
    </div>
  );
};

export default ProfileEditor;
