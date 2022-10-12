/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction } from "react";

export const LogicalOperators = ["and", "and not"] as const;
export type LogicalOperator = typeof LogicalOperators[number];
export type Key = number | string;
export type TSetter<T> = Dispatch<SetStateAction<T>>;

export interface IRuleState {
  /**
   * Unique key for the rule
   */
  ruleKey: Key;

  /**
   * Array of options for the rule
   */
  options: TOption[];

  /**
   * Array of conditions for the rule
   */
  conditions: TCondition[];

  /**
   * Toggles component to add conditions
   */
  addNewMode: boolean;

  /**
   * Disable all edit functionalities
   */
  readonly?: boolean;

  /**
   * Disables adding a new condition
   */
  enableAddCondition?: boolean;

  /**
   * Hides delete button for a rule
   */
  hideDeleteRule?: boolean;

  /**
   * Setter for options. You can simply pass in the setter from useState.
   */
  setOptions: TSetter<TOption[]>;

  /**
   * Setter for conditions. You can simply pass in the setter from useState.
   */
  setConditions: TSetter<TCondition[]>;

  /**
   * Setter for addNewMode. You can simply pass in the setter from useState.
   */
  setAddNewMode: TSetter<boolean>;

  /**
   * Setter for enableAddCondition. You can simply pass in the setter from useState.
   */
  setEnableAddCondition?: TSetter<boolean>;
}

/**
 * ICallbackBaseProps will be passed to condition related callbacks
 */
export interface ICallbackBaseProps extends IRuleState {
  conditionKey: ICondition["conditionKey"];
  conditionIndex: ICondition["conditionIndex"];

  /**
   * Values of the current condition
   */
  values?: ICondition["values"];
}

/**
 * UserComponentBaseProps will be passed to user's components.
 */
export interface UserComponentBaseProps extends ICallbackBaseProps {
  [x: string]: unknown;
}

/**
 * IViewCondition holds props for the viewing of conditions
 * Only used internally in Rule component
 */
export interface IViewCondition {
  /**
   * Unique key to identify a condition in a rule
   */
  conditionKey: Key;

  /**
   * Index of the current condition in the conditions array
   */
  conditionIndex: number;

  /**
   * Display title
   */
  title?: string;

  /**
   * Logical operator for linking conditions (e.g. If/If Not, And, And Not)
   */
  logicalOperator?: LogicalOperator;

  /**
   * Callback used when logical operator is changed. Returning void or false will stop any
   * further execution. You may use this property for validation.
   */
  onLogicalOperatorChange?: (
    props: { logicalOperator: LogicalOperator } & ICallbackBaseProps
  ) => boolean | void;

  /**
   * Causes logical operator to be read only
   */
  logicalOperatorReadOnly?: boolean;

  /**
   * Links condition to values e.g. is, contains
   */
  comparator?: string;

  /**
   * Holds the values of the condition. Will be passed to custom components and callbacks
   */
  values?: Record<string, unknown>;

  /**
   * Custom component to render in values section
   */
  ValuesComponent: React.ComponentType<any>;

  /**
   * Custom props passed to ValuesComponent only
   */
  valuesComponentProps?: Partial<UserComponentBaseProps>;

  /**
   * Determine if the option will be disabled when adding a new condition.
   * Note that the function version will not work as expected if it's parent state does not
   * change and cause a re-render. Always try to use the boolean version with useEffect whenever
   * possible. It is ok to use the function version in Rules component as the entire state is
   * updated on every change.
   */
  disabled?: boolean | ((props: IRuleState) => boolean);

  /**
   * Will disable edit functions on a condition.
   */
  conditionReadOnly?: boolean;

  /**
   * Determines if a condition is the first condition. First conditions will have slight
   * difference e.g. the logical operator will be `Is` instead of `And`.
   */
  first?: boolean;

  /**
   * Callback used when edit button is clicked on a condition
   */
  onEditCondition?: (props: ICallbackBaseProps) => boolean | void;

  /**
   * Callback used when delete button is clicked on a condition
   */
  onDeleteCondition?: (props: ICallbackBaseProps) => boolean | void;

  /**
   * Callback used when view button is clicked on a condition
   */
  onViewCondition?: (props: ICallbackBaseProps) => boolean | void;

  /**
   * Hide button for viewing condition
   *
   * Note: Renaming this prop would cause breaking changes. Keeping it as is for now
   */
  disableViewCondition?: boolean;

  /**
   * Disable editing of condition
   */
  disableEditCondition?: boolean;

  /**
   * Disable deleting of condition
   */
  disableDeleteCondition?: boolean;
}

/**
 * ICondition extends IViewCondition to include props required
 * for editing. Only used internally in Rule component
 */
export interface ICondition extends IViewCondition {
  /**
   * Type of the condition. This is used to map conditions to the option they belong to.
   */
  type: string;

  /**
   * Optional content title displayed in View/Edit section
   */
  contentTitle?: string;

  /**
   * Optional content subtitle displayed in View/Edit section
   */
  contentSubtitle?: string;

  /**
   * Custom component rendered when editing or viewing a condition
   */
  EditComponent: React.ComponentType<any>; // can we use another type instead of any?

  /**
   * Props passed to EditComponent only
   */
  editComponentProps?: Partial<UserComponentBaseProps>;

  /**
   * When set to view, condition will be displayed as a summarized row.
   * When set to edit, the custom EditComponent is rendered.
   */
  mode: "view" | "edit";

