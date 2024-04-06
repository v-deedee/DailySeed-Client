import _ from "lodash";
import auth from "../middlewares/auth.js";
import error from "../constants/error.code.js";

export default function (router, apis) {
    apis.forEach((element) => {
        const controller = new element.controller();
        element.methods.forEach((e) => {
            const httpMethod = e.httpMethod;
            const path = e.path;
            const method = e.method;
            const roles = e.roles;
            const statuses = e.statuses;
            if (_.isEmpty(roles)) {
                router[httpMethod](`${path}`, catchAsync(controller, method));
            } else {
                router[httpMethod](
                    `${path}`,
                    auth(roles),
                    catchAsync(controller, method)
                );
            }
        });
    });
}

const catchAsync = (controller, method) => async (req, res, next) => {
    try {
        const body = _.cloneDeep(req.body);
        delete body.password;
        await controller[method](req, res, next);
    } catch (err) {
        console.log(err);
        next(err);
    }
};
