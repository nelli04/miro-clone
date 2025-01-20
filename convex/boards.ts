import {query} from "./_generated/server";
import {v} from "convex/values";
import {getAllOrThrow} from 'convex-helpers/server/relationships'

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favorites: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error('Unauthorized')
        }

        if(args.favorites) {
            const favoritedBoards = await ctx.db
                .query('userFavorites')
                .withIndex('by_userOrg', (q) =>
                    q
                        .eq('userId', identity.subject)
                        .eq('orgId', args.orgId)
                )
                .order('desc')
                .collect()

            const ids = favoritedBoards.map(b => b.boardId)

            const boards = await getAllOrThrow(ctx.db, ids)

            return boards.map(b => ({
                ...b,
                isFavorite: true
            }))
        }

        const title = args.search as string
        let boards = []

        if (title) {
            boards = await ctx.db
                .query('boards')
                .withSearchIndex('search_title', (q) =>
                    q
                        .search('title', title)
                        .eq('orgId', args.orgId)
                )
                .collect()
        } else {
            boards = await ctx.db
                .query("boards")
                .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
                .order("desc")
                .collect()
        }

        const boardsWithFavoriteRelation = boards.map((b) => {
            return ctx.db
                .query('userFavorites')
                .withIndex('by_user_board', (q) =>
                    q
                        .eq('userId', identity.subject)
                        .eq('boardId', b._id)
                )
                .unique()
                .then((f) => {
                    return {
                        ...b,
                        isFavorite: !!f
                    }
                })
        })

        const boardsWithFavoriteBoolean = Promise.all(boardsWithFavoriteRelation)

        return boardsWithFavoriteBoolean
    }
})
