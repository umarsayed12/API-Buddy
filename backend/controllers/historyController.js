import History from "../models/historyModel.js";

const extractErrorSummary = (errorData) => {
  if (!errorData) return "Unknown error";

  if (typeof errorData === "string") {
    return errorData.length > 150 ? errorData.slice(0, 150) + "..." : errorData;
  }

  if (typeof errorData === "object") {
    return (
      errorData.message ||
      errorData.error ||
      errorData.title ||
      JSON.stringify(errorData).slice(0, 150) + "..."
    );
  }

  return "Unrecognized error format";
};

export const saveHistory = async (req, res) => {
  try {
    const { testType, testName, request, response } = req.body;
    // console.log("Request : ", request);
    // console.log("Headers : ", request.headers);
    // console.log("Response : ", response);

    const newHistory = new History({
      user: req.id,
      testType,
      testName,
      request: {
        ...request,
        headers: request.headers || {},
      },
      response: {
        ...response,
        warning: response.warning || null,
        errorSummary: extractErrorSummary(response.error),
      },
    });

    await newHistory.save();

    res.status(201).json({ message: "History saved" });
  } catch (error) {
    console.error("Save History Error:", error);
    res.status(500).json({ message: "Error saving history", error });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(history);
  } catch (error) {
    console.error("Get History Error:", error);
    res.status(500).json({ message: "Error fetching history", error });
  }
};
