class CustomErrorHandler extends Error{

    constructor(status, msg){
        super();
        this.status = status;
        this.message = msg;
    }
    
    static alreadyExist(message){
        return new CustomErrorHandler(409, message)
    }
    static wrongCredential(message){
        return new CustomErrorHandler(404, message)
    }
    static unauthorised(message){
        return new CustomErrorHandler(404, message)
    }
}
export default CustomErrorHandler