  /**
   * Optional content rendered below the condition
   */
  children?: React.ReactNode;
}

/**
 * TOption holds the list of possible conditions and the condition's
 * shared properties, and only omit props that will be local to a condition.
 * Exposed for users to populate when using Rule component.
 */
export type TOption = Pick<
  ICondition,
  | "title"
  | "ValuesComponent"
  | "valuesComponentProps"
  | "disabled"
  | "type"
  | "contentTitle"
  | "contentSubtitle"
  | "EditComponent"
  | "editComponentProps"
  | "onEditCondition"
  | "onDeleteCondition"
  | "onViewCondition"
  | "logicalOperator"
  | "onLogicalOperatorChange"
  | "logicalOperatorReadOnly"
  | "disableViewCondition"
  | "disableEditCondition"
  | "disableDeleteCondition"
>;

/**
 * TCondition picks specific props from ICondition, as the other shared props
 * will be retrieved from TOption. TOption and TCondition are merged based on
 * 'type' to generate ICondition that will be used internally.
 * Exposed for users to populate when using Rule component.
 */
export type TCondition = Pick<
  ICondition,
  | "conditionKey"
  | "title"
  | "type"
  | "logicalOperator"
  | "onLogicalOperatorChange"
  | "logicalOperatorReadOnly"
  | "comparator"
  | "values"
  | "valuesComponentProps"
  | "editComponentProps"
  | "mode"
  | "disabled"
  | "conditionReadOnly"
  | "disableViewCondition"
  | "disableEditCondition"
  | "disableDeleteCondition"
  | "children"
>;

export interface IRuleCustomRenderProps {
  conditionsSection: React.ReactNode;
  editConditionSection: React.ReactNode;
  addNewConditionButton: React.ReactNode;
}

/**
 * IRule is used when using the Rule component directly. When using Rules component, use TRule
 * instead as the setters are handled internally by the Rules component and should be omitted in
 * the props.
 */
export interface IRule extends IRuleState {
  /**
   * Title for rule
   */
  title: string;

  /**
   * Function used to modify the component's contents. Will provide the following props:
   * 1. addNewConditionButton - react node for the button to be clicked to create a new conditions
   * 2. conditionsSection - react node for the list of conditions
   * 3. editConditionSection - react node for the section that becomes visible when editing a condition
   *
   * example
   * ```
   * const customRenderer = ({ addNewConditionButton, conditionsSection, editConditionSection }) => (
   *   <div>
   *     <div>additional content below title</div>
   *     {conditionsSection}
   *     {editConditionSection}
   *     {addNewConditionButton}
   *     <div>custom footer</div>
   *   </div>
   * );
   * ```
   */
  render?: (props: IRuleCustomRenderProps) => React.ReactNode;

  /**
   * Optional side bar title displayed above the options list when adding a new condition
   */
  optionsSidebarTitle?: string;

  /**
   * Callback used when adding a new condition. Returning void or false will stop any
   * further execution. You may use this property for validation.
   * Note that the Rule component will automatically set addNewMode to false unless the
   * onAddCondition is defined and returns a falsy value.
   */
  onAddCondition?: (props: IRuleState) => boolean | void;

  /**
   * Callback used when deleting a rule. Returning void or false will stop any
   * further execution. You may use this property for validation.
   */
  onDeleteRule?: (props: IRuleState) => void;

  /**
   * Disables edit functionalities for rule
   */
  readonly?: boolean;

  /**
   * Disables editing of logical operator for entire rule
   */
  logicalOperatorReadOnly?: IViewCondition["logicalOperatorReadOnly"];

  /**
   * Disable deleting of rule
   */
  disableDeleteRule?: boolean;
}

/**
 * TRule is used with the Rules component
 */
export type TRule = Pick<
  IRule,
  | "ruleKey"
  | "title"
  | "optionsSidebarTitle"
  | "options"
  | "conditions"
  | "addNewMode"
  | "onDeleteRule"
  | "enableAddCondition"
  | "hideDeleteRule"
  | "onAddCondition"
  | "readonly"
  | "render"
  | "disableDeleteRule"
>;

/**
 * IRules is used for the Rules component props
 */
export interface IRules {
  /**
   * Array of rules
   */
  rules: TRule[];

  /**
   * Setter for rules. You can simply pass in the setter from useState.
   */
  setRules: TSetter<TRule[]>;

  /**
   * Shows/Hides the Add New Rule button
   */
  enableAdd?: boolean;

  /**
   * Custom the Add Rule button text, default to "Add rule" if not provided
   */
  addButtonTitle?: string;

  /**
   * Callback used when adding a new rule. Returning void or false will stop any
   * further execution. You may use this property for validation.
   * Note that the Rules component will automatically push the new rule into the state unless
   * the onAddRule is not defined or returns a falsy value.
   */
  onAddRule: () =>
    | {
        ruleKey: Key;
        title: string;
        options: TOption[];
        conditions?: TCondition[];
        addNewMode?: boolean;
        readonly?: boolean;
      }
    | boolean
    | void;

  /**
   * Callback used when deleting a rule. Returning void or false will stop any
   * further execution. You may use this property for validation.
   * Note that the Rules component will automatically remove the rule from the state unless the
   * onDeleteRule is not defined or returns a falsy value.
   */
  onDeleteRule?: (props: IRuleState) => boolean | void;

  /**
   * Disables edit functionalities for all rules
   */
  readonly?: boolean;
}
