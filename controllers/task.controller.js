const taskModel = require("../modles/task.model");

const createTask=async(req,res)=>{
    try {
       
        const { task, assignedBy, assignedTo, deadline } = req.body;
    

        const newTask = new taskModel({
          task,
          assignedBy,
          assignedTo,
          status: 'ToDo', 
          created: Date.now(),
          deadline, 
          comments: [] 
        });
    console.log(newTask);
        
        await newTask.save();
    
        res.status(201).json({ success: true, message: 'Task allocated successfully', task: newTask });
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    }

const getTask=async (req, res) => {
  try {
    const assignedToObjectId = req.params.assignedToObjectId;
    const tasks = await taskModel.find({ assignedTo: assignedToObjectId });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

const statusUpdate=async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { status } = req.body;
    // Validate status
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    // Find the task by ID and update its status
    const updatedTask = await taskModel.findByIdAndUpdate(taskId, { status }, { new: true });

    // Check if the task exists
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}



const deadlineUpdate= async (req, res) => {
  try {
    // Extract the taskId from the request params
    const taskId = req.params.taskId;

    // // Find the task by taskId
     const task = await taskModel.findById(taskId);

    if (!task) {
      // If task is not found, return a 404 Not Found error
      return res.status(404).json({ error: 'Task not found' });
    }

    // // Extract the new deadline from the request body
    //const newDeadline=req.body
   const newDeadline = new Date(req.body.newDeadline);
    console.log(newDeadline);
  task.deadline = newDeadline;
    // Save the updated task to the database
    await task.save();
    // Return a success response
    return res.status(200).json({ message: 'Deadline extended successfully', task });
  } catch (error) {
    // If an error occurs, return a 500 Internal Server Error response
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addComments = async (req, res) => {
  try {
    // Extract the taskId from the request params
    const taskId = req.params.taskId;

    // Find the task by taskId
    const task = await taskModel.findById(taskId);

    if (!task) {
      // If task is not found, return a 404 Not Found error
      return res.status(404).json({ error: 'Task not found' });
    }

    // Extract the comment details from the request body
    const { commenterName, commentText } = req.body;

    // Construct the comment object with commenter's name and comment text
    const newComment = { commenterName, commentText };

    
    // Add the comment to the task's comments array
    task.comments.push(newComment);

    // // Save the updated task to the database
     await task.save();

    // // Return a success response
     return res.status(200).json({ message: 'Comment added successfully', task });
  } catch (error) {
    // If an error occurs, return a 500 Internal Server Error response
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

    module.exports = {
        createTask,getTask,statusUpdate,deadlineUpdate,addComments
      };
      