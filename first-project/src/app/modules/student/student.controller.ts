import { Request, Response } from 'express';
import { StudentServices } from "./student.service";
import { error } from 'console';
import Joi from 'joi'
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
    try {

        // creating a schema validation using Joi







        const { student: studentData } = req.body;

        const { error } = studentValidationSchema.validate(studentData);

        const result = await StudentServices.createStudentIntoDB(studentData);

        if(error){
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                // error,
                error: error.details,
            });
        }


        // Correct response method
        return res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result,
        });
    } catch (err) {
        console.error(err);

        // Handle errors safely
        if (err instanceof Error) {
            return res.status(500).json({
                success: false,
                message: 'An error occurred while creating the student',
                error: err.message, // Safely access the message property
            });
        }

        // Fallback for unknown error types
        return res.status(500).json({
            success: false,
            message: 'An unknown error occurred',
            error: String(err), // Convert unknown to string for logging
        });
    }
};


const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB()

        res.status(200).json({
            success: true,
            message: 'Students are retrieved successfully',
            data: result,
        });

    } catch (err) {
        // console.log(err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err,
        });
    }
}

const getSingleStudents = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;

        const result = await StudentServices.getSingleStudentsFromDB(studentId)

        res.status(200).json({
            success: true,
            message: 'Student is retrieved successfully',
            data: result,
        });

    } catch (err) {
        console.log(err);
    }
}

export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudents
};


