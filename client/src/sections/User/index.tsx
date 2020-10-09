import React, { useState } from "react";
import { match, RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Col, Layout, Row } from "antd";
import { USER } from '../../lib/graphql/queries'
import { User as UserData, UserVariables } from '../../lib/graphql/queries/User/__generated__/User'
import { UserProfile } from "./components";
import { Viewer } from "../../lib/types";
import { ErrorBanner, PageSkeleton } from "../../lib/components";

interface MatchParams {
  id: string;
}


interface Props {
  viewer: Viewer;
}

const { Content } = Layout;
const PAGE_LIMIT = 4;

export const User = ({ viewer, match }: Props & RouteComponentProps<MatchParams>) => {
  const [listingsPage, setListingsPage] = useState(1);
  const [bookingsPage, setBookingsPage] = useState(1);
  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: match.params.id,
      bookingsPage,
      listingsPage,
      limit: PAGE_LIMIT
    }
  })

  if(loading) {
    return (
      <Content className="user">
        <PageSkeleton />
      </Content>
    )
  }

  if(error) {
    return (
      <Content>
        <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
        <PageSkeleton />
      </Content>
    )
  }

  const user = data ? data.user : null;
  const viewerIsUser = viewer.id === match.params.id;

  const userProfileElement = user ? <UserProfile user={user} viewerIsUser={viewerIsUser} /> : null 

  return (
    <Content className="user">
      <Row gutter={12} type="flex" justify="space-between">
        <Col xs={24}>{userProfileElement}</Col>
      </Row>
    </Content>
  );
};
