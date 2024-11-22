import { Request, Response } from 'express';
import { StudentServices } from "./student.service";
import { error } from 'console';
import Joi from 'joi'
import studentValidationSchema from './student.validation';
import { z } from "zod";

const createStudent = async (req: Request, res: Response) => {
    try {

        // creating a schema validation using zod

        // const studentValidationSchema = z.object({
        //     id: z.string(),
        //     name: z.object({
        //         firstName: z.string().max(20, {
        //             message: 'First Name can not be more than 20 characters',
        //         }),
        //     }),
        // });



        const { student: studentData } = req.body;

        // data validation using Joi
        // const { error, value } = studentValidationSchema.validate(studentData);
        // const result = await StudentServices.createStudentIntoDB(value);


        // data validation using zod 
        const zodparsedData = studentValidationSchema.parse(studentData);

        // const result = await StudentServices.createStudentIntoDB(studentData);
        const result = await StudentServices.createStudentIntoDB(zodparsedData);

        // if(error){
        //     res.status(500).json({
        //         success: false,
        //         message: 'Something went wrong',
        //         // error,
        //         error: error.details,
        //     });
        // }


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

    } catch (err: any) {
        // console.log(err);
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
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

    } catch (err: any) {
        // console.log(err);
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
}

const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;

        const result = await StudentServices.deleteStudentFromDB(studentId)

        res.status(200).json({
            success: true,
            message: 'Student is deleted successfully',
            data: result,
        });

    } catch (err: any) {
        // console.log(err);
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
}

export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudents,
    deleteStudent
};


