import React, { FunctionComponent, useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Avatar, Button, List, Spin, Alert } from "antd";
import { Listings as ListingsData } from "./__generated__/Listings";
import { ListingsSkeleton } from "./components/ListingsSkeleton";
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables
} from "./__generated__/DeleteListing";
import "./styles/Listings.css";

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
    title: string
}



export const Listings = ({ title }: Props) => {
    const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);
    // const [listings, setListings] = useState<Listing[] | null>(null)
    // useEffect(() => {
    //     fetchListings();
    //     if (listings && listings.length) {
    //         console.log("Listings Exist!");
    //     }
    // }, [])

    // const fetchListings = async() => {
    //     const { data } = await server.fetch<ListingsData>({ query: LISTINGS })
    //     setListings(data.listings)
    //     console.log(data);
    // }
    const [deleteListing,{ loading: deleteListingLoading, error: deleteListingError }] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

    const handleDeleteListing = async(id: string) => {
        await deleteListing({ variables: { id } })
        refetch();
    }

    const deleteListingLoadingMessage = deleteListingLoading ? (
      <h4>Deletion in progress...</h4>
    ) : null;

    const deleteListingErrorAlert = deleteListingError ? (
      <Alert
        type="error"
        message="Uh oh! Something went wrong :(. Please try again later."
        className="listings__alert"
      />
    ) : null;

    const listings = data ? data.listings : null;

    const listingsList = listings ? (
        // <ul>
        //   {listings.map((listing) => {
        //     return (
        //         <li key={listing.id}>
        //             {listing.title}{" "}
        //             <button key={listing.id} onClick={() =>handleDeleteListing(listing.id)}>Delete a listing!</button>
        //         </li>
        //     );
        //   })}
        // </ul>
      <List
        itemLayout="horizontal"
        dataSource={listings}
        renderItem={listing => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => handleDeleteListing(listing.id)}>
                Delete
              </Button>
            ]}
          >
            <List.Item.Meta 
              title={listing.title}
              description={listing.address}
              avatar={<Avatar src={listing.image} shape="square" size={48} />}
            />
          </List.Item>
        )}
      />
    ) : null;

    if(loading) {
      return (
        <div className="listings">
          <ListingsSkeleton title={title} />
        </div>
      );
    }
    
    if(error) {
      return (
      <div className="listings">
        <ListingsSkeleton title={title} error />
      </div>
      );
    }

    return (
        <div className="listings">
          {deleteListingErrorAlert}
          <Spin spinning={deleteListingLoading}>
              <h2>hello {title}</h2>
              { listingsList }
              { deleteListingLoadingMessage }
          </Spin>
        </div>
    )
};