'use strict';

/**
 * post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
    // Method 1: Creating an entirely custom action
    async exampleAction(ctx) {
        return await strapi.service('api::post.post').exampleService();
      try {
        ctx.body = 'ok';
      } catch (err) {
        ctx.body = err;
      }
    },
  
    // Method 2: Wrapping a core action (leaves core logic in place)
    async find(ctx) {
        
        
        const isRequestingNonPremium = ctx.query.filters && ctx.query.filters.premium === 'false';
        if (ctx.state.user || isRequestingNonPremium) return await super.find(ctx);

        const publicPosts = await strapi.service('api::post.post').findPublic(ctx.query);
        const sanitizedPosts = await this.sanitizeOutput(publicPosts, ctx);
        return this.transformResponse(sanitizedPosts);
        
        // const { query } = ctx;
        // const filterdPosts = await strapi.service('api::post.post').find({
        //     filters: { premium: false, ...query.filters },
        //     ...query
        // });

        // const sanitizedPosts = await this.sanitizeOutput(filterdPosts, ctx);
        // return this.transformResponse(sanitizedPosts);
    },

  
    // Method 3: Replacing a core action
    async findOne(ctx) {
      const { id } = ctx.params;
      const { query } = ctx;
  
      const postIfPublic = await strapi.service('api::post.post').findOneIfPublic(id, query);
      const sanitizedEntity = await this.sanitizeOutput(postIfPublic, ctx);
  
      return this.transformResponse(sanitizedEntity);
    },

    async likePostAction(ctx) {
        const {query, params: { id: postId }} = ctx;
        const { user: { id: userId } } = ctx.state;
        const updatedPost = await strapi.service('api::post.post').likePost({
            postId,
            userId,
            ...query
        });
        const sanitizedEntity = await this.sanitizeOutput(updatedPost, ctx);
        return this.transformResponse(sanitizedEntity);
    }  
}));