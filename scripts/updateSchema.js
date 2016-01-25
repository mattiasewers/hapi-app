import fs from 'fs';
import path from 'path';
import {graphql} from 'graphql';
import {introspectionQuery, printSchema} from 'graphql/utilities';
import schema from '../lib/schema';
// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
  const result = await (graphql(schema, introspectionQuery));
  if (result.errors) {
    console.error( // eslint-disable-line no-console
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, '../lib/db/dist/schema.json'),
      JSON.stringify(result, null, 2)
    );
  }
})();

// Save user readable type system shorthand of schema
fs.writeFileSync(
  path.join(__dirname, '../lib/db/dist/schema.graphql'),
  printSchema(schema)
);