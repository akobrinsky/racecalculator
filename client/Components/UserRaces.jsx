import React from "react";
import environment from "../Environment";
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay";

const UserRaces = (props) => {
  const { userID } = props;
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query UserRacesQuery($userID: ID!) {
          user(id: $userID) {
            email
            username
            id
            races {
              edges {
                node {
                  date
                  type
                  time
                  id
                }
              }
            }
          }
        }
      `}
      variables={{ userID }}
      render={({ error, props }) => {
        console.log(props);
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }

        return (
          <div className="container is-max-desktop py-5">
            <h1>Viewer: {props.user.username}</h1>
            <table className="table is-striped is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {props.user.races.edges.map((item) => (
                  <tr>
                    <td>{item.node.date}</td>
                    <td>{item.node.type}</td>
                    <td>{item.node.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }}
    />
  );
};
export default UserRaces;
