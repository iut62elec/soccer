/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSFworkflow = /* GraphQL */ `
  query GetSFworkflow($id: ID!) {
    getSFworkflow(id: $id) {
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
export const listSFworkflows = /* GraphQL */ `
  query ListSFworkflows(
    $filter: ModelSFworkflowFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSFworkflows(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncSFworkflows = /* GraphQL */ `
  query SyncSFworkflows(
    $filter: ModelSFworkflowFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSFworkflows(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
