import React from 'react';
import environment from '../Environment'
import {createFragmentContainer, graphql, QueryRenderer} from 'react-relay';

const UserRaces = (props) => {
  const {userID} = props;
  console.log(userID)
  return (
    <QueryRenderer
    environment={environment}
    query={graphql`
    query UserRacesQuery($userID: ID!) {
      user(id: $userID) {
        email
        username
        id
      }
    }
    `}
    variables={{userID}}
    render={({error, props}) => {
      console.log(props)
      if (error) {
        return <div>Error!</div>;
      }
      if (!props) {
        return <div>Loading...</div>;
      }

      return (
      <div>
        <h1>User ID: {props.user.username}</h1>
          <div>{props.user.email}</div>
      </div>
      );
    }}
  />
  )
}
export default UserRaces;