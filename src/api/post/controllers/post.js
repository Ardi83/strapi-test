'use strict';
var AWS = require('aws-sdk');
/**
 * post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
    // Method 1: Creating an entirely custom action
    async exampleAction(ctx) {
        // Set the region 
        AWS.config.update({
            region: 'us-east-1',
            accessKeyId: process.env.aws_access_key_id,
            secretAccessKey: process.env.aws_secret_access_key
        });

        // Create an SQS service object
        var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

        var params = {
        // Remove DelaySeconds parameter and value for FIFO queues
   
        MessageAttributes: {
            "Title": {
            DataType: "String",
            StringValue: "The Whistler"
            },
            "Author": {
            DataType: "String",
            StringValue: "John Grisham"
            },
            "WeeksOn": {
            DataType: "Number",
            StringValue: "6"
            }
        },
        MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
        // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
        // MessageGroupId: "Group1",  // Required for FIFO queues
        QueueUrl: "https://sqs.us-east-1.amazonaws.com/522793638553/first-test"
        };

        sqs.sendMessage(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.MessageId);
        }
        });
    },

    async reciveMessage(ctx) {
        console.log(ctx)
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