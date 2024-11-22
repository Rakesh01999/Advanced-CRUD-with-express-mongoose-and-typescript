import Joi from 'joi'

// User Name Schema
const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .max(20)
        .required()
        .pattern(/^[A-Z][a-z]*$/, 'capitalize format')
        .messages({
            'string.base': 'First Name must be a string',
            'string.empty': 'First Name is required',
            'string.max': 'First Name cannot be more than 20 characters',
            'string.pattern.name': '{#value} is not in capitalize format',
        }),
    middleName: Joi.string().trim().allow('').messages({
        'string.base': 'Middle Name must be a string',
    }),
    lastName: Joi.string()
        .trim()
        .required()
        .pattern(/^[a-zA-Z]*$/, 'alpha characters')
        .messages({
            'string.base': 'Last Name must be a string',
            'string.empty': 'Last Name is required',
            'string.pattern.name': '{#value} is not valid',
        }),
});

// Guardian Schema
const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required().messages({
        'string.base': "Father's Name must be a string",
        'string.empty': "Father's Name is required",
    }),
    fatherOccupation: Joi.string().required().messages({
        'string.base': "Father's Occupation must be a string",
        'string.empty': "Father's Occupation is required",
    }),
    fatherContactNo: Joi.string().required().messages({
        'string.base': "Father's Contact Number must be a string",
        'string.empty': "Father's Contact Number is required",
    }),
    motherName: Joi.string().required().messages({
        'string.base': "Mother's Name must be a string",
        'string.empty': "Mother's Name is required",
    }),
    motherOccupation: Joi.string().required().messages({
        'string.base': "Mother's Occupation must be a string",
        'string.empty': "Mother's Occupation is required",
    }),
    motherContactNo: Joi.string().required().messages({
        'string.base': "Mother's Contact Number must be a string",
        'string.empty': "Mother's Contact Number is required",
    }),
});

// Local Guardian Schema
const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': "Local Guardian's Name must be a string",
        'string.empty': "Local Guardian's Name is required",
    }),
    occupation: Joi.string().required().messages({
        'string.base': "Local Guardian's Occupation must be a string",
        'string.empty': "Local Guardian's Occupation is required",
    }),
    contactNo: Joi.string().required().messages({
        'string.base': "Local Guardian's Contact Number must be a string",
        'string.empty': "Local Guardian's Contact Number is required",
    }),
    address: Joi.string().required().messages({
        'string.base': "Local Guardian's Address must be a string",
        'string.empty': "Local Guardian's Address is required",
    }),
});

// Student Schema
const studentValidationSchema = Joi.object({
    id: Joi.string().required().messages({
        'string.base': 'Student ID must be a string',
        'string.empty': 'Student ID is required',
    }),
    name: userNameValidationSchema.required().messages({
        'object.base': 'Student Name must be an object',
        'any.required': 'Student Name is required',
    }),
    gender: Joi.string()
        .valid('male', 'female', 'other')
        .required()
        .messages({
            'string.base': 'Gender must be a string',
            'any.only': '{#value} is not a valid gender. Allowed values: male, female, other.',
            'string.empty': 'Gender is required',
        }),
    dateOfBirth: Joi.string().required().messages({
        'string.base': 'Date of Birth must be a string',
        'string.empty': 'Date of Birth is required',
    }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'Email must be a string',
            'string.email': '{#value} is not a valid email',
            'string.empty': 'Email is required',
        }),
    contactNo: Joi.string().required().messages({
        'string.base': 'Contact Number must be a string',
        'string.empty': 'Contact Number is required',
    }),
    emergencyContactNo: Joi.string().required().messages({
        'string.base': 'Emergency Contact Number must be a string',
        'string.empty': 'Emergency Contact Number is required',
    }),
    bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .messages({
            'string.base': 'Blood Group must be a string',
            'any.only': '{#value} is not a valid blood group.',
        }),
    presentAddress: Joi.string().required().messages({
        'string.base': 'Present Address must be a string',
        'string.empty': 'Present Address is required',
    }),
    permanentAddress: Joi.string().required().messages({
        'string.base': 'Permanent Address must be a string',
        'string.empty': 'Permanent Address is required',
    }),
    guardian: guardianValidationSchema.required().messages({
        'object.base': 'Guardian information must be an object',
        'any.required': 'Guardian information is required',
    }),
    localGuardian: localGuardianValidationSchema.required().messages({
        'object.base': 'Local Guardian information must be an object',
        'any.required': 'Local Guardian information is required',
    }),
    profileImg: Joi.string().allow('').messages({
        'string.base': 'Profile Image must be a string',
    }),
    isActive: Joi.string()
        .valid('active', 'blocked')
        .default('active')
        .messages({
            'string.base': 'Status must be a string',
            'any.only': '{#value} is not a valid status. Allowed values: active, blocked.',
        }),
});


export default studentValidationSchema;