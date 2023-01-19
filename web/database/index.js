import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });
mongoose.Promise = global.Promise;

export default mongoose;
