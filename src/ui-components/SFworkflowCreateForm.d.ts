/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SFworkflowCreateFormInputValues = {
    SFARN?: string;
    status?: string;
    final_highlight?: string;
    final_original?: string;
};
export declare type SFworkflowCreateFormValidationValues = {
    SFARN?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    final_highlight?: ValidationFunction<string>;
    final_original?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SFworkflowCreateFormOverridesProps = {
    SFworkflowCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    SFARN?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    final_highlight?: PrimitiveOverrideProps<TextFieldProps>;
    final_original?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SFworkflowCreateFormProps = React.PropsWithChildren<{
    overrides?: SFworkflowCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SFworkflowCreateFormInputValues) => SFworkflowCreateFormInputValues;
    onSuccess?: (fields: SFworkflowCreateFormInputValues) => void;
    onError?: (fields: SFworkflowCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SFworkflowCreateFormInputValues) => SFworkflowCreateFormInputValues;
    onValidate?: SFworkflowCreateFormValidationValues;
} & React.CSSProperties>;
export default function SFworkflowCreateForm(props: SFworkflowCreateFormProps): React.ReactElement;
