/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSFworkflow = /* GraphQL */ `
  mutation CreateSFworkflow(
    $input: CreateSFworkflowInput!
    $condition: ModelSFworkflowConditionInput
  ) {
    createSFworkflow(input: $input, condition: $condition) {
      id
      SFARN
      status
      final_highlight
      final_original
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateSFworkflow = /* GraphQL */ `
  mutation UpdateSFworkflow(
    $input: UpdateSFworkflowInput!
    $condition: ModelSFworkflowConditionInput
  ) {
    updateSFworkflow(input: $input, condition: $condition) {
      id
      SFARN
      status
      final_highlight
      final_original
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteSFworkflow = /* GraphQL */ `
  mutation DeleteSFworkflow(
    $input: DeleteSFworkflowInput!
    $condition: ModelSFworkflowConditionInput
  ) {
    deleteSFworkflow(input: $input, condition: $condition) {
      id
      SFARN
      status
      final_highlight
      final_original
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
