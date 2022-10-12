import {
  Button,
  Checkbox,
  Flex,
  FlexItem,
  Stack,
  Tag,
} from "@deliveryhero/armor";
import { useState } from "react";
import { produce } from "immer";

import {
  IRuleState,
  Rules,
  TCondition,
  TOption,
  TRule,
  UserComponentBaseProps,
} from "./components/Rules";
import { CustomerTargeting, PluginType } from "./components/CustomerTargeting";

import { mockResponse as rulesMockResponse } from "./mockResponse";
import {
  customerRulesConfigAPIResponseMock,
  customerTargetFormStateMock,
} from "./components/CustomerTargeting/__mocks__";

import { Condition, INVENTORY_TARGETING_CONDITIONS } from "./constants";

import "./App.css";

const CONDITION_OPTIONS_MAP = {
  [Condition.SCREEN]: "Screen",
  [Condition.PLACEMENT]: "Placement",
};

const EditComponent: React.FC<UserComponentBaseProps & { condType: string }> = (
  props
) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    (props.values?.data as string[]) || [] // refine type here
  );

  const selectedCondition = rulesMockResponse.rules_builder_metadata
    .find((m) => m.id === "inventory_targeting")
    ?.rules.find((r) => r.id === props.condType);

  const handleCancel = () => {
    if (props.conditionKey) {
      props.setConditions((oldConditions) => {
        return produce(oldConditions, (draft) => {
          const conditionToUpdate = draft.find(
            (c) => c.conditionKey === props.conditionKey
          );
          conditionToUpdate!.mode = "view";
        });
      });
    } else {
      props.setAddNewMode(false);
    }
  };

  const handleApply = () => {
    if (props.conditionKey) {
      // Updating condition
      props.setConditions((oldConditions) => {
        return produce(oldConditions, (draft) => {
          const conditionToUpdate = draft.find(
            (c) => c.conditionKey === props.conditionKey
          );
          if (conditionToUpdate) {
            conditionToUpdate!.mode = "view";
            conditionToUpdate!.values = { data: selectedValues };
          }
        });
      });
    } else {
      // Adding new condition
      props.setConditions((oldConditions) => {
        return produce(oldConditions, (draft) => {
          draft.push({
            conditionKey: `key-${Math.random()}`,
            type: props.condType,
            mode: "view", // "view" | "edit"
            comparator: "in", // used to be: selectedCondition?.supported_comparator[0],
            conditionReadOnly: false,
            logicalOperatorReadOnly: false,
            logicalOperator: "and", // "and" | "and not"
            values: {
              data: selectedValues,
            },
          });
        });
      });
      props.setAddNewMode(false);
    }
  };

  const availableValues = selectedCondition?.values || [];

  return (
    <Flex justifyContent="space-between" direction="column" width={"100%"}>
      <FlexItem>
        <Stack>
          {availableValues.map((item) => (
            <Checkbox
              checked={selectedValues.includes(item.value)}
              key={item.id}
              onChange={(e) => {
                const value = (e.target as HTMLInputElement).name;
                setSelectedValues((oldValues) => {
                  if (oldValues.includes(value)) {
                    return oldValues.filter((v) => v !== value);
                  } else {
                    return [...oldValues, value];
                  }
                });
              }}
              label={item.name}
              marginBottom={2}
              name={item.value}
            />
          ))}
        </Stack>
      </FlexItem>

      <FlexItem>
        <Button onClick={handleApply} primary>
          Apply
        </Button>
        <Button marginLeft={4} onClick={handleCancel} secondary>
          Cancel
        </Button>
      </FlexItem>
    </Flex>
  );
};

const ValuesComponent: React.FC<UserComponentBaseProps> = (props) => {
  const data = props.values?.data as string[];
  return (
    <div>
      {data.map((item: string) => (
        <Tag
          deleteOption="disabled"
          key={item}
          label={item}
          marginRight={2}
          small
        />
      ))}
    </div>
  );
};

const generateOptions = (conditions: Condition[]): TOption[] => {
  return Object.values(conditions).map((conditionType, index) => ({
    type: `inventory_targeting.${conditionType}`,
    title: CONDITION_OPTIONS_MAP[conditionType],
    contentTitle: CONDITION_OPTIONS_MAP[conditionType],
    EditComponent,
    editComponentProps: {
      condType: `inventory_targeting.${conditionType}`,
    },
    ValuesComponent,
    disabled: false,
    onEditCondition: () => {
      return true;
    },
  }));
};

const generateConditions = (): TCondition[] => {
  const conditions =
    rulesMockResponse.rules_builder_metadata.find(
      (condition) => condition.id === "inventory_targeting"
    )?.rules || [];

  return conditions.map((condition) => ({
    conditionKey: `key-${Math.random()}`,
    type: condition.id,
    mode: "view", // "view" | "edit"
    comparator: condition.supported_comparator[0],
    conditionReadOnly: false,
    logicalOperatorReadOnly: false,
    logicalOperator: "and", // "and" | "and not"
    values: {
      data: [],
    },
  }));
};

const generateNewRule = (): TRule => {
  const rule: TRule = {
    addNewMode: false,
    conditions: [],
    disableDeleteRule: false,
    enableAddCondition: true,
    hideDeleteRule: false,
    onAddCondition: () => true,
    onDeleteRule: () => {},
    options: generateOptions(INVENTORY_TARGETING_CONDITIONS),
    optionsSidebarTitle: "Rule Options",
    readonly: false,
    ruleKey: Date.now(),
    title: "Rule",
  };
  return rule;
};

function App() {
  const [rules, setRules] = useState<TRule[]>([generateNewRule()]);

  const handleAddRule = () => {
    setRules((rules) => [...rules, generateNewRule()]);
  };

  const handleDeleteRule = (props: IRuleState) => {
    setRules((rules) => rules.filter((rule) => rule.ruleKey !== props.ruleKey));
  };

  return (
    <section className="wrapper">
      {/* <div className="app">
        <Rules
          addButtonTitle={"Add rule"}
          enableAdd={true}
          onAddRule={handleAddRule}
          onDeleteRule={handleDeleteRule}
          readonly={false}
          rules={rules.map((r, i) => ({ ...r, title: `Rule #${i + 1}` }))}
          setRules={setRules}
        />
      </div> */}
      <div className="app">
        <CustomerTargeting
          profileRules={customerTargetFormStateMock}
          rulesConfigAPIResponse={customerRulesConfigAPIResponseMock}
          disabled={false}
          pluginType={PluginType.Campaign}
          pluginId="campaign-id-1"
          updateCallbacks={{
            updateProfileRules: (profileRules) =>
              console.log("updateProfileRules:", profileRules),
            areRulesValid: (isValid) => console.log("areRulesValid:", isValid),
          }}
        />
      </div>
    </section>
  );
}

export default App;
