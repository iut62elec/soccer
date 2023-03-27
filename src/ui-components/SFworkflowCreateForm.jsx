/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { SFworkflow } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function SFworkflowCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    SFARN: "",
    status: "",
    final_highlight: "",
    final_original: "",
  };
  const [SFARN, setSFARN] = React.useState(initialValues.SFARN);
  const [status, setStatus] = React.useState(initialValues.status);
  const [final_highlight, setFinal_highlight] = React.useState(
    initialValues.final_highlight
  );
  const [final_original, setFinal_original] = React.useState(
    initialValues.final_original
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setSFARN(initialValues.SFARN);
    setStatus(initialValues.status);
    setFinal_highlight(initialValues.final_highlight);
    setFinal_original(initialValues.final_original);
    setErrors({});
  };
  const validations = {
    SFARN: [{ type: "Required" }],
    status: [],
    final_highlight: [],
    final_original: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          SFARN,
          status,
          final_highlight,
          final_original,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new SFworkflow(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "SFworkflowCreateForm")}
      {...rest}
    >
      <TextField
        label="Sfarn"
        isRequired={true}
        isReadOnly={false}
        value={SFARN}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              SFARN: value,
              status,
              final_highlight,
              final_original,
            };
            const result = onChange(modelFields);
            value = result?.SFARN ?? value;
          }
          if (errors.SFARN?.hasError) {
            runValidationTasks("SFARN", value);
          }
          setSFARN(value);
        }}
        onBlur={() => runValidationTasks("SFARN", SFARN)}
        errorMessage={errors.SFARN?.errorMessage}
        hasError={errors.SFARN?.hasError}
        {...getOverrideProps(overrides, "SFARN")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              SFARN,
              status: value,
              final_highlight,
              final_original,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="Final highlight"
        isRequired={false}
        isReadOnly={false}
        value={final_highlight}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              SFARN,
              status,
              final_highlight: value,
              final_original,
            };
            const result = onChange(modelFields);
            value = result?.final_highlight ?? value;
          }
          if (errors.final_highlight?.hasError) {
            runValidationTasks("final_highlight", value);
          }
          setFinal_highlight(value);
        }}
        onBlur={() => runValidationTasks("final_highlight", final_highlight)}
        errorMessage={errors.final_highlight?.errorMessage}
        hasError={errors.final_highlight?.hasError}
        {...getOverrideProps(overrides, "final_highlight")}
      ></TextField>
      <TextField
        label="Final original"
        isRequired={false}
        isReadOnly={false}
        value={final_original}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              SFARN,
              status,
              final_highlight,
              final_original: value,
            };
            const result = onChange(modelFields);
            value = result?.final_original ?? value;
          }
          if (errors.final_original?.hasError) {
            runValidationTasks("final_original", value);
          }
          setFinal_original(value);
        }}
        onBlur={() => runValidationTasks("final_original", final_original)}
        errorMessage={errors.final_original?.errorMessage}
        hasError={errors.final_original?.hasError}
        {...getOverrideProps(overrides, "final_original")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
