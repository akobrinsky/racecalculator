/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UserRacesQueryVariables = {|
  userID: string
|};
export type UserRacesQueryResponse = {|
  +user: ?{|
    +email: ?string,
    +username: ?string,
    +id: string,
  |}
|};
export type UserRacesQuery = {|
  variables: UserRacesQueryVariables,
  response: UserRacesQueryResponse,
|};
*/


/*
query UserRacesQuery(
  $userID: ID!
) {
  user(id: $userID) {
    email
    username
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userID"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "userID"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "user",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "username",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserRacesQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserRacesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d1e4cfb9ef619e8e5cd69c3e77033c3f",
    "id": null,
    "metadata": {},
    "name": "UserRacesQuery",
    "operationKind": "query",
    "text": "query UserRacesQuery(\n  $userID: ID!\n) {\n  user(id: $userID) {\n    email\n    username\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b5f7c680777ebd53c64ca36dba548f8d';

module.exports = node;
