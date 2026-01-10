import { CorsOptions } from "cors";

const localIP = "192.168.0.102";
const devIP = "http://localhost:5173";
const prodIP = `http://${localIP}:5173`;

const allowedOrigins = [devIP, prodIP];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

export default corsOptions;
