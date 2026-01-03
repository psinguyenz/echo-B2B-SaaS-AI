import {query, mutation } from "./_generated/server";

export const getMany = query({
    args:{},
    handler: async (ctx) => {
        const users = await ctx.db.query("users").collect();
        // basic code from convex docs
        return users
    },
});

export const add = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        // doesn't include org id, must be added in Clerk configure claim

        if (identity === null) {
            throw new Error("Not authenticated");
        }   

        const orgId = identity.orgId as string;

        if (!orgId) {
            throw new Error("Missing organization")
        }

        const userId = await ctx.db.insert("users", {
            name: "SIZ",
            // similar to what we required in schema
        });
        
        return userId;
    },
});