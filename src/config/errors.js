export default {
    notFoundOne: { statusCode: 404, status: "error", message: "Document not found" },
    notFound: { statusCode: 404, status: "error", message: "Documents not found" },
    incomplete: { statusCode: 400, status: "error", message: "Incomplete values" },
    invalid: { statusCode: 400, status: "error", message: "Invalid params" },
    adopted: { statusCode: 400, status: "error", message: "Already added" },
    auth: { statusCode: 401, status: "auth", message: "Invalid credentials" },
    forbidden: { statusCode: 403, status: "forbidden", message: "Not Allowed" }
  }