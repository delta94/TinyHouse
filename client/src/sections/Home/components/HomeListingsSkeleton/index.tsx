import React from "react";
import { Card, List, Skeleton } from "antd";

import listingLoadingCardCover from "../../assets/listing-loading-card-cover.jpg";

export const HomeListingsSkeleton = () => {
    const emptyData = [{},{},{},{}]

    return (
        <div className="home-listings-skeleton">
            <Skeleton paragraph={{ rows: 0 }} />
            <List
                grid={{
                    gutter: 8
                }}
                dataSource={emptyData}
                renderItem={() => {
                    <List.Item>
                        <Card
                         cover={
                             <div
                                style={}
                             ></div>
                         }
                        />
                    </List.Item>
                }}
            />
        </div>
    )
}