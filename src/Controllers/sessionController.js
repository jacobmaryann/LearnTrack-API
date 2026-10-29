import sessionModel from "../Models/sessionModel.js";
import asyncHandler from 'express-async-handler';


const createSession = asyncHandler(async (req, res) => {
    const { goalId, title, description, startTime, durationMinutes } = req.body;

    const newSession = await Session.create({
        userId: req.user.id,
        goalId,
        title,
        description,
        startTime,
        durationMinutes,
        status: 'scheduled',
        history: [
            {
                action: 'created',
                timestamp: new Date(),
                details: { initialSchedule: startTime, durationMinutes }
            }
        ]
    });

    res.status(201).json({message: 'session created successfully', data: newSession});
});


const getSessions = asyncHandler(async (req, res) => {
  const { goalId, status } = req.query;
  const userId = req.user.id; 

  const query = { userId };
  if (goalId) query.goalId = goalId;

  const sessions = await sessionModel.find(query).sort({ startTime: 1 });
  const now = new Date();

  const formattedSessions = sessions.map((session) => {
    let currentStatus = session.status; // 'scheduled', 'completed', or 'cancelled'

    if (currentStatus === 'scheduled') {
      const plannedStart = new Date(session.startTime);
      const plannedEnd = new Date(plannedStart.getTime() + session.durationMinutes * 60000);

      if (now < plannedStart) {
        currentStatus = 'upcoming'
      } else if (now >= plannedStart && now < plannedEnd) {
        currentStatus = 'in_progress'
      } else {
        currentStatus = 'overdue'
      }
    }

    return {
      ...session.toObject(),
      displayStatus: currentStatus //go to frontend
    };
  });
  let result = formattedSessions;
  if(status) {
    result = formattedSessions.filter((s) => s.displayStatus === status);
  }

  res.status(200).json(result);
});


const updateSessionDetailsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, startTime, durationMinutes } = req.body;
  const userId = req.user.id;

  const session = await sessionModel.findOne({ _id: id, userId });

  if (!session) {
    res.status(404);
    throw new Error('Session not found');
  }

  if (session.status === 'cancelled') { //read only until undone
    res.status(400);
    throw new Error('Cannot edit a cancelled session.');
  }
  if (session.status === 'completed') { //read only until undone
    res.status(400);
    throw new Error('Undo completion before editing.');
  }

  const isScheduleChange = startTime || durationMinutes;

  if (title) session.title = title;

  
  if (isScheduleChange) { //History
    const oldSchedule = { startTime: session.startTime, durationMinutes: session.durationMinutes };
    
    if (startTime) session.startTime = new Date(startTime);
    if (durationMinutes) session.durationMinutes = durationMinutes;

    session.history.push({
      action: 'rescheduled',
      timestamp: new Date(),
      details: {
        previous: oldSchedule,
        updated: { startTime: session.startTime, durationMinutes: session.durationMinutes }
      }
    });
  }

  await session.save();
  res.status(200).json({ message: 'Session updated successfully', session });
});


const updateSessionStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const session = await sessionModel.findById(req.params.id);
    
    if (!session) {
        res.status(404);
        throw new Error('Session not found');
    }
    
    if (!session.userId.equals(req.user._id)) {
        res.status(403);
        throw new Error('Unauthorized, you do not own this session');
    }

    if (session.status === 'cancelled') {
        res.status(400);
        throw new Error('Cancelled sessions cannot be modified');
    }
    if (session.status === 'completed' && status === 'cancelled') {
        res.status(400);
        throw new Error('You must undo completion before cancelling');
    }

    if (status === 'completed') {
        session.status = 'completed';
        session.actualCompletedAt = new Date(); 
        session.history.push({ action: 'completed', timestamp: new Date() });
    } 
    else if (status === 'scheduled') {
        session.status = 'scheduled';
        session.actualCompletedAt = null;
        session.history.push({ action: 'undone', timestamp: new Date() });
    } 
    else if (status === 'cancelled') {
        session.status = 'cancelled';
        session.history.push({ action: 'cancelled', timestamp: new Date() });
    }

    await session.save();

    return res.json({ message: 'Session status updated successfully', data: session });
});


export {createSession,  getSessions, updateSessionDetailsById, updateSessionStatus};