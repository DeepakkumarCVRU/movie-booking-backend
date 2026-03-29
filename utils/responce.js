/*
    this object will be used as template for building error response 
*/

export const errorResponceBody = {
    err: {},
    data: {},
    message: "something went wrong , cannot process the request",
    success: false
}

/*
    this object will be used as template for building success response
*/

export const successResponceBody = {
    success: true,
    err: {},
    data: {},
    message: "sucessfully proocess the request",
}