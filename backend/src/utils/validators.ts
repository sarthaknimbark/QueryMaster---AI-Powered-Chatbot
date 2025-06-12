import { body, ValidationChain, validationResult } from "express-validator";
import { Request, Response, NextFunction } from 'express';

const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Sequentially run each validation
        for (let validation of validations) {
            await validation.run(req);
        }

        // Collect validation errors
        const errors = validationResult(req);

        // If no validation errors, proceed to the next middleware
        if (errors.isEmpty()) {
            return next();
        }

        // If there are validation errors, return them in the response
        return res.status(422).json({ errors: errors.array() });
    };
};

const loginValidators =  [ 
    body("email").trim().isEmail().withMessage("Email is Required"),
    body("password").trim().isLength({ min: 6}).withMessage("Password Should conatain atleast 6 character"),
]

const signupValidators =  [ 
    body("name").notEmpty().withMessage("Name is Required"),
    ...loginValidators,
]

export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message  is required"),
  ];

export 
{signupValidators, validate, loginValidators};