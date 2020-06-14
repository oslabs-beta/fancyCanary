module.exports = {
  getDeployments: async (req, res, next) => {
    try {
      res.locals.deployments = (
        await res.locals.client.apis.apps.v1
          .namespaces('default')
          .deployments()
          .get()
      ).body.items;
      next();
    } catch (err) {
      next({
        log: `Encountered an error in DeploymentController.get: ${err}`,
        status: 400,
        message: 'An error occured fetching deployments',
      });
    }
  },
  scaleDeployment: async (req, res, next) => {
    console.log('name: ', req.query.name);
    if (!req.query.name) {
      return res.sendStatus(400);
    }
    try {
      if (req.body.spec.replicas < 0)
        throw new Error('Cannot set a negative replica');
      console.log(req.body);
      await res.locals.client.apis.apps.v1
        .namespaces('default')
        .deployments(req.query.name)
        .patch({ body: req.body });
      next();
    } catch (err) {
      next({
        log: `Encountered an error in DeploymentController.get: ${err}`,
        status: 500,
        message: 'An error occured scaling the deploymnet',
      });
    }
  },
};
