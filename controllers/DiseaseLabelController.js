
import { DiseaseLabel } from "../models/Patient.js";
import mongoose from "mongoose";

export const diseaseList = async (req, res, next) => {
  try {
    const diseaseList = await DiseaseLabel.find({});
    res.status(200).json({
      message: "Displaying Results",
      result: diseaseList
    });
    next();
  } catch (err) {
    res.status(403).json({
      message: "There is an error in displaying the list",
      error: err
    });
    next(err);
  }

};

export const getSpecificDisease = async (req, res, next) => {

  let disease = '';
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {

      disease = await DiseaseLabel.findById(req.params.id);

    } else {

      disease = await DiseaseLabel.findOne({
        ICD_10_CM: req.params.id
      });

    }

    res.status(200).json({
      message: "Displaying Results",
      result: disease
    });
    next();

  } catch (err) {
    res.status(403).json({
      message: "Disease doesnot exist ",
      error: err

    });
    next(err);
  }

};

export const create = async (req, res, next) => {

  try {
    const existDisease = await DiseaseLabel.findOne({
      ICD_10_CM: req.body.ICD_10_CM
    });

    if (existDisease) {
      res.status(403).json("Disease already exist");
    } else {

      const newDiseaseInfoCreate = await DiseaseLabel.create(req.body);

      res.status(200).json({
        message: "Disease Created",
        result: newDiseaseInfoCreate
      });
    }
    next();

  } catch (err) {

    res.status(403).json({
      message: "There has been an error ",
      result: err
    });
    next(err);

  }

};

export const update = async (req, res, next) => {

  try {
    const disease = await DiseaseLabel.findByIdAndUpdate(
      req.params.id,
      req.body, {
        runValidators: true,
        new: true
      }
    );
    res.status(200).json({
      message: "Disease has been updated",
      result: disease
    });
    next();

  } catch (err) {
    res.status(403).json({
      message: "There has been an error",
      error: err
    });

    next(err);
  }


};

export const remove = async (req, res, next) => {
  try {
    const disease = await DiseaseLabel.findByIdAndDelete(req.params.id)
    res.status(200).json({
      message: "Disease has been deleted",
      result: disease
    });
    next();
  } catch (err) {
    res.status(403).json({
      message: "There has been error",
      error: err
    });
    next(err);
  }

};



