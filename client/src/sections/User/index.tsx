import React from "react";
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { USER } from '../../lib/graphql/queries'
import { User as UserData, UserVariables } from '../../lib/graphql/queries/User/__generated__/User'

interface MatchParams {
  id: string;
}


export const User = ({ match }: RouteComponentProps<MatchParams>) => {
  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: match.params.id
    }
  })

  const user = data ? data.user : null;
  // const userProfileElement = user ? <UserProfile user={user} /> : null 

  return <h2>User</h2>;
};
