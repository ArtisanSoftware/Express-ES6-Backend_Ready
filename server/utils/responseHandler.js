export const successHandler = function(res, data) {
  res.status(201).json({
    success: true,
    data,
    error: null
  });
};

// bad request
export const errorHandler400 = function(res, error) {
  res.status(400).json({
    success: false,
    data: null,
    error
  });
};

// unauthorized
export const errorHandler401 = function(res, error) {
  res.status(401).json({
    success: false,
    data: null,
    error
  });
};

// forbidden
export const errorHandler403 = function(res, error) {
  res.status(403).json({
    success: false,
    data: null,
    error
  });
};

// not found
export const errorHandler404 = function(res, error) {
  res.status(404).json({
    success: false,
    data: null,
    error
  });
};

// server error
export const serverErrorHandler = function(res, error) {
  res.status(500).json(error);
};
