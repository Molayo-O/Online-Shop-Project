//This function helps data to persist for the next R-R cycle
export function retriveSessionData(req) {
  //retrieve sessionData
  const sessionData = req.session.stickyData;

  //set sessionData to null
  req.session.stickyData = null;
  return sessionData;
}

export function stickSessionData(req, data, action) {
  req.session.stickyData = data;
  req.session.save(action);
}
