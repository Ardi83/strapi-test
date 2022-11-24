'use strict';

/**
 * `is-admin` policy
 */

module.exports = (policyContext, config, { strapi }) => {
    const { userRole } = config;
    
    if (policyContext.state.user && policyContext.state.user.role.name === userRole) {
        // Go to next policy or will reach the controller's action.
        return true;
    }
   
      return false;
};
