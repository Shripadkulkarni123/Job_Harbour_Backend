import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide job title"],
    trim: true,
    index: true
  },
  description: {
    type: String,
    required: [true, "Please provide job description"],
  },
  category: {
    type: String,
    required: [true, "Please provide job category"],
    index: true
  },
  country: {
    type: String,
    required: [true, "Please provide country"],
    index: true
  },
  city: {
    type: String,
    required: [true, "Please provide city"],
    index: true
  },
  location: {
    type: String,
    required: [true, "Please provide location"],
  },
  fixedSalary: {
    type: Number,
  },
  salaryFrom: {
    type: Number,
  },
  salaryTo: {
    type: Number,
  },
  expired: {
    type: Boolean,
    default: false,
    index: true
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
    index: true
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
});

// Create compound index for common queries
jobSchema.index({ expired: 1, jobPostedOn: -1 });

export default mongoose.model("Job", jobSchema); 