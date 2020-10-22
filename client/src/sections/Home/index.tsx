import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Layout, Col, Row, Typography } from "antd";
import { Link, RouteComponentProps } from "react-router-dom"
import { HomeHero } from "./components";

import mapBackground from "./assets/map-background.jpg";
import sanFransiscoImage from "./assets/san-fransisco.jpg";
import cancunImage from "./assets/cancun.jpg";
import { displayErrorMessage } from "../../lib/utils";
import { Listings as ListingsData, ListingsVariables } from "../../lib/graphql/queries/Listings/__generated__/Listings";
import { LISTING } from "../../lib/graphql/queries";

const { Content } = Layout;
const { Paragraph, Title } = Typography

export const Home = ({ history }: RouteComponentProps) => {
  const { loading, data } = useQuery<ListingsData, ListingsVariables>(LISTINGS, {
    variables:{}
  })
  const onSearch = (value: string) => {
    const trimmedValue = value.trim();
    history.push(`/listings/${trimmedValue}`)

    if(trimmedValue) {
      history.push(`/listings/${trimmedValue}`)
    } else {
      displayErrorMessage("Please enter a valid search")
    }
  }

  return (
    <Content className="home" style={{ backgroundImage: `url(${mapBackground})` }}>
      <HomeHero onSearch={onSearch} />

      <div className="home__cta-section">
        <Title className="home__cta-section-title">
          Your guide for all things rental
        </Title>
        <Paragraph>Helping you make the best decisions in renting your last minute locations.</Paragraph>
        <Link to="/listings/united%20states" className="ant-btn ant-btn-primary ant-btn-lg home__cta-section-button">
          Popular listings in the United States
        </Link>
      </div>

      <div className="home__listings">
        <Title level={4} className="home__listings-title">
          Listings of any kind
        </Title>
        <Row gutter={12}>
          <Col xs={24} sm={12}>
            <Link to="/listings/san%20fransisco">
              <div className="home__listings-img-cover">
                <img 
                  src={sanFransiscoImage} 
                  alt="San Fransisco" 
                  className="home__listings-img" 
                />
              </div>
            </Link>
          </Col>
          <Col xs={24} sm={12}>
            <Link to="/listings/cancun">
              <div className="home__listings-img-cover">
                <img 
                  src={cancunImage} 
                  alt="Cancun" 
                  className="home__listings-img" 
                />
              </div>
            </Link>
          </Col>
        </Row>
      </div>
    </Content>
  );
};
