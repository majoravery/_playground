import React, { useState } from "react";
import * as Bootstrap from "react-bootstrap";
import { IconButton } from "@deliveryhero/armor";
import { TCondition } from "../../Rules";
import { EditRuleFooter } from "../EditRuleFooter";
import {
  append,
  update,
  isEmpty,
  remove,
  isNil,
  nth,
  not,
  defaultTo,
} from "ramda";
import { Profile, ProfileConfig, ConditionEditorProps } from "../types";
import {
  findProfileFromConditions,
  getDefaultProfile,
  getConfigByKey,
} from "../utils/helper";
import { ProfileEditor } from "../ProfileEditor";
import { DeleteIcon } from "@deliveryhero/armor-icons";

const { Form } = Bootstrap;

export const ConditionEditor: React.FC<ConditionEditorProps> = ({
  conditions,
  conditionKey,
  conditionIndex,
  setConditions,
  addNewMode,
  setAddNewMode,
  readonly,
  section,
}) => {
  const [validated, setValidated] = useState(true);
  const [profile, setProfile] = useState(
    defaultTo(
      getDefaultProfile(section),
      findProfileFromConditions(conditionKey, conditions)
    )
  );

  const updateProfile = (
    changes: Partial<Pick<Profile, "fieldKey" | "comparator" | "value">>,
    config: ProfileConfig
  ) => {
    let updatedProfile: Profile;
    if (not(isNil(changes.fieldKey))) {
      updatedProfile = getDefaultProfile(section, changes.fieldKey);
    } else if (
      not(isNil(changes.comparator)) &&
      changes.comparator === "in" // comparator for multiple values
    ) {
      // the user changes from "in" comparator which supports array of values,
      // to "=" which supports only single value
      updatedProfile = {
        ...profile,
        ...changes,
        value: [],
      };
    } else if (not(isNil(changes.value))) {
      let newValue: Profile["value"] = changes.value || "";
      if (config.type === "bool") {
        newValue = changes.value as boolean;
      }
      if (config.type === "int" || config.type === "float") {
        newValue = Number(changes.value);

        if (not(isEmpty(config.values))) {
          // number validations are defined here
          const minValue = Number(
            config.values.find(({ name }) => name === "min")?.value || -Infinity
          );
          const maxValue = Number(
            config.values.find(({ name }) => name === "max")?.value || Infinity
          );
          if (newValue < minValue || newValue > maxValue) {
            setValidated(false);
            return;
          }
        }
      }
      updatedProfile = {
        ...profile,
        value: newValue,
      };
    } else {
      updatedProfile = {
        ...profile,
        ...changes,
      };
    }
    setValidated(true);
    setProfile(updatedProfile);
  };

  const handleCancel = () => {
    const currentCondition = nth(conditionIndex, conditions);
    if (isNil(currentCondition)) {
      // new condition
      setAddNewMode(false);
      return;
    }
    const newCondition: TCondition = {
      ...currentCondition,
      mode: "view",
    };
    const updatedConditions = update(conditionIndex, newCondition, conditions);
    setConditions(updatedConditions);
  };

  const handleApply = (event?: React.FormEvent<HTMLFormElement>) => {
    // prevent HTML form to be submitted upon key-in "Enter"
    event?.preventDefault();
    event?.stopPropagation();

    // trim whitespace from value to be saved
    if (typeof profile.value === "string") profile.value = profile.value.trim();

    // update UI component props
    const { name: sectionName } = section;
    const profileConfig = getConfigByKey(profile.fieldKey, section.rules);
    const profileName = profileConfig.name;
    const newConditionRulesProp: TCondition = {
      conditionKey: `${profileName}-${conditions.length}`,
      comparator: profile.comparator,
      title: profileName,
      values: { profile },
      type: sectionName,
      logicalOperatorReadOnly: false,
      conditionReadOnly: false,
      logicalOperator: "and",
      mode: "view",
    };

    // TODO this experience can be improved by
    // preventing user from adding new condition
    if (addNewMode) {
      // add new condition
      const updatedConditions = append(newConditionRulesProp, conditions);
      setConditions(updatedConditions);
      setAddNewMode(false);
    } else {
      const updatedConditions = update(
        conditionIndex,
        newConditionRulesProp,
        conditions
      );
      setConditions(updatedConditions);
    }
  };

  const handleDelete = () => {
    const ITEM_TO_REMOVE = 1;
    const updatedConditions = remove(
      conditionIndex,
      ITEM_TO_REMOVE,
      conditions
    );
    setConditions(updatedConditions);
  };

  return (
    <>
      <p>Please select the conditions for customer order.</p>
      <div className="profile-selector" data-testid="profile-selector">
        <IconButton
          className="profile-selector-delete-button"
          data-testid="profile-selector-delete-button"
          disabled={readonly}
          light
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
        <div className="profile-selector-labels">
          <Form.Label className="field-input">Select field</Form.Label>
          <Form.Label className="comparator-input">Comparator</Form.Label>
          <Form.Label className="value-input">Value</Form.Label>
        </div>
        <Form noValidate validated={validated} onSubmit={handleApply}>
          <ProfileEditor
            configs={section.rules}
            profile={profile}
            onChange={updateProfile}
          />
        </Form>
      </div>

      <EditRuleFooter
        onApply={() => handleApply()}
        onCancel={handleCancel}
        disableApplyButton={readonly || isEmpty(profile.value)}
      />
    </>
  );
};
