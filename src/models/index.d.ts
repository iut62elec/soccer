import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerSFworkflow = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SFworkflow, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly SFARN: string;
  readonly status?: string | null;
  readonly final_highlight?: string | null;
  readonly final_original?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySFworkflow = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SFworkflow, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly SFARN: string;
  readonly status?: string | null;
  readonly final_highlight?: string | null;
  readonly final_original?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SFworkflow = LazyLoading extends LazyLoadingDisabled ? EagerSFworkflow : LazySFworkflow

export declare const SFworkflow: (new (init: ModelInit<SFworkflow>) => SFworkflow) & {
  copyOf(source: SFworkflow, mutator: (draft: MutableModel<SFworkflow>) => MutableModel<SFworkflow> | void): SFworkflow;
}