//Function to create session data

export function createSessionData(req, user, action) {
    //create and store session data
    req.session.userID = user._id.toString();
    //save session data
    req.session.save(action);
}