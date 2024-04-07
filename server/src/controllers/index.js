import _ from "lodash";
import auth from "../middlewares/auth.js";
import catchAsync from "../middlewares/catch.async.js";
import validate from "../middlewares/validate.js";

export default function (router, apis) {
    apis.forEach((element) => {
        const controller = new element.controller();
        element.methods.forEach((e) => {
            const httpMethod = e.httpMethod;
            const path = e.path;
            const method = e.method;
            const roles = e.roles;
            const schema = e.schema;
            if (_.isEmpty(roles)) {
                router[httpMethod](
                    `${path}`,
                    validate(schema),
                    catchAsync(controller, method)
                );
            } else {
                router[httpMethod](
                    `${path}`,
                    auth(roles),
                    validate(schema),
                    catchAsync(controller, method)
                );
            }
        });
    });
}
