const { body, validationResult } = require('express-validator');

exports.validateCreateUser = [
  body('name').notEmpty().trim().escape().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  body('age').notEmpty().isInt({ min: 1 }).withMessage('Age must be a positive integer'),
  body('email').notEmpty().trim().isEmail().normalizeEmail(),
  body('address').notEmpty().trim().escape().isLength({ min: 5 }).withMessage('Address must be at least 5 characters long'),
];

exports.checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
