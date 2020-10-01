import { IResolvers } from "apollo-server-express";
import { ObjectId } from "mongodb";
import { Database, Listing } from "../../lib/types";

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    // deleteListing: async(_root: undefined, { id }: { id: string }, { db } : { db: Database }): Promise<Listing> => {
    //   const deleteRes = await db.listings.findOneAndDelete({
    //     _id: new ObjectId(id)
    //   })
<<<<<<< HEAD
    //   if(!deleteRes.value) {
    //     throw new Error("Failed to delete Listing");
    //   }
=======

    //   if(!deleteRes.value) {
    //     throw new Error("Failed to delete Listing");
    //   }

>>>>>>> 7815e3cecbc3dce54a789fff9583b768e358dddd
    //   return deleteRes.value
    // }
  },
  Listing: {
    id: (listing: Listing) => listing._id.toString(),
  },
};
