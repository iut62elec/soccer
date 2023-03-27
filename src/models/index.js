// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SFworkflow } = initSchema(schema);

export {
  SFworkflow
};