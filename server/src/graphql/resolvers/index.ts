import merge from "lodash.merge";
import { listingResolvers } from "./Listing";
import { viewerResolver } from "./Viewer";

export const resolvers = merge(listingResolvers, viewerResolver);
