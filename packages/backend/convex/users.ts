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
        const userId = await ctx.db.insert("users", {
            name: "SIZ",
            // similar to what we required in schema
        });
        return userId;
    },
});