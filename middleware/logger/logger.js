import { patientSerciveLogger, patientSerciveLoggerDebug } from "./patient-service-logger.js";

let NODE_ENV = process.env.NODE_ENV;
let log = null;

export const logger = (req,res, next)=>{ 
   
    if (NODE_ENV !== 'production') {
        log = patientSerciveLoggerDebug();
        log.debug({
            ip:             req.ip,
            hostname:       req.hostname,
            method:         req.method,
            originalUrl:    req.originalUrl,
            query:          req.query, 
            body:           req.body, 
        });
    }else{
        log = patientSerciveLogger();
        log.info({
            ip:             req.ip,
            method:         req.method,
            originalUrl:    req.originalUrl,
            query:          req.query,
            body:           req.body
        });
    }
    next();
}


// logHandler = ()=>{
    //http status codes
// };