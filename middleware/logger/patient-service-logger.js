import winston  from 'winston';

const { createLogger, format, transports }  = winston;
const { combine, timestamp, printf, json , errors}  = format;

 
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${JSON.stringify(message)}`;
}); 


export const patientSerciveLogger = ()=> {
    
    return createLogger({
        
        level: 'info',
        format: combine(
            timestamp(),
            myFormat,
            json(),
            errors({stack:true}),
        ),
        defaultMeta: {
            service: 'patient-service-api'
        },
        transports: [
            // - Write all logs with level `error` and below to `error.log`
            // - Write all logs with level `info` and below to `combined.log`
            new transports.File({
                filename: 'error.log',
                level: 'error'
            }),
            new transports.File({
                filename: 'combined.log'
            }),
        ],
    });
}

export const patientSerciveLoggerDebug = ()=> {
    
    return createLogger({
        level: 'debug',
        defaultMeta: {
            service: 'patient-service-api'
        },
        format: combine(
            timestamp(),
            myFormat,
            errors({stack:true})
            ),
        transports: [
            new transports.Console(),
        ],
    });
}