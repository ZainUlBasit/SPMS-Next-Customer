const { NextResponse } = require("next/server");

const createError = (res, status, message) => {
  return NextResponse.json(
    { success: false, error: { status, message } },
    { status }
  );
};

const successMessage = (res, payload, data_msg) => {
  return NextResponse.json(
    { success: true, data: { payload, msg: data_msg } },
    { status: 200 }
  );
};

module.exports = { createError, successMessage };
